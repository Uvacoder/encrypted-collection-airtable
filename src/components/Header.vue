<template>
	<nav id="header">
		<router-link class="app-info nav-left" ref="navLeft" :to="{ path: '/' }">
			<div class="app-logo">
				<picture>
					<source srcset="https://res.cloudinary.com/minch/image/upload/w_60/v1609226799/EncryptedList/logo_ymk6dg.webp" type="image/webp">
					<img src="https://res.cloudinary.com/minch/image/upload/w_60/v1609227018/EncryptedList/logo_ykncom.png" alt="EncryptedList Logo"/>
				</picture>
			</div>
			<div class="app-detail">
				<h3 class="app-name">
					{{ headerTitle }}
					<span title="Work In Progress">(WIP)</span>
				</h3>
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
				<app-sun-icon v-if="darkMode"></app-sun-icon>
				<app-moon-icon v-else></app-moon-icon>
			</app-button>

			<app-button
				class="give-feedback"
				:iconButton="true" 
				:label="'Give Feedback'"
				@clicked="toggleFeedback(1)"
			>
				<app-smile-icon></app-smile-icon>
			</app-button>

			<app-button
				class="show-pages"
				@clicked="toggleMenu(1)"
				:label="'Show List of Pages'"
			>
				Menu
				<app-menu-alt-icon></app-menu-alt-icon>
			</app-button>
			
			<app-button
				class="toggle-menu"
				:iconButton="true" 
				@clicked="toggleMenu(1)"
				:label="'Toggle Menu'"
			>
				<app-menu-icon></app-menu-icon>
			</app-button>
		</div>

		<div class="overlay" ref="Overlay" @click="toggleMenu(0); toggleFeedback(0)"></div>

		<form 
			method="POST"
			name="feedback"
			data-netlify="true"
			ref="FeedbackModal"
			class="feedback-modal" 
			data-netlify-honeypot="bot-field"
			@submit.prevent="sendFeedback"
		>
			<input type="hidden" name="form-name" value="feedback" />

			<h3>
				Do you like this website?
			</h3>
				
			<div>
				<app-button
					:label="'Yes'"
					type="'submit'"
					name="Feedback:"
					value="I like this product."
				>
					Yes 👍
				</app-button>
				
				<app-button
					:label="'No'"
					type="'submit'"
					name="Feedback:"
					value="I don't like this product."
				>
					No 👎
				</app-button>
			</div>
		</form>
		
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
						<app-sun-icon v-if="darkMode"></app-sun-icon>
						<app-moon-icon v-else></app-moon-icon>
					</app-button>

					<app-button
						class="give-feedback"
						:iconButton="true" 
						:label="'Give Feedback'"
						@clicked="toggleFeedback(1)"
					>
						<app-smile-icon></app-smile-icon>
					</app-button>

					<app-button
						class="hide-pages"
						:iconButton="true"
						:label="'Hide List of Pages'"
						@clicked="toggleMenu(0)"
					>
						<app-menu-alt-icon></app-menu-alt-icon>
					</app-button>
				</div>
			</div>
			
			<app-button-link
				:path="'/about'"
				:label="'Go to About Page'"
				@clicked="toggleMenu(0)" 
			>
				About
				<app-info-icon></app-info-icon>
			</app-button-link>
			
			<app-button-link
				:path="'/submit'"
				@clicked="toggleMenu(0)" 
				:label="'Go to Submission Page'"
			>
				Submit
				<app-add-icon></app-add-icon>
			</app-button-link> 

			<app-button-link
				:path="'/report'"
				:label="'Go to Report Page'"
				@clicked="toggleMenu(0)" 
			>
				Report
				<app-danger-icon></app-danger-icon>
			</app-button-link>
						
			<app-button-link
				:path="'/watchlist'"
				:label="'Go to Watchlist Page'"
				@clicked="toggleMenu(0)" 
			>
				Watchlist
				<app-eye-icon></app-eye-icon>
			</app-button-link>

			<app-button-link
				:path="'/excluded'"
				@clicked="toggleMenu(0)" 
				:label="'Go to Excluded Products Page'"
			>
				Excluded List
				<app-unavailable-icon></app-unavailable-icon>
			</app-button-link>      
		</div>
	</nav>
</template>

<script>
import Button from "./Button.vue";
import ButtonLink from "./ButtonLink.vue";
import AddIcon from "./icons/AddIcon.vue";
import EyeIcon from "./icons/EyeIcon.vue";
import SunIcon from "./icons/SunIcon.vue";
import MoonIcon from "./icons/MoonIcon.vue";
import MenuIcon from "./icons/MenuIcon.vue";
import InfoIcon from "./icons/InfoIcon.vue";
import SmileIcon from "./icons/SmileIcon.vue";
import DangerIcon from "./icons/DangerIcon.vue";
import MenuAltIcon from "./icons/MenuAltIcon.vue";
import UnavailableIcon from "./icons/UnavailableIcon.vue";

