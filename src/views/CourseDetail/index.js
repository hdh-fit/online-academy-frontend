import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { useParams } from "react-router-dom";
import './course.css';
import { Star, StarOutlineOutlined } from '@material-ui/icons';
import { Avatar, Button, Container, Grid, Paper } from '@material-ui/core';
import CourseContent from '../../components/CoursesContent';
import CourseDetailCard from '../../components/CourseDetailCard';
import image from '../../components/Courses/contemplative-reptile.jpeg';
import { getCourseDetail, joinCourse, submitReview } from '../../api';
import ReviewDialog from '../../components/ReviewDialog';
import { showErrorToast, showSuccessToast } from '../../core/utils';
import { useSelector } from 'react-redux';

const CourseDetail = () => {
	let { id } = useParams();
	const initCourse = {
		"feedBack": [],
		"name": "",
		"short_described": "",
		"full_described": "",
		"rating": 0,
		"image_link": "",
		"dateCourse": "",
		"isFinish": false,
		"view": 0,
		"price": 0,
		"category": "",
		"review": [
		],
		"idTeacher": "",
		"video": [
			{
				"_id": "",
				"name": "",
				"link": "",
				"id_course": ""
			}
		]
	};

	const [course, setCourse] = useState(initCourse);
	const [openReview, setOpenReview] = useState(false);
	const appState = useSelector(state => state.app);


	useEffect(() => {
		getCourse();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps


	const getCourse = () => {
		getCourseDetail(id)
			.then(response => {
				if (response.success) {
					setCourse(response.data);
				}
			});
	};

	const onSubmitReview = (body) => {
		submitReview(body, course._id)
			.then(res => {
				if (res.success) {
					let newReviews = course.review;
					newReviews.unshift(res.data.review);
					setCourse({ ...course, review: newReviews, rating: res.data.courseRating });
					setOpenReview(false);
				} else {
					showErrorToast(res.error_message);
				}
			})
			.catch(err => {
				showErrorToast(`${err}`);
			});
	};

	const onBuyCourse = () => {
		joinCourse(course._id)
			.then(res => {
				if (res.success) {
					showSuccessToast('Buy course successfully.');
				} else {
					showErrorToast(res.error_message);
				}
			})
			.catch(err => {
				showErrorToast(`${err}`);
			});
	};

	const FillStar = (size = 17) => <Star style={{ fontSize: size, fill: "rgb(219,154,60)" }} />;
	const OutlinedStart = (size = 17) => <StarOutlineOutlined style={{ fontSize: size, fill: "rgb(219,154,60)" }} />;

	const renderRatingChart = (type) => {
		const count = course.review.filter(item => item.rate === type).length;
		console.log(type, count);
		const percent = count / course.review.length;

		return (
			<div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
				<div style={{ width: 380, height: 9, backgroundColor: 'rgb(165,169,172)', display: 'flex', marginRight: 5 }}>
					<div style={{ backgroundColor: 'gray', flex: percent }} />
				</div>
				{[1, 2, 3, 4, 5].map(starPoint => (type >= starPoint ? FillStar() : OutlinedStart()))}
				<span style={{ color: 'rgb(73,46,187)', paddingLeft: 5, fontSize: 14 }}>
					{`${(percent * 100).toFixed(0)}%`}
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
						{course.name}
					</h3>
					<span>
						{course.short_described}
					</span>
					<Grid alignItems='center' direction='row'>
						{[1, 2, 3, 4, 5].map(starPoint => (course.rating >= starPoint ? FillStar() : OutlinedStart()))}
						<span style={{ fontSize: 14 }}>
							{` (${course.review.length} ratings) 326,026 students`}
						</span>
					</Grid>
					<span style={{ fontSize: 14 }}>
						{`Last updated ${new Date(course.dateCourse)}`}
					</span>
				</Container>
			</div>
			<Container style={{ display: 'flex', paddingTop: 40 }}>
				<div style={{ flex: 1 }}>
					<Paper variant="outlined">
						<h3 style={{ padding: 15, paddingBottom: 5 }}>
							{`What you'll learn`}
						</h3>
						<p style={{ paddingLeft: 17 }}>
							{course.full_described}
						</p>
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
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h3 >
								{'Reviews'}
							</h3>
							{appState.isLogin && (
								<Button
									onClick={() => setOpenReview(true)}
									variant={'contained'}
									size="medium"
									style={{
										backgroundColor: 'rgb(28,29,31)',
										color: 'white',
										fontWeight: 'bold',
										width: 140
									}}>
									{'ADD REVIEW'}
								</Button>
							)}

						</div>
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
									{course.rating.toFixed(1)}
								</span>
								<div style={{ marginTop: -20 }}>
									{[1, 2, 3, 4, 5].map(starPoint => (course.rating >= starPoint ? FillStar(19) : OutlinedStart(19)))}
								</div>
								<span style={{ fontWeight: 'bold', fontSize: 15 }}>
									{'Course Rating'}
								</span>
							</div>
							<div style={{ flex: 1 }}>
								{renderRatingChart(5)}
								{renderRatingChart(4)}
								{renderRatingChart(3)}
								{renderRatingChart(2)}
								{renderRatingChart(1)}
							</div>
						</div>
						{course.review.map((item, index) => {
							return (
								<div key={`${item._id}`} style={{ display: 'flex', paddingTop: 20 }}>
									<Avatar alt="Remy Sharp" src={image} style={{ marginRight: 20 }} />
									<div>
										<h5 >
											{item.fullname}
										</h5>
										{[1, 2, 3, 4, 5].map(starPoint => (item.rate >= starPoint ? FillStar(19) : OutlinedStart(19)))}
										<span style={{ fontSize: 12, color: 'GrayText', paddingLeft: 8 }}>
											{'2 weeks ago'}
										</span>
										<p style={{ marginTop: 12 }}>
											{item.comment}
										</p>
									</div>
								</div>
							);
						})}
					</Paper>
				</div>
				<CourseDetailCard onBuyCourse={onBuyCourse} videoSrc={course.video[0]?.link} />
			</Container>
			{<ReviewDialog
				onSubmit={onSubmitReview}
				open={openReview}
				onClose={() => setOpenReview(false)} />
			}
		</div>
	);
};

export default CourseDetail;

