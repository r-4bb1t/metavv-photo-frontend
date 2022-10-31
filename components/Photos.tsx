import styles from "../styles/Photos.module.scss";

export const Photos = ({
  src1,
  src2,
  hasvs = false,
}: {
  src1: string;
  src2: string;
  hasvs?: boolean;
}) => (
  <div className={styles.imgBox}>
    <div className={styles.img1}>
      <img src="/assets/introPage/photo.png" />
      <div className={styles.randomContainer}>
        <img src={src1} className={styles.random} />
      </div>
    </div>
    {hasvs && <img className={styles.img3} src="/assets/introPage/vs.png" />}
    <div className={styles.img2}>
      <img src="/assets/introPage/photo.png" />
      <div className={styles.randomContainer}>
        <img src={src2} className={styles.random} />
      </div>
    </div>
  </div>
);
