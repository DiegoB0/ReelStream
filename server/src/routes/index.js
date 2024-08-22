const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

fs.readdirSync(__dirname).forEach((file) => {
	if (file === 'index.js') return;

	const route = file.split('.')[0];

	router.use(`/${route}`, require(`./${file}`));
});

module.exports = router;
