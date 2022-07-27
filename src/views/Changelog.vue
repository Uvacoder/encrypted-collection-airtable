<template>
	<div id="changelog" v-html="outputHTML"></div>
</template>

<script>
import fs from "fs";
import MarkdownIt from "markdown-it";

export default {
	name: "Changelog",
	metaInfo: {
		title: "Changelog",
		meta: [
			{
				vmid: "title",
				name: "title",
				template: "%s | EncryptedList",
				content: "Changelog"
			},

			{
				vmid: "og:title",
				property: "og:title",
				template: "%s | EncryptedList",
				content: "Changelog"
			},
			{
				vmid: "og:url",
				property: "og:url",
				content: "https://encryptedlist.xyz/updates/"
			},

			{
				vmid: "twitter:title",
				name: "twitter:title",
				template: "%s | EncryptedList",
				content: "Changelog"
			},
			{
				vmid: "twitter:site",
				name: "twitter:site",
				content: "https://encryptedlist.xyz/updates/"
			}
		],
		link: [{ rel: "canonical", href: "https://encryptedlist.xyz/updates/" }]
	},
	data() {
		return {
			outputHTML: ""
		};
	},
	mounted() {
		let md = new MarkdownIt("commonmark", {
			html: true,
			linkify: true,
			typographer: true
		});

		const axiosConfig = {
			headers: { "Content-type": "application/json" }
		};

		this.$http
			.get("/api/getChangelog", axiosConfig)
			.then((response) => {
				return response.data;
			})
			.then((data) => {
				this.outputHTML = md.render(data);
			})
			.catch((err) => {
				// console.log(err);
				throw err;
			});

		// const changelogFile =
		// 	"https://raw.githubusercontent.com/oneminch/encrypted-list/main/src/Changelog.md";

		// fetch(
		// 	`https://api.allorigins.win/get?url=${encodeURIComponent(changelogFile)}`
		// )
		// 	.then((response) => {
		// 		if (response.ok) return response.json();
		// 		throw new Error("Network response was not ok.");
		// 	})
		// 	.then((data) => (this.outputHTML = md.render(data.contents)));
	}
};
</script>

<style scoped>
* {
	outline: none;
}

#changelog {
	font-weight: 400;
	padding: 0.5rem;
	font-size: 1.1rem;
}
</style>
