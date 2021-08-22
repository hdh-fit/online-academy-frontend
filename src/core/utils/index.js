import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import moment from 'moment';

export const showOptionAlert = (onCancel) => {
	Swal.fire({
		title: 'Upload lesson successfully. Continue upload lesson?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes'
	}).then((result) => {
		if (result.isDismissed) {
			onCancel();
		}
	});
};

export const showSuccessAlert = (text) => {
	Swal.fire({
		title: text,
		icon: 'success',
		showConfirmButton: false,
		timer: 1000
	});
};

export const showErrorAlert = (text) => {
	Swal.fire({
		position: 'bottom-end',
		title: 'Error!',
		text,
		icon: 'error',
		showConfirmButton: false,
		timer: 1000
	});
};

export const showConfirmAlert = (text, onConfirm, isTeacher, onViewCourse, denyText) => {
	Swal.fire({
		title: text,
		showCancelButton: true,
		confirmButtonText: `View courses`,
		showDenyButton: true,
		denyButtonText: denyText,
		showConfirmButton: isTeacher
	})
		.then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isDenied) {
				onConfirm();
			}
			if (result.isConfirmed) {
				onViewCourse();
			}
		});
};

export const showCategoryAction = (onEdit, onDelete) => {
	Swal.fire({
		title: 'Category Action',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showDenyButton: true,
		confirmButtonColor: '#3085d6',
		denyButtonColor: '#d33',
		confirmButtonText: 'Edit Category',
		denyButtonText: 'Delete Category'
	}).then((result) => {
		if (result.isConfirmed) {
			onEdit();
		}
		if (result.isDenied) {
			onDelete();
		}
	});
};

export const showSuccessToast = (msg) => {
	toast.success(msg, {
		position: toast.POSITION.TOP_CENTER
	});
};

export const showErrorToast = (msg) => {
	toast.error(msg, {
		position: toast.POSITION.TOP_CENTER
	});
};

export const formatDate = (dateString) => {
	return moment(new Date(dateString)).format("YYYY-MM-DD");
};

export const chunk = (arr, size) =>
	Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
		arr.slice(i * size, i * size + size)
	);

const PATTERN_EMAIL = /\S+@\S+\.\S+/;
const PATTERN_PASSWORD = /[a-z0-9]{6,}/;
export const PATTERN_PHONE = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

export const EmailValidator = (value) => {
	return RegExpValidator(PATTERN_EMAIL, value);
};

const RegExpValidator = (regexp, value) => {
	return regexp.test(value);
};

export const PasswordValidator = (value) => {
  return RegExpValidator(PATTERN_PASSWORD, value);
};

export const PhoneNumberValidator = (value) => {
  return RegExpValidator(PATTERN_PHONE, value);
};
