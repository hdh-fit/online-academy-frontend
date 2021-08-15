import { Grid, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCourseByCategoryName, getJoinedCourse, getWatchList, searchCourse } from '../../api';
import CourseCard from '../../components/Courses/card';
import Menu from '../../components/Menu';
import BasicPagination from '../../components/Paging';
import _ from 'lodash';

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const orderBy = (array, field) => {
	if (!!field) {
		return _.orderBy(array, [course => `${course[field]}`], [field === 'rating' ? 'desc' : 'asc']);
	}
	return array;
};

const Search = (props) => {
	const [courses, setCourses] = useState([]);
	const query = useQuery();

	const categoryName = query.get("category");
	const searchKeyword = query.get("course");
	const categoryLabel = query.get("label");
	const type = query.get("type");
	const [page, setPage] = useState(1);
	const [sortField, setSortField] = useState(undefined);


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
			<div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, paddingBottom: 12 }}>
				<h3 style={{ paddingLeft: 40, paddingTop: 20 }}>{categoryLabel || (searchKeyword && `#${searchKeyword}`) || type}</h3>
				<div style={{ marginRight: 50, paddingTop: 12 }}>
					<InputLabel style={{ color: 'black', fontSize: 12 }}>
						{'Sort by'}
					</InputLabel>
					<Select
						style={{ width: 200 }}
						onChange={(e) => setSortField(e.target.value)}
						displayEmpty
					>
						<MenuItem value={undefined}>None</MenuItem>
						<MenuItem value={'rating'}>Best rating</MenuItem>
						<MenuItem value={'price'}>Price low to high</MenuItem>
					</Select>
				</div>
			</div>
			<Grid
				style={{ paddingInline: 40 }}
				container
			>
				{courses.length === 0 && [1, 2, 3, 4, 5].map(course => <CourseCard key={course} isFromSeach />)}
				{orderBy([...courses], sortField).map(course => <CourseCard course={course} key={course._id} isFromSeach />)}
			</Grid>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<BasicPagination onChange={setPage} />
			</div>
		</div>
	);
};

export default Search;


