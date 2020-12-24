<template>
    <div id='watchlist'>
        <p>
            There are some services that don't currently have such encryption but plan to itegrate it into their products. 
            These services either have encryption as a current beta feature or as a likely future feature on their roadmap.
            They can be accessed on this page.
            This list is also accessible anywhere else from the "Pages" dropdown in the navigation menu under "Watchlist". 
            <br>
            If you find any products here that either no longer plan to offer encryption or should be in the main list, please report them <router-link to="/excluded">here <i class="gg-link"></i></router-link>.
        </p>
        <div class="product-list">
			<app-product 
				v-for="(product, index) in allProducts" 
				:key="index" 
				:product="product"
				:filterable="false"
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
            allProducts: [],
        }
    },
    methods: {
        // fetches and populates list from db
        populateList: function() {
            // fetch and populate
        },
        // async fetchData() {
		// 	await this.$http("getWatchlist")
		// 	.then((res) => {
		// 		// console.log(res);
		// 		return res.data;
		// 	})
		// 	.then((data) => {
		// 		// console.log(data);
		// 		this.allProducts = [...data];
		// 	})
		// 	.catch((err) => console.log(err));
		// },
    },
    mounted() {
        // this.fetchData();
    }
}
</script>


<style scoped>
@import url('https://css.gg/css?=|link');

* {
    outline: none;
}

i {
    float: none;
    display: inline-block;
    margin: 0 .25rem 0 .75rem;
    transform: scale(.85) rotate(-45deg);
}

#watchlist {
    padding: .5rem;
}

#watchlist p {
    font-size: 1.1rem;
    width: 80%;
    text-align: center;
    margin: 0 auto;
}

#watchlist a {
    text-decoration: none;
    border-radius: .1rem;
    padding: 0 .25rem;
    color: var(--highlight-text-color);
    background-color: var(--primary-yellow-color);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
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
        text-align: left;
	}
}
</style>
