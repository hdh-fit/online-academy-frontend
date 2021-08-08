import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Star, StarOutlineOutlined } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    flex: 1,
    marginRight: 5,
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

const initCourse = {
  "_id": "",
  "feedBack": [],
  "stt": "",
  "name": "",
  "short_described": "",
  "full_described": "",
  "rating": "",
  "image_link": "",
  "dateCourse": "",
  "isFinish": false,
  "view": '',
  "price": '',
  "category": "",
  "review": [
  ],
  "idTeacher": "",
  "video": []
};

export default function CourseCard({ course }) {
  const classes = useStyles();
  const history = useHistory();
  const courseData = course ? course : initCourse;

  return (
    <Card onClick={() => history.push(`/course/${courseData._id}`)} variant="outlined" className={classes.root}>
      <CardActionArea>
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
            {'Jeff'}
          </Typography>
          <Typography variant="body1" component="p">
            {courseData.category}
          </Typography>
          <Grid
            container
            alignItems={'center'}
            direction="row">
            <Star style={{ fontSize: 15, fill: "rgb(219,154,60)" }} />
            <Star style={{ fontSize: 15, fill: "rgb(219,154,60)" }} />
            <Star style={{ fontSize: 15, fill: "rgb(219,154,60)" }} />
            <StarOutlineOutlined style={{ fontSize: 15, fill: "rgb(219,154,60)" }} />
            <StarOutlineOutlined style={{ fontSize: 15, fill: "rgb(219,154,60)" }} />
            <span style={{ paddingLeft: 10, color: 'gray', fontSize: 13 }}>
              {`(${courseData.review.length} lượt đánh giá)`}
            </span>
          </Grid>
          <div style={{ fontWeight: 'bold' }}>
            {`${courseData.price} VND`}
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ padding: 0, margin: 0 }} disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
