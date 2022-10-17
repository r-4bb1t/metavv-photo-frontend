import type { NextPage } from "next";
import { FetchEventResult } from "next/dist/server/web/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { useData } from "../../hooks/useData";
import styles from "../../styles/Result.module.scss";

const Home: NextPage = () => {
  const { name, setName } = useData();
  const router = useRouter();
  const [data, setData] = useState(null as any);

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
    if (router.query.gameId) fetchData();
  }, [fetchData, router.query.gameId]);

  return (
    <Layout footer={<></>}>
      <div className={styles.main}>
        <div className={styles.title}>{data?.title}의 포토 월드컵</div>
        <div className={styles.contents}>
          가장 마음에 드는 포토를 골라주세요!
          <br />
          나의 최애 포토는 전체 몇 등일까요?
        </div>
      </div>
    </Layout>
  );
};

export default Home;
