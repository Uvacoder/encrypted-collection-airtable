<template>
	<div id="app">
		<app-header v-on:theme-change="darkThemeEnabled = !darkThemeEnabled"></app-header>
		<router-view></router-view>
	</div>
</template>

<script>
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
	methods: {},
	watch: {
		darkThemeEnabled: function() {
			// toggle dark mode
			let rootElt = document.querySelector('html');

			if (this.darkThemeEnabled && !rootElt.hasAttribute('data-theme')) {
				rootElt.setAttribute('data-theme','dark');
			} else if (!this.darkThemeEnabled) {
				rootElt.removeAttribute('data-theme');
			}
		}
	}	
};
</script>

<style>
/* Import font */
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
	--primary-red-color: #fa5252;
	--primary-yellow-color: #f1c61b;
	--overdue-red-color: #e63946;
	--gray-text-color: #495057;
	--gray-bg-color: #868e96;
	--lightgray-bg-color: #ced4da;
}

html {
	--text-color: #171a1d;
	--background-color: #ffffff;
	--gray-border-color: #ced4da;
	--navbar-background-color: rgb(240, 240, 240);
	--wrapper-border-color: #0d1117;
	--product-border-color: #ced4da;
	--app-desc-text-color: #5d6470;
	--product-desc-text-color: #5d6470;
	--tags-bg-color: #e8eaec;
	--tags-bg-hover-color: #d8dbdf;
	--add-button-background-color: #2c3e50;
	--opt-button-background-color: #ffffff;
	--opt-toggle-background-color: #e9ecef;
}

html[data-theme='dark'] {
	--text-color: #ffffff;
	--background-color: #0d1117;
	--tags-bg-color: #272d35;
	--tags-bg-hover-color: #2f3741;
	--gray-border-color: #3e4a57;
	--navbar-background-color: #1f2020;
	--wrapper-border-color: #495057;
	--app-desc-text-color: #ced4da;
	--product-desc-text-color: #ced4da;
	--product-border-color: #495057;
	--add-button-background-color: #3e4a57;
	--opt-button-background-color: #3e4a57;
	--opt-toggle-background-color: #3e4a57;
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
	color: var(--app-desc-text-color) !important;
	opacity: 1;
}

#app {
	width: 100%;
	min-width: 375px;
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

@media only screen and (max-width: 580px) {
	#app {
		padding: 0 .75rem 2rem .75rem;
	}
}

</style>
