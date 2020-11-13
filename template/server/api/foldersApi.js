const R = require("ramda");

const NO_DELAY = false; // set to true to speed up mock response time;
const respTime = (maxTimeMs = 1000) => NO_DELAY ? 1 : Math.random() * maxTimeMs;

const folders = require("../folders");

const folderEntries = Object.values(folders);

const filterFolders = (folderEntries, lazy, filterPath) => {

	const root = folderEntries.length > 0 && folderEntries[0];

	const withChildren = (item) => {
		return folderEntries.filter(folder => item.id === folder.parentId).map(item => (
			{...item, children: lazy ? [] : withChildren(item)}
		));
	};

	if (!lazy) {
		return {...root, children: withChildren(root)};
	}

	const parentItem = folderEntries.find(item => item.path === filterPath) || root;
	return parentItem && {...R.omit(['parentId'], parentItem), children: withChildren(parentItem)};
};

module.exports = function (app) {
	app.get('/api/folders/browse', (req, res) => {

		const {scope, root: path, offset, limit, query, sort, lazy = true} = req.query;

		const result = filterFolders(folderEntries, lazy, path);

		setTimeout(() => {

			res.send(result ? {
				...result,
				total: result.children.length,
				children: result.children.slice(offset, offset + limit)
			} : {});

		}, respTime());
	});
};
