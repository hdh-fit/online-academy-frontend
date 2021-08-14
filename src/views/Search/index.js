import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCourseByCategoryName, searchCourse } from '../../api';
import CourseCard from '../../components/Courses/card';
import Menu from '../../components/Menu';

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const Search = (props) => {
	const [courses, setCourses] = useState([]);
	const query = useQuery();

	const categoryName = query.get("category");
	const searchKeyword = query.get("course");
	const categoryLabel = query.get("label");

	console.log(searchKeyword);


	useEffect(() => {
		if (!!categoryName) {
			getCourseByCategoryName(categoryName).then(res => {
				if (res.success) {
					setCourses(res.data);
				}
			});
		}
		if (!!searchKeyword) {
			searchCourse(searchKeyword)
				.then(res => {
					if (res.success) {
						setCourses(res.data);
					} else {
					}
				});
		}
	}, [categoryName, searchKeyword]);



	return (
		<div style={{
			flex: 1,
			paddingBottom: 24,
		}}>
			<Menu />
			<h3 style={{ paddingLeft: 40, paddingTop: 20 }}>{categoryLabel || searchKeyword && `#${searchKeyword}`}</h3>
			<Grid
				style={{ paddingInline: 40 }}
				container
			>
				{courses.length === 0 && [1, 2, 3, 4, 5].map(course => <CourseCard key={course} isFromSeach />)}
				{courses.length === 0 && [1, 2, 3, 4, 5].map(course => <CourseCard key={course} isFromSeach />)}
				{[...courses].map(course => <CourseCard course={course} key={course._id} isFromSeach />)}
			</Grid>
		</div>
	);
};

export default Search;


