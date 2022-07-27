"use strict";

module.exports = async (req, res) => {
	try {
		const changelogURL = `https://raw.githubusercontent.com/oneminch/encrypted-list/main/src/Changelog.md`;

		const response = await fetch(changelogURL);
		const content = await response.text();

		res.status(200).send(content);
	} catch (err) {
		console.error("Somethings gone wrong ", err);

		res.send(err); // send the thrown error
	}
};
