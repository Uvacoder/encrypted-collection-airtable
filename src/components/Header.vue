<template>
	<nav id="header">
		<!-- brief website info: logo, name, description -->
		<router-link class="app-info nav-left" ref="navLeft" :to="{ path: '/' }">
			<div class="app-logo">
				<picture>
					<source srcset="https://ik.imagekit.io/x6xq2u8ftjl/tr:h-100/encryptedlist/logo.webp" type="image/webp">
					<img src="https://ik.imagekit.io/x6xq2u8ftjl/tr:h-100/encryptedlist/logo.png" alt="Logo"/>
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
		
		<!-- main nav buttons -->
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
				@clicked="showFeedbackModal(true)"
			>
				<app-smile-icon></app-smile-icon>
			</app-button>

			<app-button
				class="show-pages"
				@clicked="showMenuList(true)"
				:label="'Show List of Pages'"
			>
				Menu
				<app-menu-alt-icon></app-menu-alt-icon>
			</app-button>
			
			<app-button
				class="toggle-menu"
				:iconButton="true" 
				@clicked="showMenuList(true)"
				:label="'Toggle Menu'"
			>
				<app-menu-icon></app-menu-icon>
			</app-button>
		</div>

		<!-- transparent overlay -->
		<div 
			@click="showOverlay(false)"
			:class="['overlay', { 'visible' : overlayVisible }]"
		></div>

		<!-- feedback modal popup -->
		<app-feedback-modal 
			:hidden="feedbackModal.hidden"
			:status="feedbackModal.status"
			@submitted="sendFeedback($event)"
			@close-modal="showFeedbackModal(false)"
		></app-feedback-modal>
		
		<!-- hidden-by-default list of menu items -->
		<div :class="['menu-list', { 'shown' : menuShown }]">
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
						@clicked="showFeedbackModal(true)"
					>
						<app-smile-icon></app-smile-icon>
					</app-button>

					<app-button
						class="hide-pages"
						:iconButton="true"
						:label="'Hide List of Pages'"
						@clicked="showMenuList(false)"
					>
						<app-menu-alt-icon></app-menu-alt-icon>
					</app-button>
				</div>
			</div>
			
			<app-button-link
				:path="'/about'"
				:label="'Go to About Page'"
				@clicked="showMenuList(false)" 
			>
				About
				<app-info-icon></app-info-icon>
			</app-button-link>
			
			<app-button-link
				:path="'/submit'"
				@clicked="showMenuList(false)" 
				:label="'Go to Submission Page'"
			>
				Submit
				<app-add-icon></app-add-icon>
			</app-button-link> 

			<app-button-link
				:path="'/report'"
				:label="'Go to Report Page'"
				@clicked="showMenuList(false)" 
			>
				Report
				<app-danger-icon></app-danger-icon>
			</app-button-link>
						
			<app-button-link
				:path="'/watchlist'"
				:label="'Go to Watchlist Page'"
				@clicked="showMenuList(false)" 
			>
				Watchlist
				<app-eye-icon></app-eye-icon>
			</app-button-link>

			<app-button-link
				:path="'/excluded'"
				@clicked="showMenuList(false)" 
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
import FeedbackModal from "./FeedbackModal.vue";
import InfoIcon from "./icons/InfoIcon.vue";
import SmileIcon from "./icons/SmileIcon.vue";
import DangerIcon from "./icons/DangerIcon.vue";
import MenuAltIcon from "./icons/MenuAltIcon.vue";
import UnavailableIcon from "./icons/UnavailableIcon.vue";

import { encode } from '@/scripts/helpers';

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
		appFeedbackModal: FeedbackModal,
		appSmileIcon: SmileIcon,
		appDangerIcon: DangerIcon,
		appButtonLink: ButtonLink,
		appMenuAltIcon: MenuAltIcon,
		appUnavailableIcon: UnavailableIcon,
	},
	data() {
		return {
			darkMode: this.darkTheme,
			feedbackModal: {
				status: 0,
				hidden: true
			},
			menuShown: false,
			overlayVisible: false
		}
	},
	methods: {
		// emit theme change to main component
		emitThemeChange: function() {
			this.darkMode = !this.darkMode;
			this.$emit('theme-change');
		},
		// toggle overlay visibility
		showOverlay: function(show) {
			this.overlayVisible = show;
		},
		// toggle side menu visibility with overlay
        showMenuList: function(show) {
			this.menuShown = show;
			this.showOverlay(show);
		},
		// toggle feedback modal visibility with overlay
		showFeedbackModal: function(show) {
			if (show) { // show
				this.showMenuList(false); // hide menu if shown
				this.feedbackModal.hidden = !show;
			}
			
			this.showOverlay(show);
		},
		// submit feedback
        sendFeedback: function($event) {
			const axiosConfig = {
                header: { "Content-Type": "application/x-www-form-urlencoded" }
			};

			// send the feedback
            this.$http.post(
                this.$route.path,
                encode({
                    "form-name": "feedback",
                    "comment": $event.target.value
                }),
                axiosConfig
            )
			.then(() => {
				// reset form and show success message
				$event.target.form.reset();
				this.feedbackModal.status = 1;
			})
			.catch(() => {
				// reset form and show failure message
				$event.target.form.reset();
				this.feedbackModal.status = 2;
			});
        },
	},
	computed: {
		headerTitle: function() {
			return this.$store.state.headerTitle;
		}
	},
	watch: {
		darkTheme: function(value) {
			this.darkMode = value;
		},
		"feedbackModal.hidden": function() {
			this.feedbackModal.status = 0;
		},
		overlayVisible: function(value) {
			if (!value) {
				this.menuShown = false;
				this.feedbackModal.hidden = true;
			}
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
	color: var(--wip-text-color);
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

.overlay.visible {
	visibility: visible;
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

.menu-list.shown {
	transform: translateX(0);
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
}
</style>
