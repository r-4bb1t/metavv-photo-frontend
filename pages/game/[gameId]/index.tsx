import type { NextPage } from "next";
import { FetchEventResult } from "next/dist/server/web/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Layout } from "../../../components/Layout";
import styles from "../../../styles/Intro.module.scss";
import common from "../../../styles/Common.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../redux/store";
import { setName } from "../../../redux/result";

const Home: NextPage = () => {
  const { name } = useSelector((state: StoreState) => state.result);
  const router = useRouter();
  const [data, setData] = useState<{ title: string }>({ title: "" });
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    const result = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/${router.query.gameId}`
      ).catch((e: FetchEventResult) => {
        console.log(e);
        router.push("/");
      })
    )?.json();
    setData(result);
  }, [router]);

  useEffect(() => {
    if (router.query.gameId) {
      fetchData();
    }
  }, [fetchData, router.query.gameId]);

  return (
    <Layout footer={<></>} noBackground>
      <div className={styles.contents}>
        <div className={styles.textBox}>
          <div className={styles.title}>{data.title}의 포토 월드컵</div>
          <div className={styles.desc}>
            가장 마음에 드는 포토를 골라주세요! <br />
            나의 최애 포토는 전체 몇 등일까요?
          </div>
        </div>
        <div className={styles.imgBox}>
          <img className={styles.img1} src="/assets/introPage/photo.png" />
          <img className={styles.img2} src="/assets/introPage/photo.png" />
          <img className={styles.img3} src="/assets/introPage/vs.png" />
        </div>
        <div className={styles.informBox}>
          <div className={styles.myInform}>
            <span>내 정보 입력</span>
          </div>
          <div>
            <input
              placeholder="입력해주세요."
              minLength={1}
              maxLength={10}
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
            />
            <div className={styles.addProfile}>
              <img src="/assets/introPage/add_circle.svg" />
              <p>내 프로필/계정 불러오기</p>
            </div>
            <div className={styles.notice}>
              <div>내 투표 결과는 모두에게 공개됩니다.</div>
            </div>
          </div>
        </div>
        <Link href={`/game/${router.query.gameId}/vote`}>
          <a className={common.button}>포토 월드컵 투표하기</a>
        </Link>
        <Link href={`/game/${router.query.gameId}/result/all`}>
          <a className={common.borderedButton}>전체 결과 바로보기</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
