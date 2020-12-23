"use strict";
const getData = require("./helpers/getData");
const formatReturn = require("./helpers/formatReturn");

exports.handler = async (event, callback) => {
	try {
		if (
			event.httpMethod === "GET" //&&
			// event.headers.host === "encryptedlist.netlify.app" &&
			// event.headers.host === "localhost:8888" &&
			// event.headers.referer === "http://localhost:8888/excluded"
			// event.headers.referer === "https://encryptedlist.netlify.app/"
		) {
			// console.log(event.headers.host, event.headers.referer);
			return await getData("Excluded");
		} else {
			return formatReturn(404, {
				error: "Error Making Request (Unauthorized)",
			});
		}
	} catch (err) {
		console.error("Somethings gone wrong ", err);
		return callback(null, formatReturn(500, { error: err }));
	}
};
