<template>
    <div id='FeedbackModal' :class="{ 'hidden' :  hidden }">
        <form 
			method="POST"
			name="feedback"
			data-netlify="true"
			data-netlify-honeypot="bot-field"
            :class="['feedback-form', { 'hidden' :  status !== 0 }]"
		>
			<input type="hidden" name="form-name" value="feedback" />

			<h3>
				Do you like this website?
			</h3>

			<fieldset name="comment" @change="$emit('submitted', $event)">      
					<label for="pos_comment">
                        <input hidden type="radio" value="It's amazing!" name="comment" id="pos_comment">
                        Amazing 👏
                    </label>

					<label for="neg_comment">
                        <input hidden type="radio" value="It's just okay!" name="comment" id="neg_comment">
                        Just Ok 👍
                    </label>
			</fieldset>
		</form>

        <div :class="['feedback-success', { 'hidden' :  status !== 1 }]">
            <app-check-icon></app-check-icon>
            
            <h3>Feedback successfully sent!</h3>

            <app-button :label="'Close Feedback Modal'" @clicked="$emit('close-modal')">
                Close
            </app-button>
        </div>

        <div :class="['feedback-failure', { 'hidden' :  status !== 2 }]">
            <app-clear-icon></app-clear-icon>
            
            <h3>
                Something went wrong. 
                <br> 
                Try again soon.
            </h3>

            <app-button :label="'Close Feedback Modal'" @clicked="$emit('close-modal')">
                Close
            </app-button>
        </div>
    </div>
</template>


<script>
import Button from "@/components/Button.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";
import ClearIcon from "@/components/icons/ClearIcon.vue";

export default {
    name: 'FeedbackModal',
    props: {
        status: {
            type: Number
        },
        hidden: Boolean
    },
    components: {
        appButton: Button,
        appCheckIcon: CheckIcon,
        appClearIcon: ClearIcon,
    }
}
</script>


<style scoped>
* {
    outline: none;
}

#FeedbackModal {
    width: 28rem;
    max-height: 16rem;
	z-index: 2;
    position: fixed;
    top: calc(50% - 6.5rem);
    left: calc(50% - 14rem);
	border-radius: .65rem;
	text-align: center;
	padding: 1rem;
    background-color: var(--background-color);
    border: 2.5px solid var(--gray-border-color);
	border-bottom: 5px solid var(--gray-border-color);	
}

#FeedbackModal > * {
    width: 100%;
    height: 100%;
    display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}

#FeedbackModal .feedback-success > h3,
#FeedbackModal .feedback-failure > h3 {
    margin: 1rem 0;
}

#FeedbackModal .feedback-success > svg,
#FeedbackModal .feedback-failure > svg {
    width: 4rem;
    height: 4rem;
}

#FeedbackModal .feedback-success > svg {
    color: var(--primary-green-color);
}

#FeedbackModal .feedback-failure > svg {
    color: var(--primary-red-color);
}

#FeedbackModal .feedback-success > button,
#FeedbackModal .feedback-failure > button {
    padding: 0 1rem;
}

#FeedbackModal.hidden,
#FeedbackModal > .hidden {
    display: none;
}

#FeedbackModal .feedback-form h3 {
    margin: 1rem 0;
}

#FeedbackModal .feedback-form > fieldset {
	border: none;
	margin: 1rem 0;
	padding: 0;
}

#FeedbackModal .feedback-form > fieldset label {
	border-radius: .5rem;
	padding: .5rem 1rem;
	text-align: left;
	margin: 0;
    cursor: pointer;
    text-align: center;
	display: inline-block;
    border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);	
}

#FeedbackModal .feedback-form > fieldset label:first-of-type {
	margin-right: 3rem;
}

@media only screen and (max-width: 540px) {
	#FeedbackModal {
		width: 96%;
        left: 2%;
	}
}

@media only screen and (max-width: 425px) {
    #FeedbackModal .feedback-form > fieldset label {
		width: 100%;
	}

    #FeedbackModal .feedback-form > fieldset label:first-of-type {
        margin-bottom: .75rem;
	}
}
</style>
