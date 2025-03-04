import React, { useState } from "react";
import styles from "./EditBlock.module.scss";
import { motion } from "framer-motion"; // Импортируем framer-motion
import ModalError from "../../modal-error/ModalError";


interface EditBlockProps {
  //   onClose: () => void;
  index: number;
  title: string;
  removeWindow: (index: number) => void;
  lastWidth: string;
  lastHeight: string;
  width: string;
  height: string;
  updateDoor: (index: number, field: "width" | "height", value: string) => void;
}

const EditBlock: React.FC<EditBlockProps> = ({
  title,
  removeWindow,
  lastWidth,
  lastHeight,
  index,
  height,
  width,
  updateDoor
}) => {

  const [errorText, setErrorText] = useState<string | null>(null);

  const closeModal = () => {
    setErrorText(null);
  };


  return (
    <>
      {errorText && <ModalError title={errorText} onClose={closeModal} />}

      <motion.article
        initial={{ y: 0, opacity: 0, scale: 0.4 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 10, duration: 0.2 }}
        className={styles.windowBlock}
      >
        <article className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={() => removeWindow(index)}>
            ✖
          </button>
        </article>
        
        <article className={styles.inputs}>
          <article className={styles.inputGroup}>
            <label>Высота м</label>
            <input
              type="number"
              value={lastHeight}
              style={{
                border: errorText?.split(' ')[0] === 'Высота' ? "1px solid red" : "",
              }}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                const maxHeight = parseFloat(height);

                if (isNaN(newValue) || newValue < 0) {
                  setErrorText("Высота не может быть отрицательной!");
                } else if (newValue > maxHeight) {
                  setErrorText("Высота не может выходить за пределы высоты комнаты!");
                } else {
                  setErrorText(null);
                  updateDoor(index, "height", e.target.value);
                }
              }}
            />
          </article>

          <article className={styles.inputGroup}>
            <label>Ширина м</label>
            <input
              type="number"
              value={lastWidth}
              style={{
                border: errorText?.split(' ')[0] === 'Ширина' ? "1px solid red" : "",
              }}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                const maxWidth = parseFloat(width);

                if (isNaN(newValue) || newValue < 0) {
                  setErrorText("Ширина не может быть отрицательной!");
                } else if (newValue > maxWidth) {
                  setErrorText("Ширина не может выходить за пределы ширины комнаты!");
                } else {
                  setErrorText(null);
                  updateDoor(index, "width", e.target.value);
                }
              }}
            />
          </article>
        </article>
      </motion.article>
    </>
  )
  
};

export default EditBlock;
