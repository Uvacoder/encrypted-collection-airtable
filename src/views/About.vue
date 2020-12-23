<template>
    <div id='about'>
        <p>
            EncryptedList is a list of products and services that offer <a href="https://protonmail.com/blog/what-is-end-to-end-encryption/" target="_blank" rel="noopener">end-to-end encryption <i class="gg-external"></i></a> 👈 or some form of <a href="https://tresorit.com/blog/zero-knowledge-encryption/" target="_blank" rel="noopener">zero-knowledge architecture <i class="gg-external"></i></a> 🔐.
            This can include services that either have such architecture on some of their features or that implement it fully. 
            It is based on claims made by their respective owners or companies.
            Items tagged as "open-source" are more reliable. However, not all items tagged as "open-source" are fully open source. 
            Do your research before trusting a service 🤓 and enjoy!😉.
        </p>
        <b-button tag="router-link" to="/" title="Go Home">
            Go Home
            <i class="gg-corner-right-up"></i>
        </b-button>              
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
@import url('https://css.gg/css?=|external|corner-right-up');

* {
    outline: none;
}

#about p i {
    float: none;
    display: inline-block;
    margin: 0 .25rem 0 .75rem;
    transform: scale(.75);
}

#about {
    padding: 1rem .5rem;
    font-size: 1.1rem;
}

#about p {
    width: 80%;
}

#about a {
    text-decoration: none;
    border-radius: .1rem;
    padding: 0 .25rem;
    color: var(--highlight-text-color);
    background-color: var(--primary-yellow-color);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
}

#about > a[title] {
    width: 9rem;
	height: auto;
	padding: .75rem;
	border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);	
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
	margin: 1rem 0;
    display: block;
}

#about > a[title]:hover {
	color: var(--text-color);
	border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);
}

#about > a i {
    margin-left: 0.5rem;
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
