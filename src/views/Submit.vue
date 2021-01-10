<template>
    <div id='submit'>
        <p>
            If you discovered any products that aren't in the list, you can <mark class="highlight">submit</mark> one through this page.
            Use this page for new submissions and <router-link to="/report">the report page <app-link-icon></app-link-icon></router-link> to report already existing products.
            I'll review the submission and add the product ASAP.
        </p>
        <form netlify>
            <label for="name">Name:</label>    
            <input type="text" name="name">
			
			<label for="desc">Description:</label>
			<textarea name="desc" cols="30" rows="10"></textarea>
			
			<label for="url">URL:</label>    
            <input type="url" name="url">
			
			<label for="name">Tags:</label>    
			<select name="tags">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>

			<label for="name">Categories:</label>    
			<select name="categories">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>

        </form>   
    </div>
</template>


<script>
import LinkIcon from "@/components/icons/LinkIcon.vue";

export default {
    name: 'Submit',
    components: {
        appLinkIcon: LinkIcon,
    }
}
</script>


<style scoped>
* {
    outline: none;
}

#submit {
    padding: .5rem;
}

#submit p {
    font-size: 1.1rem;
    width: 80%;
    text-align: center;
    margin: 0 auto;
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

@media only screen and (max-width: 768px) {
    /* code */
}

@media only screen and (max-width: 480px) {
	#submit {
        padding: 1rem .25rem;
	}

    #submit p {
        width: 95%;
        text-align: left;
	}
}
</style>
