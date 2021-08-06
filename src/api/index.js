import { store } from "../core/store";


export async function signUp(user) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', },
		body: JSON.stringify(user)
	};
	try {
		const response = await fetch('https://wnc-be.herokuapp.com/api/user/register', requestOptions);
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log(error.response.message);
		return error.response.status;
	}
}



export async function signIn(signInBody) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', },
		body: JSON.stringify(signInBody)
	};
	try {
		const response = await fetch('https://wnc-be.herokuapp.com/api/user/login', requestOptions);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error.response.message);
		return error.response.status;
	}
}

export async function getUserInfo(signInBody) {
	console.log(store.getState().app.accessToken);
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${store.getState().app.accessToken}`
		},
		body: JSON.stringify(signInBody)
	};
	try {
		const response = await fetch('https://wnc-be.herokuapp.com/api/user/info', requestOptions);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error.response.message);
		return error.response.status;
	}
}
