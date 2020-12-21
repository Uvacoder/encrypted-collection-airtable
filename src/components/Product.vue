<template>
	<div class="product">
		<div class="product-info">
			<div class="product-logo">
				<img :src="product.img" loading="lazy" alt="Product Logo" />
			</div>
			<div class="product-detail">
				<h3 class="product-name" ref="pName" v-html="product.name"></h3>
				<p class="product-desc" ref="pDesc" v-html="product.desc"></p>
			</div>
			<a target="_blank" rel="noopener" :href="product.url" class="product-link">
				<b-button>
					<i class="gg-external"></i>
				</b-button>
			</a>
		</div>
		<b-taglist class="product-tags">
			<b-button 
				size="is-small" 
				v-for="(tag, index) in product.tags" 
				:key="index" 
				rounded
				@click="filterWith(tag)"
			>{{ tag }}</b-button>
		</b-taglist>
	</div>
</template>

<script>
export default {
	name: "Product",
	props: ["product", "filterDisabled"],
	data() {
		return {}
	},
	methods: {
		filterWith: function(q) {
			// filtering is disabled on some pages that use this component
			if (!this.filterDisabled) {
				let query = Object.assign({}, this.$route.query);

				if (query.t !== q) {
					// needs to be here to avoid redundant navigation error
					this.$router.push({ query: Object.assign({}, this.$route.query, { t : q }) });
				}
			}

		},
	},
};
</script>

<style scoped>
@import url('https://css.gg/css?=|external');

* {
  outline: none;
}

button:hover,
button:focus,
button:active {
  outline: none;
}

.product {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: var(--background-color);
	border-bottom: 2px solid var(--product-border-color);
	padding: 0.75rem 0;
}

.last-product {
	border: none !important;
}

.product-info {
	width: 100%;
	background-color: var(--background-color);
	color: var(--text-color);
	display: flex;
	margin-bottom: 0.25rem;
}

.product-logo {
	min-width: 3rem;
	position: relative;
}

.product-logo img {
	width: 2.5rem;
	height: 2.5rem;
	display: block;
	position: absolute;
	top: calc(50% - 1.25rem);
	left: calc(50% - 1.25rem);
	border-radius: 0.5rem;
}

.product-detail {
	margin-left: 0.75rem;
	padding: 0.25rem 0.25rem 0.25rem 0.5rem;
	display: flex;
	flex-direction: column;
}

.product-detail > * {
	margin-bottom: 0.25rem;
}

.product-name {
	font-size: 1.15rem;
	color: var(--text-color);
}

.product-desc {
	color: var(--product-desc-text-color);
	line-height: 1.5;
	font-size: 0.9rem;
}

.product-link {
	min-width: 3rem;
	margin-left: auto;
	position: relative;
}

.product-link button {
	width: 2.5rem;
	height: 2.5rem;
	position: absolute;
	top: calc(50% - 1.25rem);
	left: calc(50% - 1.25rem);
	border-radius: 1.25rem;
	border: none;
	background-color: var(--background-color);
	color: var(--text-color);
}

.product-link:hover button {
	background-color: var(--primary-yellow-color);
	color: #000;
}

.product-tags {
	padding: .5rem 0 0 0;
}

.product-tags button {
	margin: 0 0.5rem 0.5rem 0;
}

.gg-external {
	color: var(--text-color);
	transform: scale(0.9);
}

.gg-external::before {
	background: var(--text-color);
}
</style>
