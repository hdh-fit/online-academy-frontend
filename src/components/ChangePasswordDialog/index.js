import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { showErrorToast } from '../../core/utils';

export default function ChangePasswordDialog({ isOpen, onClose, onChangePass }) {
	const initForm = {
		"newpassword": undefined,
		"confirmpassword": undefined,
		"password": undefined,
	};

	const [form, setForm] = React.useState(initForm);

	const onSubmitForm = () => {
		if (!form.newpassword) {
			showErrorToast('Please enter New Password.');
			return;
		}
		if (!form.password) {
			showErrorToast('Please enter Password.');
			return;
		}
		if (!form.confirmpassword) {
			showErrorToast('Please enter Confirm Password.');
			return;
		}
		if (form.newpassword !== form.confirmpassword) {
			showErrorToast('Confirm Password incorrect.');
			return;
		}
		onChangePass(form);
	};

	const onKeyPress = (event) => {
		if (event.key === 'Enter') {
			onSubmitForm();
		}
	};

	return (
		<div>
			<Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Change Password</DialogTitle>
				<DialogContent>
					<TextField
						variant={'filled'}
						onChange={({ target }) => setForm({ ...form, newpassword: target.value })}
						autoFocus
						id="newpassword"
						label="New Password"
						fullWidth
						type="password"
						onKeyPress={onKeyPress}
					/>
					<TextField
						variant={'filled'}
						onKeyPress={onKeyPress}
						onChange={({ target }) => setForm({ ...form, confirmpassword: target.value })}
						style={{ marginTop: 20 }}
						id="confirmpassword"
						label="Confirm Password"
						type="password"
						fullWidth
					/>
					<TextField
						variant={'filled'}
						onKeyPress={onKeyPress}
						onChange={({ target }) => setForm({ ...form, password: target.value })}
						style={{ marginTop: 20 }}
						id="password"
						label="Password"
						type="password"
						fullWidth
					/>

				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary">
						Cancel
					</Button>
					<Button onClick={onSubmitForm} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
