import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Star, StarOutlineOutlined, NewReleases, Favorite, Lock } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import moment from 'moment';
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';

const initCourse = {
  "_id": "",
  "feedBack": [],
  "stt": "",
  "name": "",
  "short_described": "",
  "full_described": "",
  "rating": 0,
  "image_link": "",
  "dateCourse": undefined,
  "isFinish": false,
  "view": '',
  "price": '',
  "category": "",
  "review": [
  ],
  "idTeacher": "",
  "video": [],
  "nameTeacher": ""
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flex: 1,
    marginRight: 5,
    minHeight:'100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const FillStar = (size = 17) => <Star style={{ fontSize: size, fill: "rgb(219,154,60)" }} />;
const OutlinedStart = (size = 17) => <StarOutlineOutlined style={{ fontSize: size, fill: "rgb(219,154,60)" }} />;




export default function CourseCard({ course, isFromSeach, onBanCourse }) {
  const classes = useStyles();
  const history = useHistory();
  const courseData = course ? course : initCourse;
  const a = moment(new Date(courseData.dateCourse));
  const today = moment(new Date());
  const appState = useSelector(state => state.app);
  const decode = appState?.accessToken ? jwt_decode(appState.accessToken) : undefined;
  const isAdmin = decode?.type === 3;

  const onBanCoursePress = () => {
    onBanCourse(courseData._id);
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea onClick={() => history.push(`/course/${courseData._id}`)}>
        <CardMedia
          component="img"
          alt={courseData.name}
          height="140"
          image={courseData.image_link}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography style={{ fontWeight: 'bold' }} variant="body1" component="p">
            {courseData.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {courseData.nameTeacher}
          </Typography>
          <Typography variant="body1" component="p">
            {courseData.category}
          </Typography>
          <Grid
            container
            alignItems={'center'}
            direction="row">
            {[1, 2, 3, 4, 5].map(starPoint => (courseData?.rating?.toFixed(0) >= starPoint ? FillStar() : OutlinedStart()))}
            {courseData.review && (
              <span style={{ paddingLeft: 10, color: 'gray', fontSize: 13 }}>
                {`(${courseData.review?.length} lượt đánh giá)`}
              </span>
            )}
          </Grid>
          <div style={{ fontWeight: 'bold' }}>
            {`${courseData.price} VND`}
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ padding: 0, margin: 0 }} disableSpacing>
        <IconButton onClick={isAdmin ? onBanCoursePress : null} aria-label="share">
          {isAdmin ? <Lock /> : <Favorite color={'error'} />}
        </IconButton>
        {today.diff(a, 'days') <= 1 && <IconButton onClick={null} aria-label="share">
          <NewReleases color={'error'} />
        </IconButton>
        }
      </CardActions>
    </Card>
  );
}
