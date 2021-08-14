import { store } from "../core/store";
const baseUrl = 'https://fit-study.herokuapp.com';

const request = (url, body, method, hasToken) => {
	return new Promise((resolve, reject) => {
		const requestOptions = {
			method,
			headers: { 'Content-Type': 'application/json' },
		};

		if (hasToken) {
			requestOptions.headers.Authorization = `Bearer ${store.getState().app.accessToken}`;
		}

		if (body) {
			requestOptions.body = JSON.stringify(body);
		}

		fetch(url, requestOptions)
			.then(response => {
				response.json().then(data => {
					console.log(data);
					resolve(data);
				});
			})
			.catch(err => {
				console.log(err);
				reject(err);
			});
	});
};

export async function signUp(user) {
	try {
		const data = await request(`${baseUrl}/api/user/register`, user, 'POST');
		return data;
	} catch (error) {
		return error.response.status;
	}
}


export async function signIn(signInBody) {
	try {
		const data = await request(`${baseUrl}/api/user/login`, signInBody, 'POST');
		return data;
	} catch (error) {
		return error.response.status;
	}
}

export async function getUserInfo() {
	try {
		const data = await request(`${baseUrl}/api/user/info`, null, 'GET', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function getTopView() {
	try {
		const data = await request(`${baseUrl}/api/course/top-10-view`, null, 'GET');
		return data;
	} catch (error) {
		return error;
	}
}

export async function getTopNew() {
	try {
		const data = await request(`${baseUrl}/api/course/top-10-date-create`, null, 'GET');
		return data;
	} catch (error) {
		return error;
	}
}

export async function getCourseDetail(id) {
	try {
		const data = await request(`${baseUrl}/api/course/detail/${id}`, null, 'GET');
		return data;
	} catch (error) {
		return error;
	}
}
export async function getCaterogies() {
	try {
		const data = await request(`${baseUrl}/api/getCategoryAll`, null, 'GET');
		return data;
	} catch (error) {
		return error;
	}
}

export async function getCourseByCategoryName(name) {
	try {
		const data = await request(`${baseUrl}/api/getCourseByCategoryName/${name}`, null, 'GET');
		return data;
	} catch (error) {
		return error;
	}
}

export async function searchCourse(name) {
	try {
		const data = await request(`${baseUrl}/api/search/${name}`, null, 'GET');
		return data;
	} catch (error) {
		return error;
	}
}
