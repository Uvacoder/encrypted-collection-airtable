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
				<a title="Go To Product Website" aria-label="Go To Product Website" target="_blank" rel="noopener" :href="`${product.url}?ref=EncryptedList`">
					<app-external-icon></app-external-icon>
				</a>
				<a title="Show Alternative" aria-label="Show Alternative" target="_blank" rel="noopener" :href="`${product.url}?ref=EncryptedList`">
					<app-back-icon></app-back-icon>
				</a>
			</div>
		</div>
		<div class="product-tags">
			<app-button-tag
				v-for="(tag, index) in product.tags.slice(1)" 
				:key="index" 
				:value="tag"
				@clicked="filterWith(tag)"
				:class="{ 'warn' : tag === 'opt-in' }"
				:title="(tag === 'opt-in') ? 'Beware!' : ''"
			>{{ tag }}</app-button-tag>
		</div>
		<div class="product-alternatives">
			<p>An alternative to:</p>
			<div class="alt">
				<img src="img (1).png" alt="logo">
				<p>Trello</p>
			</div>
			<div class="alt">
				<img src="img (1).png" alt="logo">
				<p>Slack</p>
			</div>
			<div class="alt">
				<img src="img (1).png" alt="logo">
				<p>Teams</p>
			</div>
		</div>
	</div>
</template>

<script>
import ButtonTag from "./ButtonTag.vue";
import BackIcon from "./icons/BackIcon.vue";
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
		appBackIcon: BackIcon,
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
	min-width: 2.5rem;
	height: 5rem;
	border-radius: 1.25rem;
	margin-left: auto;
	position: relative;
	background-color: var(--tags-bg-color);
}

.product-link > a {
	display: block;
	width: 2.5rem;
	height: 2.5rem;
	/* position: absolute; */
	/* top: calc(50% - 1.25rem);
	left: calc(50% - 1.25rem); */
	border-radius: 1.25rem;
	border: none;
	background-color: var(--background-color);
	background: transparent;
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

.product-tags .warn {
	color: #ffffff;
	background-color: var(--alternate-red-color);
}

.product-alternatives {
	width: 100%;
	min-height: 3rem;
	border-radius: .5rem;
	padding: .5rem .75rem;
	background-color: var(--tags-bg-hover-color);
	/* border: 2px solid var(--gray-border-color); */
	/* border: 2px solid var(--primary-yellow-color); */
	/* border: 2px solid #2f3741; */
	/* background-color: #2f3741; */
	margin-top: .5rem;
	/* color: #f1f3f5; */
}

.product-alternatives .alt {
	float: left;
	padding: .25rem;
	padding-right: .75rem;
	border-radius: 1.25rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 2rem;
	margin-right: .5rem;
	/* background-color: var(--current-tags-bg-hover-color); */
	background-color: var(--alternatives-bg-color);
}

.product-alternatives .alt > * {
	float: left;
}

.product-alternatives .alt img {
	height: 1.5rem;
	margin-right: .5rem;
	width: 1.5rem;
	border-radius: 50%;
}

.product-alternatives .alt > p {
	font-size: .85rem;
}

.product-alternatives > p {
	font-weight: bold;
	margin: 0;
	margin-bottom: .5rem;
	padding: 0;
}
</style>
