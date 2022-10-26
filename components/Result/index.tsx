import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Photo } from "../../redux/result";
import { StoreState } from "../../redux/store";
import styles from "../../styles/Result.module.scss";

export const MyResult = ({
  select = (url: string) => {},
}: {
  select?: Function;
}) => {
  const { images } = useSelector((state: StoreState) => state.result);
  const router = useRouter();
  const [sortedImages, setSortedImages] = useState<Photo[][]>([]);
  const [all, setAll] = useState<Photo[]>([]);

  useEffect(() => {
    const imgs = Array.from(images);
    if (imgs.length === 0) return;
    let d = imgs.sort((a, b) => -a.score + b.score);
    let newData = [];
    newData.push([d[0]]);
    for (let i = 1; i < d.length; i++) {
      if (newData[newData.length - 1][0].score === d[i].score) {
        newData[newData.length - 1].push(d[i]);
      } else {
        newData.push([d[i]]);
      }
    }
    setSortedImages(newData);
    console.log(newData);
  }, [images]);

  const fetchData = useCallback(async () => {
    try {
      const result = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/${router.query.gameId}/result`
        )
      ).json();
      setAll(result.photos.sort((a: Photo, b: Photo) => -a.score + b.score));
    } catch (e) {
      console.log(e);
    }
  }, [router]);

  useEffect(() => {
    if (router.query.gameId) {
      fetchData();
    }
  }, [router, fetchData]);

  return (
    <div className={styles.main}>
      {sortedImages.map((list, i) => (
        <>
          <div className={styles.title} key={`title${i}`}>
            {i === 0
              ? "최종 우승"
              : i === 1
              ? "결승 진출"
              : Math.pow(2, i) + "강 진출"}
          </div>
          <div className={styles.photolist} key={`photolist${i}`}>
            {list.map((image, ii) => (
              <div
                className={styles.photoitem}
                key={`img${image.id}${ii}`}
                onClick={() => select(image.img)}
              >
                <div className={styles.photo}>
                  <img src={image.img} />
                </div>
                <div className={styles.ranking}>
                  실시간 전체 랭킹{" "}
                  {all && all.findIndex((p) => p.id === image.id) + 1}위
                </div>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
