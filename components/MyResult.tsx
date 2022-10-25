import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Photo } from "../contexts/resultContext";
import { useResult } from "../hooks/useResult";
import styles from "../styles/Result.module.scss";

interface PhotoWithRank extends Photo {
  rank: number;
}

export const MyResult = ({
  select = (url: string) => {},
}: {
  select?: Function;
}) => {
  const { images } = useResult();
  const router = useRouter();
  const [sortedImages, setSortedImages] = useState([] as PhotoWithRank[][]);

  useEffect(() => {
    let d = images.sort((a, b) => -a.selected + b.selected);
    let newData = [];
    newData.push([d[0]]);
    for (let i = 1; i < d.length; i++) {
      if (newData[newData.length - 1][0].selected === d[i].selected) {
        newData[newData.length - 1].push(d[i]);
      } else newData.push([d[i]]);
    }
    setSortedImages(newData);
  }, [images]);

  const fetchData = useCallback(async () => {
    try {
      const result = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/${router.query.gameId}/result`
        )
      ).json();
    } catch (e) {
      console.log(e);
    }
  }, [router]);

  useEffect(() => {}, [router, fetchData]);

  return (
    <div className={styles.main}>
      <div className={styles.title}>나의 최애 포토</div>
      <div
        className={styles.photo}
        onClick={() =>
          select(
            "https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif"
          )
        }
      >
        <img src="https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif" />
      </div>
      <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
      <div className={styles.title}>결승 진출</div>
      <div
        className={styles.photo}
        onClick={() =>
          select(
            "https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif"
          )
        }
      >
        <img src="https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif" />
      </div>
      <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
      <div className={styles.title}>4강 진출</div>
      <div className={styles.photolist}>
        <div
          className={styles.photoitem}
          onClick={() =>
            select(
              "https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif"
            )
          }
        >
          <div className={styles.photo}>
            <img src="https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif" />
          </div>
          <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        </div>
        <div
          className={styles.photoitem}
          onClick={() =>
            select(
              "https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif"
            )
          }
        >
          <div className={styles.photo}>
            <img src="https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif" />
          </div>
          <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        </div>
      </div>
      <div className={styles.title}>8강 진출</div>
      <div className={styles.photolist}>
        <div
          className={styles.photoitem}
          onClick={() =>
            select(
              "https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif"
            )
          }
        >
          <div className={styles.photo}>
            <img src="https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif" />
          </div>
          <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        </div>
        <div
          className={styles.photoitem}
          onClick={() =>
            select(
              "https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif"
            )
          }
        >
          <div className={styles.photo}>
            <img src="https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif" />
          </div>
          <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        </div>
        <div
          className={styles.photoitem}
          onClick={() =>
            select(
              "https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif"
            )
          }
        >
          <div className={styles.photo}>
            <img src="https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif" />
          </div>
          <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        </div>
        <div
          className={styles.photoitem}
          onClick={() =>
            select(
              "https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif"
            )
          }
        >
          <div className={styles.photo}>
            <img src="https://metavv-photo.s3.ap-northeast-2.amazonaws.com/contents/1666660691189_img.gif" />
          </div>
          <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        </div>
      </div>
    </div>
  );
};
