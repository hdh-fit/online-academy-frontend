
export async function signUp(user) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', },
		body: JSON.stringify(user)
	};
	try {
		const response = await fetch('https://wnc-be.herokuapp.com/api/user/register', requestOptions);
		const data = await response.json();
		console.log(data)
		return data;
	} catch (error) {
		console.log(error.response.message)
		return error.response.status;
	}
}
