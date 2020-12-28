<template>
    <div id='report'>
        <p>
            If you need to <mark class="highlight">report</mark> something (like a bug, broken links, a service that doesn't belong here, or just about anything), you can do so on this page.
            If the product is already in the <router-link to="/excluded">excluded list<i class="gg-link"></i></router-link> or <router-link to="/watchlist">watchlist <i class="gg-link"></i></router-link>, and you think should be added to the main list, please list out your reason.
        </p>     
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
    font-size: 1.1rem;
    width: 80%;
    text-align: center;
    margin: 0 auto;
}

#report a {
    text-decoration: none;
    border-radius: .1rem;
    padding: 0 .25rem;
    color: var(--highlight-text-color);
    background-color: var(--primary-yellow-color);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
}

.gg-link {
    display: inline-block;
    margin: 0 .25rem 0 .75rem;
    transform: scale(.85) rotate(-45deg);
}

.highlight {
    border-radius: .1rem;
    padding: 0 .25rem;
}

@media only screen and (max-width: 768px) {
    /* css */
}

@media only screen and (max-width: 480px) {
	#report {
        padding: 1rem .25rem;
	}

    #report p {
        width: 95%;
        text-align: left;
	}
}
</style>
