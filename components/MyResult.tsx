import styles from "../styles/Result.module.scss";

export const MyResult = ({
  select = (url: string) => {},
}: {
  select?: Function;
}) => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>나의 최애 포토</div>
      <div
        className={styles.photo}
        onClick={() =>
          select("https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg")
        }
      >
        <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
      </div>
      <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
      <div className={styles.title}>결승 진출</div>
      <div
        className={styles.photo}
        onClick={() =>
          select("https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg")
        }
      >
        <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
      </div>
      <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
      <div className={styles.title}>4강 진출</div>
      <div className={styles.photolist}>
        <div
          className={styles.photoitem}
          onClick={() =>
            select("https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg")
          }
        >
          <div className={styles.photo}>
            <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
          </div>
          <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        </div>
        <div
          className={styles.photoitem}
          onClick={() =>
            select("https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg")
          }
        >
          <div className={styles.photo}>
            <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
          </div>
          <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        </div>
      </div>
      <div className={styles.title}>8강 진출</div>
      <div className={styles.photolist}>
        <div
          className={styles.photoitem}
          onClick={() =>
            select("https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg")
          }
        >
          <div className={styles.photo}>
            <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
          </div>
          <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        </div>
        <div
          className={styles.photoitem}
          onClick={() =>
            select("https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg")
          }
        >
          <div className={styles.photo}>
            <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
          </div>
          <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        </div>
        <div
          className={styles.photoitem}
          onClick={() =>
            select("https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg")
          }
        >
          <div className={styles.photo}>
            <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
          </div>
          <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        </div>
        <div
          className={styles.photoitem}
          onClick={() =>
            select("https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg")
          }
        >
          <div className={styles.photo}>
            <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" />
          </div>
          <div className={styles.ranking}>실시간 전체 랭킹 1위</div>
        </div>
      </div>
    </div>
  );
};
