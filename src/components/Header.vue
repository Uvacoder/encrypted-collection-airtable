<template>
	<b-navbar id="header">
		<template slot="brand">
			<b-navbar-item class="app-info">
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
            <b-navbar-item tag="div">
                <div class="buttons">
					<b-button class="field toggle">
						<b-switch 
							v-model="lightMode"
							passive-type='is-dark'
							type='is-warning'>
							🌗
						</b-switch>
					</b-button>
                    <b-button @click="clickMe">Submit +</b-button>
					<b-button @click="clickMe">Report ⚠</b-button>
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
			lightMode: false,
		};
	},
	methods: {
		clickMe: function() {
			console.log('header btn');
		}
	},
};
</script>

<style scoped>
* {
	outline: none;
}

#header {
	width: 100%;
	padding: 1rem 0;
	margin: 1rem 0;
}

.app-info {
	/* max-width: 32rem; */
	padding: 0.5rem;
	/* background-color: #fff; */
	display: flex;
}

* {
	/* border: 0.1px solid red; */
}

.app-logo {
	min-width: 4rem;
	min-height: 4rem;
	position: relative;
}

.app-logo img {
	max-width: 4rem;
	max-height: 4rem;
	display: block;
	position: absolute;
	top: calc(50% - 2rem);
	left: calc(50% - 2rem);
	border-radius: 50%;
	box-shadow: 1px 1px 5px #bbbbbb;
}

.app-detail {
	margin-left: 1rem;
	padding-top: 0.25rem;
}

.app-name {
	font-size: 1.25rem;
	color: #1a202c;
	line-height: 1.25;
	margin: 0.25rem;
}
.app-desc {
	color: #718096;
	line-height: 1.5;
	font-size: 1rem;
	margin: 0.25rem;
	max-width: 320px;
}

.toggle {
	display: flex;
	justify-content: center;
	align-items: center;
}

.btn-submit {
	background-color: #06d6a0;
}
.btn-report {
	background-color: #f85524;
}
.btn-theme {
	background-color: #edf2f4;
}
</style>
