"use strict";
const getData = require("./helpers/getData");

module.exports = async (req, res) => {
	try {
		if (Object.keys(req.query).length > 0) {
			const initialLimit = req.query.limit;
			res.status(200).send(await getData("Watchlist", initialLimit));
		} else {
			res.status(200).send(await getData("Watchlist"));
		}
	} catch (err) {
		console.error("Somethings gone wrong ", err);

		res.send(err); // send the thrown error
	}
};
