import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../components/Layout";
import styles from "../styles/New.module.scss";

const Footer = ({ n }: { n: number }) => {
  const router = useRouter();
  return (
    <div className={styles.footer}>
      <button className={styles.button} onClick={() => router.back()}>
        이전
      </button>
      <div>총 {n}장의 사진을 등록했어요!</div>
      <button className={styles.button}>완료</button>
    </div>
  );
};

const UploadButton = () => (
  <div className={styles.upload_button}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M9 17.75C8.30964 17.75 7.75 17.1904 7.75 16.5V10.25H1.5C0.809644 10.25 0.25 9.69036 0.25 9C0.25 8.30964 0.809644 7.75 1.5 7.75H7.75V1.5C7.75 0.809644 8.30964 0.25 9 0.25C9.69036 0.25 10.25 0.809644 10.25 1.5V7.75H16.5C17.1904 7.75 17.75 8.30964 17.75 9C17.75 9.69036 17.1904 10.25 16.5 10.25H10.25V16.5C10.25 17.1904 9.69036 17.75 9 17.75Z"
        fill="white"
      />
    </svg>
  </div>
);

const Home: NextPage = () => {
  const [images, setImages] = useState([]);
  return (
    <Layout footer={<Footer n={images.length} />}>
      <div className={styles.main}>
        <div className={styles.title}>사진을 등록해주세요!</div>
        <ul className={styles.contents}>
          <li>사진은 최소 2장 ~ 최대 16장까지 선택할 수 있어요.</li>
          <li>선택한 사진이 홀수인 경우 1장은 부전승 처리됩니다.</li>
          <li>각 사진의 대진은 무작위로 진행됩니다.</li>
        </ul>
        <div className={styles.images}>
          <UploadButton />
          <UploadButton />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
