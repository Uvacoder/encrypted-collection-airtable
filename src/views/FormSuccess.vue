<template>
    <div id='FormSuccess'>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z" fill="currentColor" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor" />
        </svg>
        <h2>
            Your submission was successfull. Thank you!
        </h2>

        <app-button-link
            :path="'/'"
            :label="'Go Back Home'"
        >
            Go Back Home
            <app-home-icon></app-home-icon>
        </app-button-link>
    </div>
</template>


<script>
import ButtonLink from "@/components/ButtonLink.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";

export default {
    name: 'FormSuccess',
    components: {
        appHomeIcon: HomeIcon,
        appButtonLink: ButtonLink,
    }
}
</script>


<style scoped>
* {
    outline: none;
}

#FormSuccess {
    padding: 2rem .5rem;
}

#FormSuccess > svg {
    width: 8rem;
    height: 8rem;
    color: var(--text-color);
    margin: 0 auto;
    display: block;
}

#FormSuccess h2 {
    width: 65%;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem auto;
}

#FormSuccess > a {
    width: 11rem;
	margin: 2rem auto;
}

@media only screen and (max-width: 480px) {
	#FormSuccess {
        padding: 1rem .25rem;
	}

    #FormSuccess h2 {
        width: 95%;
	}
}
</style>
