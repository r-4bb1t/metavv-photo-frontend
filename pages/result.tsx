import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { useData } from "../hooks/useData";
import styles from "../styles/Result.module.scss";

const Home: NextPage = () => {
  const { name, images, setImages, len, setLen } = useData();
  const router = useRouter();

  return (
    <Layout footer={<></>} noBackground>
      <Header title="나의 포토 월드컵 결과" />
      <div className={styles.main}>
        <div className={styles.title}>나의 최애 포토</div>
        <div className={styles.photo}>
          <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
        </div>
        <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        <div className={styles.title}>결승 진출</div>
        <div className={styles.photo}>
          <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
        </div>
        <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        <div className={styles.title}>4강 진출</div>
        <div className={styles.photolist}>
          <div className={styles.photoitem}>
            <div className={styles.photo}>
              <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
            </div>
            <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
          </div>
          <div className={styles.photoitem}>
            <div className={styles.photo}>
              <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
            </div>
            <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
          </div>
        </div>
        <div className={styles.title}>8강 진출</div>
        <div className={styles.photolist}>
          <div className={styles.photoitem}>
            <div className={styles.photo}>
              <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
            </div>
            <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
          </div>
          <div className={styles.photoitem}>
            <div className={styles.photo}>
              <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
            </div>
            <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
          </div>
          <div className={styles.photoitem}>
            <div className={styles.photo}>
              <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
            </div>
            <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
          </div>
          <div className={styles.photoitem}>
            <div className={styles.photo}>
              <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
            </div>
            <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
