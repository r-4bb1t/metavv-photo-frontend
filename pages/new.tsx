import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../components/Layout";
import styles from "../styles/New.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../redux/store";
import {
  addImage,
  deleteImage,
  resetImage,
  setLen,
} from "../redux/creatorData";

const Footer = ({
  n,
  len,
  handleSubmit,
  loading,
}: {
  n: number;
  len: number;
  handleSubmit: Function;
  loading: boolean;
}) => {
  const router = useRouter();

  return (
    <div className={styles.footer}>
      <button className={styles.button} onClick={() => router.back()}>
        이전
      </button>
      <div>총 {n}장의 사진을 등록했어요!</div>
      <button
        className={styles.button}
        disabled={n < len || loading}
        onClick={() => handleSubmit()}
      >
        완료
      </button>
    </div>
  );
};

const UploadButton = ({ handleFileUpload }: { handleFileUpload: Function }) => (
  <label className={styles.upload_button}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M9 17.75C8.30964 17.75 7.75 17.1904 7.75 16.5V10.25H1.5C0.809644 10.25 0.25 9.69036 0.25 9C0.25 8.30964 0.809644 7.75 1.5 7.75H7.75V1.5C7.75 0.809644 8.30964 0.25 9 0.25C9.69036 0.25 10.25 0.809644 10.25 1.5V7.75H16.5C17.1904 7.75 17.75 8.30964 17.75 9C17.75 9.69036 17.1904 10.25 16.5 10.25H10.25V16.5C10.25 17.1904 9.69036 17.75 9 17.75Z"
        fill="white"
      />
    </svg>
    <input
      className={styles.input}
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => {
        if (e.target.files) {
          handleFileUpload(e.target.files);
        }
        e.target.value = "";
      }}
    />
  </label>
);

const Home: NextPage = () => {
  const { name, images, len } = useSelector(
    (state: StoreState) => state.creatorData
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (files: File[]) => {
    if (!files || files.length < 0) return;
    Array.from(files)
      .slice(0, len - images.length)
      .forEach(async (f) => {
        if (
          f.name.split(".")[1] === "heic" ||
          f.name.split(".")[1] === "HEIC"
        ) {
          let blob = f;
          const heic2any = require("heic2any");
          await heic2any({ blob: blob, toType: "image/jpeg" }).then(
            (resultBlob: Blob) => {
              f = new File(
                [resultBlob as Blob],
                f.name.split(".")[0] + ".jpg",
                {
                  type: "image/jpeg",
                  lastModified: new Date().getTime(),
                }
              );
            }
          );
        }
        dispatch(addImage({ file: f, id: f.name + new Date().getTime() }));
      });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    images.forEach((image) => {
      data.append("files", image.file);
    });
    data.append("title", name);
    data.append("standard", "");
    data.append("tags", "{}");
    data.append("isPublic", "true");
    data.append("password", "1234");

    const result = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/new`, {
        method: "POST",
        body: data,
      })
        .catch((e) => {
          if (e.code == 413) {
            alert("파일 크기가 너무 큽니다.");
          } else {
            alert(
              "문제가 발생했습니다. 잠시 후 다시 시도해주세요. 에러 코드: " +
                e.code
            );
          }
        })
        .finally(() => setLoading(false))
    )?.json();

    router.push(`/game/${result.url}`);
  };

  return (
    <Layout
      footer={
        <Footer
          n={images.length}
          len={len}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      }
    >
      <div className={styles.main}>
        <div className={styles.title}>사진을 등록해주세요!</div>
        <ul className={styles.contents}>
          <li>2강, 4강, 8강, 16강 중 진행 방식을 선택해주세요.</li>
          <li>사진은 정방형 사이즈로 게시되어 진행됩니다.</li>
          <li>각 사진의 대진은 무작위로 진행됩니다.</li>
        </ul>
        <div className={styles.lenbtncontainer}>
          {[2, 4, 8, 16].map((l) => (
            <button
              key={l}
              className={`${styles.lenbtn} ${len === l ? styles.active : ""}`}
              onClick={() => {
                if (
                  confirm(
                    `${l}강으로 변경하시겠습니까?\n현재 등록한 사진은 초기화됩니다.`
                  )
                ) {
                  dispatch(setLen(l));
                  dispatch(resetImage());
                }
              }}
            >
              {l}강
            </button>
          ))}
        </div>
        <div className={styles.images}>
          {images.map((image, index) => (
            <div key={image.id} className={styles.uploaded}>
              <img
                src={URL.createObjectURL(image.file)}
                alt={image.file.name}
              />
              <button
                className={styles.close}
                onClick={() => {
                  dispatch(deleteImage(image.id));
                }}
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
            </div>
          ))}
          {[...Array(len - images.length)].map((_, i) => (
            <UploadButton handleFileUpload={handleFileUpload} key={i} />
          ))}
        </div>
        {images.length > 0 ? (
          <div className={styles.imageReset}>
            <span 
              className={styles.reset}
              onClick={() => {
                dispatch(resetImage());
            }}>
              사진 초기화
            </span>
            <span className={styles.resetButton}>
              <img
                src="/assets/refresh.svg"
                onClick={() => {
                  dispatch(resetImage());
                }}
              />
            </span>
          </div>
        ) : null}
      </div>
      {loading && (
        <div className={styles.loading}>
          로딩 중입니다.
          <br />
          사진 용량이 클 경우 시간이 오래 걸릴 수 있습니다.
        </div>
      )}
    </Layout>
  );
};

export default Home;
