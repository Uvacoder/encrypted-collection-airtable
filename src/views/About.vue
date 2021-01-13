<template>
    <div id='about'>
        <p>
            EncryptedList is a list of products and services that offer <a href="https://protonmail.com/blog/what-is-end-to-end-encryption/" target="_blank" rel="noopener">end-to-end encryption <app-external-icon></app-external-icon></a> 👈 or some form of <a href="https://tresorit.com/blog/zero-knowledge-encryption/" target="_blank" rel="noopener">zero-knowledge architecture <app-external-icon></app-external-icon></a> 🔐.
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
                <app-home-icon></app-home-icon>
            </app-button-link>   

            <a title="Go To GitHub Repo" aria-label="Go To GitHub Repo" target="_blank" rel="noopener" href="https://github.com/oneminch/encrypted-list">
                GitHub
                <app-external-icon></app-external-icon>
            </a>  
        </div>  
    </div>
</template>


<script>
import ButtonLink from "@/components/ButtonLink.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
import ExternalIcon from "@/components/icons/ExternalIcon.vue";

export default {
    name: 'About',
    components: {
        appHomeIcon: HomeIcon,
        appButtonLink: ButtonLink,
        appExternalIcon: ExternalIcon,
    }
}
</script>


<style scoped>
* {
    outline: none;
}

#about p svg {
    display: inline-block;
    margin: 0 .25rem;
    color: var(--highlight-text-color);
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
    width: 7.5rem;
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
    background-color: var(--yellow-black-bg-color);
	border-color:  var(--yellow-black-border-color);
}

#about .links > :last-child svg {
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
