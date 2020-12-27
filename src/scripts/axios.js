import axios from "axios";

const instance = axios.create({
	method: "get",
	headers: {
		"Content-type": "application/json",
	},
});

export default instance;
