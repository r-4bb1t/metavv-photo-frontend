import { useRouter } from "next/router";
import { ReactNode } from "react";
import styles from "../styles/Layout.module.scss";

export const Layout = ({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: ReactNode;
}) => {
  return (
    <div className={styles.container}>
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
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>{footer}</footer>
    </div>
  );
};
