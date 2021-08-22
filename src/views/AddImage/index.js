import React, { useRef, useState } from "react";
import Menu from '../../components/Menu';
import { Button, TextField } from "@material-ui/core";
import { upLoadImage } from "../../api";
import { showOptionAlert, showSuccessToast } from "../../core/utils";
import { useHistory, useParams } from "react-router-dom";
import SimpleBackdrop from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { enabelSpinner, disabelSpinner } from "../../core/store/reducer/app/actions";

export default function AddImage() {
	const { id } = useParams();
	const [img, setImg] = useState(undefined);
	const ref = useRef(null);
	const history = useHistory();
	const { isLoading } = useSelector(state => state.app);
	const dispatch = useDispatch();

	const onUpLoad = () => {
		dispatch(enabelSpinner());
		let form = new FormData();
		form.append('img', img);
		form.append('courseId', id);


		upLoadImage(form)
			.then(res => {
				if (res.success) {
					showSuccessToast('Upload image sucessfully.');
					history.push(`/add-video/${id}`);
				}
			})
			.catch(err => console.log(err))
			.finally(() => dispatch(disabelSpinner()));
	};


	return (
		<div style={{
			flex: 1,
		}}>
			<Menu />
			<div style={{ paddingInline: 40 }}>
				<h4 style={{ marginTop: 12, marginBottom: 12 }}>Add course image</h4>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<input
						type="file"
						ref={ref}
						onChange={(e) => {
							setImg(e.target.files[0]);
						}}
					/>
				</div>
				<div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
					<Button
						disabled={img == undefined}
						style={{ backgroundColor: img == undefined ? 'gray' : 'black', color: "white", fontWeight: "bold", marginTop: 20, marginBottom: 20, marginRight: 12, }}
						variant={'contained'}
						onClick={onUpLoad}>
						{'Upload'}
					</Button>
					<Button
						variant={'contained'}
						color={'secondary'}
						style={{ fontWeight: "bold", marginTop: 20, marginBottom: 20, width: 100 }}
						variant={'contained'}
						onClick={() => history.push(`/add-video/${id}`)}>
						{'Skip'}
					</Button>
				</div>

			</div>
			<SimpleBackdrop open={isLoading} />

		</div >
	);
}
