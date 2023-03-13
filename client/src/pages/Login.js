import styled from 'styled-components/macro'
import * as React from "react"
import spotify1 from '../styles/assets/spotify.gif'
import { Header } from '../components'
import { Link } from 'react-router-dom'


const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 87.5vh;
  background-color: #000;
  justify-content: space-evenly;
  align-items: center;
`

const StyledHeadline = styled.h1`
    color: white;
    margin-bottom: 5px;
    line-height: 58px;
    font-size: 60px;
    padding: 50px;
`

const StyledSubHeadline = styled.h1`
    color: silver;
    margin-bottom: 8px;
    margin-top: 15px;
    margin-left: 1px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 19px;
`

const StyledLoginButton = styled.a`
  line-height: 15px;
  display: inline-block;
  background-color: #ff4f12;
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

const StyledGif = styled.div`
    margin-right: 20px;
`

const LOGIN_URI = 'https://the-real-curadio-6xz10mlb6-faceyacc.vercel.app/login'


const Login = () => {
  return (
    <>
      <Header/> 
      <StyledLoginContainer>
          <StyledHeadline>
              Enjoy music tailored to your taste
              <StyledSubHeadline>
              Curated content tailor for you, made for you, just for you                
              </StyledSubHeadline>  
                <StyledLoginButton href={LOGIN_URI}>
                    Login
                </StyledLoginButton>
          </StyledHeadline>
          <StyledGif>
              <img  src={spotify1} />
          </StyledGif>
      </StyledLoginContainer>
    </>
  )
}

export default Login;