<template>
    <div id='excluded'>
        <p>
            Due to inactive development, discontinuation or lack of activity in general, some services are excluded from the main list.
            You can browse this list of excluded products on this page, but <mark class="highlight">do your research</mark> before trusting any.
            This list is also accessible anywhere else from the "Pages" dropdown in the navigation menu under "Excluded".
            <br>
            If you find any products here that should be in the main list, please <router-link to="/report">report them here <i class="gg-link"></i></router-link>.
        </p> 
        <div class="product-list">
			<app-product 
				v-for="(product, index) in excludedProducts" 
				:key="index" 
				:product="product"
				:filterable="false"
			></app-product>

            <div v-show="(excludedProducts.length === 0)" class="no-products">
                <app-list-icon></app-list-icon>
				<h4>This list is currently empty.</h4>
			</div>
		</div>      
    </div>
</template>


<script>
import Product from "@/components/Product";
import ListIcon from "@/components/ListIcon";

export default {
    name: 'Excluded',
    components: {
        appProduct: Product,
        appListIcon: ListIcon,
    },
    data() {
        return {
            excludedProducts: [
                {
					categories: [ "All", "Health", "Communication" ],
					desc: "Free and secure video chats for therapists.",
					img: "https://dl.airtable.com/.attachments/092f92d1abe5756195ce1cce6798b517/105592a5/jour.png",
					name: "Jour for Therapists",
					tags: [ "all", "beta", "free"],
					url: "https://therapy.jour.com/"
				},
				{
					categories: [ "All", "Health", "Communication" ],
					desc: "Free and secure video chats for therapists.",
					img: "https://dl.airtable.com/.attachments/092f92d1abe5756195ce1cce6798b517/105592a5/jour.png",
					name: "Jour for Therapists",
					tags: [ "all", "beta", "free"],
					url: "https://therapy.jour.com/"
				}
            ],
        }
    },
    methods: {
        // fetches and populates list from db
        populateList: function() {
            // fetch and populate
        },
        // async fetchData() {
		// 	await this.$http("getExcluded")
		// 	.then((res) => {
        //         return res.data;
		// 	})
		// 	.then((data) => {
		// 		// console.log(data);
		// 		this.excludedProducts = [...data];
		// 	})
		// 	.catch((err) => console.log(err));
		// },
    },
    mounted() {
        // this.fetchData();
    },
}
</script>


<style scoped>
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
	border-radius: 0.65rem;
	padding: 0 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 2.5px solid var(--gray-border-color);
	border-bottom: 5px solid var(--gray-border-color);
}

.product-list > :nth-last-child(2) {
	border: none !important;
}

.product-list .no-products {
    padding: 1rem;
    text-align: center;
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
