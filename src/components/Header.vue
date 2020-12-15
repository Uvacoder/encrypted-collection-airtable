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
                    <b-button @click="clickMe">Submit +</b-button>
					<b-button @click="clickMe">Report ⚠</b-button>
                    <b-button @click="emitThemeChange">🌓</b-button>
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
			this.$emit('theme-change');
			// let grayBC = getComputedStyle(document.documentElement).getPropertyValue('--navbar-background-color');
			// this.navMenus.style.backgroundColor = grayBC;
		},
		setNavMenuStyle: function() {
			let grayBC = getComputedStyle(document.documentElement).getPropertyValue('--gray-bg-color');
			
			if (
				window.innerWidth < 1024
			) {
				this.navMenus.style.boxShadow = "none";
				this.navMenus.style.marginTop = "0.5rem";
				this.navMenus.style.paddingLeft = "0.75rem";
				this.navMenus.style.borderRadius = "0.5rem";
				this.hamburger.style.borderRadius = "0.5rem";
				this.navMenus.style.backgroundColor = grayBC;
				// this.navMenus.style.border = "2px solid rgb(219, 219, 219)";
			} else {
				this.navMenus.style.border = "none";
				this.navMenus.style.paddingLeft = "0";
				this.navMenus.style.borderRadius = "0";
				this.navMenus.style.backgroundColor = "";
			}
		}
	},
	mounted() {
		this.navMenus = this.$refs.navRight.$el.parentElement.parentElement;
		this.hamburger = this.$refs.navLeft.$el.nextSibling;
		console.log(this.hamburger);

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
* {
	outline: none;
}

#header {
	width: 100%;
	padding: 1rem 0;
	/* margin: 1rem 0; */
	margin-bottom: 1rem;
	background-color: var(--background-color);
}

.app-info {
	/* max-width: 32rem; */
	padding: 0.5rem;
	/* background-color: #fff; */
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
	box-shadow: 1px 1px 5px #bbbbbb;
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

/* .toggle {
	margin-right: .5rem;
	height: 40px;
	padding: 0 .5rem;
	border: 1px solid rgb(219, 219, 219);
	display: flex;
	justify-content: center;
	align-items: center;
} */

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
}

.buttons button:hover {
	color: var(--text-color);
	border: 2px solid var(--wrapper-border-color);
	border-bottom: 4px solid var(--wrapper-border-color);
}

/* @media only screen and (max-width: 580px) {

} */

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
