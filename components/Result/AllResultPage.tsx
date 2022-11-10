import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Header } from "../Header";
import { Layout } from "../Layout";
import styles from "../../styles/Result.module.scss";
import common from "../../styles/Common.module.scss";
import { Photo } from "../../redux/result";
import { PAGE_STATE } from "../../pages/game/[gameId]";
import { Photos } from "../Photos";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";

const AllResultPage = ({
  gameId,
  setPageState,
  images,
  setImages,
}: {
  gameId: string;
  setPageState: Dispatch<SetStateAction<PAGE_STATE[]>>;
  images: Photo[];
  setImages: Function;
}) => {
  const [sortedData, setSortedData] = useState<Photo[][]>([]);
  const { images: votedImages } = useSelector(
    (state: StoreState) => state.result
  );

  const s1 = useMemo(() => Math.floor(Math.random() * images.length), [images]),
    s2 = useMemo(() => Math.floor(Math.random() * images.length), [images]);

  const fetchData = useCallback(async () => {
    try {
      const result = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${gameId}/result`)
      ).json();
      setImages(result.photos);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (gameId) {
      fetchData();
    }
  }, [gameId, fetchData]);

  useEffect(() => {
    if (images.length === 0) return;
    let d = images.sort((a, b) => -a.score + b.score);
    let newData = [];
    newData.push([d[0]]);
    for (let i = 1; i < d.length; i++) {
      if (newData[newData.length - 1][0].score === d[i].score) {
        newData[newData.length - 1].push(d[i]);
      } else {
        newData.push([d[i]]);
      }
    }
    setSortedData(newData);
  }, [images]);

  return (
    <Layout footer={<></>} noBackground>
      <Header
        title="포토 월드컵 전체 결과"
        back={() =>
          setPageState((ps) => {
            if (ps.length > 1) return ps.slice(0, -1);
            return [PAGE_STATE.index];
          })
        }
      />
      <div className={styles.main}>
        {sortedData.map((d, i) => (
          <>
            <div className={styles.title} key={`title${i}`}>
              {i + 1}위
            </div>
            <div className={styles.photolist} key={`photolist${i}`}>
              {d.map((dd, ii) => (
                <div className={styles.photoitem} key={`item${i}-${ii}`}>
                  <div className={styles.photo}>
                    <img src={dd.img} />
                  </div>
                  <div className={styles.ranking}>{dd.score}표</div>
                </div>
              ))}
            </div>
          </>
        ))}

        <button
          className={common.borderedButton}
          onClick={() => setPageState((ps) => [...ps, PAGE_STATE.vote])}
        >
          <div>
            {votedImages.length === images.length
              ? "투표 다시하기"
              : "나도 투표하기"}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M6.0376 11.625C4.4626 11.625 3.13135 11.0813 2.04385 9.99375C0.956347 8.90625 0.412598 7.575 0.412598 6C0.412598 4.425 0.956347 3.09375 2.04385 2.00625C3.13135 0.91875 4.4626 0.375 6.0376 0.375C6.9126 0.375 7.74085 0.56875 8.52235 0.95625C9.30335 1.34375 9.9501 1.89375 10.4626 2.60625V0.9375C10.4626 0.62684 10.7144 0.375 11.0251 0.375V0.375C11.3358 0.375 11.5876 0.62684 11.5876 0.9375V4.75089C11.5876 4.87121 11.4901 4.96875 11.3697 4.96875L7.5751 4.96875C7.26444 4.96875 7.0126 4.71691 7.0126 4.40625V4.40625C7.0126 4.09559 7.26444 3.84375 7.5751 3.84375H9.9751C9.5751 3.11875 9.0251 2.547 8.3251 2.1285C7.6251 1.7095 6.8626 1.5 6.0376 1.5C4.7876 1.5 3.7251 1.9375 2.8501 2.8125C1.9751 3.6875 1.5376 4.75 1.5376 6C1.5376 7.25 1.9751 8.3125 2.8501 9.1875C3.7251 10.0625 4.7876 10.5 6.0376 10.5C7.0001 10.5 7.86885 10.225 8.64385 9.675C9.41885 9.125 9.9626 8.4 10.2751 7.5H11.4563C11.1188 8.725 10.4471 9.71875 9.4411 10.4813C8.4346 11.2438 7.3001 11.625 6.0376 11.625Z"
              fill="#FFB800"
            />
          </svg>
        </button>

        <Photos src1={images[s1]?.img || ""} src2={images[s2]?.img || ""} />

        {votedImages.length === images.length && (
          <button
            className={common.borderedButton}
            onClick={() => setPageState((ps) => [...ps, PAGE_STATE.frame])}
          >
            나만의 프레임 만들기
          </button>
        )}
      </div>
    </Layout>
  );
};

export default AllResultPage;
