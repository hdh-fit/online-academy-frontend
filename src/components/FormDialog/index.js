import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({ isOpen, onClose,onSignIn }) {
	const initForm = {
		"username": undefined,
		"password": undefined,
		"type": 1,
	};

	const [form, setForm] = React.useState(initForm);

	const onSubmitForm = () => {
		onSignIn(form);
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
					/>
					<TextField
					variant={'filled'}

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
