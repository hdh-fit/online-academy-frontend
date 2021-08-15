import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { showErrorToast } from '../../core/utils';

export default function FormDialog({ isOpen, onClose, onSignIn }) {
	const initForm = {
		"username": undefined,
		"password": undefined,
	};

	const [form, setForm] = React.useState(initForm);

	const onSubmitForm = () => {
		if (!form.username) {
			showErrorToast('Please enter username.');
			return;
		}
		if (!form.password) {
			showErrorToast('Please enter password.');
			return;
		}
		onSignIn(form);
	};

	const onKeyPress = (event) => {
		if (event.key === 'Enter') {
			onSubmitForm();
		}
	};

	return (
		<div>
			<Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Sign In</DialogTitle>
				<DialogContent>
					<TextField
						variant={'filled'}
						onChange={({ target }) => setForm({ ...form, username: target.value })}
						autoFocus
						id="username"
						label="Username"
						fullWidth
						onKeyPress={onKeyPress}
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
						Sign In
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
