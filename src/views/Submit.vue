<template>
    <div id='submit'>
        <h3>Submission Page</h3>
        <p>
            There are also some services that don't currently have such encryption but plan to itegrate it into their products. 
            These services either have encryption as a beta feature or have it on their roadmap.
            They can be accessed here.
            They are also accessible from the "Pages" dropdown in the navigation menu under "submit". 
        </p>     
    </div>
</template>


<script>
export default {
    name: 'Submit',
    data() {
        return {}
    },
    methods: {
        // fetches and populates list from db
        populateList: function() {
            // fetch and populate
        }
    }
}
</script>


<style scoped>
* {
    outline: none;
}

#submit {
    padding: .5rem;
}

#submit p {
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
	#submit {
        padding: 1rem .25rem;
	}

    #submit p {
        width: 95%;
        text-align: justify;
	}
}
</style>
