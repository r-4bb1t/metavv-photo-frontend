import type { NextPage } from "next";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Layout } from "../components/Layout";
import { setName } from "../redux/creatorData";
import { StoreState } from "../redux/store";
import styles from "../styles/Main.module.scss";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";

const Footer = ({ disabled }: { disabled: boolean }) => {
  const router = useRouter();
  return (
    <button
      disabled={disabled}
      style={disabled === true ? {backgroundColor: '#D9D9D9'} : {backgroundColor: '#ffb800'}}
      className={styles.button}
      onClick={() => {
          router.push("/new");
      }}
    >
      만들기
    </button>
  );
};

const Home: NextPage = () => {
  const { name } = useSelector((state: StoreState) => state.creatorData);
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(true);
 
  const checkInput = (name : String) => {
    if(name === '') {
      setDisable(true);
    } else {
      setDisable(false)
    }
  }
  return (
    <Layout footer={<Footer disabled={disable} />}>
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
            onKeyUp={()=> checkInput(name)}
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
