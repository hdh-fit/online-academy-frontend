import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { Avatar, Container, Paper, TextField, Select, MenuItem } from '@material-ui/core';
import image from '../../components/Courses/contemplative-reptile.jpeg';
import TypographyMenu from '../../components/MenuProfile';
import { getUserInfo } from '../../api';
import moment from 'moment';

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

	useEffect(() => {
		getUserInfo()
			.then(response => {
				if (response.success) {
					setUser(response.data);
				}
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<div style={{
			flex: 1,
		}}>
			<Menu />
			<Container style={{ display: 'flex', paddingTop: 40, }}>
				<div style={{ flex: 1 }}>
					<Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12 }} variant="outlined">
						<Avatar alt="Remy Sharp" src={image} style={{ height: 150, width: 150, }} />
						<TypographyMenu />
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
							id="passworl"
							label="Full Name"
							fullWidth
							variant="filled"
							value={user.fullname}
						/>
						<TextField
							variant={'filled'}
							style={{ marginTop: 20 }}
							fullWidth
							id="date"
							label="Birthday"
							type="date"
							value={`${moment(new Date(user.dob)).format("YYYY-MM-DD")}`}
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
							fullWidth
						/>
						<Select
							variant={'filled'}
							labelId="gender-label"
							id="gender"
							value={user.gender}
							fullWidth
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
					</Paper>
				</div>
			</Container>
		</div>
	);
};

export default Profile;


