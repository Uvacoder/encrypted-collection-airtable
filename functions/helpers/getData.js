"use strict";
const { base } = require("./airtable");
const formatReturn = require("./formatReturn");

module.exports = async (tableName, numRecs) => {
	try {
		const table = base(tableName);
		const baseImgURL = `https://ik.imagekit.io/x6xq2u8ftjl/encryptedlist/${tableName.toLowerCase()}`;
		const initialLimit = typeof numRecs !== "undefined" ? numRecs : 50;

		let products = [],
			imgName = ``;

		const recs = await table
			.select({
				view: "all",
				maxRecords: parseInt(initialLimit),
			})
			.eachPage((records, fetchNextPage) => {
				records.forEach((record) => {
					imgName = `${record.fields.name
						.split(" ")
						.join("-")
						.toLowerCase()}`;

					products.push({
						name: record.fields.name,
						desc: record.fields.description,
						url: record.fields.url,
						tags: record.fields.tags,
						categories: record.fields.categories,
						png_img: `${baseImgURL}/png/${imgName}.png?tr=w-105,dpr-1,lo-true`,
						webp_img: `${baseImgURL}/png/${imgName}.png?tr=w-105,dpr-1,lo-true`,
						// webp_img: `${baseImgURL}/webp/${imgName}.webp?tr=w-105,dpr-1,lo-true`,
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
