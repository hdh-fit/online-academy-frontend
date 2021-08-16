import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Select, MenuItem } from '@material-ui/core';

export default function SignUpForm({ isOpen, onClose, onSignUp }) {
	const initForm = {
		"fullname": undefined,
		"username": undefined,
		"password": undefined,
		"phone": undefined,
		"type": 2,
		"gender": "male",
		"dob": undefined,
		"email": undefined
	};

	const [form, setForm] = React.useState(initForm);

	const isValidForm = form.fullname && form.username && form.password && form.phone && form.gender && form.dob && form.email;

	const onSubmitForm = () => {
		onSignUp(form);
	};

	return (
		<div>
			<Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
				<DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">Sign Up</DialogTitle>
				<DialogContent>
					<TextField
						onChange={(e) => setForm({ ...form, fullname: e.target.value })}
						variant={'filled'}
						autoFocus
						id="name"
						label="Full Name"
						fullWidth
					/>
					<TextField
						onChange={(e) => setForm({ ...form, username: e.target.value })}
						variant={'filled'}
						style={{ marginTop: 20 }}
						id="username"
						label="User Name"
						fullWidth
					/>
					<TextField
						onChange={(e) => setForm({ ...form, email: e.target.value })}
						variant={'filled'}
						style={{ marginTop: 20 }}
						id="email"
						label="Email"
						type="email"
						fullWidth
					/>
					<TextField
						onChange={(e) => setForm({ ...form, phone: e.target.value })}
						variant={'filled'}
						style={{ marginTop: 20, marginBottom: 20 }}
						id="phone"
						label="Phone Number"
						type="number"
						fullWidth
					/>

					<Select
						label={'asd'}
						variant={'filled'}
						labelId="gender-label"
						id="gender"
						value={form.gender}
						onChange={(e) => setForm({ ...form, gender: e.target.value })}
						fullWidth
					>
						<MenuItem value={'male'}>Male</MenuItem>
						<MenuItem value={'female'}>Female</MenuItem>
					</Select>
					<TextField
						variant={'filled'}
						style={{ marginTop: 20 }}
						fullWidth
						id="date"
						label="Birthday"
						type="date"
						onChange={(e) => setForm({ ...form, dob: e.target.value })}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						variant={'filled'}
						style={{ marginTop: 20 }}
						id="password"
						label="Password"
						type="password"
						fullWidth
						onChange={(e) => setForm({ ...form, password: e.target.value })}
					/>
					{/*<TextField
						variant={'filled'}
						style={{ marginTop: 20 }}
						id="passwor-cf"
						label="Confirm Password"
						type="password"
						fullWidth

					/>*/}

				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary">
						Cancel
					</Button>
					<Button disabled={!isValidForm} onClick={onSubmitForm} color="primary">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
