import type { NextPage } from "next";
import { FetchEventResult } from "next/dist/server/web/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../components/Layout";
import { useData } from "../../../hooks/useData";
import styles from "../../../styles/GamePage.module.scss";
import Modal from "../../../components/Modal";
import { Photo } from "../../../contexts/resultContext";
import { useResult } from "../../../hooks/useResult";

const Footer = ({ len }: { len: number }) => {
  const router = useRouter();
  return (
    <div className={styles.footerBox}>
      <div className={styles.footer}>
        <button className={styles.button} onClick={() => router.back()}>
          이전
        </button>
        <span>{len > 2 ? len + "강" : "결승"}</span>
      </div>
      <div className={styles.stateBar}>
        <div className={styles.state}></div>
      </div>
    </div>
  );
};
const Home: NextPage = () => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");
  const router = useRouter();

  const { setImages } = useResult();
  const [next, setNext] = useState([] as Photo[]);
  const [selected, setSelected] = useState([] as Photo[]);
  const [round, setRound] = useState(0);
  const [len, setLen] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const result = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/${router.query.gameId}`
        )
      ).json();

      const sorted = result.photos
        .sort(() => 0.5 - Math.random())
        .map((photo: Photo) => {
          return { ...photo, selected: 0 };
        });

      setImages(sorted);
      setSelected(sorted);
      setNext(sorted);
      setRound(0);
      setLen(sorted.length);
    } catch (e) {
      console.log(e);
    }
  }, [router]);

  useEffect(() => {
    if (round * 2 === len) {
      setSelected(next.sort(() => 0.5 - Math.random()));
      setLen((len) => len / 2);
      setRound(0);
    }
  }, [round]);

  useEffect(() => {
    if (len === 1) {
      router.push(`/game/${router.query.gameId}/result/my`);
    }
  }, [len]);

  useEffect(() => {
    if (router.query.gameId) fetchData();
  }, [fetchData, router]);

  return (
    <Layout footer={<Footer len={len} />} noBackground>
      <div className={styles.contents}>
        {selected[round * 2] && selected[round * 2 + 1] && (
          <>
            <div className={styles.img1Area}>
              <div
                className={styles.imgBorder1}
                onClick={() => {
                  setNext((next) =>
                    next.filter((n) => n.id !== selected[round * 2 + 1].id)
                  );
                  setRound((r) => r + 1);
                  setImages((images) =>
                    images.map((image) => {
                      if (image.id === selected[round * 2 + 1].id)
                        return { ...image, selected: image.selected + 1 };
                      return image;
                    })
                  );
                }}
              >
                <img className={styles.img1} src={selected[round * 2].img} />
              </div>
              <img
                className={styles.mag1}
                onClick={() => {
                  setModal((modal) => !modal);
                  setImage(selected[round * 2].img);
                }}
                src="/assets/gamePage/확대.svg"
              />
            </div>

            <div className={styles.img2Area}>
              <div
                className={styles.imgBorder2}
                onClick={() => {
                  setNext((next) =>
                    next.filter((n) => n.id !== selected[round * 2].id)
                  );
                  setRound((r) => r + 1);
                  setImages((images) =>
                    images.map((image) => {
                      if (image.id === selected[round * 2 + 1].id)
                        return { ...image, selected: image.selected + 1 };
                      return image;
                    })
                  );
                }}
              >
                <img
                  className={styles.img2}
                  src={selected[round * 2 + 1].img}
                />
              </div>
              <img
                className={styles.mag2}
                onClick={() => {
                  setModal((modal) => !modal);
                  setImage(selected[round * 2 + 1].img);
                }}
                src="/assets/gamePage/확대.svg"
              />
            </div>
          </>
        )}
        <img className={styles.vs} src="/assets/gamePage/vs.png" />

        {modal && (
          <Modal
            closeModal={() => setModal((modal) => !modal)}
            image={image}
          ></Modal>
        )}
      </div>
    </Layout>
  );
};

export default Home;
