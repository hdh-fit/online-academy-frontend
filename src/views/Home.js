import {Grid} from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import CourseCard from '../components/Courses/card';
import Menu from '../components/Menu';

const Home = (props) => {

  return (

    <div style={{
      flex: 1,
    }}>
      <Menu />
      <h3 style={{paddingLeft: 40,paddingTop:20}}>{'Khoá học được xem nhiều nhất'}</h3>
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
          style={{paddingInline: 40}}
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
          style={{paddingInline: 40}}
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
      <h3 style={{paddingLeft: 40}}>{'Khoá học mới nhất'}</h3>
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
          style={{paddingInline: 40}}
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
          style={{paddingInline: 40}}
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
      <h3 style={{paddingLeft: 40}}>{'Khoá học nổi bật'}</h3>
      <Grid
        style={{paddingInline: 40}}
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


