import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Account from "./Account.tsx";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  padding: "8px 12px",
}));

type AppAppBarProps = {
  user?: { id: string; name: string };
};
export default function AppAppBar({ user }: AppAppBarProps) {
  const [open, setOpen] = React.useState(false);
  console.log("user 3 ", user);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const navigate = useNavigate();
  const handleGoToLogin = () => {
    console.log("check login");

    setOpen(false); // đóng Drawer trước
    navigate("/login");
  };
  const handleLogout = () => {
    // Xóa thông tin đăng nhập, token...
    localStorage.removeItem("access_token");
    sessionStorage.clear(); // nếu bạn dùng sessionStorage

    setOpen(false);
    navigate("/login"); // chuyển về trang đăng nhập
  };
  return (
    <AppBar
      position="static"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "#fff", // nếu muốn nền trắng
        backgroundImage: "none",
      }}
    >
      <Container maxWidth="md">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <SearchOutlinedIcon sx={{ color: "black" }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="text" color="info" size="small">
                Features
              </Button>
              <Button variant="text" color="info" size="small">
                Testimonials
              </Button>
              <Button variant="text" color="info" size="small">
                Highlights
              </Button>
              <Button variant="text" color="info" size="small">
                Pricing
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                FAQ
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                Blog
              </Button>
            </Box>
          </Box>

          <Box
          // sx={{
          //   display: { xs: "none", md: "flex" },
          //   gap: 1,
          //   alignItems: "center",
          // }}
          >
            {user ? (
              <Account user={user} />
            ) : (
              <>
                {" "}
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  onClick={handleLogout}
                >
                  Sign in
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleGoToLogin}
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={handleGoToLogin}
                  >
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    fullWidth
                    onClick={handleGoToLogin}
                  >
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
