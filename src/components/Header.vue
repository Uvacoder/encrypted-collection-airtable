<template>
	<nav id="header">
	<!-- :close-on-click="false" -->
		<router-link class="app-info nav-left" ref="navLeft" :to="{ path: '/' }">
			<div class="app-logo">
				<img src="../assets/logo.svg" alt="EncryptedList Logo" />
			</div>
			<div class="app-detail">
				<h3 class="app-name">{{ headerTitle }}</h3>
				<p class="app-desc">
					List of services that offer zero-knowledge or end-to-end encryption 🔐.
				</p>
			</div>
		</router-link>
		
		<div class="buttons">
			

			<app-button 
				:iconButton="true" 
				@clicked="emitThemeChange" 
				:label="'Change Color Theme'"
			>
				<i v-if="darkMode" class="gg-sun"></i>
				<i v-else class="gg-moon"></i>
			</app-button>

			<app-button
				:iconButton="true" 
				:label="'Give Feedback'"
			>
				<i class="gg-smile-mouth-open"></i>
			</app-button>

			<app-button
				:label="'Show List of Pages'"
			>
				Pages
				<i class="gg-push-left"></i>
			</app-button>
		</div>
		
	</nav>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
	name: "Header",
	components: {
		appButton: Button,
	},
	data() {
		return {
			darkMode: false
		};
	},
	methods: {
		showMenu: function() {
            this.$refs.MenuList.style.setProperty("margin-right", "0px");
        },
		// emit theme change to main component
		emitThemeChange: function() {
			this.darkMode = !this.darkMode;
			this.$emit('theme-change');
		},
	},
	computed: {
		headerTitle: function() {
			return this.$store.state.headerTitle;
		},
	}
};
</script>

<style scoped>
@import url('https://css.gg/css?=|sun|moon|add|danger|info|unavailable|eye|chevron-down|push-left|smile-mouth-open');

* {
	outline: none;
	/* border: .1px solid red; */
}

#header {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;
	margin-bottom: 1rem;
	background-color: var(--background-color);
}

.app-info {
	min-width: 45%;
	padding: 0.5rem;
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: center;
}

.app-logo {
	min-width: 3rem;
	max-width: 3rem;
	min-height: 3rem;
	max-height: 3rem;
	position: relative;
}

.app-logo img {
	width: 100%;
	height: 100%;
	background-color: #fff;
	display: block;
	position: absolute;
	top: calc(50% - 1.5rem);
	left: calc(50% - 1.5rem);
	border-radius: 50%;
	box-shadow: 1px 1px 5px var(--lightgray-bg-color);
}

html[data-theme='dark'] .app-logo img {
	box-shadow: none;
}

.app-detail {
	margin-left: .75rem;
	padding-top: 0.25rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
}

.app-name {
	font-size: 1.25rem;
	font-weight: bold;
	line-height: 1.25;
	margin: 0.25rem;
	color: var(--text-color);
}
.app-desc {
	color: var(--app-desc-text-color);
	line-height: 1.5;
	font-size: 1rem;
	margin: 0.25rem;
	max-width: 400px;
}

.buttons {
	/* width: 45%; */
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.buttons > * {
	margin-right: 0.5rem;
}

.buttons > :last-child {
	margin: 0;
}

.buttons > :nth-last-child(2) i {
	transform: scale(1);
	margin-left: 0;
	background-color: var(--filter-reset-bg-color);
	color:  var(--filter-reset-border-color);
}

/* @media only screen and (max-width: 1023px) {
	.app-info {
		width: 75%;
	}

	.app-desc {
		width: 100%;
	}

	.buttons {
		justify-content: flex-start !important;
	}
} */

/* 

.buttons > a,
.buttons > div button,
.buttons > button {
	padding: 0 .7rem;
	border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);	
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
	margin: 0 .5rem 0 0 !important;
}

.buttons > a:hover,
.buttons > div:hover button,
.buttons > button:hover {
	color: var(--text-color);
	border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);
}

.buttons > div {
	border-radius: 0.5rem;
	text-align: left;
}

.buttons > div .page-icons{
	float: left;
	width: 1.75rem;
	margin-right: 0.5rem;
}

.buttons > div i {
	float: left;
	margin: 0;
}

.buttons > div button i {
	margin-left: .25rem;
	margin-right: 0;
}



.buttons > button:last-of-type {
	padding: 0 .5rem;
	margin: 0 !important;
}

.buttons > a:first-of-type span {
	display: flex;
	align-items: center;
	justify-content: center;
}

.router-link-active,
.router-link-exact-active {
	color: var(--text-color);
}

.buttons > button:last-of-type i {
	margin-left: 0;
} */

/* @media only screen and (max-width: 1023px) {
	.app-info {
		width: 75%;
	}

	.app-desc {
		width: 100%;
	}

	.buttons {
		justify-content: flex-start !important;
	}
}

@media only screen and (max-width: 480px) {
	.buttons {
		justify-content: space-between !important;
	}
}

@media only screen and (max-width: 580px) {
	#header > :first-child {
		align-items: center;
	}

	.app-logo {
		width: 2.5rem;
		height: 2.5rem;
	}

	.app-logo img {
		top: calc(50% - 1.25rem);
		left: calc(50% - 1.25rem);
	}

	.app-detail {
		padding: 0;
	}
	
	.app-desc {
		display: none;
	}
} */
</style>
