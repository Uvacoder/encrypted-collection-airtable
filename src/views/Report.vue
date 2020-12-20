<template>
    <div id='report'>
        <h3>Report Page</h3>
        <p>
            There are also some services that don't currently have such encryption but plan to itegrate it into their products. 
            These services either have encryption as a beta feature or have it on their roadmap.
            They can be accessed here.
            They are also accessible from the "Pages" dropdown in the navigation menu under "report". 
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
export default {
    name: 'Report',
    data() {
        return {}
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

#report {
    padding: .5rem;
}

#report p {
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
	#report {
        padding: 1rem .25rem;
	}

    #report p {
        width: 95%;
        text-align: justify;
	}
}
</style>
