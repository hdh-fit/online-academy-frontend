import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import Menu from '../../components/Menu';
import { Button, TextField } from "@material-ui/core";
import CategorySelect from "../../components/CategorySelect";
import { addCourse, getCaterogies } from "../../api";
import { showErrorToast, showSuccessToast } from "../../core/utils";
import { useHistory } from "react-router-dom";
export default function AddCourse() {
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
	const [categories, setCategories] = React.useState([]);
	useEffect(() => {
		getCaterogies().then(res => {
			if (res.success) {
				setCategories(res.categories);
			}
		});
	}, []);

	useEffect(() => {
		setCourseForm({ ...courseForm, full_described: draftToHtml(convertToRaw(editorState.getCurrentContent())) });
	}, [editorState]);// eslint-disable-line react-hooks/exhaustive-deps

	const history = useHistory();

	const initForm = {
		name: undefined,
		short_described: undefined,
		full_described: undefined,
		image_link: undefined,
		price: undefined,
		category: { name: 'web', label: 'Lập trình web' },
	};
	//	image_link: 'https://www.softlogicsys.in/wp-content/uploads/2019/05/node-js-training-in-chennai-1200x720.png',
	const [courseForm, setCourseForm] = React.useState(initForm);

	const onSubmit = () => {
		const body = { ...courseForm };
		body.category = courseForm.category.name;

		addCourse(body)
			.then(res => {
				if (res.success === "true") {
					showSuccessToast('Add course successfully');
					history.push(`/add-video/${res.course._id}`);
				}
			})
			.catch(err => {
				console.log(err);
				showErrorToast(`${err}`);
			});
	};

	const isValid = courseForm.name && courseForm.short_described && courseForm.full_described && courseForm.price && courseForm.image_link;


	return (
		<div style={{
			flex: 1,
		}}>
			<Menu />
			<div style={{ paddingInline: 40 }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<TextField
						onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
						style={{ marginTop: 20 }}
						label="Course Name"
						variant="filled" />
					<TextField
						onChange={(e) => setCourseForm({ ...courseForm, short_described: e.target.value })}
						style={{ marginTop: 20 }}
						label="Short Described"
						variant="filled" />
					<TextField
						onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
						style={{ marginTop: 20 }}
						label="Price"
						variant="filled" />
					<TextField
						onChange={(e) => setCourseForm({ ...courseForm, image_link: e.target.value })}
						style={{ marginTop: 20 }}
						label="Image Link"
						variant="filled" />
					<CategorySelect
						onChange={(cate) => setCourseForm({ ...courseForm, category: cate })}
						value={courseForm.category.label}
						categories={categories} />
				</div>
				<div style={{ border: "1px solid gray", padding: '2px', minHeight: '400px', marginTop: 20 }}>
					<Editor
						editorState={editorState}
						onEditorStateChange={setEditorState}
					/>
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

			</div>
		</div>
	);
}

