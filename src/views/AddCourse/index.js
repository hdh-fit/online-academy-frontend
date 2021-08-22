import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import Menu from '../../components/Menu';
import { Button, TextField } from "@material-ui/core";
import CategorySelect from "../../components/CategorySelect";
import { addCourse, editCourse, getCourseDetail } from "../../api";
import { showErrorToast, showSuccessToast } from "../../core/utils";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stateFromHTML } from 'draft-js-import-html';
import { disabelSpinner, enabelSpinner } from "../../core/store/reducer/app/actions";
import SimpleBackdrop from "../../components/Loading";

export default function AddCourse() {
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
	const useQuery = () => {
		return new URLSearchParams(useLocation().search);
	};
	const query = useQuery();
	const courseId = query.get("courseEdit");
	const { categories, isLoading } = useSelector(state => state.app);


	useEffect(() => {
		if (courseId) {
			getCourseDetail(courseId)
				.then(res => {
					if (res.success) {
						const { name, short_described, full_described, image_link, price, category, newPrice } = res.data;
						const findCategory = categories?.find(item => item.name === category) || '';
						setCourseForm({ name, short_described, full_described, image_link, price, newPrice, category: { name: category, label: findCategory?.label } });
						const contentState = stateFromHTML(full_described);
						const tempState = EditorState.createWithContent(contentState);
						setEditorState(tempState);
					}
				});
		}
	}, [courseId]);// eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setCourseForm({ ...courseForm, full_described: draftToHtml(convertToRaw(editorState.getCurrentContent())) });
	}, [editorState]);// eslint-disable-line react-hooks/exhaustive-deps

	const history = useHistory();

	const initForm = {
		name: undefined,
		short_described: undefined,
		full_described: undefined,
		price: undefined,
		category: { name: 'web', label: 'Lập trình web' },
		image_link: ''
	};
	//	image_link: 'https://www.softlogicsys.in/wp-content/uploads/2019/05/node-js-training-in-chennai-1200x720.png',
	const [courseForm, setCourseForm] = React.useState(initForm);

	const dispatch = useDispatch();

	const onSubmit = () => {

		dispatch(enabelSpinner());
		const body = { ...courseForm };
		body.category = courseForm.category.name;

		if (courseId) {
			editCourse(courseId, body)
				.then(res => {
					if (res.name) {
						showSuccessToast('Edit course successfully');
						history.push(`/add-image/${res._id}`);
					}
				})
				.catch(err => {
					console.log(err);
					showErrorToast(`${err}`);
				})
				.finally(() => dispatch(disabelSpinner()));
		} else {
			addCourse(body)
				.then(res => {
					if (res.success === "true") {
						showSuccessToast('Add course successfully');
						history.push(`/add-image/${res.course._id}`);
					}
				})
				.catch(err => {
					console.log(err);
					showErrorToast(`${err}`);
				})
				.finally(() => dispatch(disabelSpinner()));
		}
	};



	const isValid = courseForm.name && courseForm.short_described && courseForm.full_described && courseForm.price;


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
						value={courseForm.name || ''}
						variant="filled" />
					<TextField
						onChange={(e) => setCourseForm({ ...courseForm, short_described: e.target.value })}
						style={{ marginTop: 20 }}
						label="Short Described"
						value={courseForm.short_described || ''}
						variant="filled"
					/>
					<TextField
						disabled={courseId}
						onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
						style={{ marginTop: 20 }}
						label="Price"
						value={courseForm.price || ''}
						variant="filled"
					/>
					{!!courseId && (
						<TextField
							onChange={(e) => setCourseForm({ ...courseForm, newPrice: e.target.value })}
							style={{ marginTop: 20 }}
							label="Selling Price"
							variant="filled"
							value={courseForm.newPrice || ''}
						/>
					)}
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
						style={{ backgroundColor: isValid ? 'black' : 'gray', color: 'white', fontWeight: "bold", marginTop: 20, marginBottom: 20, marginRight: 12, }}
						variant={'contained'}
						onClick={onSubmit}>
						{'Submit'}
					</Button>
					{courseId && (
						<Button
							variant={'contained'}
							color={'secondary'}
							style={{ fontWeight: "bold", marginTop: 20, marginBottom: 20, width: 100 }}
							variant={'contained'}
							onClick={() => history.push(`/add-image/${courseId}`)}>
							{'Skip'}
						</Button>
					)}

				</div>

			</div>
			<SimpleBackdrop open={isLoading} />
		</div>
	);
}

