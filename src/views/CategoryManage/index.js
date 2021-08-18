import React, { useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Menu from '../../components/Menu';
import { Button, TextField } from "@material-ui/core";
import CategorySelect from "../../components/CategorySelect";
import { addCategory, deleteCategory, editCategory, getCaterogies } from "../../api";
import { showErrorToast, showSuccessToast } from "../../core/utils";
import DataTabbleCategory from "../../components/DataTabbleCategory";
import { useSelector } from "react-redux";
import EditCateDialog from "../../components/EditCateDialog";


export default function CategoryManager() {
	const appState = useSelector(state => state.app);
	const [showForm, setShowForm] = React.useState(false);
	const [showEdit, setShowEdit] = React.useState(false);
	const [categorySelect, setCategorySelect] = React.useState(undefined);
	useEffect(() => {
		getCaterogies();
	}, []);

	const initForm = {
		name: undefined,
		label: undefined,
		category: "Công nghệ thông tin"
	};
	//	image_link: 'https://www.softlogicsys.in/wp-content/uploads/2019/05/node-js-training-in-chennai-1200x720.png',
	const [categoryForm, setCategoryForm] = React.useState(initForm);

	const onSubmit = () => {
		addCategory(categoryForm)
			.then(res => {
				if (res.success) {
					showSuccessToast('Add category successfully.');
					getCaterogies();
					setCategoryForm(initForm);
				}
			})
			.catch(err => {
				console.log(err);
				showErrorToast(`${err}`);
			});
	};

	const onDeleteCate = (name) => {
		deleteCategory(name)
			.then(res => {
				if (res.success) {
					showSuccessToast('Delete category successfully.');
					getCaterogies();
				}
			})
			.catch(err => {
				console.log(err);
				showErrorToast(`${err}`);
			});;
	};

	const onEditCateSubmit = () => {
		const { id, label, name } = categorySelect;

		editCategory({ id, label, name })
			.then(res => {
				if (res.success) {
					showSuccessToast('Edit category successfully.');
					getCaterogies();
					setShowEdit(false)
				}
			})
			.catch(err => {
				console.log(err);
				showErrorToast(`${err}`);
			});;
	};

	const onPressEdit = (cate) => {
		setCategorySelect(cate);
		setShowEdit(true);
	};

	const isValid = categoryForm.name && categoryForm.label;

	const onSelectCate = (category) => {
		setCategoryForm({ ...categoryForm, category });
	};

	return (
		<div style={{
			flex: 1,
		}}>
			<Menu />
			<div style={{ paddingInline: 40 }}>
				<DataTabbleCategory
					onDelete={onDeleteCate}
					onEdit={onPressEdit}
					categories={appState.categories}
				/>
				<Button
					style={{ fontWeight: "bold", marginTop: 70 }}
					variant={'contained'}
					color={showForm ? 'default' : 'primary'}
					onClick={() => setShowForm(prev => !prev)}>
					{showForm ? 'Hide' : 'Add category'}
				</Button>
				{showForm && (
					<React.Fragment>
						<div style={{ display: 'flex', flexDirection: 'column', }}>
							<TextField
								onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
								style={{ marginTop: 20 }}
								label="Category Name"
								variant="filled"
							/>
							<TextField
								onChange={(e) => setCategoryForm({ ...categoryForm, label: e.target.value })}
								style={{ marginTop: 20 }}
								label="Category Label"
								variant="filled"
							/>
							<CategorySelect
								isAddCate={true}
								onSelectCate={onSelectCate}
								value={categoryForm.category}
								categories={appState.categories} />
						</div>
						<div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
							<Button
								disabled={!isValid}
								style={{ backgroundColor: isValid ? 'black' : 'gray', color: 'white', fontWeight: "bold", marginTop: 20, marginBottom: 20 }}
								variant={'contained'}
								onClick={onSubmit}>
								{'Submit'}
							</Button>
						</div>
					</React.Fragment>
				)}
			</div>
			<EditCateDialog
				onChange={setCategorySelect}
				onDoneEdit={onEditCateSubmit}
				category={categorySelect}
				isOpen={showEdit}
				onClose={() => setShowEdit(false)} />
		</div>
	);
}

