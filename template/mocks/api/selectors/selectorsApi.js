const {respTime} = require("../../utils");

module.exports = function (app, config = require("../config"), data) {

	const {selectors} = config;

	const {users = [], fileTypes = []} = data || {};

	const fileTypeSelectorData = fileTypes.map(fileType => ({name: fileType, value: fileType}));
	const userSelectorData = users.map(user => ({name: user, value: user}));

	app.get('/api/selectors/:cName', function (req, res) {
		setTimeout(() => {
			res.send(selectors.find(selector => selector.name === req.params.cName));
		}, respTime());
	});

	app.post('/api/selectors/:selectorId/items', (req, res) => {
		const {offset, limit, search, queryContext = {}} = req.body;

		const selectorId = req.params.selectorId;

		const buildResponse = data => ({
			total: data.length,
			data: data
				.filter(item => item.name.includes(search))
				.slice(offset, offset + limit)
		});

		setTimeout(() => {

			switch (selectorId) {
				case 'fileType' : {
					res.send(buildResponse(fileTypeSelectorData));
					break;
				}
				case 'user' :
					res.send(buildResponse(userSelectorData));
					break;
				default:
					res.send({
						total: 0,
						data: []
					});
			}
		}, respTime());
	});

};
