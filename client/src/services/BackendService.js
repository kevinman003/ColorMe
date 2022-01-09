// TODO : change production endpoint
const endpoint =
	process.env.NODE_ENV === 'dev'
		? 'http://localhost:5000'
		: 'http://localhost:5000';

module.exports = { endpoint };
