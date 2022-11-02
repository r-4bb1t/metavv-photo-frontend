import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Header } from "../Header";
import { Layout } from "../Layout";
import { MyResult } from ".";
import styles from "../../styles/Frame.module.scss";
import domtoimage from "dom-to-image";
import { PAGE_STATE } from "../../pages/game/[gameId]";

const Footer = ({
  handleDownload,
  disabled,
}: {
  handleDownload: Function;
  disabled: boolean;
}) => (
  <button
    className={styles.footer}
    onClick={() => handleDownload()}
    disabled={disabled}
  >
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

const Frame = ({
  gameId,
  setPageState,
}: {
  gameId: string;
  setPageState: Dispatch<SetStateAction<PAGE_STATE>>;
}) => {
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<null | number>(null);
  const [photos, setPhotos] = useState<(null | string)[]>([
    null,
    null,
    null,
    null,
  ]);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!frameRef.current) return;
    frameRef.current.parentElement!.style.width = "1000px";
    frameRef.current.parentElement!.style.height = "1000px";
    domtoimage.toPng(frameRef.current, { quality: 10 }).then((dataUrl) => {

      let a = document.createElement("a");
      a.href = dataUrl; //Image Base64 Goes here
      a.download = "Image.png"; //File name Here
      a.click();
      frameRef.current!.parentElement!.style.width = "100%";
      frameRef.current!.parentElement!.style.height = "100%";
    });
  };

  useEffect(() => {
    setIsModalOpen(null);
  }, [photos]);

  return (
    <>
      <Layout
        footer={
          <Footer
            handleDownload={handleDownload}
            disabled={photos.some((photo) => photo == null)}
          />
        }
        noBackground
        white
      >
        <Header
          title="프레임 만들기"
          white
          back={() => setPageState(PAGE_STATE.all)}
        />
        <div className={styles.main}>
          <div className={styles.frameContainer}>
            <div
              className={styles.frame}
              ref={frameRef}
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
                    <>                    
                      <img
                        src={`${p}?random=${Math.random()}`}
                        crossOrigin="anonymous"
                      />
                      <button
                        className={styles.close}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="16"
                          viewBox="0 0 8 8"
                          fill="none"
                        >
                          <path
                            d="M3.99995 4.52501L1.46245 7.06251C1.39578 7.12918 1.31045 7.16451 1.20645 7.16851C1.10212 7.17285 1.01245 7.13751 0.937451 7.06251C0.862451 6.98751 0.824951 6.90001 0.824951 6.80001C0.824951 6.70001 0.862451 6.61251 0.937451 6.53751L3.47495 4.00001L0.937451 1.46251C0.870784 1.39585 0.835451 1.31035 0.831451 1.20601C0.827118 1.10201 0.862451 1.01251 0.937451 0.937512C1.01245 0.862512 1.09995 0.825012 1.19995 0.825012C1.29995 0.825012 1.38745 0.862512 1.46245 0.937512L3.99995 3.47501L6.53745 0.937512C6.60412 0.870845 6.68962 0.835346 6.79395 0.831012C6.89795 0.827012 6.98745 0.862512 7.06245 0.937512C7.13745 1.01251 7.17495 1.10001 7.17495 1.20001C7.17495 1.30001 7.13745 1.38751 7.06245 1.46251L4.52495 4.00001L7.06245 6.53751C7.12912 6.60418 7.16445 6.68951 7.16845 6.79351C7.17278 6.89785 7.13745 6.98751 7.06245 7.06251C6.98745 7.13751 6.89995 7.17501 6.79995 7.17501C6.69995 7.17501 6.61245 7.13751 6.53745 7.06251L3.99995 4.52501Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </>
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
                gameId={gameId}
                select={(url: string) => {
                  setPhotos((photos) =>
                    photos.map((photo, i) => {
                      if (i === isModalOpen) {
                        return url;
                      } else {
                        return photo;
                      }
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

export default Frame;
