import styles from "../styles/GamePage.module.scss";
interface Props {
  closeModal: Function;
  image: string;
}

const Modal = ({ closeModal, image }: Props) => {
  return (
    <div className={styles.background} onClick={() => closeModal()}>
      <div className={styles.modalBox}>
        <div id={styles.imgBorder}>
          <img src={image} className={styles.modalImg} />
        </div>
        <div className={styles.close}>
          <img src="/assets/gamePage/close.svg" />
          <div className={styles.closeBtn}>닫기</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
