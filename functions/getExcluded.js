"use strict";
const getData = require("./helpers/getData");
// const formatIt = require("./helpers/formatIt");

exports.handler = async (event, callback) => {
	try {
		if (
			event.httpMethod === "GET" &&
			event.headers.host === "encryptedlist.netlify.app" &&
			event.headers.referer === "https://encryptedlist.netlify.app/"
		) {
			let data = await getData();
			return {
				statusCode: 200,
				body: JSON.stringify(data),
			};
		} else {
			return {
				statusCode: 404,
				body: JSON.stringify({ msg: "error" }),
			};
			// return formatIt(404, { msg: "error" });
		}
	} catch (err) {
		console.error("Somethings gone wrong ", err);
		return callback(null, {
			statusCode: 500,
			body: JSON.stringify({ error: err }),
		});
	}
};
