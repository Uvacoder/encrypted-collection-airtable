<template>
    <div id='watchlist'>
        <p>
            There are some services that don't currently have such encryption but plan to itegrate it into their products. 
            These services either have encryption as a current beta feature or as a likely future feature on their roadmap.
            They can be accessed on this page.
            This list is also accessible anywhere else from the "Pages" dropdown in the navigation menu under "Watchlist". 
            <br>
            If you find any products here that either no longer plan to offer encryption or should be in the main list, please <router-link to="/excluded">report them here <i class="gg-link"></i></router-link>.
        </p>
        <div class="product-list">
			<app-product 
				v-for="(product, index) in watchlistProducts" 
				:key="index" 
				:product="product"
				:filterable="false"
			></app-product>

            <div v-show="isFetchingData" class="no-products">
				<app-loading-icon></app-loading-icon>
				<h4>Loading...</h4>
			</div>

			<div v-show="errorFetching" class="no-products">
				<app-error-icon></app-error-icon>
				<h4>
					There was an issue getting the data.
					<br>
					Please try again soon.
				</h4>
			</div>
			
			<div 
				class="no-products"
				v-show="(watchlistProducts.length === 0) && !isFetchingData && !errorFetching" 
			>
				<app-list-icon></app-list-icon>
				<h4>This list is currently empty.</h4>
			</div>
		</div>      
    </div>
</template>


<script>
import Product from "@/components/Product";
import ListIcon from "@/components/ListIcon.vue";
import ErrorIcon from "@/components/ErrorIcon.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";

export default {
    name: 'Watchlist',
    components: {
        appProduct: Product,
        appListIcon: ListIcon,
        appErrorIcon: ErrorIcon,
		appLoadingIcon: LoadingIcon,
    },
    data() {
        return {
            watchlistProducts: [],
            isFetchingData: false,
			errorFetching: false
        }
    },
    methods: {
        // fetches and populates list from db
        fetchData() {
			this.isFetchingData = true;
			this.$http("getWatchlist")
			.then((res) => {
				return res.data;
			})
			.then((data) => {
				this.watchlistProducts = data.slice();
				this.isFetchingData = false;
			})
			.catch((err) => {
				this.errorFetching = true;
				this.isFetchingData = false;
				throw err;
			});
		},
    },
    created() {
        this.fetchData();
    }
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
    text-align: center;
    padding: 1rem;
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
