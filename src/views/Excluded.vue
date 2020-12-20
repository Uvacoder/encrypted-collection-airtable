<template>
    <div id='excluded'>
        <p>
            Due to inactive development, discontinuation or lack of activity in general, some services are excluded from the main list.
            You can browse this list of excluded products on this page, but be careful trusting them.
            This list is also accessible anywhere else from the "Pages" dropdown in the navigation menu under "Excluded". 
        </p> 
        <div class="product-list">
			<app-product 
				v-for="(product, index) in allProducts" 
				:key="index" 
				:product="product"
				:class="{ 'last-product' : (index === allProducts.length - 1)}"
			></app-product>
		</div>      
    </div>
</template>


<script>
import Product from "@/components/Product";

export default {
    name: 'Excluded',
    components: {
        appProduct: Product,
    },
    data() {
        return {
            allProducts: [
				{
					name: "Buttercup",
					desc: "A free, secure and open-source password manager.",
					url: "https://buttercup.pw/",
					tags: ["tag1", "tag9", "tag3", "tag1", "tag9", "tag1", "tag9", "tag1", "tag9"],
					categories: ["cat1", "cat2", "cat3"],
					img: "https://avatars3.githubusercontent.com/u/16577796?s=200&v=4",
				},
				{
					name: "Signal",
					desc: "Fast, simple, and secure messaging.",
					url: "https://signal.org",
					tags: ["open-source", "cross-platform", "free"],
					categories: ["Communication"],
					img: "https://avatars1.githubusercontent.com/u/702459?s=200&v=4",
				},
				{
					name: "Briefing",
					desc: "Secure direct group video chat",
					url: "https://brie.fi/ng",
					tags: ["tag7", "tag8", "tag9","tag7", "tag8","tag7", "tag8","tag7", "tag8"],
					categories: ["cat7", "cat8", "cat1"],
					img: "https://brie.fi/apple-touch-icon.png",
				},
			],
        }
    },
    methods: {
        // fetches and populates list from db
        populateList: function() {
            // fetch and populate
        }
    },
    beforeRouteEnter(to, from, next) {
        console.log(to);
        console.log(from);
        next();
    }
}
</script>


<style scoped>
* {
    outline: none;
}

#excluded {
    padding: 1rem .5rem;
}

#excluded p {
    width: 80%;
    text-align: center;
    margin: 0 auto;
}

.product-list {
	width: 85%;
    margin: 2rem auto;
}

@media only screen and (max-width: 768px) {
    .product-list {
        width: 100%;
    }
}

@media only screen and (max-width: 480px) {
	#excluded {
        padding: 1rem .25rem;
	}

    #excluded p {
        width: 95%;
        text-align: justify;
	}
}
</style>
