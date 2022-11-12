import styles from "../styles/Result.module.scss";
import { Photo } from "../redux/result";
import { useRef } from "react";
export const PhotoList = ({
  data,
  description,
}: {
  data: Photo[];
  description: string[];
}) => {
  let pos = { left: 0, x: 0 };
  const ref = useRef<HTMLDivElement>(null);

  const mouseDownHandler = (e: React.MouseEvent) => {
    if (!ref.current) return;
    pos = {
      // The current scroll
      left: ref.current.scrollLeft,
      x: e.clientX,
    };

    ref.current.addEventListener("mousemove", mouseMoveHandler);
    ref.current.addEventListener("mouseup", mouseUpHandler);
    ref.current.addEventListener("mouseleave", mouseUpHandler);
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!ref.current) return;
    const dx = e.clientX - pos.x;

    ref.current.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = () => {
    if (!ref.current) return;

    ref.current.removeEventListener("mousemove", mouseMoveHandler);
    ref.current.removeEventListener("mouseup", mouseUpHandler);
    ref.current.removeEventListener("mouseleave", mouseUpHandler);
  };

  return (
    <div className={styles.photolist} onMouseDown={mouseDownHandler} ref={ref}>
      {data.map((d, i) => (
        <div className={styles.photoitem} key={`item-${i}`}>
          <div className={styles.photo}>
            <img src={d.img} />
          </div>
          <div className={styles.ranking}>{description[i]}</div>
        </div>
      ))}
    </div>
  );
};
