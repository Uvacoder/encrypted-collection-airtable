<template>
    <div id='watchlist'>
        <app-button class="scroll-to-top">
            Top
            <i class="gg-arrow-up"></i>
        </app-button>

        <p>
            There are some services that don't currently have such encryption but plan to itegrate it into their products. 
            These services either have encryption as a current beta feature or as a likely future feature on their roadmap.
            They can be accessed on this page.
            This list is also accessible anywhere else from the "Pages" dropdown in the navigation menu under "Watchlist". 
            <br>
            If you find any products here that either no longer plan to offer encryption or should be in the main list, please <router-link to="/report">report them here <i class="gg-link"></i></router-link>.
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
import Button from "@/components/Button.vue";
import Product from "@/components/Product.vue";
import ListIcon from "@/components/ListIcon.vue";
import ErrorIcon from "@/components/ErrorIcon.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";

export default {
    name: 'Watchlist',
    components: {
        appButton: Button,
        appProduct: Product,
        appListIcon: ListIcon,
        appErrorIcon: ErrorIcon,
		appLoadingIcon: LoadingIcon,
    },
    data() {
        return {
            watchlistProducts: [],
            isFetchingData: false,
			errorFetching: false,
        }
    },
    methods: {
        // fetches and populates list from db
        fetchData(limit) {
            this.isFetchingData = true;
            let reqURL = (typeof limit !== "undefined") ? `/api/getWatchlist?limit=${limit}` : `/api/getWatchlist`;
            
			this.$http(reqURL)
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
        // scroll to top
        scroll: function() {
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
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

.gg-link {
    display: inline-block;
    margin: 0 .25rem 0 .75rem;
    transform: scale(.85) rotate(-45deg);
}

#watchlist {
    padding: .5rem;
}

#watchlist .scroll-to-top {
    width: 7rem;
    height: 3rem;
    padding: 0 1.5rem;
    border-radius: 1.5rem;
    position: fixed;
    z-index: 0;
    bottom: 1.5rem;
    left: calc(50% - 3.25rem);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, .25);
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

.product-list > :nth-last-child(4) {
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
