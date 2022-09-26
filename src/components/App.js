import {useState} from "react"
import styled from "styled-components"
import GlobalStyle from "./GlobalStyle"
import images from "./images"
import Words from "./Words"

export default function App() {

    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    const [incorrectLetters, setIncorrectLetters] = useState(0)
    const [selectedLetters, setSelectedLetters] = useState([])
    const [correctLetters, setCorrectLetters] = useState([])

    const [drawnWord, setDrawnWord] = useState(false)
    const [word, setWord] = useState("")
    const [pWord, setPWord] = useState("")
    const [hWord, setHWord] = useState("")
    const [arrayWord, setArrayWord] = useState("")
    const [inputWord, setInputWord] = useState("")





    function DrawWord() {
        const drawnWord = Words[Math.floor(Math.random() * Words.length)]
        setWord(drawnWord)
        prepareWord(drawnWord) 
        setDrawnWord(true)
    }
    console.log("word: "+word)

    function prepareWord(w) {
        const pW = w.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        setPWord(pW)
        const array = pW.toUpperCase().split("")
        setArrayWord(array)
        const hiddenWord = pW.replace(/./g, "_")
        setHWord(hiddenWord)

    }
    console.log("pWord: "+pWord)
    console.log("arrayWord: "+arrayWord)
    console.log("hWord: "+hWord)

    
    function selectLetter(letter) {
        console.log("Letra clicada: "+letter)
        if (arrayWord.includes(letter)) {
            setSelectedLetters([...selectedLetters, letter])
            setCorrectLetters([...correctLetters, letter])
            displayLetters(letter);
            checkWin();
        }
            else {
                setSelectedLetters([...selectedLetters, letter])
                setIncorrectLetters(incorrectLetters + 1)
                if (incorrectLetters === 5) {               
                    displayWord()
                }
            }
    }

    function displayLetters(l) {
        const array = hWord.split("")
        for (let i = 0; i < arrayWord.length; i++) {
            if (arrayWord[i] === l) {
                array[i] = word[i].toUpperCase()
            }
        }
        const newWord = array.join("")
        setHWord(newWord)

    }
/*     function loseGame() {
        alert("Você perdeu!")
        resetGame()
    } */

    function checkWin() {
        const upperWord = word.toUpperCase()
        console.log("upperWord: "+upperWord)
        if (hWord === upperWord) {
            displayWord()
        }
    }

    function resetGame() {
        setIncorrectLetters(0)
        setSelectedLetters([])
        setCorrectLetters([])
        setDrawnWord(false)
        setWord("")
        setPWord("")
        setHWord("")
        setArrayWord("")
        setInputWord("")
        Letters()
        DrawWord()
    }

    console.log("incorreta: "+incorrectLetters)
    console.log("selecionada: "+selectedLetters)
    console.log("correta: "+correctLetters)
   
     function Letter(props) {
        if (drawnWord === false) {
            return (
                <>
                    <button disabled={true} className={Disabled} onClick={() => selectLetter(props.l)} >{props.l}</button>
                </>
            )
        }
        else {
            return (
                <>
                    <button disabled={(!selectedLetters.includes(props.l)) ? false : true} className={(!selectedLetters.includes(props.l)) ? {Enabled} : {Disabled}} onClick={() => selectLetter(props.l)} >{props.l}</button>
                </>
            )
        }
    }

    function Letters() {
        const alphabetUpperCase = alphabet.map((letter) => letter.toUpperCase())
        return (
            <LetterBox className="letters">
                {alphabetUpperCase.map((l, index) => 
                <Letter l={l} key={index} id={101+index}/>)}
            </LetterBox>
        )
    } 

    function kickWord() {
        const inputW = inputWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const iWord = inputW.toLowerCase()

        console.log("inputWord: "+inputWord)
        console.log("inputW: "+inputW)
        console.log("iWord: "+iWord)

        if (iWord === pWord) {
            displayWord(iWord)
            console.log("Acertou!")
        }
        else {
            setIncorrectLetters(6)
            displayWord(iWord)
            console.log("Errou!")
        }
    }
    
    function displayWord() {
            setHWord(word.toUpperCase())
            setDrawnWord(false)
            Letters()
    }
    
    return (
        <>
            <Header>
                <h1>
                    Jogo da Forca
                </h1>
            </Header>
            <Main>
                <GlobalStyle />
                <Game>
                    <div>
                        <HangmanImg src={images[incorrectLetters]} alt={([incorrectLetters] < 6) ? `Você ainda tem ${6-[incorrectLetters]} chances` : `Você não tem mais nenhuma chance`} />
                    </div>
                    <SectionRight>
                        <button onClick={(word === "") ? () => DrawWord() : () => resetGame()}>Escolher Palavra</button>
                        <div>
                            {hWord}
                        </div>
                    </SectionRight>             
                </Game>
                <Letters />
                <Shot>
                    <div>
                    <span>Já sei a palavra!</span>
                    <input disabled={(drawnWord === false) ? true : false} placeholder="Digite aqui a palavra" type="text" value={inputWord} onChange={(e) => setInputWord(e.target.value)}></input>
                    <button disabled={(drawnWord === false) ? true : false} onClick={() => kickWord()}>Chutar</button>
                    </div>
                </Shot>
            </Main>
        </>   
    );
}

const Header = styled.div`
    width: 90%;
    padding: 35px;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 25px;
    font-weight: 700;
    letter-spacing: 5px
`

const Main = styled.div`
    font-family: 'Roboto', sans-serif;
`

const Game = styled.div`
    display: flex;
    align-itens: center;
`

const HangmanImg = styled.img`
    margin-left: 50px;
    width: 100%;
`
const SectionRight = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 30px 60px;
    justify-content: space-between;
    align-items: center;

    button {
        background: #27AE60;
        padding: 12px 15px;
        border: none;
        border-radius: 7px;
        color: #ffffff;
        font-weight: 700;
        cursor: pointer;
    }

    div {
        letter-spacing: 20px;
    }
`

const LetterBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 50px;


    button {
        width: 40px;
        height: 40px;
        margin: 10px;
        padding: 10px;
        text-align: center;
        justify-content: center;
        font-weight: 700;
        border-radius: 5px;
    }
`

const Enabled = styled.div`

`

const Disabled = styled.div`

`

const Shot = styled.div`
    text-align: center;
    padding: 20px 50px;

    input {
        margin: 0px 20px;
        padding: 10px;
        border: 0.5px solid;
        border-radius: 5px;
    }

    button {
        padding: 10px;
        font-weight: 700;
        border: 2.5px solid ; 
        border-radius: 5px;
    }
`
