// import styled from 'styled-components/macro'
// import { Header } from '../components'
// import { generateAction } from '../generate'
// import { useState } from 'react'


// const StartContainer = styled.main`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 87.5vh;
//   background-color: #000;
//   /* justify-content: space-evenly; */
//   align-items: center;
// `
// const StyledHeadline = styled.h1`
//     color: white;
//     line-height: 58px;
//     font-size: 60px;
//     padding: 5px;
//     font-size: 50px;

// `

// const StyledSubHeadline = styled.h1`
//     color: silver;
//     margin-bottom: 50px;
//     margin-left: 1px;
//     font-size: 1rem;
//     font-weight: 400;
//     line-height: 19px;    
// `

// const StyledLoginButton = styled.a`
//   line-height: 15px;
//   display: inline-block;
//   background-color: #121bff;
//   color: var(--white);
//   border-radius: 10px;
//   font-weight: 7 00;
//   font-family: Inter, Arial;
//   font-size: 1rem;
//   letter-spacing: 0.1px;
//   padding: var(--spacing-sm) var(--spacing-xl);

//   &:hover,
//   &:focus {
//     text-decoration: none;
//     filter: brightness(1.1);
//   }
// `

// const Playlist = () => {
//     const [apiOutput, setApiOutput] = useState('')
//     const [userInput, setUserInput] = useState('')

//     const callGenerateEndpoint = async () => {
//         // setIsGenerating(true)
//         // setSubtitle(false)
        
//         console.log("Calling OpenAI...")
    
//         // Make POST to the generate API
//         const response = await fetch('/api/generate', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userInput }), // Pass in user's prompt
//         })
    
//         const data = await response.json()
//         const { output } = data
    
//         console.log("OpenAI replied...", output.text)
    
//         setApiOutput(`${output.text}`) // Fetch Chat-GPT's response
//         // setIsGenerating(false);
//     }





//     return (
//         <>
//             <Header/>
//             <StartContainer>
//                 <StyledHeadline>Show playlist here</StyledHeadline>
//             </StartContainer>
//         </>
//     )
// }

// export default Playlist