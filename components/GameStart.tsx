import styles from "../styles/Intro.module.scss";
import { Photo, setName } from "../redux/result";
import common from "../styles/Common.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, SetStateAction, useState } from "react";
import { StoreState } from "../redux/store";
import { useRouter } from "next/router";
import { PAGE_STATE } from "../pages/game/[gameId]";
import { Layout } from "./Layout";
import { Photos } from "./Photos";

export const GameStart = ({
  title,
  setPageState,
  images,
  setImages,
}: {
  title: string;
  setPageState: Dispatch<SetStateAction<PAGE_STATE>>;
  images: Photo[];
  setImages: Function;
}) => {
  const { name } = useSelector((state: StoreState) => state.result);
  const dispatch = useDispatch();

  return (
    <Layout noBackground>
      <div className={styles.contents}>
        <div className={styles.textBox}>
          <div className={styles.title}>{title}의 포토 월드컵</div>
          <div className={styles.desc}>
            가장 마음에 드는 포토를 골라주세요! <br />
            나의 최애 포토는 전체 몇 등일까요?
          </div>
        </div>
        <Photos
          src1={images[Math.floor(Math.random() * images.length)]?.img || ""}
          src2={images[Math.floor(Math.random() * images.length)]?.img || ""}
          hasvs
        />
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
        <button
          className={common.button}
          onClick={() => setPageState(PAGE_STATE.vote)}
        >
          포토 월드컵 투표하기
        </button>
        <button
          className={common.borderedButton}
          onClick={() => setPageState(PAGE_STATE.all)}
        >
          전체 결과 바로보기
        </button>
      </div>
    </Layout>
  );
};
