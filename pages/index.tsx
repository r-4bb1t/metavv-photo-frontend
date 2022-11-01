import type { NextPage } from "next";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Layout } from "../components/Layout";
import { setName } from "../redux/creatorData";
import { StoreState } from "../redux/store";
import styles from "../styles/Main.module.scss";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const Footer = ({ disabled }: { disabled: boolean }) => {
  const router = useRouter();
  return (
    <button
      className={styles.button}
      onClick={() => {
        if (disabled) {
          alert("이름을 입력해주세요.");
        } else {
          router.push("/new");
        }
      }}
    >
      만들기
    </button>
  );
};

const Home: NextPage = () => {
  const { name } = useSelector((state: StoreState) => state.creatorData);
  const dispatch = useDispatch();
  return (
    <Layout footer={<Footer disabled={name.length === 0} />}>
      <div className={styles.main}>
        <div className={styles.title}>포토 월드컵</div>
        <div className={styles.contents}>
          어떤 사진을 골라야 할 지 고민될 때
          <br />
          나만의 포토 월드컵을 만들어 공유해 보세요!
        </div>
        <img src="/assets/camera.png" className={styles.camera} />
        <div className={styles.input_container}>
          <input
            placeholder="입력해주세요."
            maxLength={10}
            className={styles.input}
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
          />
          의
          <br />
          포토 월드컵
        </div>
      </div>
    </Layout>
  );
};

export default Home;
