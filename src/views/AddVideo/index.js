import React, { useRef, useState } from "react";
import Menu from '../../components/Menu';
import { Button, TextField } from "@material-ui/core";
import { upLoadVideo } from "../../api";
import {showOptionAlert } from "../../core/utils";
import { useHistory, useParams } from "react-router-dom";
export default function AddVideo() {
	const { id } = useParams();
	const [lessionName, setLessionName] = useState(undefined);
	const [video, setVideo] = useState(undefined);
	const ref = useRef(null);
	const history = useHistory();

	const onUpLoad = () => {
		let form = new FormData();
		form.append('nameVideo', lessionName);
		form.append('idCourse', id);
		form.append('video', video);

		const onCancel = () => {
			history.push(`/course/${id}`);
		};

		upLoadVideo(form)
			.then(res => {
				if (res.name) {
					showOptionAlert(onCancel);
					setLessionName(undefined);
					setVideo(undefined)
				}
			})
			.catch(err => console.log(err));
	};

	const isValid = true;

	return (
		<div style={{
			flex: 1,
		}}>
			<Menu />
			<div style={{ paddingInline: 40 }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<TextField
						onChange={(e) => setLessionName(e.target.value)}
						style={{ marginTop: 20, marginBottom: 20 }}
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
						disabled={!isValid}
						style={{ backgroundColor: isValid ? 'black' : 'gray', color: 'white', fontWeight: "bold", marginTop: 20, marginBottom: 20 }}
						variant={'contained'}
						onClick={onUpLoad}>
						{'Upload'}
					</Button>
				</div>

			</div>
		</div>
	);
}
