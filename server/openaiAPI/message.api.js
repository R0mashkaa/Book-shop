const OpenAI = require('openai');
require('dotenv').config({ path: __dirname + '/.env' });

const openai = new OpenAI({
	apiKey: process.env.API_TOKEN_SECRET,
});

async function getResponse(message) {
	try {
		const completion = await openai.completions.create({
			model: 'gpt-3.5-turbo-instruct',
			prompt: `You must talk on Ukrainian language. You are a personal friendly library assistant, your goal is to help the user to get his answers about books and maybe if he wants to, suggest him some book to read. Here is the message: ${message}`,
			max_tokens: 500,
			temperature: 0,
		});
		return { answer: completion.choices.text };
	} catch {
		return { answer: 'Completion error' };
	}
}

module.exports = getResponse;
