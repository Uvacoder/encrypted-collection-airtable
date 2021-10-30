"use strict";
const getTable = require("./helpers/getTable");

const getHeaderValue = (headerKey, headers) => {
	const keyIndex = headers.indexOf(headerKey.toLowerCase());

	return keyIndex >= 0 ? headers[keyIndex + 1] : headers[1];
};

module.exports = async (req, res) => {
	try {
		const reqHost = getHeaderValue("host", req.rawHeaders);
		const reqReferer = getHeaderValue("referer", req.rawHeaders);

		const altHost = `${process.env.ALT_BASE_URL}`;
		const mainHost = `${process.env.MAIN_BASE_URL}`;

		const altReferer = `https://${process.env.ALT_BASE_URL}/watchlist`;
		const mainReferer = `https://${process.env.MAIN_BASE_URL}/watchlist`;

		if (
			req.method === "GET" &&
			(reqHost === altHost || reqHost === mainHost) &&
			(reqReferer.indexOf(altReferer) >= 0 ||
				reqReferer.indexOf(mainReferer) >= 0)
		) {
			if (Object.keys(req.query).length > 0) {
				const initialLimit = req.query.limit;
				res.status(200).send(await getTable("Watchlist", initialLimit));
			} else {
				res.status(200).send(await getTable("Watchlist"));
			}
		} else {
			return {
				statusCode: 404,
				body: JSON.stringify({
					error: "Error Making Request (Unauthorized)",
				}),
			};
		}
	} catch (err) {
		console.error("Somethings gone wrong ", err);

		res.send(err); // send the thrown error
	}
};
