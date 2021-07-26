import Divider from '../Divider';
import React from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import {ExpandLess, ExpandMore} from '@material-ui/icons';

export default function SimplePopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
        style={{paddingLeft: 20, paddingBottom: 0, fontSize: 15}}
        onClick={handleClick}>
        {'Danh mục'}

      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Divider />
      </Popover>
    </div>
  );
}

