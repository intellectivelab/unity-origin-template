const R = require("ramda");

const actions = require('./config/actions');
const components = require('./config/components');
const perspectives = require('./config/perspectives');
const dashboardActions = require('./config/dashboardActions');

const NO_DELAY = false; // set to true to speed up mock response time;
const respTime = (maxTimeMs = 1000) => NO_DELAY ? 1 : Math.random() * maxTimeMs;

const perspectiveMap = perspectives.reduce((map, p) => {
	map[p.id] = p;

	map[p.id].dashboardsMap = p.dashboards.reduce((acc, d) => {
		acc[d.id] = d;

		return acc;
	}, {});

	return map;
}, {});

const actionsMap = Object.values(actions).reduce((acc, actions) => {
	actions.forEach(action => {
		acc[action.name] = action;
	});

	return acc;
}, {});

module.exports = function (app) {
	app.get('/api/config/perspectives', function (req, res) {
		res.send(perspectives);
	});

	app.get('/api/config/perspectives/:pname', function (req, res) {
		res.send(perspectiveMap[req.params.pname]);
	});

	app.get('/api/config/perspectives/:pname/dashboards', function (req, res) {
		res.send(perspectiveMap[req.params.pname].dashboards);
	});

	app.get('/api/config/perspectives/:pname/dashboards/:dName', function (req, res) {
		res.send(perspectiveMap[req.params.pname].dashboardsMap[req.params.dName]);
	});

	app.get('/api/config/perspectives/:pname/dashboards/:dName/actions', function (req, res) {
		const perspective = dashboardActions.filter(p => p.id === req.params.pname)[0];
		const dashboard = perspective && perspective.dashboards.filter(d => d.id === req.params.dName)[0];
		const actions = dashboard && dashboard.actions;

		setTimeout(() => {
			res.send(actions || []);
		}, respTime());
	});

	app.get('/api/config/components/:cName', function (req, res) {
		setTimeout(() => {
			res.send(components[req.params.cName]);
		}, respTime());
	});

	app.get('/api/config/grids/:gName/actions', function (req, res) {
		res.send(actions[req.params.gName]);
	});

	app.get('/api/config/components/:cName/tabs/:tabId/actions', function (req, res) {
		setTimeout(() => {
			const id = req.params.cName + req.params.tabId;
			res.send(actions[id]);
		}, respTime());
	});

	app.get('/api/config/actions', function (req, res) {
		res.send(Object.values(actionsMap));
	});

	app.get('/api/config/actions/:aName', function (req, res) {
		res.send(actionsMap[req.params.aName]);
	});

	app.get('/api/config/components/:view/header', function (req, res) {
		const view = components[req.params.view];
		const fieldsetLink = view.tabs[0]._links.fieldset.href;
		const fieldsetName = fieldsetLink.substring(fieldsetLink.lastIndexOf('/') + 1, fieldsetLink.length);

		res.send((components[fieldsetName] && components[fieldsetName].header) || []);
	});

	app.get('/api/config/components/:id/templates', function (req, res) {
		setTimeout(() => {
			res.send(components[req.params.id]);
		}, respTime());
	});

	app.get('/api/config/:resourceName/fieldsets/:fieldSetId', function (req, res) {
		setTimeout(() => {
			res.send(components[req.params.fieldSetId]);
		}, respTime());
	});
};
