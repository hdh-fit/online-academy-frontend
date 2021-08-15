import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCourseByCategoryName, getJoinedCourse, getWatchList, searchCourse } from '../../api';
import CourseCard from '../../components/Courses/card';
import Menu from '../../components/Menu';
import BasicPagination from '../../components/Paging';

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const Search = (props) => {
	const [courses, setCourses] = useState([]);
	const query = useQuery();

	const categoryName = query.get("category");
	const searchKeyword = query.get("course");
	const categoryLabel = query.get("label");
	const type = query.get("type");
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (!!categoryName) {
			getCourseByCategoryName(categoryName, page).then(res => {
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
		if (type === 'My Course') {
			getJoinedCourse().then(res => {
				if (res.success) {
					setCourses(res.data);
				} else {
				}
			});
		}

		if (type === 'Watch List') {
			getWatchList().then(res => {
				if (res.success) {
					setCourses(res.data);
				} else {
				}
			});
		}
	}, [categoryName, searchKeyword, type, page]);



	return (
		<div style={{
			flex: 1,
			paddingBottom: 24,
		}}>
			<Menu />
			<h3 style={{ paddingLeft: 40, paddingTop: 20 }}>{categoryLabel || (searchKeyword && `#${searchKeyword}`) || type}</h3>
			<Grid
				style={{ paddingInline: 40 }}
				container
			>
				{courses.length === 0 && [1, 2, 3, 4, 5].map(course => <CourseCard key={course} isFromSeach />)}
				{courses.length === 0 && [1, 2, 3, 4, 5].map(course => <CourseCard key={course} isFromSeach />)}
				{[...courses].map(course => <CourseCard course={course} key={course._id} isFromSeach />)}
			</Grid>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<BasicPagination onChange={setPage} />
			</div>
		</div>
	);
};

export default Search;


