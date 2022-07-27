"use strict";

module.exports = async (req, res) => {
	try {
		const changelogURL =
			"https://raw.githubusercontent.com/oneminch/encrypted-list/main/src/Changelog.md";

		fetch(changelogURL)
			.then((response) => {
				if (response.ok) return response.text();
				throw new Error("Network response was not ok.");
			})
			.then((data) => {
				console.log(data);
				res.status(200).send(data);
			})
			.catch((err) => {
				res.send(err);
			});
	} catch (err) {
		console.error("Somethings gone wrong ", err);

		res.send(err); // send the thrown error
	}
};
