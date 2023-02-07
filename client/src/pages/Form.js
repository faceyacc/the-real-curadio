import styled from 'styled-components/macro'
import { Header } from '../components'
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios'

// import { useNavigate } from 'react-router-dom'




const Input = styled.input`
    &:focus {
      outline: none;
    };
    color: white;
    font-size: 1em;
    border: 1px;
    background-color: black;
    border-bottom: 1px solid grey;
    width: 570px;
    
    margin-top: 100px;
    margin-bottom: 20px;
    padding-left: 0px;
    padding-bottom: 15px;
`

const StartContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 87.5vh;
  background-color: #000;
  /* justify-content: space-evenly; */
  align-items: center;
`
const StyledHeadline = styled.h1`
    color: white;
    line-height: 58px;
    font-size: 60px;
    padding: 5px;
    font-size: 50px;

`
const StyledOkButton = styled.a`
  line-height: 15px;
  margin-right: 490px;
  margin-top: 10px;
  display: inline-block;
  background-color: #121bff;
  color: var(--white);
  border-radius: 10px;
  font-weight: 7 00;
  font-family: Inter, Arial;
  font-size: 1rem;
  letter-spacing: 0.1px;
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`

const StyledFinishButton = styled.a`
  line-height: 15px;
  margin-right: 10px;
  margin-top: 10px;
  display: inline-block;
  background-color: #121bff;
  color: var(--white);
  border-radius: 10px;
  font-weight: 7 00;
  font-family: Inter, Arial;
  font-size: 1rem;
  letter-spacing: 0.1px;
  padding: var(--spacing-sm) var(--spacing-xl);
  margin-top: 140px;

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`


const questions = ['How are you feeling today?', 
                   'What type of music you feel like listening to?',
                   'What activity are currently doing?',]
let current_question = 0

const Forms = () => {
    const [question, setQuestion] = useState(questions[current_question])
    // const [userInput, setUserInput] = useState('')
    const [endQuestions, setEndQuestions] = useState(false)

    // let navigate = useNavigate()


    // Function to call backend to generate respsonse from
    // OpenAI API
    const callGenerateEndpoint = async (event) => {
      event.preventDefault()
      

      const body = JSON.stringify({ userInput: "hej hej" })
    
      
      axios.post('http://localhost:8888/generate', body)
        .then((res) => {
          console.log(res.data.output.text)
        })


    }    

    // Onclick function to reload next question
    const nextQuestion = () => {
      
      if (current_question === questions.length) { 
        setEndQuestions(true)  
      }

      setQuestion(questions[current_question])
      current_question++
    }

    const onUserChangedText = (event) => {
      console.log(event.target.value);
      // setUserInput(event.target.value)
    }

    return (
        <>
            <Header/>
            <StartContainer>
              {endQuestions ? 
              <>
                <StyledHeadline>Ready!</StyledHeadline>
                <StyledFinishButton onClick={callGenerateEndpoint}>
                  Get Playlist
                </StyledFinishButton>
              </> 
              : 
              <>
                <StyledHeadline>{question}</StyledHeadline>
                <Input placeholder="Type here" onChange={onUserChangedText}/>
                <StyledOkButton onClick={nextQuestion}>
                  Ok
                </StyledOkButton>
              </>}                
            </StartContainer>
        </>
    )
}

export default Forms