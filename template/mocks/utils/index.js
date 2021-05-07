const NO_DELAY = false; // set to true to speed up mock response time;

const respTime = (maxTimeMs = 1000) => NO_DELAY ? 1 : Math.random() * maxTimeMs;

module.exports = {
	respTime
};
