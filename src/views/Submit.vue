<template>
    <div id='submit'>
        <form 
            method="POST"
            data-netlify="true"
            name="new-product"
            data-netlify-honeypot="bot-field"
            @submit.prevent="handleSubmission"
        >
            <!-- name="New Product Submission"  -->

            <h2>Enter Product Details</h2>

            <input type="hidden" name="form-name" value="new-product" />

            <label for="name">
                <abbr title="Required" aria-label="Required">*</abbr>
                Name: 
                <input 
                    id="name" 
                    type="text" 
                    name="name" 
                    value="hello" 
                    @input="ev => form.name = ev.target.value"
                    required
                >
            </label>    
			
			<label for="desc">
                <abbr title="Required" aria-label="Required">*</abbr>    
                Description: 
                <textarea 
                    id="desc" 
                    name="desc" 
                    required
                    @input="ev => form.desc = ev.target.value"
                >hello</textarea>
            </label>
			
			<label for="url">
                <abbr title="Required" aria-label="Required">*</abbr> 
                URL: 
                <input 
                    id="url" 
                    type="url" 
                    name="url" 
                    value="https://mozilla.org" 
                    @input="ev => form.url = ev.target.value"
                    required
                >
            </label>    
			
			<fieldset>      
                <legend>
                    Tags <span>(Optional)</span>:
                </legend>  
                <p v-for="(tag, index) in tags" :key="index">
                    <input 
                        :id="tag" 
                        name="tags" 
                        :value="tag" 
                        type="checkbox" 
                        :checked="(index === 0)"
                        :disabled="(index === 0)"
                    >
                    <label :for="tag">{{ tag }}</label>
                </p>
            </fieldset>

            <fieldset>      
                <legend>
                    Categories <span>(Optional)</span>:
                </legend>  
                <p v-for="(cat, index) in categories" :key="index">
                    <input 
                        :id="cat" 
                        :value="cat" 
                        type="checkbox" 
                        name="categories" 
                        :checked="(index === 0)"
                        :disabled="(index === 0)"
                    >
                    <label :for="cat">{{ cat }}</label>
                </p>
            </fieldset>

            <!-- honeypot here -->

            <div class="submit-btn">
                <app-button :ofType="'submit'" :label="'Submit'">
                    Submit
                    <app-send-icon></app-send-icon>
                </app-button>
            </div>
        </form>

        <p>
            If you discovered any products that aren't in the list, you can <mark class="highlight">submit</mark> one through this page.
            Use this page for new submissions and <router-link to="/report">the report page <app-link-icon></app-link-icon></router-link> to report already existing products.
            I'll review the submission and add the product ASAP.
        </p>
    </div>
</template>


<script>
import Button from "@/components/Button.vue";
// import Home from './Home.vue'
import LinkIcon from "@/components/icons/LinkIcon.vue";
import SendIcon from "@/components/icons/SendIcon.vue";
import { tags, categories } from "@/scripts/filters";

export default {
    name: 'Submit',
    components: {
        appButton: Button,
        appLinkIcon: LinkIcon,
        appSendIcon: SendIcon,
    },
    data() {
        return {
            form: {
                name: '',
                desc: '',
                url: ''
            },
            tags: [],
            categories: []
        }
    },
    methods: {
        encode (data) {
            return Object.keys(data)
                .map(
                key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
                )
                .join("&");
        },
        handleSubmission: function() {
            const axiosConfig = {
                header: { "Content-Type": "application/x-www-form-urlencoded" }
            }

            this.$http.post(
                "/submit",
                this.encode({
                    "form-name": "ask-question",
                    ...this.form
                }),
                axiosConfig
            )
			.then(() => {
                this.$router.push("About");
			})
			.catch(() => {
                console.log("error");
                this.$router.push("404");
			})
        },
    },
    created() {
		this.tags = tags;
		this.categories = categories;
	},
}
</script>


<style scoped>
#submit > form {
    width: 55%;
    max-width: 640px;
}

#submit > form > * {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 1rem;
}

#submit > form h2 {
    text-align: left;
}

#submit > form > label {
    display: block;
    /* margin: 1rem auto; */
}

#submit > form button svg {
    margin-left: .5rem;
}

#submit > form > label abbr {
    color: #fa5252;
}

/* #submit > form > label span {
    color: var(--placeholder-text-color);
} */

#submit > form textarea,
#submit > form input[type="url"],
#submit > form input[type="text"] {
    width: 100%;
    padding: .5rem .75rem;
    background-color: var(--background-color);
    color: var(--text-color);
    display: block;
    margin: 0.25rem 0;
    font-size: 1rem;
    border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);
	border-radius: 0.5rem;
    resize: none;
    box-shadow: none;
}

#submit > form textarea {
    height: 7rem;
}

#submit > form input[type="url"],
#submit > form input[type="text"] {
    height: 2.5rem;
}

#submit > form input[type="checkbox"] {
    margin-right: .5rem;
    /* cu */
    /* border-radius: 1rem; */
    /* border: 5px solid var(--gray-border-color); */
}

#submit > form fieldset {
    border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);
	border-radius: 0.5rem;
}

#submit > form fieldset legend span {
    color: var(--placeholder-text-color);
}

#submit > form fieldset label,
#submit > form fieldset input {
    cursor: pointer;
}

* {
    outline: none;
}

#submit {
    padding: .5rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

#submit > p {
    font-size: 1.1rem;
    width: 40%;
    text-align: left;
    margin: 0;
    /* margin: 0 auto; */
    /* padding: 2.5rem 0; */
}

#submit a {
    text-decoration: none;
    border-radius: .1rem;
    padding: 0 .25rem;
    color: var(--highlight-text-color);
    background-color: var(--primary-yellow-color);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
}

.highlight {
    border-radius: .1rem;
    padding: 0 .25rem;
}


@media only screen and (max-width: 840px) {
    #submit {
        flex-direction: column-reverse;
        align-items: center;
    }

    #submit > form {
        width: 100%;
    }

    #submit > p {
        width: 80%;
        text-align: center;
        margin: 0 0 2rem 0;
    }
}

@media only screen and (max-width: 480px) {
	#submit {
        padding: 1rem .25rem;
	}

    #submit > p,
    #submit > form {
        width: 95%;
    }

    #submit > form > * {
        width: 100%;
    }
}
</style>
