import React, { useState } from "react";
import styles from "./ModalSend.module.scss";
import { motion } from "framer-motion";

import { useRef } from "react";
import emailjs from "@emailjs/browser";
  
  interface WindowObject {
    id: number;
    width: string;
    height: string;
  }
  
  interface CalculationResult {
    label: string;
    value: string;
  }
  
  interface ModalSendProps {
    onClose: () => void;
    length: string;
    width: string;
    height: string;
    windowsArray: WindowObject[];
    doorsArray: WindowObject[];
    results: CalculationResult[];
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }
  
  const EmailForm: React.FC<ModalSendProps> = ({ 
    onClose, 
    length,
    width,
    height,
    windowsArray, 
    doorsArray, 
    results,
    icon: Icon,

  }) => {
    const form = useRef<HTMLFormElement>(null);

    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<null | string>(null)

  
    const sendEmail = (event: React.FormEvent) => {
      event.preventDefault();
      if (!form.current) return;
  
      // Преобразуем массив results в объект с удобным доступом по ключу
      const calculationData: Record<string, string> = results.reduce((acc, item) => {
        acc[item.label] = item.value;
        return acc;
      }, {} as Record<string, string>);
  
      // Формируем список окон и дверей
      const windowsList = windowsArray.map(
        (win) => `- Окно (ID: ${win.id}): ${win.width} x ${win.height} м`
      ).join("\n");
  
      const doorsList = doorsArray.map(
        (door) => `- Дверь (ID: ${door.id}): ${door.width} x ${door.height} м`
      ).join("\n");
  
      const emailContent = `
        📌 **Вводные данные**:
        - Площадь комнаты: ${parseFloat(length) * parseFloat(width)} м²
        - Периметр: ${parseFloat(length) * 2 + parseFloat(width) * 2} м
        - Длина: ${length} м
        - Ширина: ${width} м
        - Высота: ${height} м
  
        🚪 **Двери**:
        ${doorsList || "Нет дверей"}
  
        🪟 **Окна**:
        ${windowsList || "Нет окон"}
  
        📏 **Расчёт оклейки**:
        - ${results[0]?.label || "Кол-во рулонов"}: ${calculationData["Кол-во рулонов"] || "Не рассчитано"}
        - ${results[1]?.label || "Кол-во m² обоев"}: ${calculationData["Кол-во m² обоев"] || "Не рассчитано"}
        - ${results[2]?.label || "Площадь оклейки"}: ${calculationData["Площадь оклейки"] || "Не рассчитано"}
      `;
  
      if (!email.includes('.')) {
        setError('Домен не может быть пустым!')
      } else {
        emailjs
        .send(
          "service_v76n54f",
          "template_z4ce9jb",
          {
            to_name: email,
            from_name: "wallpaper-calculator",
            message: emailContent,
            user_email: email,
          },
          "owXEwfATma7du_c7n"
        )
        .then(
          (result) => {
            console.log("Письмо отправлено!", result.text);
            onClose();
          },
          (error) => {
            console.error("Ошибка отправки:", error.text);
          }
        );
      }
      
    };
  
    return (
      <form ref={form} onSubmit={sendEmail} className={styles.form}>
        <h3>Введите email</h3>
        <article className={styles.inputArticle}>
            <label htmlFor="email">Email:</label>
        <input className={styles.input} type="email" value={email} onChange={(event) => {
            setEmail(event.target.value)
            if (!event.target.value.includes('.') && event.target.value.includes('@') && event.target.value.split('@')[1] !== '') {
                setError('Домен не может быть пустым!')
              } else {
                setError(null)
              }
            }} required />
        {error && <p className={styles.error}>{error}</p>}
        </article>
        
        <button type="submit" className={styles.sendButton}>
          <article className={styles.sendButtonText}>Отправить расчёт</article>
          <Icon className={styles.buttonIcon} aria-hidden="true" />
        </button>
      </form>
    );
  };
  

const ModalSend: React.FC<ModalSendProps> = ({ icon, results, doorsArray, windowsArray, length, width, height, onClose }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <motion.article
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ type: "spring", stiffness: 50, damping: 10, duration: 0.3 }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // Чтобы клик внутри модалки не закрывал её
      >
        <article className={styles.header}>
          <button className={styles.closeButton} onClick={onClose}>
            ✖
          </button>
          <EmailForm icon={icon} results={results} doorsArray={doorsArray} windowsArray={windowsArray} length={length} width={width} height={height} onClose={onClose} />
          
        </article>
      </motion.article>
    </div>
  );
};

export default ModalSend;
