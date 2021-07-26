import React from 'react';
import Menu from '../../components/Menu';
import { useParams } from "react-router-dom";
import './course.css';
import { Star, StarOutlineOutlined } from '@material-ui/icons';
import { Container, Grid, Paper } from '@material-ui/core';
import CourseContent from '../../components/CoursesContent';

const CourseDetail = () => {
	let { id } = useParams();

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
						<Star style={{ fontSize: 17 }} />
						<Star style={{ fontSize: 17 }} />
						<Star style={{ fontSize: 17 }} />
						<StarOutlineOutlined style={{ fontSize: 17 }} />
						<StarOutlineOutlined style={{ fontSize: 17 }} />
						<span style={{ fontSize: 14 }}>
							{' (78,548 ratings) 326,026 students'}
						</span>
					</Grid>
					<span style={{ fontSize: 14 }}>
						{'Last updated 7/2021'}
					</span>
				</Container>
			</div>
			<Container >
				<Paper style={{ width: '65%', marginTop: 40 }} variant="outlined">
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
				<Paper style={{ width: '65%', marginTop: 20, padding: 20, marginBottom: 20 }} variant="outlined">
					<h3 >
						{'Featured review'}
					</h3>
					Tim Buchalka really does a good job being very thorough & not boring at the same time. Plus, you get to learn the australian accent 😄. For me the best were 2 sections & 1 recurring topic: oop, quering dbs (additional benefit for those who don't know sql: you'll learn the basics here) & tkinter gui. And if you think how much skill and knowledge you're getting for the $ you pay - it's a no-brainer. Again: 52 hours of a top-notch video content with loads of excercises and code snippets
				</Paper>
			</Container>
		</div>
	);
};

export default CourseDetail;


