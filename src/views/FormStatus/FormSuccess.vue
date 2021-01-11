<template>
    <div id='FormSuccess'>
        <app-check-icon></app-check-icon>

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
import CheckIcon from "@/components/icons/CheckIcon.vue";

export default {
    name: 'FormSuccess',
    components: {
        appHomeIcon: HomeIcon,
        appCheckIcon: CheckIcon,
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
    color: var(--primary-green-color);
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
