require('dotenv').config()


const { Configuration, OpenAIApi } = require("openai");
const express = require('express')


const querystring = require('node:querystring')
const app = express()
const axios = require('axios')
const port = 8888

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

const cors = require('cors');
app.use(cors());



app.get('/', (req, res) => {
    res.send('Welcome to Curio')
})

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  
  
const stateKey = 'spotify_auth_state';
  
app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = 'user-read-private user-read-email';

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
})

app.get('/callback', (req, res) => {
  const code = req.query.code || null;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in
        })

        res.redirect(`http://localhost:3000/?${queryParams}`);

      } else {
        res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
      }
    })
    .catch(error => {
      res.send(error);
    })
})

app.get('/refresh_token', (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });
})


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration)

const basePromptPrefix = 
`
I am going to list my mood, a genre of music, time of day, and what I am currently doing. I want ChatGPT-3 to create the best playlist for me base on the aforementioned points:

user prompt:
`

app.post('/generate', async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "true");
  
  // return res.status(200).json('hej hej')



  try {
    // Send a request to OpenAI
    const baseCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      // prompt: `${basePromptPrefix}${req.body.userInput}\n`,
      prompt: `${basePromptPrefix}`,
      temperature: 0.7,
      max_tokens: 250,    
    })
    const basePromptOutput = baseCompletion.data.choices.pop()
    
    res.status(200).json({ output: basePromptOutput })

  } catch (error) {
      if (error.response) {
        console.log(error.response.status)
        console.log(error.response.data)
      } else {
        console.log(`ERROR HERE======> ${error.message}`)
      }
  }
});


app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`)
}) 
