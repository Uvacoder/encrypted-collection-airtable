<template>
	<b-navbar id="header">
		<template slot="brand">
			<b-navbar-item class="app-info nav-left" ref="navLeft">
				<div class="app-logo">
					<img src="../assets/logo.svg" alt="EncryptedList Logo" />
				</div>
				<div class="app-detail">
				<h3 class="app-name">EncryptedList</h3>
				<p class="app-desc">
					List of services that offer end-to-end encryption and zero-knowledge encryption.
				</p>
				</div>
			</b-navbar-item>
		</template>
		
		<template slot="end">
            <b-navbar-item tag="div" ref="navRight" class="nav-right">
                <div class="buttons">
                    <b-button @click="clickMe">
						Submit
						<i class="gg-add"></i>
					</b-button>
					<b-button @click="clickMe">
						Report
						<i class="gg-flag-alt"></i>
					</b-button>
                    <b-button @click="emitThemeChange">
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
	components: {
    // appButton: Button,
	},
	data() {
		return {
			darkMode: false,
			navMenus: {}
		};
	},
	methods: {
		clickMe: function() {
			console.log('header btn');
		},
		emitThemeChange: function() {
			this.darkMode = !this.darkMode;
			this.$emit('theme-change');
			// let grayBC = getComputedStyle(document.documentElement).getPropertyValue('--navbar-background-color');
			// this.navMenus.style.backgroundColor = grayBC;
		},
		setNavMenuStyle: function() {
			// let grayBC = getComputedStyle(document.documentElement).getPropertyValue('--gray-bg-color');
			
			this.navMenus.style.background = "transparent";
			this.navMenus.childNodes[1].childNodes[0].style.padding = ".5rem 0";
			if (
				window.innerWidth < 1024
			) {
				this.navMenus.style.boxShadow = "none";
				this.navMenus.style.marginTop = "0.5rem";
				// this.navMenus.style.paddingLeft = "0";
				this.navMenus.style.borderRadius = "0.5rem";
				this.hamburger.style.borderRadius = "0.5rem";
				// this.navMenus.style.backgroundColor = grayBC;
				// this.navMenus.style.border = "2px solid rgb(219, 219, 219)";
			} else {
				this.navMenus.style.border = "none";
				this.navMenus.style.paddingLeft = "0";
				this.navMenus.style.borderRadius = "0";
			}
		}
	},
	mounted() {
		this.navMenus = this.$refs.navRight.$el.parentElement.parentElement;
		this.hamburger = this.$refs.navLeft.$el.nextSibling;
		console.log(this.navMenus);

		let grayBC = getComputedStyle(document.documentElement).getPropertyValue('--gray-bg-color');
		
		this.hamburger.childNodes.forEach(node => {
			node.style.backgroundColor = grayBC;
		})

		this.setNavMenuStyle();
		window.addEventListener('resize', () => {
			// console.log(window.innerWidth);
			// console.log(this.navMenus.classList.contains("is-active"));
			this.setNavMenuStyle();
		});

		// setTimeout(() => {
		// 	console.log(this.$refs.navRight.$el.parentElement.parentElement);
		// }, 1000);
	},
};
</script>

<style>
@import url('https://css.gg/css?=|sun|moon|add|flag-alt');

:root {
	--ggs: 0.75;
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
	/* color: #1a202c; */
	font-weight: bold;
	line-height: 1.25;
	margin: 0.25rem;
	color: var(--text-color);
}
.app-desc {
	/* color: #718096; */
	color: var(--gray-text-color);
	line-height: 1.5;
	font-size: 1rem;
	margin: 0.25rem;
	max-width: 320px;
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
	height: 2.75rem;
}

.buttons button {
	border: 2px solid var(--wrapper-border-color);
	border-bottom: 4px solid var(--wrapper-border-color);	
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
	margin: 0 .5rem 0 0 !important;
}

.buttons button:hover {
	color: var(--text-color);
	border: 2px solid var(--wrapper-border-color);
	border-bottom: 4px solid var(--wrapper-border-color);
}

.buttons button:last-of-type {
	margin: 0 !important;
}

.buttons button:last-of-type i {
	margin-left: 0;
}

@media only screen and (max-width: 1023px) {
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
