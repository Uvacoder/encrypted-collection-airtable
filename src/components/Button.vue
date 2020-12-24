<template>
    <button
        ref="btn"
        id="button"
        :title="label"
        :aria-label="label"
        @click="$emit('clicked')"
        :class="['button', { 'icon-button' : iconButton }]"
    >
        <slot></slot>
    </button>
</template>


<script>
export default {
    name: "Button",
    props: ["label", "iconButton"]
}
</script>


<style scoped>
* {
    outline: none;
}

i {
    --ggs: 0.9;
    margin: 0;
}

.button {
	margin: 0;
	height: 2.5rem;
    font-size: 1rem;
    cursor: pointer;
	padding: 0 .75rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
	border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);	
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
}

.button:hover {
	color: var(--text-color);
	border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);
}

.button:not(.icon-button) i {
	margin-left: .65rem;
}

.icon-button {
	padding: 0 .5rem;
}
</style>
