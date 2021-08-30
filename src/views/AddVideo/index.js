import React, { useRef, useState } from "react";
import Menu from '../../components/Menu';
import { Button, TextField } from "@material-ui/core";
import { upLoadVideo } from "../../api";
import { showOptionAlert } from "../../core/utils";
import { useHistory, useParams } from "react-router-dom";
import { disabelSpinner, enabelSpinner } from "../../core/store/reducer/app/actions";
import { useDispatch, useSelector } from "react-redux";
import SimpleBackdrop from "../../components/Loading";
export default function AddVideo() {
	const { id } = useParams();
	const [lessionName, setLessionName] = useState(undefined);
	const [video, setVideo] = useState(undefined);
	const ref = useRef(null);
	const history = useHistory();
	const dispatch = useDispatch();

	const { isLoading } = useSelector(state => state.app);

	const onUpLoad = () => {
		let form = new FormData();
		form.append('nameVideo', lessionName);
		form.append('idCourse', id);
		form.append('video', video);

		const onCancel = () => {
			history.push(`/course/${id}`);
		};

		dispatch(enabelSpinner());
		upLoadVideo(form)
			.then(res => {
				if (res.name) {
					showOptionAlert(onCancel);
					setLessionName(undefined);
					setVideo(undefined);
				}
			})
			.catch(err => console.log(err))
			.finally(() => dispatch(disabelSpinner()));
	};

	const disable = video === undefined || !lessionName;

	return (
		<div style={{
			flex: 1,
		}}>
			<Menu />
			<div style={{ paddingInline: 40 }}>
				<h4 style={{ marginTop: 12 }}>Add lesson</h4>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<TextField
						onChange={(e) => setLessionName(e.target.value)}
						style={{ marginBottom: 20 }}
						label="Lesson Name"
						variant="filled" />
					<input
						type="file"
						ref={ref}
						onChange={(e) => {
							setVideo(e.target.files[0]);
						}}
					/>
				</div>
				<div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
					<Button
						disabled={disable}
						style={{ backgroundColor: disable ? 'gray' : 'black', color: 'white', fontWeight: "bold", marginTop: 20, marginBottom: 20, marginRight: 12, }}
						variant={'contained'}
						onClick={onUpLoad}>
						{'Upload'}
					</Button>
					<Button
						variant={'contained'}
						color={'secondary'}
						style={{ fontWeight: "bold", marginTop: 20, marginBottom: 20, width: 100 }}
						onClick={() => history.push(`/course/${id}`)}>
						{'Skip'}
					</Button>

				</div>

			</div>


			<SimpleBackdrop open={isLoading} />

		</div>
	);
}
