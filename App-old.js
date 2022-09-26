/* import { useState } from "react"
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
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const [hangmanImg, setHangmanImg] = useState(img0)
    const [word, setWord] = useState("")
    const [displayLetter, setDisplayLetter] = useState([])
    const [usedLetters, setUsedLetters] = useState([])
    const [correctLetters, setCorrectLetters] = useState([])
    const [wrongLetters, setWrongLetters] = useState([])
    const [gameRunning, setGameRunning] = useState(false);

    function HangmanGame(props) {
        return (
            <div className="hangman">
                <img src={props.img} alt="hangman" />
            </div>
        )
    }

    function chooseWord() {
        setGameRunning(true)
        let randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord)

        const wordArray = randomWord.split("");
        const word = wordArray.map((letter) => {
            for (let i = 0; i < correctLetters.length; i++) {
                if (letter === correctLetters[i]) {
                    return correctLetters[i] + " "
                }
            }
            return "_ "
        })
        setDisplayLetter(word)
    }

    function StartGame() {
        return (
            <div className="start">
                <button className="startBtn" onClick={chooseWord}>Escolher Palavra</button>
            </div>
        )
    }

    function checkLetters(w) {
        const wordArray = word.split("");
        const word = wordArray.map((letter) => {
            for (let i = 0; i < w.length; i++) {
                if (w[i] === letter) {
                    return w[i] + " "
                }
            }
            return "_ "
        })
        setDisplayLetter(word)
    }

    function Word() {
        return (
            <div className="word">
                {displayLetter}
            </div>
        )
    }

    function click(letter, index) {
        if (!usedLetters.includes(index)) {
            const arrUsedLetters = [...usedLetters, index]
            const arrCorrectLetters = [...correctLetters, letter]
            const arrWrongLetters = [...wrongLetters, letter]
        
            setUsedLetters(arrUsedLetters)
            if (word.includes(letter)) {
                setCorrectLetters(arrCorrectLetters)
                checkLetters(arrCorrectLetters)
            }
            else {
                setWrongLetters(arrWrongLetters)
            }
        }
    }

    function Letter(props) {
        if (gameRunning === false) {
            return (
                <>
                    <button disabled={true} className="letter" onClick={() => click(props.letter, props.index)} >{props.letter.toUpperCase()}</button>
                </>
            )
        }
        else {
            return (
                <>
                    <button disabled={(!usedLetters.includes(props.index)) ? false : true} className="letter" onClick={() => click(props.letter, props.index)} >{props.letter.toUpperCase()}</button>
                </>
            )
        }
    }
    
    function Letters() {
        return alphabet.map((l, index) => <Letter letter={l} key={index} index={index} />)
    }

    return (
        <>
            <div className="app">
                <div className="topo">
                    <div className="forca-left">
                        <HangmanGame img={hangmanImg} />
                    </div>
                    <div className="forca-right">
                        <StartGame />
                        <Word />
                    </div>
                </div>

                <div className="botton">
                    <div className="letters">
                        <Letters />
                    </div>
                    <div className="guess">
                        <span onClick={checkLetters}>input do chute</span>
                    </div>
                </div>
                <GlobalStyle />
            </div>
        </>
    )
}

  */