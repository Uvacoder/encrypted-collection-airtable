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
				v-show="(excludedProducts.length === 0) && !isFetchingData && !errorFetching" 
			>
				<app-list-icon></app-list-icon>
				<h4>This list is currently empty.</h4>
			</div>
		</div>      
    </div>
</template>


<script>
import { isDefined } from '@/scripts/helpers';
import Product from "@/components/Product";
import ListIcon from "@/components/ListIcon.vue";
import ErrorIcon from "@/components/ErrorIcon.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";

export default {
    name: 'Excluded',
    components: {
        appProduct: Product,
        appListIcon: ListIcon,
        appErrorIcon: ErrorIcon,
		appLoadingIcon: LoadingIcon,
    },
    data() {
        return {
            excludedProducts: [],
            isFetchingData: false,
			errorFetching: false
        }
    },
    methods: {
        // fetches and populates list from db
        fetchData(limit) {
			this.isFetchingData = true;
            let reqURL = isDefined(limit) ? `/api/getExcluded?limit=${limit}` : `/api/getExcluded`;
            
			this.$http(reqURL)
			.then((res) => {
				return res.data;
			})
			.then((data) => {
				this.excludedProducts = data.slice();
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

.gg-link {
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

.product-list > :nth-last-child(4) {
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
