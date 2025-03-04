import React, { useEffect, useState } from "react";
import styles from "./ModalCalculator.module.scss";
import { motion } from "framer-motion";
import InputBlock from "../shared/input/InputBlock";
import AddBlock from "../shared/add-block/AddBlock";
import fileSVG from "../../assets/file.svg?react";
import EditBlock from "../shared/edit-block/EditBlock";
import Result from "../shared/Result/Result";
import ModalError from "../modal-error/ModalError";

interface ModalCalculatorProps {
  openCalculator: () => void;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface WindowObject {
  id: number;
  width: string;
  height: string;
}

type WallpaperParams = {
  roomLength: number;
  roomWidth: number;
  roomHeight: number;
  rollWidth: number;
  rollLength: number;
  rapport: number;
  windows: WindowObject[];
  doors: WindowObject[];
};

function calculateWallpaper({
  roomLength,
  roomWidth,
  roomHeight,
  rollWidth,
  rollLength,
  rapport,
  windows,
  doors
}: WallpaperParams) {

  let windowsAndDoorsSquare = 0
  
  windows.map((window) => {windowsAndDoorsSquare += parseFloat(window.height) * parseFloat(window.width)})
  doors.map((door) => {windowsAndDoorsSquare += parseFloat(door.height) * parseFloat(door.width)})

  
  const perimeter = 2 * (roomLength + roomWidth);
  const stripHeight = rapport > 0 ? Math.ceil(roomHeight / rapport) * rapport : roomHeight;
  const stripsPerRoll = stripHeight <= rollLength ? Math.floor(rollLength / stripHeight) : 1;
  const totalStrips = Math.ceil(perimeter / rollWidth);
  
  const rollsNeeded = Math.ceil(totalStrips / stripsPerRoll);
  
  const wallArea = perimeter * roomHeight - windowsAndDoorsSquare;

  const wallpaperArea = rollsNeeded * rollWidth * rollLength;
  
  return {
    rollsNeeded,
    wallArea,
    wallpaperArea,
  };
}

const ModalCalculator: React.FC<ModalCalculatorProps> = ({
  openCalculator,
  icon: Icon,
}) => {
  const [length, setLength] = useState<string>("14.2");
  const [width, setWidth] = useState<string>("28.5");
  const [height, setHeight] = useState<string>("18.5");
  const [selectedParam, setSelectedParam] = useState<number>(0);
  const [selectedRaport, setSelectedRaport] = useState<number>(0);
  const [windowsArray, setWindowsArray] = useState<WindowObject[]>([]);
  const [doorsArray, setDoorsArray] = useState<WindowObject[]>([]);
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string | null>(null);
  const [results, setResults] = useState([
    { label: "Кол-во рулонов", value: "" },
    { label: "Кол-во m² обоев", value: "" },
    { label: "Площадь оклейки", value: "" },
  ]);

  

  const closeModal = () => {
    setErrorText(null);
  };

  const paramsValues = ["1.06 x 10", "1.06 x 25"];
  const raportValues = ["0", "0.32", "0.64"];

  function handleCalculate(params: WallpaperParams) {
    const result = calculateWallpaper(params);
  
    setResults([
      { label: "Кол-во рулонов", value: result.rollsNeeded.toString() },
      { label: "Кол-во m² обоев", value: `${result.wallpaperArea.toFixed(2)} м²` },
      { label: "Площадь оклейки", value: `${result.wallArea.toFixed(2)} м²` },
    ]);
  }

  useEffect(() => {
    console.log("windowsArray ===> ", windowsArray)
    console.log("doorsArray ===> ", doorsArray)

  }, [windowsArray, doorsArray])

  const onChangeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(event.target.value) < 0) {
      setErrorText('Длина комнаты не может быть отрицательной')
    } else {
      setLength(event.target.value);
    }
  };

  const onChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(event.target.value) < 0) {
      setErrorText('Ширина комнаты не может быть отрицательной')
    } else {
      setWidth(event.target.value);
    }
  };

  const onChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(event.target.value) < 0) {
      setErrorText('Высота комнаты не может быть отрицательной')
    } else {
      setHeight(event.target.value);
    }
  };

  const addWindow2Array = () => {
    const newWindow: WindowObject = {
      id: windowsArray.length,
      width: '0',
      height: '0',
    };
    setWindowsArray((prev) => [...prev, newWindow]);
  }

  const addDoor2Array = () => {
    const newDoor: WindowObject = {
      id: doorsArray.length,
      width: '0',
      height: '0',
    };
    setDoorsArray((prev) => [...prev, newDoor]);
  }

  const removeWindow = (index: number) => {
    setWindowsArray((prev) => prev.filter((window) => window.id !== index));
  }

  const removeDoor = (index: number) => {
    setDoorsArray((prev) => prev.filter((door) => door.id !== index));
  }

  const updateDoor = (index: number, field: "width" | "height", value: string) => {
    setDoorsArray((prevDoors) =>
      prevDoors.map((door) =>
        door.id === index ? { ...door, [field]: value } : door
      )
    );
  };

  const updateWindow = (index: number, field: "width" | "height", value: string) => {
    setWindowsArray((prevWindows) =>
      prevWindows.map((window) =>
        window.id === index ? { ...window, [field]: value } : window
      )
    );
  };

  const reset = () => {
    setLength('1')
    setWidth('1')
    setHeight('1')
    setDoorsArray([])
    setWindowsArray([])
    setIsResultVisible(false)
    setSelectedParam(0)
    setSelectedRaport(0)
  }

  const inputs = [{
    label: 'Длина',
    value: length,
    onChange: onChangeLength
  }, {
    label: 'Ширина',
    value: width,
    onChange: onChangeWidth
  }, {
    label: 'Высота',
    value: height,
    onChange: onChangeHeight
  }]

  return (
    <>
    {errorText && <ModalError title={errorText} onClose={closeModal} />}
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
            {inputs.map((input, index) => (
              <InputBlock
              key={index}
              label={input.label}
              unit="м"
              value={input.value}
              onChange={input.onChange}
              ErrorText={errorText?.split(' ')[0] === input.label ? errorText : null}
            />
            ))}
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
                      ? buttonText !== '0' ? styles.blueButtonActiveLong : styles.blueButtonActive
                      : buttonText !== '0' ? styles.blueButtonLong : styles.blueButton
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
          <article className={styles.blockGroup}>

            {windowsArray.map((window) => {
              return <EditBlock title={'Окно'} removeWindow={removeWindow} lastWidth={window.width} lastHeight={window.height} index={window.id} updateDoor={updateWindow} width={width} height={height} />;
            })}
            <AddBlock title="Добавить окно" icon={fileSVG} addWindow2Array={addWindow2Array} />
          </article>
        </section>

        <section className={styles.modalInnerLast}>
          <h2 className={styles.modalTitle}>Параметры дверей</h2>
          <article className={styles.blockGroup}>

            {doorsArray.map((door) => {
              return <EditBlock title={'Дверь'} removeWindow={removeDoor} lastWidth={door.width} lastHeight={door.height} index={door.id} updateDoor={updateDoor} height={height} width={width} />;
            })}
            <AddBlock title="Добавить дверь" icon={fileSVG} addWindow2Array={addDoor2Array} />
          </article>
        </section>
        <section className={styles.modalInner}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.03 }}
            onClick={() => {
              setIsResultVisible(true)
              handleCalculate({
                roomLength: parseFloat(length),
                roomWidth: parseFloat(width),
                roomHeight: parseFloat(height),
                rollWidth: parseFloat(paramsValues[selectedParam].split('x')[0]),
                rollLength: parseFloat(paramsValues[selectedParam].split('x')[1]),
                rapport: parseFloat(raportValues[selectedRaport]),
                windows: windowsArray,
                doors: doorsArray
              })
            }}
            className={styles.button}
          >
            <Icon className={styles.buttonIcon} aria-hidden="true" />
            <span>Рассчитать материалы</span>
          </motion.button>
        </section>

        {isResultVisible && (
          <section className={styles.modalInner}>
            <Result results={results} reset={reset}/>
          </section>
        )}
      </article>
    </motion.section>
    </>
    
  );
};

export default ModalCalculator;
