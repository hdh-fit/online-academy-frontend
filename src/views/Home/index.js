import { Grid } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSelector } from 'react-redux';
import CourseCard from '../../components/Courses/card';
import Menu from '../../components/Menu';

const Home = (props) => {
  const appState = useSelector(state => state.app);
  console.log('user', appState);
  return (
    <div style={{
      flex: 1,
    }}>
      <Menu />
      <h3 style={{ paddingLeft: 40, paddingTop: 20 }}>{'Khoá học được xem nhiều nhất'}</h3>
      <Carousel
        navButtonsProps={{
          style: {
            marginTop: -60
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
          justifyContent="space-around"
          direction="row">
          <CourseCard id={1} />
          <CourseCard id={2} />
          <CourseCard id={3} />
          <CourseCard id={4} />
          <CourseCard id={5} />
        </Grid>
        <Grid
          style={{ paddingInline: 40 }}
          container
          justifyContent="space-around"
          direction="row">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
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
          justifyContent="space-around"
          direction="row">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </Grid>
        <Grid
          style={{ paddingInline: 40 }}
          container
          justifyContent="space-around"
          direction="row">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </Grid>
      </Carousel>
      <h3 style={{ paddingLeft: 40 }}>{'Khoá học nổi bật'}</h3>
      <Grid
        style={{ paddingInline: 40 }}
        container
        justifyContent="space-around"
        direction="row">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </Grid>
    </div>
  );
};

export default Home;


