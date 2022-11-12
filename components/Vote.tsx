import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Layout } from "./Layout";
import styles from "../styles/GamePage.module.scss";
import Modal from "./Modal";
import { Photo, selectImage, setImages } from "../redux/result";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../redux/store";
import { PAGE_STATE } from "../pages/game/[gameId]";

const Footer = ({
  len,
  setPageState,
}: {
  len: number;
  setPageState: Dispatch<SetStateAction<PAGE_STATE[]>>;
}) => {
  return (
    <div className={styles.footer}>
      <button
        className={styles.button}
        onClick={() =>
          setPageState((ps) => {
            if (ps.length > 1) return ps.slice(0, -1);
            return [PAGE_STATE.index];
          })
        }
      >
        이전
      </button>
      <div>{len > 2 ? len + "강" : "결승"}</div>
      <div></div>
    </div>
  );
};
const Vote = ({
  gameId,
  setPageState,
}: {
  gameId: string;
  setPageState: Dispatch<SetStateAction<PAGE_STATE[]>>;
}) => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");

  const { name, images } = useSelector((state: StoreState) => state.result);

  const [next, setNext] = useState<Photo[]>([]);
  const [selected, setSelected] = useState<Photo[]>([]);
  const [round, setRound] = useState(0);
  const [len, setLen] = useState(0);

  const [isSelected, setIsSelected] = useState(false);

  const dispatch = useDispatch();

  const applyScore = async () => {
    let res: { [key: number]: number } = {};
    images.forEach((image) => {
      res[image.id] = image.score;
    });

    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${gameId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        photos: res,
      }),
    }).then(() => setPageState((ps) => [...ps, PAGE_STATE.my]));
  };

  const fetchData = useCallback(async () => {
    try {
      const result = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${gameId}`)
      ).json();

      const sorted = result.photos
        .sort(() => 0.5 - Math.random())
        .map((photo: Photo) => {
          return { ...photo, score: 0 };
        });

      dispatch(setImages(sorted));
      setSelected(sorted);
      setNext(sorted);
      setRound(0);
      setLen(sorted.length);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    setIsSelected(false);
    if (round * 2 === len) {
      setSelected(next.sort(() => 0.5 - Math.random()));
      setLen((len) => len / 2);
      setRound(0);
    }
  }, [round]);

  useEffect(() => {
    if (len === 1) {
      applyScore();
    }
  }, [len]);

  useEffect(() => {
    if (gameId) {
      fetchData();
    }
  }, [fetchData, gameId]);

  return (
    <Layout
      footer={<Footer len={len} setPageState={setPageState} />}
      noBackground
    >
      <div className={styles.contents}>
        {selected[round * 2] && selected[round * 2 + 1] && (
          <div className={styles.imgWrapper}>
            <div className={styles.img1Area}>
              <div
                className={`${styles.imgBorder1} ${
                  isSelected &&
                  next.some((n) => n.id === selected[round * 2].id)
                    ? styles.selected
                    : ""
                }`}
                onClick={() => {
                  if (!isSelected) {
                    setNext((next) =>
                      next.filter((n) => n.id !== selected[round * 2 + 1].id)
                    );
                    setIsSelected(true);
                    setTimeout(() => setRound((r) => r + 1), 500);
                    dispatch(selectImage(selected[round * 2].id));
                  }
                }}
              >
                <img
                  className={`${styles.img1} ${
                    next.some((n) => n.id === selected[round * 2].id)
                      ? ""
                      : styles.notSelected
                  }`}
                  src={selected[round * 2].img}
                />
              </div>
              <img
                className={styles.mag1}
                onClick={() => {
                  setModal((modal) => !modal);
                  setImage(selected[round * 2].img);
                }}
                src="/assets/gamePage/mag.svg"
              />
            </div>

            <div className={styles.img2Area}>
              <div
                className={`${styles.imgBorder2} ${
                  isSelected &&
                  next.some((n) => n.id === selected[round * 2 + 1].id)
                    ? styles.selected
                    : ""
                }`}
                onClick={() => {
                  if (!isSelected) {
                    setNext((next) =>
                      next.filter((n) => n.id !== selected[round * 2].id)
                    );
                    setIsSelected(true);
                    setTimeout(() => setRound((r) => r + 1), 500);
                    dispatch(selectImage(selected[round * 2 + 1].id));
                  }
                }}
              >
                <img
                  className={`${styles.img2} ${
                    next.some((n) => n.id === selected[round * 2 + 1].id)
                      ? styles.selected
                      : styles.notSelected
                  }`}
                  src={selected[round * 2 + 1].img}
                />
              </div>
              <img
                className={styles.mag2}
                onClick={() => {
                  setModal((modal) => !modal);
                  setImage(selected[round * 2 + 1].img);
                }}
                src="/assets/gamePage/mag.svg"
              />
            </div>
          </div>
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

export default Vote;
