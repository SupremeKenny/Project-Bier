/**
 * Fetches the postcode api and returns it
 * Method assumes that the zip and number are validated
 *
 * Returns address on success and undefined when no address was found.
 */
export async function fetchPostcodeApi(zip, number) {
	return fetch("account/fetchAddress", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			Zip: zip,
			Number: number
		})
	}).then(handleResponse, handleNetworkError);
}

function handleResponse(response) {
	if (response.ok) {
		return response.json();
	} else {
		return response.json().then(function(error) {
			throw error;
		});
	}
}

function handleNetworkError(error) {
	throw {
		msg: error.message
	};
}
