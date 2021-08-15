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

export async function getBestCourses() {
	try {
		const data = await request(`${baseUrl}/api/getBestCourses`, null, 'GET');
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

export async function getCourseByCategoryName(name, page) {
	try {
		const data = await request(`${baseUrl}/api/getCourseByCategoryName/${name}/${page}/5`, null, 'GET');
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

export async function submitReview(body, courseId) {
	try {
		const data = await request(`${baseUrl}/api/review/${courseId}`, body, 'POST', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function joinCourse(idcourse) {
	try {
		const data = await request(`${baseUrl}/api/user/joinCourse`, { idcourse }, 'POST', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function getJoinedCourse() {
	try {
		const data = await request(`${baseUrl}/api/user/listCourse`, null, 'GET', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function addToWatchlist(course) {
	try {
		const data = await request(`${baseUrl}/api/user/watchlist`, { course }, 'POST', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function getWatchList() {
	try {
		const data = await request(`${baseUrl}/api/user/watchlist`, null, 'GET', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function updateProfile(body) {
	try {
		const data = await request(`${baseUrl}/api/user/info`, body, 'PUT', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function changePassword(body) {
	try {
		const data = await request(`${baseUrl}/api/user/password`, body, 'PUT', true);
		return data;
	} catch (error) {
		return error;
	}
}
