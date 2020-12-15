<template>
	<div class="product">
		<div class="product-info">
			<div class="product-logo">
				<img :src="product.img" alt="Product Logo" />
			</div>
			<div class="product-detail">
				<h3 class="product-name">{{ product.name }}</h3>
				<p class="product-desc">{{ product.desc }}</p>
				<!-- <b-taglist class="product-tags">
					<b-button size="is-small" v-for="(tag, index) in product.tags" :key="index" rounded>{{ tag }}</b-button>
				</b-taglist> -->
			</div>
			<a target="_blank" rel="noopener" :href="product.url" class="product-link">
				<b-button>
					<i class="gg-external"></i>
				</b-button>
			</a>
		</div>
		<b-taglist class="product-tags">
			<b-button size="is-small" v-for="(tag, index) in product.tags" :key="index" rounded>{{ tag }}</b-button>
		</b-taglist>
	</div>
</template>

<script>
export default {
  name: "Product",
  props: ["product"],
  data() {
    return {
      value: "",
    };
  },
  methods: {
	// truncateText: function(str, max, suffix) {
	// 	str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;
	// }
  },
};
</script>

<style scoped>
* {
  outline: none;
  /* border: 0.1px solid red; */
}

button:hover,
button:focus,
button:active {
  outline: none;
  /* border: 0.1px solid red; */
}

.product {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: var(--background-color);
	border-bottom: 2px solid var(--wrapper-border-color);
	padding: 0.75rem 0;
}

.product:last-child {
	border: none;
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
	color: #1a202c;
}

.product-desc {
	color: #5d6470;
	line-height: 1.5;
	font-size: 0.9rem;
}

.product-info * {
	color: var(--text-color);
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
	background-color: #f1c61b;
	color: #000;
}

.product-tags {
	padding: .5rem 0;
}

.product-tags button {
	margin: 0 0.5rem 0 0;
}

.gg-external {
	box-sizing: border-box;
	color: var(--text-color);
	position: relative;
	display: block;
	width: 12px;
	height: 12px;
	box-shadow:
	-2px 2px 0 0,
	-4px -4px 0 -2px,
	4px 4px 0 -2px;
	margin-left: -2px;
	margin-top: 1px;
	transform: scale(0.9);
}

.gg-external::after,
.gg-external::before {
	content: "";
	display: block;
	box-sizing: border-box;
	position: absolute;
	right: -4px
}

.gg-external::before {
	background: var(--text-color);
	transform: rotate(-45deg);
	width: 12px;
	height: 2px;
	top: 1px
}

.gg-external::after {
	width: 8px;
	height: 8px;
	border-right: 2px solid;
	border-top: 2px solid;
	top: -4px
}
</style>
