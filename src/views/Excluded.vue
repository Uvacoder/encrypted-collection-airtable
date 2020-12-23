<template>
    <div id='excluded'>
        <p>
            Due to inactive development, discontinuation or lack of activity in general, some services are excluded from the main list.
            You can browse this list of excluded products on this page, but <mark class="highlight">do your research</mark> before trusting any.
            This list is also accessible anywhere else from the "Pages" dropdown in the navigation menu under "Excluded".
            <br>
            If you find any products here that should be in the main list, please report them <router-link to="/report">here <i class="gg-link"></i></router-link>.
        </p> 
        <div class="product-list">
			<app-product 
				v-for="(product, index) in allProducts" 
				:key="index" 
				:product="product"
				:filterDisabled="true"
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
            allProducts: [],
        }
    },
    methods: {
        // fetches and populates list from db
        populateList: function() {
            // fetch and populate
        },
        async fetchData() {
			await this.$http("getExcluded")
			.then((res) => {
                return res.data;
			})
			.then((data) => {
				// console.log(data);
				this.allProducts = [...data];
			})
			.catch((err) => console.log(err));
		},
    },
    mounted() {
        this.fetchData();
    },
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

#excluded {
    padding: 1rem .5rem;
}

#excluded p {
    font-size: 1.1rem;
    width: 80%;
    text-align: center;
    margin: 0 auto;
}

#excluded a {
    text-decoration: none;
    border-radius: .1rem;
    padding: 0 .25rem;
    color: var(--highlight-text-color);
    background-color: var(--primary-yellow-color);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
}

.highlight {
    border-radius: .1rem;
    padding: 0 .25rem;
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
        text-align: left;
	}
}
</style>
