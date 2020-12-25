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
		
		<div class="nav-buttons">
			<app-button
				class="change-theme"
				:iconButton="true" 
				@clicked="emitThemeChange" 
				:label="'Change Color Theme'"
			>
				<i v-if="darkMode" class="gg-sun"></i>
				<i v-else class="gg-moon"></i>
			</app-button>

			<app-button
				class="give-feedback"
				:iconButton="true" 
				:label="'Give Feedback'"
			>
				<i class="gg-smile-mouth-open"></i>
			</app-button>

			<app-button
				class="show-pages"
				@clicked="showMenu"
				:label="'Show List of Pages'"
			>
				Pages
				<i class="gg-push-left"></i>
			</app-button>
			
			<app-button
				class="toggle-menu"
				:iconButton="true" 
				@clicked="showMenu"
				:label="'Toggle Menu'"
			>
				<i class="gg-menu"></i>
			</app-button>
		</div>
		
		<div class='menu-list' ref="MenuList">
			<div class="header">
				<h2 class="desktop-header-title">Navigate To</h2>
				<h2 class="mobile-header-title">Menu</h2>

				<div class="menu-list-buttons">
					<app-button
						class="change-theme"
						:iconButton="true" 
						@clicked="emitThemeChange" 
						:label="'Change Color Theme'"
					>
						<i v-if="darkMode" class="gg-sun"></i>
						<i v-else class="gg-moon"></i>
					</app-button>

					<app-button
						class="give-feedback"
						:iconButton="true" 
						:label="'Give Feedback'"
					>
						<i class="gg-smile-mouth-open"></i>
					</app-button>

					<app-button
						:iconButton="true" 
						:label="'Hide List of Pages'"
						@clicked="hideMenu"
					>
						<i class="gg-push-right"></i>
					</app-button>
				</div>
			</div>
			
			<app-button
				:label="'Go to About Page'"
				@clicked="navigateTo('about')" 
			>
				About Page
				<i class="gg-info"></i>
			</app-button>
			
			<app-button
				:label="'Go to Watchlist Page'"
				@clicked="navigateTo('watchlist')" 
			>
				Watchlist
				<i class="gg-eye"></i>
			</app-button>

			<app-button
				:label="'Go to Report Page'"
				@clicked="navigateTo('report')" 
			>
				Report Page
				<i class="gg-danger"></i>
			</app-button>

			<app-button
				:label="'Go to Excluded Products Page'"
				@clicked="navigateTo('excluded')" 
			>
				Excluded List
				<i class="gg-unavailable"></i>
			</app-button>

			<app-button
				:label="'Go to Submission Page'"
				@clicked="navigateTo('submit')" 
			>
				Submission Page
				<i class="gg-add"></i>
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
		// emit theme change to main component
		emitThemeChange: function() {
			this.darkMode = !this.darkMode;
			this.$emit('theme-change');
		},
		// used by buttons to act as a router-link 
		navigateTo: function(whereTo) {
			this.$router.push({ path: whereTo });
			this.hideMenu();
		},
		// hide side menu
        hideMenu: function() {
            this.$refs.MenuList.style.setProperty("transform", "translateX(100%)");
		},
		// show side menu
		showMenu: function() {
            this.$refs.MenuList.style.setProperty("transform", "translateX(0)");
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
@import url('https://css.gg/css?=|menu|sun|moon|add|danger|info|unavailable|eye|push-left|push-right|smile-mouth-open');

* {
	outline: none;
}

#header {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;
	margin-bottom: 1.5rem;
	background-color: var(--background-color);
}

.app-info {
	min-width: 45%;
	padding: 0.5rem;
	padding-left: 0;
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

.nav-buttons {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.nav-buttons > * {
	margin-right: 0.5rem;
}

.nav-buttons > :last-child,
.nav-buttons > :nth-last-child(2) {
	margin: 0;
}

.nav-buttons > .give-feedback i,
.menu-list .header .menu-list-buttons > .give-feedback i {
	background-color: var(--filter-reset-bg-color);
	color:  var(--filter-reset-border-color);
}

.nav-buttons > .toggle-menu {
	display: none;
}

.menu-list {
    width: 45%;
    height: 100vh;
	z-index: 1;
    position: fixed;
    top: 0;
    right: 0;
	padding-top: 1rem;
	transform: translateX(100%);
    background-color: var(--background-color);
    border-left: 2px solid var(--gray-border-color);
	transition: all 0.2s ease-out, color 0s, background-color 0s;
	-moz-transition: all 0.2s ease-out, color 0s, background-color 0s;
	-webkit-transition: all 0.2s ease-out, color 0s, background-color 0s;
}

.menu-list > * {
    width: 75%;
    min-width: 240px;
    max-width: 320px;
    margin: 1rem auto;
}

.menu-list .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.menu-list .header .mobile-header-title {
	display: none;
}

.menu-list .header .desktop-header-title {
	display: block;
}

.menu-list .header .menu-list-buttons {
    display: flex;
	align-items: center;
	justify-content: space-between;
}

.menu-list .header .menu-list-buttons > * {
	margin-right: 0.5rem;
}

.menu-list .header .menu-list-buttons > *:not(:last-child)  {
	display: none;
}

.menu-list .header .menu-list-buttons > :last-child  {
	margin: 0;
}

.router-link-active,
.router-link-exact-active {
	color: var(--text-color);
}

@media only screen and (max-width: 840px) {
	.nav-buttons > .show-pages,
	.nav-buttons > .change-theme,	
	.nav-buttons > .give-feedback {
		display: none;
	}

	.nav-buttons > .toggle-menu {
		display: block;
	}

	.menu-list .header .mobile-header-title {
		display: block;
	}

	.menu-list .header .desktop-header-title {
		display: none;
	}

	.menu-list .header .menu-list-buttons > *:not(:last-child)  {
		display: block;
	}
}

@media only screen and (max-width: 768px) {
	.menu-list {
		width: 70%;
	}
}

@media only screen and (max-width: 640px) {
	#header {
		margin-bottom: 2.5rem;
	}

	.app-desc {
		display: none;
	}

	.app-detail {
		padding-top: 0;
	}

	#header {
		padding: 1rem 0 0 0;
	}
}

@media only screen and (max-width: 580px) {
	.app-logo {
		min-width: 2.5rem;
		max-width: 2.5rem;
		min-height: 2.5rem;
		max-height: 2.5rem;
	}

	.app-logo img {
		top: calc(50% - 1.25rem);
		left: calc(50% - 1.25rem);
	}
}

@media only screen and (max-width: 480px) {
	.menu-list {
		width: 95%;
	}
}
</style>
