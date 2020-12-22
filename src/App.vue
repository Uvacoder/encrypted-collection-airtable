<template>
	<div id="app">
		<app-header v-on:theme-change="darkThemeEnabled = !darkThemeEnabled"></app-header>
		<router-view></router-view>
	</div>
</template>

<script>
import localForage from "localforage";
import Header from "@/components/Header.vue";

export default {
	name: "App",
	components: {
		appHeader: Header
	},
	data() {
		return {
			darkThemeEnabled: false
		}
	},
	methods: {
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
/* Import regular font */
@font-face {
	font-family: 'JetBrains Mono';
	src: url('https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff2/JetBrainsMono-Bold.woff2') format('woff2'),
		url('https://cdn.jsdelivr.net/gh/JetBrains/JetBrainsMono/web/woff/JetBrainsMono-Bold.woff') format('woff');
	font-weight: 500;
	font-style: normal;
	font-display: swap;
}

/* Import bold font */
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
	--primary-yellow-color: #f1c61b;
	--highlight-text-color: #1c2024;
}

html {
	--text-color: #1c2024;
	--background-color: #ffffff;
	--gray-border-color: #1c2024;
	--tags-bg-color: #e8eaec;
	--tags-bg-hover-color: #d8dbdf;
	--app-desc-text-color: #5d6470;
	--placeholder-text-color: #adb5bd;
	--product-border-color: #ced4da;
	--product-desc-text-color: #5d6470;
	--filter-reset-bg-color: #f1c61b;
	--filter-reset-border-color: #1c2024;
}

html[data-theme='dark'] {
	--text-color: #f1f3f5;
	--background-color: #1c2024;
	--gray-border-color: #495057;
	--tags-bg-color: #272d35;
	--tags-bg-hover-color: #2f3741;
	--app-desc-text-color: #ced4da;
	--placeholder-text-color: #495057;
	--product-border-color: #495057;
	--product-desc-text-color: #ced4da;
	--filter-reset-bg-color: #1c2024;
	--filter-reset-border-color: #f1c61b;
}

html,
body  {
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
	transition: all 0.3s, color 0s, background-color 0s;
	-moz-transition: all 0.3s, color 0s, background-color 0s;
	-webkit-transition: all 0.3s, color 0s, background-color 0s;
}

input, input:before, input:after {
	-webkit-user-select: initial;
	-khtml-user-select: initial;
	-moz-user-select: initial;
	-ms-user-select: initial;
	user-select: initial;
	color: var(--text-color);
}

input::placeholder {
	color: var(--placeholder-text-color) !important;
	opacity: 1;
}

/* Override Annoying Buefy Defaults */
.button:focus, .button.is-focused,
.button:active, .button.is-active {
	color: var(--text-color) !important;
	border-color: var(--gray-border-color) !important;
}

.button:focus:not(:active), .button.is-focused:not(:active) {
	box-shadow: none !important;
}

#app {
	width: 100%;
	min-width: 365px;
	max-width: 1024px;
	margin: 0 auto;
	padding: 0 2rem 2rem 2rem;
}

.tags button {
	color: var(--text-color);
	height: 1.5rem;
	border: none;
	margin: 0 .5rem 0.5rem 0;
	border-radius: 5px;
	background-color: var(--tags-bg-color);
}

.tags button:hover {
	color: var(--text-color);
	background-color: var(--tags-bg-hover-color);
}

mark.highlight {
	color: var(--highlight-text-color);
	background-color: var(--primary-yellow-color);
}

@media only screen and (max-width: 580px) {
	#app {
		padding: 0 .75rem 2rem .75rem;
	}
}

</style>
