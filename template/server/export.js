const shortHash = (s, max) => [...s].reduce((acc, c) => {
	return acc + c.charCodeAt(0);
}, 0) % max;

const getTestFile = (id, linkId) => {
	const getExtension = (filename) => {
		const i = filename.lastIndexOf('.');
		return (i < 0) ? '' : filename.substr(i).toLowerCase();
	};

	const contentTypes = {
		'.doc': 'application/msword',
		'.pdf': 'application/pdf'
	};

	const files = [
		'ClaimLetter.doc',
		'Proposal Modified.pdf',
		'Proposal Original.pdf',
		'ClaimAcknowledgement.doc',
		'Request for Proposal.pdf',
		'Foreign Investment Contracts in the Oil& Gas Sector_A Survey of.pdf'
	];

	const contentSizes = [
		74752,
		268800,
		120249,
		236115,
		84421,
		85144,
		85621,
		4229896,
		6225,
		57300
	];

	const hashId = shortHash(id + (linkId || '0'), files.length);

	const fileName = files[hashId];
	const contentType = contentTypes[getExtension(fileName)];
	const contentSize = contentSizes[hashId];

	return {fileName, contentType, contentSize};
};

module.exports = {getTestFile, shortHash};
