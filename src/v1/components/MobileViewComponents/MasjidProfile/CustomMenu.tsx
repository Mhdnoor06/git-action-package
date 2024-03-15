import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { authLogout } from "../../../redux/actions/AuthActions/LogoutAction";
import { useAppThunkDispatch } from "../../../redux/hooks";
import { confirmation } from "../../../helpers/HelperFunction";

function CustomMenu() {
  const dispatch = useAppThunkDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    const confirmRes = await confirmation("Are you sure you want to Log Out ?");
    if (confirmRes) {
      const res = dispatch(authLogout());
    }
    handleMenuClose();
  };

  return (
    <div>
      <IconButton
        aria-controls="custom-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="custom-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogout}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default CustomMenu;