export default {
	name: "Header",
	props: ["darkTheme"],
	components: {
		appButton: Button,		
		appAddIcon: AddIcon,		
		appEyeIcon: EyeIcon,
		appSunIcon: SunIcon,
		appMoonIcon: MoonIcon,
		appMenuIcon: MenuIcon,
		appInfoIcon: InfoIcon,
		appSmileIcon: SmileIcon,
		appDangerIcon: DangerIcon,
		appButtonLink: ButtonLink,
		appMenuAltIcon: MenuAltIcon,
		appUnavailableIcon: UnavailableIcon,
	},
	data() {
		return {
			darkMode: this.darkTheme,
			form: {
				
			}
		}
	},
	methods: {
		// emit theme change to main component
		emitThemeChange: function() {
			this.darkMode = !this.darkMode;
			this.$emit('theme-change');
		},
		// toggle overlay visibility
		toggleOverlay: function(toggle) {
			if (toggle === 0) { // hide overlay
				this.$refs.Overlay.style.setProperty("visibility", "hidden");
			} else if (toggle === 1) { // show overlay
				this.$refs.Overlay.style.setProperty("visibility", "visible");
			}
		},
		// toggle side menu visibility
        toggleMenu: function(toggle) {
			if (toggle === 0) { // hide side menu
				this.toggleOverlay(toggle)
				this.$refs.MenuList.style.setProperty("transform", "translateX(100%)");
			} else if (toggle === 1) { // show side menu
				this.toggleOverlay(toggle)
				this.$refs.MenuList.style.setProperty("transform", "translateX(0)");
			}
		},
		// toggle feedback modal visibility
        toggleFeedback: function(toggle) {
			if (toggle === 0) { // hide feedback modal
				this.toggleOverlay(toggle);
				this.$refs.FeedbackModal.style.setProperty("visibility", "hidden");
			} else if (toggle === 1) { // show feedback modal
				this.toggleMenu(0);
				this.toggleOverlay(toggle);
				this.$refs.FeedbackModal.style.setProperty("visibility", "visible");
			}
		},
		encode: function(data) {
            return Object.keys(data)
                .map(
                key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
                )
                .join("&");
		},
		
        sendFeedback: function() {
            const axiosConfig = {
                header: { "Content-Type": "application/x-www-form-urlencoded" }
            };

            this.$http.post(
                "/",
                this.encode({
                    "form-name": "feedback",
                    ...this.form
                }),
                axiosConfig
            )
			.then(() => {
                this.$router.push({ name: "Success" });
			})
			.catch(() => {
                this.$router.push({ name: "Failure" });
			});
        },
	},
	computed: {
		headerTitle: function() {
			return this.$store.state.headerTitle;
		},
	},
	watch: {
		darkTheme: function(value) {
			this.darkMode = value;
		},
	}
};
</script>

<style scoped>
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
	justify-content: flex-start;
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

.app-name > span{
	color: var(--placeholder-text-color);
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

.nav-buttons > .give-feedback,
.menu-list .header .menu-list-buttons > .give-feedback {
	background-color: var(--yellow-black-bg-color);
	border-color:  var(--yellow-black-border-color);
}

.nav-buttons > .toggle-menu {
	width: 2.5rem;
	border: none;
	display: none;
}

.overlay {
	width: 100%;
	height: 100vh;
	z-index: 2;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, .75);
	visibility: hidden;
}

.feedback-modal {
    width: 28rem;
    height: 13rem;
	z-index: 2;
    position: fixed;
    top: calc(50% - 6.5rem);
    left: calc(50% - 14rem);
	visibility: hidden;
	border-radius: .65rem;
	text-align: center;
	padding: 2rem 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
    background-color: var(--background-color);
    border: 3px solid var(--gray-border-color);
	transition: all 0.2s ease-out, color 0s, background-color 0s;
	-moz-transition: all 0.2s ease-out, color 0s, background-color 0s;
	-webkit-transition: all 0.2s ease-out, color 0s, background-color 0s;
}

.feedback-modal h3 {
	margin: 0;
}

.feedback-modal button {
	width: 6rem;
	display: inline-block;
}

.feedback-modal button:first-of-type {
	margin-right: 3rem;
}

.menu-list {
    width: 45%;
    height: 100vh;
	z-index: 2;
    position: fixed;
    top: 0;
    right: 0;
	padding-top: 1rem;
	transform: translateX(100%);
    background-color: var(--background-color);
    border-left: 3px solid var(--gray-border-color);
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
	color: var(--text-color);
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

.menu-list > a svg {
	width: 1.25rem;
	height: 1.25rem;
}

.nav-buttons > .show-pages svg {
	margin-left: .5rem;
}

@media only screen and (max-width: 840px) {
	.nav-buttons > .show-pages,
	.nav-buttons > .change-theme,	
	.nav-buttons > .give-feedback {
		display: none;
	}

	.nav-buttons > .toggle-menu {
		display: flex;
	}

	.menu-list .header .mobile-header-title {
		display: block;
	}

	.menu-list .header .desktop-header-title {
		display: none;
	}

	.menu-list .header .menu-list-buttons > *:not(:last-child)  {
		display: flex;
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

	.feedback-modal {
		width: 100%;
		border-radius: 0;
		left: 0;
	}
}
</style>
