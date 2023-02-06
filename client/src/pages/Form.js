import styled from 'styled-components/macro'
import { Header } from '../components'
import * as React from 'react';
// import Box from '@mui/joy/Box';
// import Input from '@mui/joy/Input';


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
  
    /* here we use the dynamically computed prop */
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

const StyledSubHeadline = styled.h1`
    color: silver;
    margin-bottom: 50px;
    margin-left: 1px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 19px;    
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



const questions = ['How are you feeling today?', 
                   'What type of music you feel like listening to?',
                   'What activty are currently doing?']


const Forms = () => {

    const nextQuestion = () => {}


    return (
        <>
            <Header/>
            <StartContainer>
                <StyledHeadline>{questions[0]}</StyledHeadline>
                <Input placeholder="Type here" />

                <StyledOkButton>
                        Ok
                </StyledOkButton>
            </StartContainer>
        </>
    )
}

export default Forms