import styled from "styled-components/macro";
import { Header } from "../components";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { getTrack } from "../spotify";
import { useEffect } from "react";
import Playlist from "../components/Playlist";
import { Link, useNavigate } from "react-router-dom";

// import { useNavigate } from 'react-router-dom'

const Input = styled.input`
  &:focus {
    outline: none;
  }
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
`;

const StartContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 87.5vh;
  background-color: #000;
  /* justify-content: space-evenly; */
  align-items: center;
`;
const StyledHeadline = styled.div`
  color: white;
  line-height: 58px;
  font-size: 60px;
  padding: 5px;
  font-size: 50px;
`;
const StyledOkButton = styled.a`
  line-height: 15px;
  margin-right: 490px;
  margin-top: 10px;
  display: inline-block;
  background-color: #603dd3;
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
`;
const StyledFinishButton = styled.a`
  line-height: 15px;
  margin-right: 10px;
  margin-top: 10px;
  display: inline-block;
  background-color: #603dd3;
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
`;

const questions = [
  "How are you feeling today?",
  "What type of music you feel like listening to?",
  "What activity are currently doing?",
];

let userResponse = "";
let current_question = 0;

let arr = [];

const Forms = () => {
  const [question, setQuestion] = useState(questions[current_question]);
  const [userInput, setUserInput] = useState("");
  const [endQuestions, setEndQuestions] = useState(false);
  const [sendRequest, setSendRequesst] = useState(false);
  const [songs, setSongs] = useState();

  // Helper Function
  // Parse songs from GPT Response
  const parseSongs = (listOfSongs) => {
    let songs = {};
    let data = JSON.stringify(listOfSongs);

    // Need to JSON.parse twice to get object
    let song_dict = JSON.parse(JSON.parse(data));

    for (let [artist, song] of Object.entries(song_dict)) {
      songs[artist] = song;
    }
    return songs;
  };

  // Helper Function
  // Takes in object of songs {artistName, songName} and
  // returns songs assets {artisstImage, trackName, artistName}

  useEffect(() => {
    const getSongsAssets = async (songs) => {
      let data = null;
      let counter = 0;
      const searchLimit = 5;
      const songAssets = [];

      // Calls Spotify API to get song assets
      for (let [artist, song] of Object.entries(songs)) {
        if (counter === searchLimit) {
          break;
        } else {
          counter++;
          let track_query = song + " " + artist;
          data = await getTrack(track_query);
          songAssets.push(data);
        }
      }
      return songAssets;
    };

    if (sendRequest) {
      const body = JSON.stringify({ userInput: userResponse });

      // Call backend to generate respsonse from OpenAI API
      axios.post("http://localhost:8888/generate", body).then(async (res) => {
        // Returns a object of songs: {"song_name", "artist_name"}
        const songs = parseSongs(res.data.output.text);

        try {
          let songAssets = await getSongsAssets(songs);
          setSongs(songAssets);
          console.log(songAssets);
        } catch (error) {
          console.error(`Failed to get SongAssets from Spotify: ${error}`);
        }
      });
    }
  }, [sendRequest]);

  // Onclick function to reload next question
  const nextQuestion = () => {
    current_question++;
    if (current_question === questions.length) {
      setEndQuestions(true);
    }

    setQuestion(questions[current_question]);
    userResponse += ` ${userInput.toString()}`;
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <>
      <Header />

      <StartContainer>
        {songs ? (
          <>
            <h1>Enjoy the tunes 😍</h1>
            <Playlist artists={songs} />
          </>
        ) : (
          <>
            {endQuestions ? (
              <>
                <StyledHeadline>Ready!</StyledHeadline>
                <StyledFinishButton onClick={() => setSendRequesst(true)}>
                  Get Playlist
                </StyledFinishButton>
              </>
            ) : (
              <>
                <StyledHeadline>{question}</StyledHeadline>
                <Input placeholder="Type here" onChange={onUserChangedText} />
                <StyledOkButton onClick={nextQuestion}>Ok</StyledOkButton>
              </>
            )}
          </>
        )}
      </StartContainer>
    </>
  );
};

export default Forms;
