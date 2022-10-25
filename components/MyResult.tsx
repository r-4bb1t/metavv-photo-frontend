import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Photo } from "../contexts/resultContext";
import { useResult } from "../hooks/useResult";
import styles from "../styles/Result.module.scss";

export const MyResult = ({
  select = (url: string) => {},
}: {
  select?: Function;
}) => {
  const { images } = useResult();
  const router = useRouter();
  const [sortedImages, setSortedImages] = useState([] as Photo[][]);
  const [all, setAll] = useState([] as Photo[]);

  useEffect(() => {
    if (images.length === 0) return;
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
      setAll(result.photos);
    } catch (e) {
      console.log(e);
    }
  }, [router]);

  useEffect(() => {
    if (router.query.gameId) fetchData();
  }, [router, fetchData]);

  return (
    <div className={styles.main}>
      {sortedImages.map((list, i) => (
        <>
          <div className={styles.title}>{Math.pow(2, i)}강 진출</div>
          <div className={styles.photolist}>
            {list.map((image) => (
              <div
                className={styles.photoitem}
                key={image.id}
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
