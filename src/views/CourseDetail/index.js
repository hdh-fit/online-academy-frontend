import React from 'react';
import Menu from '../../components/Menu';
import { useParams } from "react-router-dom";
import './course.css';
import { Star, StarOutlineOutlined } from '@material-ui/icons';
import { Avatar, Container, Grid, Paper } from '@material-ui/core';
import CourseContent from '../../components/CoursesContent';
import CourseDetailCard from '../../components/CourseDetailCard';
import image from '../../components/Courses/contemplative-reptile.jpeg';

const CourseDetail = () => {
	let { id } = useParams();

	const FillStar = (size = 17) => <Star style={{ fontSize: size, fill: "rgb(219,154,60)" }} />;
	const OutlinedStart = (size = 17) => <StarOutlineOutlined style={{ fontSize: size, fill: "rgb(219,154,60)" }} />;

	const renderRatingChart = (percent, type) => {
		return (
			<div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
				<div style={{ width: 380, height: 9, backgroundColor: 'rgb(165,169,172)', display: 'flex', marginRight: 5 }}>
					<div style={{ backgroundColor: 'gray', flex: percent }} />
				</div>
				{type === 1
					? <React.Fragment>
						{FillStar()}
						{OutlinedStart()}
						{OutlinedStart()}
						{OutlinedStart()}
						{OutlinedStart()}
					</React.Fragment>
					: type === 2
						? <React.Fragment>
							{FillStar()}
							{FillStar()}
							{OutlinedStart()}
							{OutlinedStart()}
							{OutlinedStart()}
						</React.Fragment>
						: type === 3
							? <React.Fragment>
								{FillStar()}
								{FillStar()}
								{FillStar()}
								{OutlinedStart()}
								{OutlinedStart()}
							</React.Fragment>
							: type === 4
								? <React.Fragment>
									{FillStar()}
									{FillStar()}
									{FillStar()}
									{FillStar()}
									{OutlinedStart()}
								</React.Fragment>
								: <React.Fragment>
									{FillStar()}
									{FillStar()}
									{FillStar()}
									{FillStar()}
									{FillStar()}
								</React.Fragment>}
				<span style={{ color: 'rgb(73,46,187)', paddingLeft: 5,fontSize:14 }}>
					{`${percent * 100}%`}
				</span>
			</div>
		);
	};

	return (
		<div style={{
			flex: 1,
		}}>
			<Menu />
			<div style={{
				width: '100%',
				backgroundColor: 'rgb(28,29,31)',
				color: 'white',
			}}>
				<Container style={{ paddingTop: 20, paddingBottom: 20 }}>
					<h3>
						{`Learn Python Programming Masterclass ${id}`}
					</h3>
					<span>
						{`This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python`}
					</span>
					<Grid alignItems='center' direction='row'>
						<Star style={{ fontSize: 17, fill: "rgb(219,154,60)" }} />
						<Star style={{ fontSize: 17, fill: "rgb(219,154,60)" }} />
						<Star style={{ fontSize: 17, fill: "rgb(219,154,60)" }} />
						<StarOutlineOutlined style={{ fontSize: 17, fill: "rgb(219,154,60)" }} />
						<StarOutlineOutlined style={{ fontSize: 17, fill: "rgb(219,154,60)" }} />
						<span style={{ fontSize: 14 }}>
							{' (78,548 ratings) 326,026 students'}
						</span>
					</Grid>
					<span style={{ fontSize: 14 }}>
						{'Last updated 7/2021'}
					</span>
				</Container>
			</div>
			<Container style={{ display: 'flex', paddingTop: 40 }}>
				<div style={{ flex: 1 }}>
					<Paper variant="outlined">
						<h3 style={{ padding: 15, paddingBottom: 5 }}>
							{`What you'll learn`}
						</h3>
						<ul>
							<li>
								Have a fundamental understanding of the Python programming language.
							</li>
							<li>
								Acquire the pre-requisite Python skills to move into specific branches - Machine Learning, Data Science, etc..
							</li>
							<li>
								Understand how to create your own Python programs.
							</li>
						</ul>
					</Paper>
					<h3 style={{ paddingTop: 20 }}>
						{'Course content'}
					</h3>
					<CourseContent />
					<Paper style={{ marginTop: 20, padding: 20, marginBottom: 20 }} variant="outlined">
						<h3 >
							{'Instructors'}
						</h3>
						<h5 style={{ paddingTop: 10 }}>
							{'Tim Buchalka'}
						</h5>
						<span>
							{'Java Python Android and C# Expert Developer - 987K+ students'}
						</span>
						<div style={{ display: 'flex', alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
							<Avatar style={{ width: 100, height: 100 }} alt="Remy Sharp" src={image} />
							<ul >
								<li>
									4.5 Instructor Rating
								</li>
								<li>
									260,213 Reviews
								</li>
								<li>
									992,391 Students
								</li>
								<li>
									12 Courses
								</li>
							</ul>
						</div>
						<p>
							Tim's been a professional software developer for over 35 years.  During his career, he has worked for major companies such as Fujitsu, Mitsubishi, and Saab.
						</p>
						<p>
							His video courses are used to train developers in major companies such as Mercedes-Benz, Paypal, VW, Pitney Bowes, IBM, and T-Mobile just to name a few (via the Udemy for Business program).
						</p>
					</Paper>
					<Paper style={{ marginTop: 20, padding: 20, marginBottom: 20 }} variant="outlined">
						<h3 >
							{'Reviews'}
						</h3>
						<div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
							<div style={{
								color: "rgb(219,154,60)",
								justifyContent: 'center',
								display: 'flex',
								flexDirection: 'column',
								width: 130,
								paddingBottom: 17
							}}>
								<span style={{
									fontWeight: 'bold',
									color: "rgb(171,108,41)",
									fontSize: 65,
								}}>
									{'4.0'}
								</span>
								<div style={{ marginTop: -20 }}>
									{FillStar(19)}
									{FillStar(19)}
									{FillStar(19)}
									{FillStar(19)}
									{OutlinedStart(19)}
								</div>
								<span style={{ fontWeight: 'bold', fontSize: 15 }}>
									{'Course Rating'}
								</span>
							</div>
							<div style={{ flex: 1 }}>
								{renderRatingChart(0.54, 5)}
								{renderRatingChart(0.5, 4)}
								{renderRatingChart(0.2, 3)}
								{renderRatingChart(0.1, 2)}
								{renderRatingChart(0.05, 1)}
							</div>
						</div>
						<div style={{ display: 'flex', paddingTop: 20 }}>

							<Avatar alt="Remy Sharp" src={image} style={{ marginRight: 20 }} />
							<div>
								<h5 >
									{'Ankit Krishan Puri'}
								</h5>
								<div>
									{FillStar()}
									{OutlinedStart()}
									{OutlinedStart()}
									{OutlinedStart()}
									{OutlinedStart()}
									<span style={{ fontSize: 12, color: 'GrayText' }}>
										{'2 weeks ago'}
									</span>
								</div>
								<p style={{ marginTop: 12 }}>
									The instructor was really amazing and did not let me get bored as he is always curious to teach to his students
								</p>

							</div>
						</div>
						<div style={{ display: 'flex', paddingTop: 20 }}>
							<Avatar alt="Remy Sharp" src={image} style={{ marginRight: 20 }} />
							<div>
								<h5 >
									{'Ankit Krishan Puri'}
								</h5>
								<div>
									{FillStar()}
									{FillStar()}
									{OutlinedStart()}
									{OutlinedStart()}
									{OutlinedStart()}
									<span style={{ fontSize: 12, color: 'GrayText' }}>
										{'2 weeks ago'}
									</span>
								</div>
								<p>
									The instructor was really amazing and did not let me get bored as he is always curious to teach to his students
								</p>

							</div>
						</div>
						<div style={{ display: 'flex', paddingTop: 20 }}>

							<Avatar alt="Remy Sharp" src={image} style={{ marginRight: 20 }} />
							<div>
								<h5 >
									{'Ankit Krishan Puri'}
								</h5>
								<div>
									{FillStar()}
									{FillStar()}
									{FillStar()}
									{OutlinedStart()}
									{OutlinedStart()}
									<span style={{ fontSize: 12, color: 'GrayText' }}>
										{'2 weeks ago'}
									</span>
								</div>
								<p>
									The instructor was really amazing and did not let me get bored as he is always curious to teach to his students
								</p>

							</div>
						</div>
					</Paper>
				</div>
				<CourseDetailCard />
			</Container>
		</div>
	);
};

export default CourseDetail;


