"use client";
import { useState } from "react";

import styles from "./styles.module.scss";

export default function StarRatingModal({ onClose }) {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    // Burada yıldız değerini işleyebilir ve kaydedebilirsiniz
    console.log("Yıldız değeri:", rating);
    onClose(); // Modalı kapatmak için onClose işlevini çağırın
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.stars}>
        <span onClick={handleClose} className={styles.close}>
          x
        </span>
        <h2>Your Star</h2>
        <div>
          {[...Array(10)].map((_, index) => (
            <span
              key={index}
              className={`${styles.star} ${
                index < rating ? styles.active : ""
              }`}
              onClick={() => handleStarClick(index + 1)}
            >
              ★
            </span>
          ))}
        </div>
        <button onClick={handleSubmit}>Rate</button>
      </div>
    </div>
  );
}
