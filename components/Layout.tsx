import { useRouter } from "next/router";
import { ReactNode } from "react";
import styles from "../styles/Layout.module.scss";

export const Layout = ({
  children,
  footer,
  noBackground = false,
  white = false,
}: {
  children: ReactNode;
  footer?: ReactNode;
  noBackground?: boolean;
  white?: boolean;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.view}>
        {!noBackground && (
          <div className={styles.background}>
            <img src="/assets/topleft.png" />
            <div />
            <img src="/assets/topright.png" />
            <div />
            <div />
            <div />
            <img src="/assets/bottomleft.png" />
            <img src="/assets/bottomcenter.png" />
            <img src="/assets/bottomright.png" />
          </div>
        )}
        <main className={`${styles.main} ${white ? styles.white : ""}`}>
          {children}
        </main>
        <footer className={styles.footer}>{footer}</footer>
      </div>
    </div>
  );
};
