<template>
    <div id='FormFailure'>
        <app-clear-icon></app-clear-icon>

        <h2>
            Oops! An error has occurred. Please try again soon.
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
import ClearIcon from "@/components/icons/ClearIcon.vue";


export default {
    name: 'FormFailure',
    components: {
        appHomeIcon: HomeIcon,
		appClearIcon: ClearIcon,
        appButtonLink: ButtonLink,
    }
}
</script>


<style scoped>
* {
    outline: none;
}

#FormFailure {
    padding: 2rem .5rem;
}

#FormFailure > svg {
    width: 8rem;
    height: 8rem;
    color: var(--primary-red-color);
    margin: 0 auto;
    display: block;
}

#FormFailure h2 {
    width: 65%;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem auto;
}

#FormFailure > a {
    width: 11rem;
	margin: 2rem auto;
}

@media only screen and (max-width: 480px) {
	#FormFailure {
        padding: 1rem .25rem;
	}

    #FormFailure h2 {
        width: 95%;
	}
}
</style>
