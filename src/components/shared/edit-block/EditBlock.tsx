import React from "react";
import styles from "./EditBlock.module.scss";
import { motion } from "framer-motion"; // Импортируем framer-motion


interface EditBlockProps {
  //   onClose: () => void;
  index: number;
  title: string;
  removeWindow: (index: number) => void;
  lastWidth: string;
  lastHeight: string;
  updateDoor: (index: number, field: "width" | "height", value: string) => void;
}

const EditBlock: React.FC<EditBlockProps> = ({
  title,
  removeWindow,
  lastWidth,
  lastHeight,
  index,
  updateDoor
}) => {
  // const [height, setHeight] = useState<string>(lastHeight);
  // const [width, setWidth] = useState<string>(lastWidth);

  return (
    <motion.div
    initial={{ x: -100, opacity: 0 }}  // Начальное положение и прозрачность
      animate={{ x: 0, opacity: 1 }}  // Конечное положение и прозрачность
      transition={{ type: "spring", stiffness: 100, duration: 0.8 }}  // Пружинная анимация
    className={styles.windowBlock}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <button className={styles.closeButton} onClick={() => removeWindow(index)}>
          ✖
        </button>
      </div>
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label>Высота м</label>
          <input
            type="text"
            value={lastHeight}
            onChange={(e) => updateDoor(index, "height", e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Ширина м</label>
          <input
            type="text"
            value={lastWidth}
            onChange={(e) => updateDoor(index, "width", e.target.value)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default EditBlock;
