import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "../theme/AppTheme.tsx";
import AppAppBar from "../components/AppAppBar.tsx";
import AccountProfile from "../components/AccountProfile.tsx";
import { Typography, CircularProgress, Paper, Button } from "@mui/material";
import Footer from "../components/Footer.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import ProductService from "../service/ProductService.ts";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import ElectricMopedIcon from "@mui/icons-material/ElectricMoped";
import StarIcon from "@mui/icons-material/Star";
import LabelIcon from "@mui/icons-material/Label";

export default function ProductPage(props: { disableCustomTheme?: boolean }) {
  const location = useLocation();
  const userData = location.state?.userData;
  console.log("userrrr trang account, ", userData);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { id } = useParams();
  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => ProductService.getDetailsProduct(id!),
    enabled: !!id,
  });
  const product = productData?.data;
  console.log("trang san pham ", product);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Lỗi khi tải sản phẩm</Typography>;

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
        <Box
          sx={{
            width: "100%",
            bgcolor: "#fff",
            boxShadow: 2,
          }}
        >
          <AppAppBar user={userData} />
        </Box>

        {/* Main (Slider + Content) */}
        <Container maxWidth="md" sx={{ mt: 2 }}>
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
              px: 2,
              py: 4,
            }}
          >
            <Box>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <img
                    style={{ width: 300, height: 300, marginRight: "0px" }}
                    src={product?.firstImage}
                  ></img>
                </div>

                <Paper
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    backgroundColor: "white",
                    marginRight: "40px",
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "#FFF0F1",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <LabelIcon style={{ color: "#D93843", fontSize: "16px" }} />
                    <span
                      style={{
                        textTransform: "uppercase",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#D93843",
                      }}
                    >
                      {product?.productCategory}
                    </span>
                  </div>
                  <h2>
                    <b>{product?.name}</b>
                  </h2>

                  <h2 style={{ color: "red" }}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product?.price)}
                  </h2>
                  <StarIcon fontSize="small" sx={{ color: "#FFD700" }} />
                  <StarIcon fontSize="small" sx={{ color: "#FFD700" }} />
                  <StarIcon fontSize="small" sx={{ color: "#FFD700" }} />
                  <StarIcon fontSize="small" sx={{ color: "#FFD700" }} />
                  <StarIcon fontSize="small" sx={{ color: "#FFD700" }} />
                  <p style={{ textAlign: "justify" }}>{product?.description}</p>
                  <ElectricMopedIcon />
                  <b style={{ color: "#1953CA" }}>Freeship đơn từ 45k</b>
                  <Button
                    variant="text"
                    disableElevation
                    sx={{
                      backgroundColor: "#1953CA !important",
                      color: "#FFFFFF !important",
                      "&:hover": {
                        backgroundColor: "#021694 !important",
                      },
                      width: "100%",
                    }}
                  >
                    <b>MUA NGAY</b>
                  </Button>
                </Paper>
              </div>
            </Box>
          </Box>
        </Container>

        {/* Footer */}
        <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
              px: 2,
              py: 3,
            }}
          >
            <Footer />
          </Box>
        </Container>
      </Box>
    </AppTheme>
  );
}
