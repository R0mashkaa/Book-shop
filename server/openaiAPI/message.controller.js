const getResponse = require('./message.api');

module.exports = {
	getResponse: async (req, res) => {
		const message = req.body.message;
		res.send(await getResponse(message));
	},
};
