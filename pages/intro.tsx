import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { useData } from "../hooks/useData";
import styles from "../styles/Intro.module.scss";

const Home: NextPage = () => {
  const { name, setName } = useData();

  return (
    <Layout footer={<></>} noBackground>
      <div className={styles.bar}>
        <img className={styles.close} src="/assets/introPage/close.svg" />
        <span className={styles.profile}>
          <img src="/assets/introPage/account_profile.png" />
          <span>이름 입력의 포토 월드컵</span>
        </span>
        <div className={styles.imgArea}>
          <img
            className={styles.bookmark}
            src="/assets/introPage/bookmark.svg"
          />
          <img className={styles.shuffle} src="/assets/introPage/shuffle.png" />
        </div>
      </div>

      <div className={styles.contents}>
        <div className={styles.textBox}>
          <div className={styles.title}>이름 입력의 포토 월드컵</div>
          <div className={styles.desc}>
            가장 마음에 드는 포토를 골라주세요! <br />
            나의 최애 포토는 전체 몇 등일까요?
          </div>
        </div>
        <div className={styles.imgBox}>
          <img className={styles.img1} src="/assets/introPage/사진.png" />
          <img className={styles.img2} src="/assets/introPage/사진.png" />
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
              onChange={(e) => setName(e.target.value)}
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
        <button className={styles.votingBtn}>포토 월드컵 투표하기</button>
        <button className={styles.resultBtn}>전체 결과 바로보기</button>
      </div>
    </Layout>
  );
};

export default Home;
