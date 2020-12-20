<template>
	<b-navbar id="header" :close-on-click="false">
		<template slot="brand">
			<b-navbar-item class="app-info nav-left" ref="navLeft" tag="router-link" :to="{ path: '/' }">
				<div class="app-logo">
					<img src="../assets/logo.svg" alt="EncryptedList Logo" />
				</div>
				<div class="app-detail">
				<h3 class="app-name">EncryptedList</h3>
				<p class="app-desc">
					List of services that offer zero-knowledge or end-to-end encryption 🔐.
				</p>
				</div>
			</b-navbar-item>
		</template>
		
		<template slot="end">
            <b-navbar-item tag="div" ref="navRight" class="nav-right">
                <div class="buttons">
                    <b-button tag="router-link" to="/about" title="About this project">
						About
						<i class="gg-info"></i>
					</b-button>
					<b-dropdown aria-role="list" title="List of pages">
						<button class="button" slot="trigger">
							<span>Pages</span>
							<i class="gg-file-document"></i>
						</button>

						<b-dropdown-item has-link aria-role="listitem" title="Report a bug or flag a product">
							<router-link to="/report">
								<span class="page-icons"><i class="gg-danger"></i></span>
								Report
							</router-link>
						</b-dropdown-item>
						<b-dropdown-item has-link aria-role="listitem" title="Submit a Product">
							<router-link to="/submit">
								<span class="page-icons"><i class="gg-add"></i></span>
								Submit
							</router-link>
						</b-dropdown-item>
						<b-dropdown-item has-link aria-role="listitem" title="Show excluded products">
							<router-link to="/excluded">
								<span class="page-icons"><i class="gg-unavailable"></i></span>
								Excluded
							</router-link>
						</b-dropdown-item>
						<b-dropdown-item has-link aria-role="listitem" title="Products on the watchlist">
							<router-link to="/watchlist">
								<span class="page-icons"><i class="gg-eye"></i></span>
								Watchlist
							</router-link>
						</b-dropdown-item>
					</b-dropdown>
                    <b-button @click="emitThemeChange" title="Change Theme">
						<i v-if="darkMode" class="gg-sun"></i>
						<i v-else class="gg-moon"></i>
					</b-button>
                </div>
            </b-navbar-item>
        </template>
	</b-navbar>
</template>

<script>
export default {
	name: "Header",
	data() {
		return {
			darkMode: false,
			navMenus: {}
		};
	},
	methods: {
		// emit theme change to main component
		emitThemeChange: function() {
			this.darkMode = !this.darkMode;
			this.$emit('theme-change');
		},
		// set some CSS styles for nav menu items with JS
		setNavMenuStyle: function() {
			this.navMenus.style.background = "transparent";
			this.navMenus.childNodes[1].childNodes[0].style.padding = ".5rem 0";

			if (
				window.innerWidth < 1024
			) {
				this.navMenus.style.boxShadow = "none";
				this.navMenus.style.marginTop = "0.5rem";
				this.hamburger.style.borderRadius = "0.5rem";
			} else {
				this.navMenus.style.border = "none";
				this.navMenus.style.paddingLeft = "0";
			}
		}
	},
	mounted() {
		// Stylize some Buefy components because they are inaccessible from CSS
		let grayBgColor = getComputedStyle(document.documentElement).getPropertyValue('--gray-bg-color');

		this.hamburger = this.$refs.navLeft.$el.nextSibling;
		this.navMenus = this.$refs.navRight.$el.parentElement.parentElement;
		this.hamburger.childNodes.forEach(node => {
			node.style.backgroundColor = grayBgColor;
		})

		this.setNavMenuStyle();
		window.addEventListener('resize', () => {
			this.setNavMenuStyle();
		});
	},
};
</script>

<style>
@import url('https://css.gg/css?=|sun|moon|add|danger|info|unavailable|eye|file-document');

:root {
	--ggs: 0.8;
}

* {
	outline: none;
}

i {
	float: right;
	margin-left: 0.5rem;
}

#header {
	width: 100%;
	padding: 1rem 0;
	margin-bottom: 1rem;
	background-color: var(--background-color);
}

.app-info {
	padding: 0.5rem;
	display: flex;
}

.app-logo {
	min-width: 4rem;
	min-height: 4rem;
	position: relative;
}

.app-logo img {
	min-width: 100%;
	min-height: 100%;
	background-color: #fff;
	display: block;
	position: absolute;
	top: calc(50% - 2rem);
	left: calc(50% - 2rem);
	border-radius: 50%;
	box-shadow: 1px 1px 5px var(--lightgray-bg-color);
}

html[data-theme='dark'] .app-logo img {
	box-shadow: none;
}

.app-detail {
	margin-left: 1rem;
	padding-top: 0.25rem;
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

.nav-right {
	padding-right: 0;
}

.buttons {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end !important;
}

.buttons > * {
	border-radius: .5rem;
	height: 2.5rem;
}

.buttons > a,
.buttons > div button,
.buttons > button {
	/* padding: 0 1rem 0 1rem; */
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
	margin-left: .5rem;
	margin-right: 0;
}

.buttons > button:last-of-type {
	padding: .75rem;
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
}

@media only screen and (max-width: 1023px) {
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
		min-width: 2.5rem;
		min-height: 2.5rem;
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
}
</style>
