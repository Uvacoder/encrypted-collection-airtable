"use strict";
const { base } = require("./airtable");
const formatReturn = require("./formatReturn");

module.exports = async (tableName) => {
	try {
		const table = base(tableName);

		let products = [];

		const recs = await table
			.select({
				view: "all",
			})
			.eachPage((records, fetchNextPage) => {
				records.forEach((record) => {
					products.push({
						name: record.fields.name,
						desc: record.fields.description,
						url: record.fields.url,
						tags: record.fields.tags,
						categories: record.fields.categories,
						img: record.fields.icon[0].url,
					});
				});
				fetchNextPage();
			});

		if (typeof recs !== "undefined") {
			console.log(recs);
		}

		return formatReturn(200, products);
	} catch (err) {
		return formatReturn(500, { error: err });
	}
};
