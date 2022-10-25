import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../../../components/Header";
import { Layout } from "../../../../components/Layout";
import { MyResult } from "../../../../components/MyResult";
import { useData } from "../../../../hooks/useData";
import styles from "../../../../styles/Frame.module.scss";

const Footer = () => (
  <button className={styles.footer}>
    <div>나만의 프레임 이미지 저장</div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <mask
        id="mask0_153_3285"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="24"
      >
        <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_153_3285)">
        <path
          d="M6.8 19.5004C6.3 19.5004 5.875 19.3254 5.525 18.9754C5.175 18.6254 5 18.2004 5 17.7004V15.0004H6.5V17.7004C6.5 17.7671 6.53333 17.8338 6.6 17.9004C6.66667 17.9671 6.73333 18.0004 6.8 18.0004H18.2C18.2667 18.0004 18.3333 17.9671 18.4 17.9004C18.4667 17.8338 18.5 17.7671 18.5 17.7004V15.0004H20V17.7004C20 18.2004 19.825 18.6254 19.475 18.9754C19.125 19.3254 18.7 19.5004 18.2 19.5004H6.8ZM12.5 15.6254L8.225 11.3504L9.275 10.2504L11.75 12.7254V4.32544H13.25V12.7254L15.725 10.2504L16.775 11.3504L12.5 15.6254Z"
          fill="white"
        />
      </g>
    </svg>
  </button>
);

const Home: NextPage = () => {
  const router = useRouter();
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(null as null | number);
  const [photos, setPhotos] = useState([null, null, null, null] as (
    | null
    | string
  )[]);

  const handleDownload = () => {
    /*     const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.height = 512;

    let imgageData = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    a.href = imgageData; //Image Base64 Goes here
    a.download = "Image.png"; //File name Here
    a.click(); */
  };

  useEffect(() => {
    setIsModalOpen(null);
  }, [photos]);

  return (
    <>
      <Layout footer={<Footer />} noBackground white>
        <Header title="프레임 만들기" white />
        <div className={styles.main}>
          <div
            className={styles.frame}
            style={{
              backgroundImage: `url(/assets/frames/${selectedFrame + 1}.png)`,
            }}
          >
            {photos.map((p, i) => (
              <div
                className={styles.item}
                key={i}
                onClick={() => setIsModalOpen(i)}
              >
                {p ? (
                  <img src={p} />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                  >
                    <mask
                      id="mask0_153_3315"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="31"
                      height="30"
                    >
                      <rect x="0.5" width="30" height="30" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_153_3315)">
                      <path
                        d="M15.5 23.75C14.8096 23.75 14.25 23.1904 14.25 22.5V16.25H8C7.30964 16.25 6.75 15.6904 6.75 15C6.75 14.3096 7.30964 13.75 8 13.75H14.25V7.5C14.25 6.80964 14.8096 6.25 15.5 6.25C16.1904 6.25 16.75 6.80964 16.75 7.5V13.75H23C23.6904 13.75 24.25 14.3096 24.25 15C24.25 15.6904 23.6904 16.25 23 16.25H16.75V22.5C16.75 23.1904 16.1904 23.75 15.5 23.75Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                )}
              </div>
            ))}
          </div>

          <div className={styles.title}>프레임 선택</div>
          <div className={styles.framelist}>
            {[...Array(6)].map((_, i) => (
              <div key={i} onClick={() => setSelectedFrame(i)}>
                <div
                  className={`${styles.frame} ${styles.frameThumbnail}`}
                  style={{
                    backgroundImage: `url(/assets/frames/${i + 1}.png)`,
                  }}
                >
                  <div className={styles.item}></div>
                  <div className={styles.item}></div>
                  <div className={styles.item}></div>
                  <div className={styles.item}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
      {isModalOpen !== null && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <Layout noBackground>
              <Header title="사진 선택" back={() => setIsModalOpen(null)} />
              <MyResult
                select={(url: string) => {
                  setPhotos((photos) =>
                    photos.map((photo, i) => {
                      if (i === isModalOpen) {
                        return url;
                      } else return photo;
                    })
                  );
                }}
              />
            </Layout>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
