import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
//import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Favorite from '@material-ui/icons/Favorite';
import { Security, CloudUploadRounded, Folder } from '@material-ui/icons';
const useStyles = makeStyles({
  root: {
    width: 230,
  },
});

export default function TypographyMenu({ onPressMyCourse, onPressWatchlist, onPressChangePass, user }) {
  const classes = useStyles();
  const isTeacher = user?.type === 2;
  const isAdmin = user?.type === 3;

  return (
    <Paper className={classes.root}>
      <MenuList>
        <MenuItem onClick={onPressMyCourse}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">{isAdmin ? 'Course Manage' : 'My Courses'}</Typography>
        </MenuItem>
        <MenuItem onClick={onPressWatchlist}>
          <ListItemIcon>
            {isAdmin ? <Folder fontSize="small" /> : isTeacher ? <CloudUploadRounded fontSize="small" /> : <Favorite fontSize="small" />}
          </ListItemIcon>
          <Typography variant="inherit">{isAdmin ? 'Category Manage' : !isTeacher ? 'Watch List' : 'Add course'}</Typography>
        </MenuItem>
        <MenuItem onClick={onPressChangePass}>
          <ListItemIcon>
            <Security fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Change Password</Typography>
        </MenuItem>
        {/*<MenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            A very long text that overflows
          </Typography>
        </MenuItem>*/}
      </MenuList>
    </Paper>
  );
}
