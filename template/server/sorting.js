const sortData = (dataToSort, sort) => {
	const sortFunc = data => sortBy => (data.sort((a, b) => {
		let i = 0, result = 0;

		while (i < sortBy.length && result === 0) {
			result = sortBy[i].direction * (a[sortBy[i].prop] < b[sortBy[i].prop] ? -1 : (a[sortBy[i].prop] > b[sortBy[i].prop] ? 1 : 0));
			i++;
		}
		return result;
	}));

	const sorters = sort && sort.length > 0 ? sort.split(',') : [];
	const sortBy = sorters.map(s => s.split('_')).map(s => ({prop: s[0], direction: s[1].toLowerCase() === 'asc' ? 1 : -1}));

	return sort ? sortFunc(dataToSort)(sortBy) : dataToSort;
};

module.exports = {
	sortData
};