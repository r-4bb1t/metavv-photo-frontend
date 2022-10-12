import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import styles from "../styles/Main.module.scss";

const Footer = () => {
  return <button className={styles.button}>만들기</button>;
};

const Home: NextPage = () => {
  return (
    <Layout footer={<Footer />}>
      <div className={styles.main}>
        <div className={styles.title}>포토 월드컵</div>
        <div className={styles.contents}>
          최애 굿즈 만들 사진이 고민되나요?
          <br />
          다른 사람들과 의견을 공유해보세요!
        </div>
        <img src="/assets/camera.png" className={styles.camera} />
        <div className={styles.input_container}>
          <input placeholder="입력해주세요." className={styles.input} />의
          <br />
          포토 월드컵
        </div>
      </div>
    </Layout>
  );
};

export default Home;
