import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import { useParams } from "react-router-dom";
import './course.css';
import { Star, StarOutlineOutlined } from '@material-ui/icons';
import { Avatar, Button, Container, Grid, Paper } from '@material-ui/core';
import CourseContent from '../../components/CoursesContent';
import CourseDetailCard from '../../components/CourseDetailCard';
import image from '../../components/Courses/contemplative-reptile.jpeg';
import { addToWatchlist, getCourseDetail, getJoinedCourse, getMyUploadCourse, getWatchList, joinCourse, submitReview } from '../../api';
import ReviewDialog from '../../components/ReviewDialog';
import { formatDate, showErrorToast, showSuccessToast } from '../../core/utils';
import { useSelector } from 'react-redux';
import DOMPurify from "dompurify";
import VideoView from '../../components/VideoView';
import jwt_decode from "jwt-decode";

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
		],
		"teacher": {
			"describe": null,
			"fullname": "",
			"listCourse": [],
			"_id": "",
		},
		"_id": "",
	};

	const [course, setCourse] = useState(initCourse);
	const [openReview, setOpenReview] = useState(false);
	const appState = useSelector(state => state.app);
	const [isMyCourse, setIsMyCourse] = useState(false);
	const [isMyUploadCourse, setIsMyUploadCourse] = useState(false);
	const [isInWatchList, setIsInWatchList] = useState(false);
	const [openVideo, setOpenVideo] = useState(false);
	const [videoSelect, setVideoSelect] = useState(undefined);
	const [lessonNumber, setLessonNumber] = useState(undefined);

	const decode = appState?.accessToken ? jwt_decode(appState.accessToken) : undefined;
	const userType = decode?.type;

	const onOpenVideoPress = (video, index) => {
		setVideoSelect(video);
		setLessonNumber(index);
		setOpenVideo(true);
	};



	useEffect(() => {
		getCourse();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps


	const getCourse = () => {
		getCourseDetail(id)
			.then(response => {
				if (response.success) {
					setCourse(response.data);
					if (appState.isLogin) {

						if (userType === 1) {
							getJoinedCourse().then(res => {
								if (res.success) {
									const findCourse = res.data.findIndex(item => item._id === response.data._id);
									if (findCourse !== -1) {
										setIsMyCourse(true);
									}
								}
							});

							getWatchList().then(res => {
								if (res.success) {
									const findCourse = res.data.findIndex(item => item._id === response.data._id);
									if (findCourse !== -1) {
										setIsInWatchList(true);
									}
								}
							});
						} else if (userType === 2) {
							getMyUploadCourse().then(res => {
								if (res.success) {
									const findCourse = res.data.findIndex(item => item._id === response.data._id);
									if (findCourse !== -1) {
										setIsMyUploadCourse(true);
									}
								}
							});
						}
					}
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
		if (appState.isLogin) {

			joinCourse(course._id)
				.then(res => {
					if (res.success) {
						setIsMyCourse(true);
						showSuccessToast('Buy course successfully.');
					} else {
						showErrorToast(res.error_message);
					}
				})
				.catch(err => {
					showErrorToast(`${err}`);
				});
		} else {
			showErrorToast(`You need login to enroll course.`);
		}
	};

	const onAddWatchList = () => {
		if (appState.isLogin) {
			addToWatchlist(course._id)
				.then(res => {
					if (res.success) {
						showSuccessToast(isInWatchList ? 'Remove course from watch list successfully.' : 'Add course to watch list successfully.');
						setIsInWatchList(prev => !prev);
					} else {
						showErrorToast(res.error_message);
					}
				})
				.catch(err => {
					showErrorToast(`${err}`);
				});
		} else {
			showErrorToast(`You need login to add course to watch list.`);
		}
	};

	const FillStar = (size = 17) => <Star style={{ fontSize: size, fill: "rgb(219,154,60)" }} />;
	const OutlinedStart = (size = 17) => <StarOutlineOutlined style={{ fontSize: size, fill: "rgb(219,154,60)" }} />;

	const renderRatingChart = (type) => {
		const count = course.review.filter(item => item.rate === type).length;
		const percent = count / course.review.length || 0;

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
						{[1, 2, 3, 4, 5].map(starPoint => (course.rating.toFixed(0) >= starPoint ? FillStar() : OutlinedStart()))}
						<span style={{ fontSize: 14 }}>
							{` (${course.review.length} ratings) ${course.listStudent?.length || 0} students`}
						</span>
					</Grid>
					<span style={{ fontSize: 14 }}>
						{`Last updated ${formatDate(course.dateCourse)}`}
					</span>
				</Container>
			</div>
			<Container style={{ display: 'flex', paddingTop: 40 }}>
				<div style={{ flex: 1 }}>
					<Paper variant="outlined">
						<h3 style={{ padding: 15, paddingBottom: 5 }}>
							{`What you'll learn`}
						</h3>
						<div
							style={{ paddingLeft: 17, paddingBottom: 19 }}
							dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.full_described) }}
						/>
					</Paper>
					<h3 style={{ paddingTop: 20 }}>
						{'Course content'}
					</h3>
					<CourseContent
						onOpenVideoPress={onOpenVideoPress}
						lessons={course.video}
					/>
					<Paper style={{ marginTop: 20, padding: 20, marginBottom: 20 }} variant="outlined">
						<h3 >
							{'Instructors'}
						</h3>
						<h5 style={{ paddingTop: 10 }}>
							{course.teacher.fullname}
						</h5>
						<span>
							{course.teacher.describe}
						</span>
						<div style={{ display: 'flex', alignItems: 'center', paddingTop: 20, paddingBottom: 20 }}>
							<Avatar style={{ width: 100, height: 100 }} alt="Remy Sharp" src={image} />
							<ul >
								<li>
									{`Gender: ${course.teacher.gender}`}
								</li>
								<li>
									{`Email: ${course.teacher.email}`}
								</li>
								<li>
									{`DoB: ${formatDate(course.teacher.dob)}`}
								</li>
							</ul>
						</div>
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
									{[1, 2, 3, 4, 5].map(starPoint => (course.rating.toFixed(0) >= starPoint ? FillStar(19) : OutlinedStart(19)))}
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
				<CourseDetailCard
					idCourse={course._id}
					isMyUploadCourse={isMyUploadCourse}
					isMyCourse={isMyCourse}
					isInWatchList={isInWatchList}
					onBuyCourse={onBuyCourse}
					onAddWatchList={onAddWatchList}
					videoSrc={course.video[2]?.link} />
			</Container>
			{<ReviewDialog
				onSubmit={onSubmitReview}
				open={openReview}
				onClose={() => setOpenReview(false)} />
			}
			<VideoView
				lessonNumber={lessonNumber + 1}
				video={videoSelect}
				open={openVideo}
				onClose={() => setOpenVideo(false)}
			/>
		</div>
	);
};

export default CourseDetail;

