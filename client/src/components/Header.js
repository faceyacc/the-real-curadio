import styled from 'styled-components/macro'
import * as React from 'react'
import logo from '../styles/assets/logo.png'


const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 2rem 4rem;
  background-color: black;
  color: #fff;
`

const HeaderLink = styled.a`
  color: #fff;
  text-decoration: none;
  
  margin-right: 5rem;
  &:last-of-type {
    margin-right: 0;
  }
`
const StyledLogo = styled.img`
    width: 62px;
    height: 46px;
    object-fit: cover;
    margin-right: 120px;
`

const Header = () => (
    <>
        <HeaderContainer>
          <StyledLogo src={logo}/>
          <HeaderLink to="/">How it works</HeaderLink>
          <HeaderLink to="/about">About</HeaderLink>
          <HeaderLink to="/pricing">Pricing</HeaderLink>
          <HeaderLink to="/top-tracks">See top tracks</HeaderLink>
        </HeaderContainer>
    </>
)

export default Header