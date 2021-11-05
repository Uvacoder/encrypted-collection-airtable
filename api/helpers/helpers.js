// Get header values from raw header data
const getHeaderValue = (headerKey, headers) => {
	const keyIndex = headers.indexOf(headerKey.toLowerCase());

	return keyIndex >= 0 ? headers[keyIndex + 1] : headers[1];
};

// Should the current page make a request
const makeRequest = (rawHeaders) => {
	const reqHost = getHeaderValue("host", rawHeaders);
	const reqReferer = getHeaderValue("referer", rawHeaders);

	const altHost = `${process.env.ALT_BASE_URL}`;
	const mainHost = `${process.env.MAIN_BASE_URL}`;

	const altReferer = `https://${process.env.ALT_BASE_URL}/`;
	const mainReferer = `https://${process.env.MAIN_BASE_URL}/`;

	if (
		req.method === "GET" &&
		(reqHost === altHost || reqHost === mainHost) &&
		(reqReferer.indexOf(altReferer) >= 0 ||
			reqReferer.indexOf(mainReferer) >= 0)
	) {
		return true;
	}

	return false;
};

const unauthorizedError = () => {
	return {
		statusCode: 404,
		body: JSON.stringify({
			error: "Error Making Request (Unauthorized)"
		})
	};
};

export { makeRequest, unauthorizedError };
