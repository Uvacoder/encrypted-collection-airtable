<template>
    <div id='MenuList' ref="MenuList">
        <div class="header">
            <h2>Navigate To</h2>
            <app-button
                :iconButton="true" 
                :label="'Hide List of Pages'"
                @clicked="hideMenu"
            >
				<i class="gg-push-right"></i>
            </app-button>
        </div>
        
        <app-button
            :label="'Go to Watchlist Page'"
            @clicked="navigateTo('watchlist')" 
        >
            Watchlist
            <i class="gg-eye"></i>
        </app-button>

        <app-button
            :label="'Go to Report Page'"
            @clicked="navigateTo('report')" 
        >
            Report Page
            <i class="gg-danger"></i>
        </app-button>

        <app-button
            :label="'Go to Excluded Products Page'"
            @clicked="navigateTo('excluded')" 
        >
            Excluded List
            <i class="gg-unavailable"></i>
        </app-button>

        <app-button
            :label="'Go to Submission Page'"
            @clicked="navigateTo('submit')" 
        >
            Submission Page
            <i class="gg-add"></i>
        </app-button>        
    </div>
</template>


<script>
import Button from "@/components/Button.vue";

export default {
    name: 'MenuList',
    components: {
        appButton: Button
    },
    methods: {
        navigateTo: function(whereTo) {
			this.$router.push({ path: whereTo })
        },
        hideMenu: function() {
            this.$refs.MenuList.style.setProperty("margin-right", "-9999px");
        },
    },
}
</script>


<style scoped>
@import url('https://css.gg/css?=|push-right');

* {
    outline: none;
}

#MenuList {
    width: 40%;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    background-color: var(--background-color);
    border: 2px solid var(--gray-border-color);
}

#MenuList > * {
    width: 75%;
    margin: 1rem auto;
}

#MenuList .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#MenuList .header > button {
    width: 2.5rem;
}
</style>
