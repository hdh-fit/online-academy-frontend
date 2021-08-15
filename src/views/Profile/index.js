import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { Avatar, Container, Paper, TextField, Select, MenuItem, Button } from '@material-ui/core';
import image from '../../components/Courses/contemplative-reptile.jpeg';
import TypographyMenu from '../../components/MenuProfile';
import { changePassword, getUserInfo, updateProfile } from '../../api';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../../core/utils';
import ChangePasswordDialog from '../../components/ChangePasswordDialog';

const Profile = () => {
	const initUserState = {
		dob: "",
		email: "",
		fullname: "",
		gender: "",
		phone: "",
		type: undefined,
		username: "",
	};

	const [user, setUser] = useState(initUserState);
	const [isShowChangePass, setIsShowChangePass] = useState(false);
	const history = useHistory();

	useEffect(() => {
		getUserInfo()
			.then(response => {
				if (response.success) {
					setUser(response.data);
				}
			})
			.catch(err => console.log(err));
	}, []);

	const onPressMyCourse = () => {
		history.push("/search?type=My Course");
	};

	const onPressWatchlist = () => {
		history.push("/search?type=Watch List");
	};

	const onSubmitUpdate = () => {
		const { fullname, phone, dob, gender } = user;
		const body = { fullname, phone, dob, gender };

		updateProfile(body)
			.then(response => {
				if (response.success) {
					showSuccessToast('Update profile sucessfully.');
					getUserInfo()
						.then(response => {
							if (response.success) {
								setUser(response.data);
							}
						})
						.catch(err => console.log(err));
				}
			})
			.catch(err => console.log(err));
	};

	const onChangePass = (body) => {
		delete body.confirmpassword;


		changePassword(body)
			.then(response => {
				if (response.success) {
					showSuccessToast('Change password sucessfully.');
					setIsShowChangePass(false);
				}
			})
			.catch(err => {
				showErrorToast(`${err}`);
				console.log(err);
			});
	};

	return (
		<div style={{
			flex: 1,
		}}>
			<Menu />
			<Container style={{ display: 'flex', paddingTop: 40, }}>
				<div style={{ flex: 1 }}>
					<Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12 }} variant="outlined">
						<Avatar alt="Remy Sharp" src={image} style={{ height: 150, width: 150, }} />
						<TypographyMenu
							onPressWatchlist={onPressWatchlist}
							onPressMyCourse={onPressMyCourse}
							onPressChangePass={() => setIsShowChangePass(true)}
						/>
					</Paper>
				</div>
				<div style={{ flex: 6, marginLeft: 12 }}>
					<Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, paddingInline: 50, paddingBottom: 20 }} variant="outlined">
						<h3>
							Public profile
						</h3>
						<span>
							Add information about yourself
						</span>
						<TextField
							style={{ marginTop: 30 }}
							id="email"
							label="Email"
							type="email"
							fullWidth
							variant="filled"
							value={user.email}
						/>
						<TextField
							style={{ marginTop: 20 }}
							label="User Name"
							fullWidth
							variant="filled"
							value={user.fullname}
							onChange={e => setUser({ ...user, fullname: e.target.value })}
						/>
						<TextField
							variant={'filled'}
							style={{ marginTop: 20 }}
							fullWidth
							id="date"
							label="Birthday"
							type="date"
							value={`${moment(new Date(user.dob)).format("YYYY-MM-DD")}`}
							onChange={e => setUser({ ...user, dob: e.target.value })}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							variant={'filled'}
							style={{ marginTop: 20, marginBottom: 20 }}
							id="phone"
							label="Phone Number"
							value={user.phone}
							onChange={e => setUser({ ...user, phone: e.target.value })}
							fullWidth
						/>
						<Select
							variant={'filled'}
							labelId="gender-label"
							id="gender"
							value={user.gender}
							fullWidth
							onChange={e => setUser({ ...user, gender: e.target.value })}
						>
							<MenuItem value={'male'}>Male</MenuItem>
							<MenuItem value={'female'}>Female</MenuItem>
						</Select>
						{/*<TextField
							style={{ marginTop: 20 }}
							id="password"
							label="Password"
							fullWidth
							variant="filled"
							type={'password'}
							value={user.fullname}
						/>
						<TextField
							style={{ marginTop: 20 }}
							id="password"
							label="Confirm Password"
							fullWidth
							variant="filled"
							type={'password'}
						/>*/}
						<Button
							onClick={onSubmitUpdate}
							variant={'contained'}
							size="medium"
							style={{
								backgroundColor: 'rgb(28,29,31)',
								color: 'white',
								fontWeight: 'bold',
								width: 180,
								marginTop: 25
							}}>
							{'SAVE PROFILE'}
						</Button>
					</Paper>
				</div>
			</Container>
			<ChangePasswordDialog
				onClose={() => setIsShowChangePass(false)}
				isOpen={isShowChangePass}
				onChangePass={onChangePass}
			/>
		</div>
	);
};

export default Profile;


