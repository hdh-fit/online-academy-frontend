import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { showErrorToast } from '../../core/utils';

export default function EditCateDialog({ isOpen, onClose, onDoneEdit, category, onChange }) {
	const onSubmitForm = () => {
		if (!category.label) {
			showErrorToast('Please enter Category Label.');
			return;
		}
		if (!category.name) {
			showErrorToast('Please enter Category Name.');
			return;
		}
		onDoneEdit();
	};

	const onKeyPress = (event) => {
		if (event.key === 'Enter') {
			onSubmitForm();
		}
	};

	return (
		<div>
			<Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit category</DialogTitle>
				<DialogContent>
					<TextField
						variant={'filled'}
						onChange={({ target }) => onChange({ ...category, name: target.value })}
						autoFocus
						label="Name"
						fullWidth
						onKeyPress={onKeyPress}
						value={category?.name}
					/>
					<TextField
						variant={'filled'}
						onKeyPress={onKeyPress}
						onChange={({ target }) => onChange({ ...category, label: target.value })}
						style={{ marginTop: 20 }}
						label="Label"
						fullWidth
						value={category?.label}
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
