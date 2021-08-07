import { store } from "../core/store";

const baseUrl = 'https://fit-study.herokuapp.com';


export async function signUp(user) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', },
		body: JSON.stringify(user)
	};
	try {
		const response = await fetch(`${baseUrl}/api/user/register`, requestOptions);
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
		const response = await fetch(`${baseUrl}/api/user/login`, requestOptions);
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
		const response = await fetch(`${baseUrl}/api/user/info`, requestOptions);
		const data = await response.json();
		return data;
	} catch (error) {
		return error;
	}
}

export async function getTopView() {
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const response = await fetch(`${baseUrl}/api/course/top-10-view`, requestOptions);
		const data = await response.json();
		return data;
	} catch (error) {
		return error;
	}
}

export async function getTopNew() {
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const response = await fetch(`${baseUrl}/api/course/top-10-date-create`, requestOptions);
		const data = await response.json();
		return data;
	} catch (error) {
		return error;
	}
}

export async function getCourseDetail(id) {
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const response = await fetch(`${baseUrl}/api/course/detail/${id}`, requestOptions);
		const data = await response.json();
		return data;
	} catch (error) {
		return error;
	}
}
