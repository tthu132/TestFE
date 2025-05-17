import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Button from "@mui/material/Button";
import { data } from "react-router-dom";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const demoSession = {
  user: {
    name: "Bharat Kashyap",
    email: "bharatkashyap@outlook.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
  },
};
type AppAppBarProps = {
  user?: { id: string; name: string };
};
export default function AccountCustomSlotProps({ user }: AppAppBarProps) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const navigate = useNavigate();
  const handleGoToAccount = () => {
    console.log("user 2", user);

    navigate("/account", {
      replace: true,
      state: {
        userData: user, // hoặc toàn bộ `data` nếu cần
      },
    });
    setOpen(false);
  };

  const handleLogout = () => {
    // Xóa thông tin đăng nhập, token...
    localStorage.removeItem("access_token");
    sessionStorage.clear(); // nếu bạn dùng sessionStorage

    setOpen(false);
    navigate("/login"); // chuyển về trang đăng nhập
  };
  return (
    <Stack direction="row" spacing={2}>
      <Box
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        sx={{
          display: "inline-block",
          p: 1, // padding giúp mở rộng vùng hover
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          sx={{
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: 1,
          }}
        >
          <Avatar src="/broken-image.jpg" sx={{ width: 32, height: 32 }} />
          <b>{user?.name}</b>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          modifiers={[
            {
              name: "zIndex",
              enabled: true,
              phase: "write",
              fn({ state }) {
                state.elements.popper.style.zIndex = "1500";
              },
            },
          ]}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleGoToAccount}>Profile</MenuItem>
                  <MenuItem onClick={handleGoToAccount}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Stack>
  );
}
