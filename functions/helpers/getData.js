"use strict";
const { base } = require("./airtable");
const formatReturn = require("./formatReturn");

module.exports = async (tableName, numRecs) => {
	try {
		const table = base(tableName);
		const initialLimit = typeof numRecs !== "undefined" ? numRecs : 350;

		let products = [];

		const recs = await table
			.select({
				view: "all",
				maxRecords: parseInt(initialLimit),
			})
			.eachPage((records, fetchNextPage) => {
				records.forEach((record) => {
					products.push({
						name: record.fields.name,
						desc: record.fields.description,
						url: record.fields.url,
						tags: record.fields.tags,
						categories: record.fields.categories,
						alternatives: record.fields.alternatives
							? record.fields.alternatives
							: [],
					});
				});
				fetchNextPage();
			});

		if (typeof recs !== "undefined") {
			console.log(recs.length);
		}

		return formatReturn(200, products);
	} catch (err) {
		return formatReturn(500, { error: err });
	}
};
