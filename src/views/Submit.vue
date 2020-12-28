<template>
    <div id='submit'>
        <p>
            If you discovered any products that aren't in the list, you can <mark class="highlight">submit</mark> one through this page.
            Use this page for new submissions and <router-link to="/report">the report page <i class="gg-link"></i></router-link> to report already existing products.
            I'll review the submission and add the product ASAP.
        </p>     
    </div>
</template>


<script>
export default {
    name: 'Submit'
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

#submit {
    padding: .5rem;
}

#submit p {
    font-size: 1.1rem;
    width: 80%;
    text-align: center;
    margin: 0 auto;
}

#submit a {
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

@media only screen and (max-width: 768px) {
    /* code */
}

@media only screen and (max-width: 480px) {
	#submit {
        padding: 1rem .25rem;
	}

    #submit p {
        width: 95%;
        text-align: left;
	}
}
</style>
