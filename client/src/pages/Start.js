import styled from 'styled-components/macro'
import { Header } from '../components'
import { Link } from 'react-router-dom'



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

const StyledLoginButton = styled.a`
  line-height: 15px;
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

const Start = () => {
    return (
        <>
            <Header/>
            <StartContainer>
                <StyledHeadline>How are you?</StyledHeadline>
                <StyledSubHeadline>
                    Curio is not your average music player.
                    Tell<br/> me your day, mood, curiosities, and I will<br/>
                    craft the perfect playlist for you.
                </StyledSubHeadline>  
                <Link to="/forms">
                    <StyledLoginButton>
                        I'm Ready!
                    </StyledLoginButton>  
                </Link>
            </StartContainer>
        </>
    )
}

export default Start