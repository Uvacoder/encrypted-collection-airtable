"use strict";
import axios from "axios";
const yaml = require("js-yaml");

module.exports = async (req, res) => {
	try {
		// if (req.method == "post") {
		// } else {
		// }
		const { formType } = req.query;
		const submissionBody = yaml.dump(req.body);

		const axiosConfig = {
			headers: {
				Accept: "application/vnd.github.v3+json",
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
			}
		};

		axios
			.post(
				"https://api.github.com/repos/oneminch/api-test/issues",
				{
					title: formType,
					body: submissionBody,
					labels: [formType.toLowerCase()]
				},
				axiosConfig
			)
			.then(() => {
				res.status(200);
			})
			.catch((err) => {
				console.error("Somethings gone wrong ", err);

				res.send(err); // send the thrown error
			});
	} catch (err) {
		console.error("Somethings gone wrong ", err);

		res.send(err); // send the thrown error
	}
};
