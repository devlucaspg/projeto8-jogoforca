import { useState } from "react"
import styled from "styled-components"

import GlobalStyle from "./GlobalStyle"
import img0 from "../assets/forca0.png"
import img1 from "../assets/forca1.png"
import img2 from "../assets/forca2.png"
import img3 from "../assets/forca3.png"
import img4 from "../assets/forca4.png"
import img5 from "../assets/forca5.png"
import img6 from "../assets/forca6.png"
import words from "./Words"


export default function App() {
    const images = [img0, img1, img2, img3, img4, img5, img6];
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const [word, setWord] = useState("")
    const [displayLetter, setDisplayLetter] = useState([])
    const [usedLetters, setusedLetters] = useState([])
    const [correctLetters, setcorrectLetters] = useState([])
    const [wrongLetters, setwrongLetters] = useState([])
    const [gameRunning, setGameRunning] = useState(false);

    function HangmanGame(props) {
        return (
            <div className="hangman">
                <img src={props.img} alt="hangman" />
            </div>
        )
    }

    function drawWord() {
        let randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord)

        const word = randomWord.split("");
        const wordArray = word.map((letter) => {
            for (let i = 0; i < correctLetters.length; i++) {
                if (letter === correctLetters[i]) {
                    return correctLetters[i] + " "
                }
            }
            return "_ "
        })
        setDisplayLetter(randomWord)
    }

    function startGame() {
        return (
            <div className="start">
                <button className="startBtn" onClick={drawWord}>Escolher Palavra</button>
            </div>
        )
    }

    function checkLetter(l) {
        const word = displayLetter.split("");
        const wordArray = word.map((l) => {
            for (let i = 0; i < l.length; i++) {
                if (l[i] === letter) {
                    return l[i] + " "
                }
            }
            return "_ "
        })
        setDisplayLetter(wordArray)
    }

    function Word() {
        return (
            <div className="word">
                {displayLetter}
            </div>
        )
    }

    

};
        /* const { word, displayLetter, usedLetters, correctLetters, wrongLetters, images, alphabet, gameRunning } = props;
        return (
            <div>
                <div className="hangman">
                    <img src={images[wrongLetters.length]} alt="hangman" />
                </div>
                <div className="word">
                    <span>{displayLetter}</span>
                </div>
                <div className="alphabet">
                    {alphabet.map((letter, index) => {
                        let className = "letter"
                        if (usedLetters.includes(letter)) {
                            className += " used"
                        }
                        return (
                            <button
                                key={index}
                                className={className}
                                onClick={() => {
                                    if (gameRunning && !usedLetters.includes(letter)) {
                                        if (word.includes(letter)) {
                                            setcorrectLetters([...correctLetters, letter])
                                        } else {
                                            setwrongLetters([...wrongLetters, letter])
                                        }
                                        setusedLetters([...usedLetters, letter])
                                    }
                                }}
                            >
                                {letter}
                            </button>
                        )
                    })}
                </div>
            </div>
        )*/
