<template>
    <div id='watchlist'>
        <p>
            There are some services that don't currently have such encryption but plan to itegrate it into their products. 
            These services either have encryption as a current beta feature or as a likely future feature on their roadmap.
            They can be accessed on this page.
            This list is also accessible anywhere else from the "Pages" dropdown in the navigation menu under "Watchlist". 
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
    name: 'Watchlist',
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

#watchlist {
    padding: .5rem;
}

#watchlist p {
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
	#watchlist {
        padding: 1rem .25rem;
	}

    #watchlist p {
        width: 95%;
        text-align: justify;
	}
}
</style>
