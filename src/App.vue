<template>
	<div id="app">
		<div v-show="isIE()" class="ie-overlay" >
			<p>
				It seems like you are using Internet Explorer (IE). <br><br>
				This website isn't supported on IE. <br><br>
				If this is inaccurate, you probably have a setting or an extension that alters the browser behavior. <br><br>
				Otherwise, please upgrade to a different browser.
			</p>
		</div>

		<app-header v-show="!isIE()" :darkTheme="darkThemeEnabled" v-on:theme-change="darkThemeEnabled = !darkThemeEnabled"></app-header>

		<router-view v-show="!isIE()"></router-view>
	</div>
</template>

<script>
import localForage from "localforage";
import { isIE } from '@/scripts/helpers';
import Header from "@/components/Header.vue";

export default {
	name: "App",
	components: {
		appHeader: Header
	},
	metaInfo: {
		titleTemplate: '%s | EncryptedList',
		
        meta: [
			{ charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{ name: 'description', content: 'EncryptedList is a collection of products & services that offer or ensure data security through zero-knowledge or end-to-end encryption.'},
			{ name: 'title', template: null, content: 'EncryptedList - Curated Collection of Encrypted Tools.'},


			// OpenGraph data
			{ property: 'og:title', template: null, content: 'EncryptedList - Curated Collection of Encrypted Tools.'},
			{ property: 'og:type', content: 'website'},
			{ property: 'og:site_name', content: 'EncryptedList'},
			{ property: 'og:url', content: 'https://encryptedlist.xyz/'},
			{ property: 'og:description', content: 'EncryptedList is a collection of products & services that offer or ensure data security through zero-knowledge or end-to-end encryption.'},
			{ property: 'og:image', content: 'https://res.cloudinary.com/minch/image/upload/v1609226799/EncryptedList/logo_ymk6dg.webp'},

			// Twitter card
			{name: 'twitter:card', content: 'summary'},
			{name: 'twitter:title', template: null, content: 'EncryptedList - Curated Collection of Encrypted Tools.' },
			{name: 'twitter:site', content: 'https://encryptedlist.xyz/' },
			{name: 'twitter:description', content: 'EncryptedList is a collection of products & services that offer or ensure data security through zero-knowledge or end-to-end encryption.' },
			{name: 'twitter:image:src', content: 'https://res.cloudinary.com/minch/image/upload/v1609226799/EncryptedList/logo_ymk6dg.webp' },
		],
		link: [
			{ rel: 'canonical', href: 'https://encryptedlist.xyz/'}
		]
    },
	data() {
		return {
			darkThemeEnabled: false
		}
	},
	methods: {
		// detect if browser is IE
		isIE,
		// Initialize local storage for theme
		initDB: function() {
			let vm = this;

			localForage
				.getItem("theme")
				.then(function(value) {
					// first timer or site data cleared
					// offline store for theme doesn't exist yet
					if (value === null) {
						localForage
							.setItem("theme", vm.darkThemeEnabled)
							.catch((err) => {
								throw err;
							});
					} else {
						vm.darkThemeEnabled = value;
					}
				})
				.catch(function(err) {
					throw err;
				});
		},
		// Update local storage for theme
		updateDB: function() {
			localForage
				.setItem("theme", this.darkThemeEnabled)
				.catch((err) => {
					throw err;
				});
		}
	},
	watch: {
		darkThemeEnabled: function() {
			// toggle dark mode
			let rootElt = document.querySelector('html');

			if (this.darkThemeEnabled && !rootElt.hasAttribute('data-theme')) {
				rootElt.setAttribute('data-theme','dark');
			} else if (!this.darkThemeEnabled) {
				rootElt.removeAttribute('data-theme');
			}

			this.updateDB();
		}
	},
	mounted() {
		this.initDB();
	},
};
</script>

<style>
/* Import regular monospace font */
@font-face {
	font-family: 'JetBrains Mono';
	src: url('https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff2/JetBrainsMono-Bold.woff2') format('woff2'),
		url('https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff/JetBrainsMono-Bold.woff') format('woff');
	font-weight: 500;
	font-style: normal;
	font-display: swap;
}

/* Import bold monospace font */
@font-face {
	font-family: 'JetBrains Mono';
	src: url('https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff2/JetBrainsMono-ExtraBold.woff2') format('woff2'),
		url('https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff/JetBrainsMono-ExtraBold.woff') format('woff');
	font-weight: 600;
	font-style: normal;
	font-display: swap;
}

:root {
	--gray-bg-color: #868e96;
	--lightgray-bg-color: #ced4da;
	--highlight-text-color: #1c2024;
	--primary-red-color: #fa5252;
	--alternate-red-color: #e03131;
	--primary-green-color: #51cf66;
	--primary-yellow-color: #f1c61b;
}

html {
	--text-color: #1c2024;
	--background-color: #ffffff;
	--gray-border-color: #1c2024;
	--tags-bg-color: #e8eaec;
	--tags-bg-hover-color: #d8dbdf;
	--current-tags-bg-color: #ced4da;
	--current-tags-bg-hover-color: #b5bbc0;
	--app-desc-text-color: #5d6470;
	--placeholder-text-color: #9da3a8;
	--product-border-color: #ced4da;
	--product-desc-text-color: #5d6470;
	--yellow-black-bg-color: #f1c61b;
	--yellow-black-border-color: #1c2024;
	--wip-text-color: #475058;
}

html[data-theme='dark'] {
	--text-color: #f1f3f5;
	--background-color: #1c2024;
	--gray-border-color: #495057;
	--tags-bg-color: #272d35;
	--tags-bg-hover-color: #2f3741;
	--current-tags-bg-color: #495057;
	--current-tags-bg-hover-color: #575f68;
	--app-desc-text-color: #ced4da;
	--placeholder-text-color: #7b828a;
	--product-border-color: #495057;
	--product-desc-text-color: #ced4da;
	--yellow-black-bg-color: #1c2024;
	--yellow-black-border-color: #f1c61b;
	--wip-text-color: #748694;
}

html,
body  {
	margin: 0;
	padding: 0;
	background-color: var(--background-color) !important;
	color: var(--text-color) !important;
}

* {
	outline: none;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	font-family:  "JetBrains Mono", "Cascadia Mono", "Lucida Console", monospace !important;
	font-weight: 500;
	transition: all 0.2s, color 0s, background-color 0s;
	-moz-transition: all 0.2s, color 0s, background-color 0s;
	-webkit-transition: all 0.2s, color 0s, background-color 0s;
	box-sizing: border-box;
}

input, input:before, input:after,
textarea, textarea:before, textarea:after {
	-webkit-user-select: initial;
	-khtml-user-select: initial;
	-moz-user-select: initial;
	-ms-user-select: initial;
	user-select: initial;
	color: var(--text-color);
}


input::placeholder,
textarea::placeholder {
	color: var(--placeholder-text-color) !important;
	opacity: 1;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: var(--placeholder-text-color) !important;
	opacity: 1;
}

input:-moz-placeholder,
textarea:-moz-placeholder {
    color: var(--placeholder-text-color) !important;
	opacity: 1;
}

input::-moz-placeholder,
textarea::-moz-placeholder {
    color: var(--placeholder-text-color) !important;
	opacity: 1;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
    color: var(--placeholder-text-color) !important;
	opacity: 1 !important;
}

#app {
	width: 100%;
	min-width: 365px;
	max-width: 1440px;
	margin: 0 auto;
	padding: 0 2rem 2rem 2rem;
	box-sizing: border-box;
}

mark.highlight {
	color: var(--highlight-text-color);
	background-color: var(--primary-yellow-color);
}

.ie-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: #fff;
	color: #000;
	padding: 2rem;
}

.ie-overlay p {
	position: relative;
	top: 25%;
	margin: 0 auto;
}

@media only screen and (max-width: 580px) {
	#app {
		padding: 0 .75rem 2rem .75rem;
	}

	.ie-overlay p {
		width: 100%;
	}
}

</style>
