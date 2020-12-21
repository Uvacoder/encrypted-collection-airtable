<template>
    <div id='about'>
        <p>
            EncryptedList is a list of products and services that offer <a href="https://protonmail.com/blog/what-is-end-to-end-encryption/" target="_blank" rel="noopener">end-to-end encryption</a> 👈 or some form of <a href="https://tresorit.com/blog/zero-knowledge-encryption/" target="_blank" rel="noopener">zero-knowledge architecture</a> 🔐.
            This can include services that either have encryption on some of their features or that implement it fully. 
            It is based on claims made by their respective owners or companies.
            Items tagged as "open-source" are more reliable. However, not all items tagged as "open-source" are fully open source. 
            Do your research before trusting a service 🤓 and enjoy!😉.
        </p>
        <br>
        <p>
            If you discovered any products that aren't in the list, you can submit one through <router-link to="/submit">this page</router-link>.
            If the product is already in the <router-link to="/excluded">excluded list</router-link>, and you think should be added to the main list, please list out your reason.
            I'll review the submission and add the product ASAP. <br>
            If you need to report something (like a bug, a service that don't belong, or any errors), you can do so through the <router-link to="/report">report page</router-link>.
        </p>        
    </div>
</template>


<script>
export default {
    name: 'About',
    data() {
        return {}
    }
}
</script>


<style scoped>
* {
    outline: none;
}

#about {
    padding: 1rem .5rem;
}

#about p {
    width: 80%;
}

#about a {
    text-decoration: none;
    padding: 0 .25rem;
    color: var(--highlight-text-color);
    background-color: var(--primary-yellow-color);
}

@media only screen and (max-width: 480px) {
	#about {
        padding: 1rem 1rem;
	}

    #about p {
        width: 100%;
	}
}
</style>
