import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseByCategoryName } from '../../api';
import CourseCard from '../../components/Courses/card';
import Menu from '../../components/Menu';

const Search = (props) => {
	const [courses, setCourses] = useState([]);
	let { keyword } = useParams();

	useEffect(() => {
		getCourseByCategoryName(keyword).then(res => {
			if (res.success) {
				setCourses(res.data);
			}
		});
	}, [keyword]);

	return (
		<div style={{
			flex: 1,
			paddingBottom: 24,
		}}>
			<Menu />
			<h3 style={{ paddingLeft: 40, paddingTop: 20 }}>{keyword}</h3>
			<Grid
				style={{ paddingInline: 40 }}
				container
			>
				{courses.length === 0 && [1,2,3,4,5].map(course => <CourseCard key={course} isFromSeach/>)}
				{courses.length === 0 && [1,2,3,4,5].map(course => <CourseCard key={course} isFromSeach/>)}
				{[...courses].map(course => <CourseCard course={course} key={course._id} isFromSeach/>)}
			</Grid>
		</div>
	);
};

export default Search;


