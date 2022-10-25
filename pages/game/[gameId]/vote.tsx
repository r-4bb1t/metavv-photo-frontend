import type { NextPage } from "next";
import { FetchEventResult } from "next/dist/server/web/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../components/Layout";
import { useData } from "../../../hooks/useData";
import styles from "../../../styles/GamePage.module.scss";
import Modal from "../../../components/Modal";

const Footer = () => {
  const router = useRouter();
  return (
    <div className={styles.footerBox}>
      <div className={styles.footer}>
        <button className={styles.button} onClick={() => router.back()}>
          이전
        </button>
        <span>16강</span>
      </div>
      <div className={styles.stateBar}>
        <div className={styles.state}></div>
      </div>
    </div>
  );
};
const Home: NextPage = () => {
  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([] as { id: number; img: string }[]);
  const [image, setImage] = useState("");
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const result = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/${router.query.gameId}`
        )
      ).json();

      setImages(result.photos);
    } catch (e) {
      console.log(e);
    }
  }, [router]);

  useEffect(() => {
    if (router.query.gameId) fetchData();
  }, [fetchData, router]);

  return (
    <Layout footer={<Footer></Footer>} noBackground>
      <div className={styles.contents}>
        {images.length > 0 && (
          <>
            <div className={styles.img1Area}>
              <div className={styles.imgBorder1}>
                <img className={styles.img1} src={images[0].img} />
              </div>
              <img
                className={styles.mag1}
                onClick={() => {
                  setModal((modal) => !modal);
                  setImage(images[0].img);
                }}
                src="/assets/gamePage/확대.svg"
              />
            </div>

            <div className={styles.img2Area}>
              <div className={styles.imgBorder2}>
                <img className={styles.img2} src={images[1].img} />
              </div>
              <img
                className={styles.mag2}
                onClick={() => {
                  setModal((modal) => !modal);
                  setImage(images[1].img);
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
