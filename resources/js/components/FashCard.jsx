import React, { useEffect, useState } from "react";
import styles from "../styles/FlashCard.module.css";

const FashCard = () => {
    const [words, setWords] = useState(null);

    useEffect(() => {
        fetch("/api/words")
            .then((res) => res.json())
            .then((data) => {
                setWords(data);
            });
    }, []);

    function flipCard(e) {
        const Card = e.target.parentElement.firstChild;
        Card.classList.toggle(styles.flip);
    }
    //Save favourite
    function saveFavourite(e, word) {
        e.target.style.color = "red";
        fetch("/api/favouriteSave", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                finnish: word.finnish,
                english: word.english,
                example: word.example,
            }),
        }).then((res) => res.json());
    }
    return (
        <div>
            <div className={styles.header}>
                <h2>FlashCard App - Learn Finnish </h2>
            </div>
            <div className={styles["card-container"]}>
                {words &&
                    words.map((word, idx) => {
                        return (
                            <div className={styles.card} key={idx}>
                                <div className={styles["card-inner"]}>
                                    <div className={styles["card-front"]}>
                                        <h2>{word.finnish}</h2>
                                        <p>{word.example}</p>
                                    </div>
                                    <div className={styles["card-back"]}>
                                        <h2>{word.english}</h2>
                                    </div>
                                </div>
                                <button onClick={flipCard}>
                                    &#9850; Rotate
                                </button>
                                <button
                                    className={styles.favbutton}
                                    onClick={(e) => {
                                        saveFavourite(e, word);
                                    }}
                                >
                                    &#9829;
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default FashCard;
