import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NavigateNext from '@material-ui/icons/NavigateNext';
import StarBorder from '@material-ui/icons/StarBorder';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList({ categories, onCloseMenu }) {
  const classes = useStyles();
  const history = useHistory();


  const handleClick = (category) => {
    history.push(`/search?category=${category.name}&label=${category.label}`);
    onCloseMenu();
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {categories.map(category => (
        <ListItem key={category._id} onClick={() => handleClick(category)} button>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary={category.label} />
          <NavigateNext />
        </ListItem>
      ))}
    </List>
  );
}
