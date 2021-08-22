import { Grid, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCourseByCategoryName, getJoinedCourse, getWatchList, getMyUploadCourse, searchCourse, getAllCourse, banCourse, viewTeacherCourse } from '../../api';
import CourseCard from '../../components/Courses/card';
import Menu from '../../components/Menu';
import BasicPagination from '../../components/Paging';
import _ from 'lodash';
import { chunk, showSuccessToast } from '../../core/utils';

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
	const teacherId = query.get("teacher");
	const teacherName = query.get("teacherName");
	const type = query.get("type");
	const [page, setPage] = useState(1);
	const [pageMax, setPageMax] = useState(1);
	const [sortField, setSortField] = useState(undefined);
	const [loading, setLoading] = useState(false);


	useEffect(() => {
		refreshData();
	}, [categoryName, searchKeyword, type, page, teacherId]);// eslint-disable-line react-hooks/exhaustive-deps

	const refreshData = () => {
		if (!!teacherId) {
			setLoading(true);
			viewTeacherCourse(teacherId).then(res => {
				if (res.success) {
					setCourses(res.data);
				}
			}).finally(() => setLoading(false));
		}
		if (!!categoryName) {
			setLoading(true);
			getCourseByCategoryName(categoryName, page).then(res => {
				if (res.success) {
					setCourses(res.data.course);
					setPageMax(res.data.pageMax);
				}
			}).finally(() => setLoading(false));
		}
		if (!!searchKeyword) {
			setLoading(true);
			searchCourse(searchKeyword, page)
				.then(res => {
					if (res.success) {
						setCourses(res.data.course);
						setPageMax(res.data.pageMax);

					} else {
					}
				}).finally(() => setLoading(false));
		}
		if (type === 'My Course') {
			setLoading(true);
			getJoinedCourse().then(res => {
				if (res.success) {
					setCourses(res.data);
				} else {
				}
			}).finally(() => setLoading(false));
		}

		if (type === 'Watch List') {
			setLoading(true);
			getWatchList().then(res => {
				if (res.success) {
					setCourses(res.data);
				} else {
				}
			}).finally(() => setLoading(false));
		}

		if (type === 'My Upload') {
			setLoading(true);
			getMyUploadCourse().then(res => {
				if (res.success) {
					setCourses(res.data);
				} else {
				}
			}).finally(() => setLoading(false));
		}

		if (type === 'All Course') {
			setLoading(true);
			getAllCourse().then(res => {
				if (res.success) {
					setCourses(res.data);
				} else {
				}
			}).finally(() => setLoading(false));
		}
	};

	const onBanCourse = (id) => {
		setLoading(true);
		banCourse(id)
			.then(res => {
				showSuccessToast('Lock course succesfully.');
				refreshData();
				setLoading(false);
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
			});
	};



	return (
		<div style={{
			flex: 1,
			paddingBottom: 24,
		}}>
			<Menu />
			<div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, paddingBottom: 12 }}>
				<h3 style={{ paddingLeft: 40, paddingTop: 20 }}>{categoryLabel || (searchKeyword && `#${searchKeyword}`) || type || (teacherId && `${teacherName}'s Courses`)}</h3>
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
			{!loading && courses.length === 0 && <h3 style={{ paddingLeft: 40 }}>No course found</h3>}

			{type === 'All Course'
				? chunk(orderBy([...courses], sortField), 5).map(arr => (
					(<React.Fragment>
						<Grid
							style={{ paddingInline: 40, marginTop: 20 }}
							container
						>
							{arr.length === 0 && [1, 2, 3, 4, 5].map(course => <CourseCard isLoading key={course} isFromSeach />)}
							{[...arr].map(course => <CourseCard onBanCourse={onBanCourse} course={course} key={course._id} isFromSeach />)}
						</Grid>
					</React.Fragment>)
				))
				: (<React.Fragment>
					<Grid
						style={{ paddingInline: 40 }}
						container
					>
						{loading && courses.length === 0 && [1, 2, 3, 4, 5].map(course => <CourseCard isLoading={true} key={course} isFromSeach />)}
						{orderBy([...courses], sortField).map(course => <CourseCard isFromEnrolled={type === 'My Course'} onBanCourse={onBanCourse} course={course} key={course._id} isFromSeach />)}
					</Grid>
					{courses.length !== 0 && <div style={{ display: 'flex', justifyContent: 'center' }}>
						<BasicPagination pageMax={pageMax} onChange={setPage} />
					</div>
					}
				</React.Fragment>)}
		</div>
	);
};

export default Search;


