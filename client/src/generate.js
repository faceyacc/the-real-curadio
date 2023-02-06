import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration)

const basePromptPrefix = 
`
I am going to list my mood, a genre of music, time of day, and what I am currently doing. I want ChatGPT-3 to create the best playlist for me base on the aforementioned points:

user prompt:
`


const generateAction = async (req, res) => {

    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.7,
        max_tokens: 250,
    })

    const basePromptOutput = baseCompletion.data.choices.pop()

    // Make call to shuffle using prompt chaining
    // await shufflePlaylist(baseCompletion)

    // Send over the prompt #2 output to UI instead of prompt #1
    res.status(200).json({ output: basePromptOutput })
};


const shufflePlaylist = async (req, res, basePromptOutput) => {
    // Second Prompt
    const secondPrompt = 
    `
    // List of Songs given from GPT
    ${basePromptOutput.text}

    Give me another similar playlist without the same songs:
    `
    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}`,
        temperature: 0.75,
        max_tokens: 250,
    })

    // Get second prompt output
    const secondPromptOutput = secondPromptCompletion.data.choices.pop()

    // Send over the prompt #2 output to UI instead of prompt #1
    res.status(200).json({ output: secondPromptOutput })    
};

export default generateAction;

