import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { banCourse, getBestCourses, getTopNew, getTopView } from '../../api';
import CourseCard from '../../components/Courses/card';
import Menu from '../../components/Menu';
import { showSuccessToast } from '../../core/utils';

const Home = (props) => {
  const [topView, setTopView] = useState([]);
  const [topNew, setTopNew] = useState([]);
  const [bestCourse, setBestCourse] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const refreshData = () => {
    getCourseNew();
    getCourseTopView();
    getBestCourseList();
  };

  const onBanCourse = (id) => {
    banCourse(id)
      .then(res => {
        showSuccessToast('Lock course succesfully.');
        refreshData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getCourseNew = () => {
    getTopNew()
      .then(response => {
        if (response.success) {
          setTopNew(response.data);
        }
      });
  };

  const getCourseTopView = () => {
    getTopView()
      .then(response => {
        if (response.success) {
          setTopView(response.data);
        }
      });
  };

  const getBestCourseList = () => {
    getBestCourses()
      .then(response => {
        if (response.success) {
          setBestCourse(response.data);
        }
      });
  };
  //const [nameVideo, setnameVideo] = useState("");
  //const [idCourse, setidCourse] = useState("");
  //const [video, setvideo] = useState(undefined);
  //const ref = useRef(null);

  //const onupload = () => {
  //  let form = new FormData();
  //  form.append('nameVideo', nameVideo);
  //  form.append('idCourse', idCourse);
  //  form.append('video', video);

  //  //upLoadVideo({ nameVideo, idCourse, video })
  //  //  .then(res => console.log(res))
  //  //  .catch(err => console.log(err));
  //};

  return (
    <div style={{
      flex: 1,
      paddingBottom: 24,
    }}>
      <Menu />
      <h3 style={{ paddingLeft: 40, paddingTop: 20 }}>{'Khoá học được xem nhiều nhất'}</h3>
      <Carousel
        navButtonsProps={{
          style: {
            marginTop: -60,
          }
        }}
        navButtonsAlwaysVisible
        IndicatorIcon={null}
        swipe
        autoPlay={false}
        animation={'slide'}
      >
        <Grid
          style={{ paddingInline: 40 }}
          container
          direction="row"
        >
          {topView.length === 0 && [1, 2, 3, 4, 5].map(course => <CourseCard  key={course} />)}
          {[...topView].slice(0, 5).map(course => <CourseCard onBanCourse={onBanCourse} key={course._id} course={course} />)}
        </Grid>
        <Grid
          style={{ paddingInline: 40 }}
          container
          direction="row">
          {topView.length === 0 && [1, 2, 3, 4, 5].map(course => <CourseCard key={course} />)}
          {[...topView].slice(5).map(course => <CourseCard onBanCourse={onBanCourse} course={course} key={course._id} />)}
        </Grid>
      </Carousel>
      <h3 style={{ paddingLeft: 40 }}>{'Khoá học mới nhất'}</h3>
      <Carousel
        navButtonsAlwaysVisible
        navButtonsProps={{
          style: {
            marginTop: -60
          }
        }}
        IndicatorIcon={null}
        swipe
        autoPlay={false}
        animation={'slide'}
      >
        <Grid
          style={{ paddingInline: 40 }}
          container
          direction="row">
          {topNew.length === 0 && [1, 2, 3, 4, 5].map(course => <CourseCard key={course} />)}
          {[...topNew].slice(0, 5).map(course => <CourseCard onBanCourse={onBanCourse} course={course} key={course._id} />)}
        </Grid>
        <Grid
          style={{ paddingInline: 40 }}
          container
          direction="row">
          {topNew.length === 0 && [1, 2, 3, 4, 5].map(course => <CourseCard key={course} />)}
          {[...topNew].slice(5).map(course => <CourseCard course={course} key={course._id} />)}
        </Grid>
      </Carousel>
      <h3 style={{ paddingLeft: 40 }}>{'Khoá học nổi bật'}</h3>
      <Grid
        style={{ paddingInline: 40 }}
        container
        alignItems="center"
        justifyContent="center"
        direction="row">
        {topNew.length === 0 && [1, 2, 3, 4, 5].map(course => <CourseCard key={course} />)}
        {[...bestCourse].map(course => <CourseCard onBanCourse={onBanCourse} course={course} key={course._id} />)}
      </Grid>
    </div>
  );
};

export default Home;


