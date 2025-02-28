import React, { useEffect, useState } from "react";
import styles from "./ModalCalculator.module.scss"; // Импортируем стили
import { motion } from "framer-motion"; // Импортируем framer-motion
import InputBlock from "../shared/input/InputBlock";
import AddBlock from "../shared/add-block/AddBlock";
import fileSVG from "../../assets/file.svg?react";
import EditBlock from "../shared/edit-block/EditBlock";

interface ModalCalculatorProps {
  openCalculator: () => void;
}

interface WindowObject {
    id: number;
    width: string;
    height: string;
  }

const ModalCalculator: React.FC<ModalCalculatorProps> = ({
  openCalculator,
}) => {
  const [length, setLength] = useState<string>("14.2");
  const [width, setWidth] = useState<string>("28.5");
  const [height, setHeight] = useState<string>("18.5");
  const [selectedParam, setSelectedParam] = useState<number>(0);
  const [selectedRaport, setSelectedRaport] = useState<number>(0);
  const [windowsArray, setWindowsArray] = useState<WindowObject[]>([]);
  const paramsValues = ["1.06 x 10м", "1.06 x 25м"];
  const raportValues = ["0", "0.32", "0.64"];

  const onChangeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(event.target.value);
    console.log(typeof event.target.value)
  };

  const onChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(event.target.value);
  };

  const onChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value);
  };

  const addWindow2Array = () => {
    const newWindow: WindowObject = {
        id: windowsArray.length, // Генерируем уникальный id
        width: '0',
        height: '0',
      };
      setWindowsArray((prev) => [...prev, newWindow]);
  }

  const removeWindow = (index: number) => {
    setWindowsArray((prev) => prev.filter((window) => window.id !== index));
  }

  useEffect(() => {
    console.log(windowsArray)
  }, [windowsArray])

  return (
    <motion.section
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
      className={styles.modalWrapper}
    >
      <article className={styles.modalContent}>
        <button className={styles.closeButton} onClick={openCalculator}>
          ✖
        </button>
        <section className={styles.modalInner}>
          <h2 className={styles.modalTitle}>Параметры комнаты</h2>
          <article className={styles.inputGroup}>
            <InputBlock
              label="Длина"
              unit="м"
              value={length}
              onChange={onChangeLength}
            />
            <InputBlock
              label="Ширина"
              unit="м"
              value={width}
              onChange={onChangeWidth}
            />
            <InputBlock
              label="Высота"
              unit="м"
              value={height}
              onChange={onChangeHeight}
            />
          </article>
        </section>
        <section className={styles.modalInnerSettings}>
          <motion.article
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              duration: 0.8,
              delay: 0.2,
            }}
          >
            <h2 className={styles.modalTitle}>Параметры рулона</h2>
            <article className={styles.buttons}>
              {paramsValues.map((buttonText: string, index: number) => (
                <button
                  className={
                    selectedParam === index
                      ? styles.blueButtonActive
                      : styles.blueButton
                  }
                  onClick={() => setSelectedParam(index)}
                >
                  {buttonText}
                </button>
              ))}

              {/* <button className={styles.blueButton}>1.06 x 25м</button> */}
            </article>
          </motion.article>
          <motion.article
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              duration: 0.8,
              delay: 0.4,
            }}
          >
            <h2 className={styles.modalTitle}>Раппорт</h2>
            <article className={styles.buttons}>
              {raportValues.map((buttonText: string, index: number) => (
                <button
                  className={
                    selectedRaport === index
                      ? styles.blueButtonActive
                      : styles.blueButton
                  }
                  onClick={() => setSelectedRaport(index)}
                >
                  {buttonText}
                </button>
              ))}
            </article>
          </motion.article>
        </section>
        <section className={styles.modalInner}>
          <h2 className={styles.modalTitle}>Параметры окон</h2>
          <article className={styles.inputGroup}>
            <AddBlock title="Добавить окно" icon={fileSVG} addWindow2Array={addWindow2Array} />
            {windowsArray.map((window, index) => {
              return <EditBlock title={'Окно'} removeWindow={removeWindow} lastWidth={window.width} lastHeight={window.height} index={index}/>;
            })}
          </article>
        </section>
      </article>
    </motion.section>
  );
};

export default ModalCalculator;
