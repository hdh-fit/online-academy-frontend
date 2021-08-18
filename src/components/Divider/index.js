import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarBorder from '@material-ui/icons/StarBorder';
import { useHistory } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { categoryList } from '../../core/contanst';
import { FolderOpenOutlined } from '@material-ui/icons';


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

export default function NestedList({ categories, onCloseMenu, isFromSelect, onChange, onSelectCate,isAddCate }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(undefined);


  const handleClick = (index, item) => {
    if (isAddCate) {
      onSelectCate(item);
      onCloseMenu();
      return;
    }
    if (index === open) {
      setOpen(undefined);
    } else {
      setOpen(index);
    }
  };

  const onCategoryClick = (category) => {
    if (isFromSelect) {
      onChange({ name: category.name, label: category.label });
      onCloseMenu();
      return;
    }
    history.push(`/search?category=${category.name}&label=${category.label}`);
    onCloseMenu();
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {categoryList.map((item, index) => {
        return (
          <React.Fragment>
            <ListItem onClick={() => handleClick(index, item)} button>
              <ListItemIcon>
                <FolderOpenOutlined />
              </ListItemIcon>
              <ListItemText primary={item} />
              {open === index ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open === index} timeout="auto" unmountOnExit>
              {categories.filter(category => category.category === item).map(category => {
                return (
                  <ListItem
                    key={category._id}
                    button
                    className={classes.nested}
                    onClick={() => onCategoryClick(category)}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={category.label} />
                  </ListItem>
                );
              })}
            </Collapse>
          </React.Fragment>
        );
      })}
      {/*{categories.map(category => (
        <ListItem key={category._id} onClick={() => handleClick(category)} button>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary={category.label} />
          <NavigateNext />
        </ListItem>*/}
    </List>
  );
}
