import { store } from "../core/store";
import { onSaveCategories } from "../core/store/reducer/app/actions";
const baseUrl = 'https://fit-study.herokuapp.com';
const videoHost = 'https://hostVideo.longhofit.repl.co';
const imageHost = 'https://hostVideo.longhofit.repl.co/img';

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

const requestFile = (body, isImage) => {
	console.log('body', body);
	return new Promise((resolve, reject) => {
		const requestOptions = {
			method: 'POST',
			body,
		};

		fetch(isImage ? imageHost : videoHost, requestOptions)
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

export async function upLoadVideo(body) {
	try {
		const data = await requestFile(body);
		return data;
	} catch (error) {
		return error.response.status;
	}
}

export async function upLoadImage(body) {
	try {
		const data = await requestFile(body, true);
		return data;
	} catch (error) {
		return error;
	}
}

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


export async function getAllCourse() {
	try {
		const data = await request(`${baseUrl}/api/course/all`, null, 'GET');
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
		if (data.success) {
			store.dispatch(onSaveCategories(data.categories));
		}
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

export async function searchCourse(text, page) {
	try {
		const data = await request(`${baseUrl}/api/search/${text}/${page}/5`, null, 'GET');
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

export async function addCourse(body) {
	try {
		const data = await request(`${baseUrl}/api/addCourse`, body, 'POST', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function getMyUploadCourse() {
	try {
		const data = await request(`${baseUrl}/api/myUpLoadCourse`, null, 'GET', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function getUsers() {
	try {
		const data = await request(`${baseUrl}/api/user/all`, null, 'GET', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function disableUser(body) {
	try {
		const data = await request(`${baseUrl}/api/disableuser`, body, 'POST', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function enableUser(body) {
	try {
		const data = await request(`${baseUrl}/api/enableuser`, body, 'POST', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function banCourse(idCourse) {
	try {
		const data = await request(`${baseUrl}/api/banCourse/${idCourse}`, null, 'GET', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function addCategory(body) {
	try {
		const data = await request(`${baseUrl}/api/addCategory`, body, 'POST', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function editCourse(idCourse, body) {
	try {
		const data = await request(`${baseUrl}/api/updateCourse/${idCourse}`, body, 'POST', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function deleteCategory(name) {
	try {
		const data = await request(`${baseUrl}/api/categoryByName`, { name }, 'DELETE', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function editCategory(body) {
	try {
		const data = await request(`${baseUrl}/api/category`, body, 'PUT', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function viewTeacherCourse(idTeacher) {
	try {
		const data = await request(`${baseUrl}/api/teacherCourse/${idTeacher}`, null, 'GET', true);
		return data;
	} catch (error) {
		return error;
	}
}

export async function getTop5Enroll(idTeacher) {
	try {
		const data = await request(`${baseUrl}/api/course/top-5-join`, null, 'GET', true);
		return data;
	} catch (error) {
		return error;
	}
}
