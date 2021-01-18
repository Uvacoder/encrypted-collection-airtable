<template>
    <div id='submit'>
        <form 
            method="POST"
            data-netlify="true"
            name="submit"
            data-netlify-honeypot="bot-field"
            @submit.prevent="handleFormSubmission"
        >
            <h2>Enter Product Details</h2>

            <input type="hidden" name="form-name" value="submit" />

            <fieldset name="list-type">      
                <legend>
                    Which list should this go to?
                </legend>  

                <!-- List Type -->
                <p>
                    <input 
                        checked
                        id="main" 
                        value="Main" 
                        type="radio" 
                        name="list-type" 
                        v-model="form.listType"
                    >
                    <label for="main">Main</label>
                </p>

                <p>
                    <input 
                        id="watchlist" 
                        value="Watchlist" 
                        type="radio" 
                        name="list-type" 
                        v-model="form.listType"
                    >
                    <label for="watchlist">Watchlist</label>
                </p>

                <p>
                    <input 
                        id="excluded" 
                        value="Excluded" 
                        type="radio" 
                        name="list-type" 
                        v-model="form.listType"
                    >
                    <label for="excluded">Excluded</label>
                </p>
            </fieldset>

            <label for="name">
                <abbr title="Required" aria-label="Required">*</abbr>
                Name: 
                <input 
                    id="name" 
                    type="text" 
                    name="name" 
                    required
                    placeholder="Name of the Product"
                    v-model="form.name"
                >
            </label>    
			
			<label for="desc">
                <abbr title="Required" aria-label="Required">*</abbr>    
                Description: 
                <textarea 
                    id="desc" 
                    name="desc" 
                    required
                    v-model="form.desc"
                    placeholder="Briefly describe the product..."
                ></textarea>
            </label>
			
			<label for="url">
                <abbr title="Required" aria-label="Required">*</abbr> 
                URL: 
                <input 
                    id="url" 
                    type="url" 
                    name="url" 
                    required
                    placeholder="https://example.com"
                    v-model="form.url"
                >
            </label>    
			
			<fieldset name="Tags">      
                <legend>
                    Tags <span>(Optional)</span>:
                </legend>  

                <!-- All - Default Tag -->
                <p>
                    <input 
                        checked
                        disabled
                        :id="tags[0]" 
                        :value="tags[0]" 
                        type="checkbox" 
                        name="tags" 
                    >
                    <label :for="tags[0]">{{ tags[0] }}</label>
                </p>

                <p v-for="(tag, index) in tags.slice(1)" :key="index">
                    <input 
                        :id="tag" 
                        name="tags" 
                        :value="tag" 
                        type="checkbox"
                        v-model="form.tags"
                    >
                    <label :for="tag">{{ tag }}</label>
                </p>
            </fieldset>

            <fieldset name="Categories">      
                <legend>
                    Categories <span>(Optional)</span>:
                </legend>

                <!-- All - Default Category -->
                <p>
                    <input 
                        checked
                        disabled
                        :id="categories[0]" 
                        :value="categories[0]" 
                        type="checkbox" 
                        name="categories" 
                    >
                    <label :for="categories[0]">{{ categories[0] }}</label>
                </p>

                <p v-for="(cat, index) in categories.slice(1)" :key="index">
                    <input 
                        :id="cat" 
                        :value="cat" 
                        type="checkbox" 
                        name="categories"
                        v-model="form.categories"
                    >
                    <label :for="cat">{{ cat }}</label>
                </p>
            </fieldset>

            <div>
                <app-button type="submit" :label="'Submit'">
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
import LinkIcon from "@/components/icons/LinkIcon.vue";
import SendIcon from "@/components/icons/SendIcon.vue";

import { encode } from '@/scripts/helpers';
import { tags, categories } from "@/scripts/filters";

export default {
    name: 'Submit',
    components: {
        appButton: Button,
        appLinkIcon: LinkIcon,
        appSendIcon: SendIcon,
    },
    metaInfo: {
        title: 'Submit',
        meta: [
            { name: 'title', template: '%s | EncryptedList', content: 'Submit'},

			{ property: 'og:title', template: '%s | EncryptedList', content: 'Submit'},
            { property: 'og:url', content: 'https://encryptedlist.xyz/submit'},
            
			{ name: 'twitter:title', template: '%s | EncryptedList', content: 'Submit' },
            { name: 'twitter:site', content: 'https://encryptedlist.xyz/submit' }
        ],
        link: [
			{ rel: 'canonical', href: 'https://encryptedlist.xyz/submit'}
		]
    },
    data() {
        return {
            form: {
                listType: '',
                name: '',
                desc: '',
                url: 'https://',
                tags: [],
                categories: []
            },
            tags: [],
            categories: []
        }
    },
    methods: {
        handleFormSubmission: function() {
            const axiosConfig = {
                header: { "Content-Type": "application/x-www-form-urlencoded" }
            };

            this.$http.post(
                "/submit",
                encode({
                    "form-name": "submit",
                    ...this.form
                }),
                axiosConfig
            )
			.then(() => {
                this.$router.push({ name: "FormSuccess", query: { from: "submit" } });
			})
			.catch(() => {
                this.$router.push({ name: "FormFailure", query: { from: "submit" } });
			});
        },
    },
    created() {
		this.tags = tags;
		this.categories = categories;
	},
}
</script>


<style scoped>
* {
    outline: none;
}

#submit {
    padding: .5rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

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
}

#submit > form button svg {
    margin-left: .5rem;
}

#submit > form > label abbr {
    color: var(--primary-red-color);
}

#submit > form textarea,
#submit > form input[type="url"],
#submit > form input[type="text"] {
    width: 100%;
    padding: .5rem .75rem;
    background-color: var(--background-color);
    color: var(--text-color);
    display: block;
    margin: 0.5rem 0;
    font-size: 1rem;
    border: 2.5px solid var(--gray-border-color);
	border-radius: 0.5rem;
    resize: none;
    box-shadow: none;
}

#submit > form textarea {
    height: 7rem;
}

#submit > form input[type="url"],
#submit > form input[type="text"] {
    height: 2.75rem;
}

#submit > form input[type="checkbox"] {
    margin-right: .5rem;
}

#submit > form fieldset {
    border: 2.5px solid var(--gray-border-color);
	border-bottom: 5px solid var(--gray-border-color);
	border-radius: 0.5rem;
}

#submit > form fieldset legend span {
    color: var(--placeholder-text-color);
}

#submit > form fieldset label,
#submit > form fieldset input {
    cursor: pointer;
}

#submit > form fieldset[name="Tags"] > p:first-of-type label,
#submit > form fieldset[name="Tags"] > p:first-of-type label,
#submit > form fieldset[name="Categories"] > p:first-of-type input,
#submit > form fieldset[name="Categories"] > p:first-of-type input {
    cursor: not-allowed;
}

#submit > form button {
    background-color: var(--yellow-black-bg-color);
	border-color:  var(--yellow-black-border-color);
}

#submit > p {
    font-size: 1.1rem;
    width: 40%;
    text-align: left;
    margin: 0;
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
