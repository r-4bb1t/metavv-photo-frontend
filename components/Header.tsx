import { useRouter } from "next/router";
import styles from "../styles/Header.module.scss";

export const Header = ({
  title,
  white = false,
  back = null,
}: {
  title: string;
  white?: boolean;
  back?: Function | null;
}) => {
  const router = useRouter();
  return (
    <header className={`${styles.header} ${white ? styles.white : ""}`}>
      <button
        onClick={() => {
          if (back) {
            back();
          } else {
            router.back();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="19"
          viewBox="0 0 10 19"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.70711 1.05071C10.0976 1.44123 10.0976 2.0744 9.70711 2.46492L2.41421 9.75781L9.70711 17.0507C10.0976 17.4412 10.0976 18.0744 9.70711 18.4649C9.31658 18.8554 8.68342 18.8554 8.29289 18.4649L0.292893 10.4649C-0.0976311 10.0744 -0.0976311 9.44123 0.292893 9.05071L8.29289 1.05071C8.68342 0.660181 9.31658 0.660181 9.70711 1.05071Z"
            fill="white"
          />
        </svg>
      </button>
      <div className={styles.title}>{title}</div>
    </header>
  );
};
