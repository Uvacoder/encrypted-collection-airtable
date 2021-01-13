<template>
	<div class="product">
		<div class="product-info">
			<div class="product-logo">
				<picture>
					<source :srcset="product.webp_img" type="image/webp">
					<img :src="product.png_img" loading="lazy" alt="Product Logo"/>
				</picture>
			</div>
			<div class="product-detail">
				<h3 class="product-name" ref="pName" v-html="product.name"></h3>
				<p class="product-desc" ref="pDesc" v-html="product.desc"></p>
			</div>
			<div class="product-link">
				<a title="Go To Product Website" aria-label="Go To Product Website" target="_blank" rel="noopener" :href="`${product.url}/?EncryptedList`">
					<app-external-icon></app-external-icon>
				</a>
			</div>
		</div>
		<div class="product-tags">
			<app-button-tag
				v-for="(tag, index) in product.tags" 
				:key="index" 
				:value="tag"
				@clicked="filterWith(tag)"
			>{{ tag }}</app-button-tag>
		</div>
	</div>
</template>

<script>
import ButtonTag from "./ButtonTag.vue";
import ExternalIcon from "./icons/ExternalIcon.vue";

export default {
	name: "Product",
	props: {
		product: {
			type: Object,
		},
		filterable: {
			type: Boolean,
			default: true
		}
	},
    components: {
        appButtonTag: ButtonTag,
        appExternalIcon: ExternalIcon,
	},
	methods: {
		filterWith: function(q) {
			// filtering is disabled on some pages that use this component
			if (this.filterable) {
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
* {
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
	height: auto;
	display: block;
	position: absolute;
	top: calc(50% - 1.25rem);
	left: calc(50% - 1.25rem);
	border-radius: 0.25rem;
}

.product-detail {
	margin-left: 0.75rem;
	padding: 0.25rem 0.25rem 0.25rem 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-evenly;
}

.product-detail > * {
	margin: 0 0 0.5rem 0;
}

.product-name {
	font-size: 1.1rem;
	color: var(--text-color);
}

.product-desc {
	color: var(--product-desc-text-color);
	line-height: 1.5;
	font-size: 0.9rem;
}

.product-link {
	display: block;
	min-width: 3rem;
	margin-left: auto;
	position: relative;
}

.product-link > a {
	display: block;
	width: 2.5rem;
	height: 2.5rem;
	position: absolute;
	top: calc(50% - 1.25rem);
	left: calc(50% - 1.25rem);
	border-radius: 1.25rem;
	border: none;
	background-color: var(--background-color);
	color: var(--text-color);
	display: flex;
	justify-content: center;
	align-items: center;
}

.product-link > a:hover {
	background-color: var(--primary-yellow-color);
}

.product-link > a:hover > svg {
	color: var(--highlight-text-color);
}

.product-tags {
	padding: .25rem 0 0 0;
}

.product-tags button {
	margin: 0 0.5rem 0.5rem 0;
}
</style>
