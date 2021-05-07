const documentList = require("../data/data");

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
        '.xls': 'application/vnd.ms-excel',
        '.ppt': 'application/vnd.ms-powerpoint',
        '.pdf': 'application/pdf',
    };

    const files = {
        '.doc': 'ClaimLetter.doc',
        '.xls': 'Proposal Modified.xls',
        '.ppt': 'Proposal Request.ppt',
        '.pdf': 'Proposal Original.pdf',
    };

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

    const hashId = shortHash(id + (linkId || '0'), Object.values(files).length);

    const document = documentList.find(doc => doc.id === id);

    if(!document){
        return {};
    }

    const extension = getExtension(document.title);

    const fileName = files[extension];

    const contentType = contentTypes[extension];

    const contentSize = contentSizes[hashId];

    return {fileName, contentType, contentSize};
};

module.exports = {getTestFile, shortHash};
