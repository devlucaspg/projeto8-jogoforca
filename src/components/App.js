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

    const [word, setWord] = useState("")
    const [pWord, setPWord] = useState("")
    const [hWord, setHWord] = useState("")
    const [arrayWord, setArrayWord] = useState("")
    const [disabled, setDisabled] = useState(false)



    function DrawWord() {
        const drawnWord = Words[Math.floor(Math.random() * Words.length)]
        setWord(drawnWord)
        prepareWord(drawnWord) 
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
            setCorrectLetters([...correctLetters, letter])}
            else {
                setSelectedLetters([...selectedLetters, letter])
                setIncorrectLetters(incorrectLetters + 1)
            }
    }

    console.log("incorreta: "+incorrectLetters)
    console.log("selecionada: "+selectedLetters)
    console.log("correta: "+correctLetters)
   

    function Letters() {
        const alphabetUpperCase = alphabet.map((letter) => letter.toUpperCase())
        return (
            <LetterBox className="letters">
                {alphabetUpperCase.map((l, index) => <div onClick={() => selectLetter(l)} key={index} id={index}>{l}</div>)}
            </LetterBox>
        )
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
                        <button onClick={() => DrawWord()}>Escolher Palavra</button>
                        <div>
                            {hWord}
                        </div>
                    </SectionRight>             
                </Game>
                <Letters />
                <Shot>
                    <div>
                    <span>Já sei a palavra!</span>
                    <input placeholder="Digite aqui a palavra"></input>
                    <button>Chutar</button>
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


    div{
        width: 15px;
        height: 15px;
        margin: 10px;
        padding: 10px;
        text-align: center;
        font-weight: 700;
        border-radius: 5px;
        border: 2.5px solid cornflowerblue; 
        color: cornflowerblue;
    }
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
        color: cornflowerblue; 
        text-align: center;
        font-weight: 700;
        border: 2.5px solid cornflowerblue; 
        border-radius: 5px;
    }
`
