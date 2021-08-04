import React from 'react';
import Menu from '../../components/Menu';
import { Avatar, Container, Paper, TextField } from '@material-ui/core';
import image from '../../components/Courses/contemplative-reptile.jpeg';
import TypographyMenu from '../../components/MenuProfile';

const Profile = () => {
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
					<Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, paddingInline: 50, paddingBottom: 20}} variant="outlined">
						<h3>
							Public profile
						</h3>
						<span>
							Add information about yourself
						</span>
						<TextField
							style={{ marginTop: 30 }}
							id="name"
							label="Email"
							type="email"
							fullWidth
							variant="filled"
							value={'lelongho2003@gmail.com'}
						/>
						<TextField
							style={{ marginTop: 20 }}
							id="passworl"
							label="Full Name"
							fullWidth
							variant="filled"
							value={'Ho Le'}
						/>
						<TextField
							style={{ marginTop: 20 }}
							id="password"
							label="Password"
							fullWidth
							variant="filled"
							type={'password'}
						/>
						<TextField
							style={{ marginTop: 20 }}
							id="password"
							label="Confirm Password"
							fullWidth
							variant="filled"
							type={'password'}
						/>
					</Paper>
				</div>
			</Container>
		</div>
	);
};

export default Profile;


