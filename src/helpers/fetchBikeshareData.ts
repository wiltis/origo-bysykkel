import baseUrl from "../const/bikeshareBaseUrl"

type RequestParams = {
	path: string,
	method?: "GET" | "POST" | "PUT" | "DELETE",
}

const fetchBikeShareData = async ({
	path,
	method = "GET",
}: RequestParams) => {
	const headers = new Headers({
		"Client-Identifier": "wiltis-bysykkel",
	})
	const url = baseUrl + path

	try {
		const response = await fetch(
			url,
			{
				method: method,
				headers: headers,
			}
		)

		if (response.ok) {
			const data = await response.json()
			return data
		} else {
			throw new Error("Ikke ok")
		}
	}
	catch (error) {
		throw error
	}

}

export default fetchBikeShareData
