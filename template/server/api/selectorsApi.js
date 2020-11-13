const selectors = require('../config/selectors');
const countryStateCity = require('../data/countryStateCity');

const countries = countryStateCity.map((country) => ({name: country.name, value: country.iso2}));
const states = countryStateCity.reduce((acc, country) => (
	country.states
		? Object.entries(country.states)
			.reduce((acc, [state]) => ([...acc, {name: state, value: state}]), acc)
		: ([...acc, {name: country.capital, value: country.capital}])), []);

const statesByCountry = countryStateCity.reduce((acc, country) => (
	Object.assign(acc, {
		[country.iso2]: country.states ? Object.keys(country.states).map(key => ({
				name: key,
				value: key
			}))
			: []
	})
), {});

module.exports = function (app) {
	app.get('/api/selectors/:cName', function (req, res) {
		setTimeout(() => {
			res.send(selectors.find(selector => selector.name === req.params.cName));
		}, 1000);
	});

	app.post('/api/selectors/:selectorId/items', (req, res) => {
		const {offset, limit, search, queryContext = {}} = req.body;

		const selectorId = req.params.selectorId;

		switch (selectorId) {
			case 'country' :
				res.send({
					total: countries.length,
					data: countries
						.filter(country => country.name.includes(search))
						.slice(offset, offset + limit)
				});

				break;
			case 'state' : {
				const country = queryContext.country || queryContext.countryCode;
				const _statesByCountry = country ? statesByCountry[country]
					.filter(state => state.name.includes(search)) : states;
				const data = _statesByCountry.slice(offset, offset + limit);
				res.send({
					total: data.length,
					data
				});

				break;
			}
			default:
				res.send({
					total: 0,
					data: []
				});
		}
	});

};
