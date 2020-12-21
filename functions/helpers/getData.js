"use strict";
const { table } = require("./airtable");
// const formatIt = require("./formatIt");

module.exports = async () => {
	try {
		const recs = await table
			.select({
				view: "Main View",
			})
			.firstPage();

		const formattedRecs = recs.map((rec) => ({
			rec: rec.fields,
		}));

		return formattedRecs;
		// return formatIt(200, formattedRecs);
	} catch (err) {
		// console.log("failed at airtable");
		console.error(err);
		return { statusCode: 500, msg: "error at getData" };
		// return formatIt(500, err);
	}
};
