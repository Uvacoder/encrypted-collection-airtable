<template>
	<button
		id="ButtonTag"
		@click="emitEvent"
		:aria-label="value"
		:closable="closable"
		:class="['button-tag', { 'closable' : closable }]"
	>
		{{ value }}
		<i v-show="closable" class="gg-close" :title="closingTaskTitle" @click="$emit('close-tag')"></i>
	</button>
</template>


<script>
export default {
    name: "ButtonTag",
	props: {
		value: String,
		closingTaskTitle: {
			type: String,
			required: false
		},
		closable: {
			type: Boolean,
			default: false
		},
	},
    methods: {
        emitEvent: function() {
            if (!this.closable) {
				this.$emit('clicked');
            }
        },
    },
}
</script>


<style scoped>
* {
    outline: none;
}

i {
    --ggs: 0.75;
    margin: 0;
	color: var(--text-color);
}

.button-tag {
	margin: 0;
	height: 1.5rem;
    font-size: .8rem;
    cursor: pointer;
	padding: 0 .75rem;
    display: inline-flex;
    align-items: center;
	justify-content: center;
    border: none;	
	border-radius: .75rem;
	color: var(--text-color);
	background-color: var(--tags-bg-color);
}

.button-tag:hover {
	color: var(--text-color);
	background-color: var(--tags-bg-hover-color);
}

.button-tag.closable {
    justify-content: space-between;
}

.button-tag.closable i {
	margin-left: .15rem;
}
</style>
