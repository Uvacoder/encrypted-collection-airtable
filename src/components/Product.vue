<template>
	<div class="product-info">
		<div class="product-logo">
			<img :src="product.img" alt="Product Logo" />
		</div>
		<div class="product-detail">
			<h3 class="product-name">{{ product.name }}</h3>
			<p class="product-desc">{{ product.desc }}</p>
			<b-taglist class="product-tags">
				<b-button size="is-small" v-for="(tag, index) in product.tags" :key="index" rounded>{{ tag }}</b-button>
			</b-taglist>
		</div>
		<a target="_blank" rel="noopener" :href="product.url" class="product-link">
			<b-button>
				<i class="gg-external"></i>
			</b-button>
		</a>
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

.product-info {
  max-width: 100%;
  padding: 0.15rem 1rem 0.75rem 1rem;
  background-color: #fff;
  border-bottom: 2px solid rgb(219, 219, 219);
  display: flex;
  margin: 0.25rem auto;
}

.product-info:last-child {
  border: none;
}

.product-logo {
  min-width: 4rem;
  position: relative;
}

.product-logo img {
  width: 3.5rem;
  height: 3.5rem;
  display: block;
  position: absolute;
  top: calc(50% - 1.75rem);
  left: calc(50% - 1.75rem);
  border-radius: 0.5rem;
}

.product-detail {
  margin-left: 0.75rem;
  padding-top: 0.25rem;
}

.product-detail > * {
  margin: 0.5rem;
}

.product-name {
  font-size: 1.25rem;
  color: #1a202c;
}

.product-desc {
  color: #5d6470;
  line-height: 1.5;
  font-size: 1rem;
}

.product-link {
  min-width: 4rem;
  margin-left: auto;
  position: relative;
  /* display: block; */
}

.product-link button {
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: calc(50% - 2rem);
  left: calc(50% - 2rem);
  border-radius: 2rem;
  border: none;
}

.product-link:hover button {
  background-color: rgb(219, 219, 219);
}

.gg-external {
	box-sizing: border-box;
	position: relative;
	display: block;
	transform: scale(var(--ggs,1));
	width: 12px;
	height: 12px;
	box-shadow:
	-2px 2px 0 0,
	-4px -4px 0 -2px,
	4px 4px 0 -2px;
	margin-left: -2px;
	margin-top: 1px
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
	background: currentColor;
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

.tags button {
	
}
</style>
