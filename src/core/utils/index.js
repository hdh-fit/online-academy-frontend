import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import moment from 'moment';

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

export const showConfirmAlert = (text, onConfirm) => {
	Swal.fire({
		title: text,
		showCancelButton: true,
		confirmButtonText: `Confirm`,
	}).then((result) => {
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {
			onConfirm();
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
