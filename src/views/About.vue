<template>
    <div id='about'>
        <p>
            EncryptedList is a list of products and services that offer <a href="https://protonmail.com/blog/what-is-end-to-end-encryption/" target="_blank" rel="noopener">end-to-end encryption <i class="gg-external"></i></a> 👈 or some form of <a href="https://tresorit.com/blog/zero-knowledge-encryption/" target="_blank" rel="noopener">zero-knowledge architecture <i class="gg-external"></i></a> 🔐.
            This can include services that either have such architecture on some of their features or that implement it fully. 
            It is based on claims made by their respective owners or companies.
            Items tagged as "open-source" are more reliable. However, not all items tagged as "open-source" are fully open source. 
            Do your research before trusting a service 🤓 and enjoy!😉.
        </p>

        <div class="links">
            <app-button-link
                :path="'/'"
                :label="'Go Home'"
            >
                Go Home
                <i class="gg-corner-right-up"></i>
            </app-button-link>   

            <a title="Go To GitHub Repo" aria-label="Go To GitHub Repo" target="_blank" rel="noopener" href="https://github.com/oneminch/encrypted-list">
                GitHub
                <i class="gg-external"></i>
            </a>  
        </div>  
    </div>
</template>


<script>
import ButtonLink from "@/components/ButtonLink.vue";

export default {
    name: 'About',
    components: {
        appButtonLink: ButtonLink,
    }
}
</script>


<style scoped>
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
    padding: .5rem;
    font-size: 1.1rem;
}

#about p {
    width: 80%;
    line-height: 1.6;
}

#about p > a {
    text-decoration: none;
    border-radius: .2rem;
    padding: 0 .25rem;
    color: var(--highlight-text-color);
    background-color: var(--primary-yellow-color);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
}

#about .links {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

#about .links > a {
}

#about .links > :first-child {
    width: 8rem;
    margin-right: 1rem;
}

#about .links > :last-child {
    width: 7rem;
    margin: 0;
	height: 2.5rem;
    font-size: 1rem;
    cursor: pointer;
	padding: 0 .75rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
	border: 2px solid;
	border-bottom: 4px solid;	
	border-radius: 0.5rem;
	color: var(--text-color);
    background-color: var(--filter-reset-bg-color);
	border-color:  var(--filter-reset-border-color);
}

#about .links > :last-child i {
    --ggs: 0.9;
    margin: 0;
	margin-left: .65rem;
	color: var(--text-color);
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
