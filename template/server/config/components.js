const users = require("./users");
const usersAnalytics = require("./userAnalytics");

const cases = require("./cases");
const caseAnalytics = require("./caseAnalytics");
const caseAttachments = require("./caseAttachments");

const documents = require("./documents");

module.exports = {
	...users,
	...usersAnalytics,
	...cases,
	...caseAnalytics,
	...caseAttachments,
	...documents,
};