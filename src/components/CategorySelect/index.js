import Divider from '../Divider';
import React from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

export default function CategorySelect({ categories, value, onChange, isAddCate, onSelectCate }) {
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
        style={{ marginTop: 20 }}
        color={'primary'}
        variant={'contained'}
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
        onClick={handleClick}>
        {value}

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
        <Divider
          onSelectCate={onSelectCate}
          isAddCate={isAddCate}
          onChange={onChange}
          isFromSelect
          onCloseMenu={handleClose}
          categories={categories} />
      </Popover>
    </div>
  );
}

