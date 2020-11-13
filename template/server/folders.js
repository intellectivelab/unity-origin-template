const fs = require('fs');
const R = require("ramda");

const {v4: uuidv4} = require('uuid');

const idLens = R.lensProp("id");
const labelLens = R.lensProp("label");
const pathLens = R.lensProp("path");
const parentIdLens = R.lensProp("parentId");
const browseLinkLens = R.lensPath(["_links", "self"]);

const idMapper = item => ({...R.over(idLens, () => uuidv4(), item), ...item});
const labelMapper = item => ({...R.over(labelLens, () => item.name, item), ...item});

const safeParentPath = R.ifElse(R.endsWith('/'), R.identity, path => R.concat(path, '/'));
const pathMapper = R.curry((path, item) => ({...R.over(pathLens, () => R.concat(safeParentPath(path), item.name), item), ...item}));
const parentIdMapper = R.curry((parentId, item) => ({...R.over(parentIdLens, () => parentId, item), ...item}));
const browseLinkMapper = item => ({...R.over(browseLinkLens, () => ({href: `/api/folders/browse?root=${item.path}`}), item), ...item});
const filterValueMapper = item => ({...R.over(R.lensProp('filterValue'), () => item.path, item), ...item});

const treeReducer = (parentPath, parentId) => (acc, item) => {
	const _item = R.compose(
		idMapper,
		labelMapper,
		filterValueMapper,
		browseLinkMapper,
		pathMapper(parentPath),
		parentIdMapper(parentId)
	)(item);

	const {id, path, children = []} = _item;

	const traversed = children.reduce(treeReducer(path, id), {});

	return {...acc, [id]: _item, ...traversed};
};

const folders = require("./data/folders").reduce(treeReducer("/"), {});

module.exports = folders;
