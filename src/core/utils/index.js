import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

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
