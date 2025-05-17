import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../theme/AppTheme.tsx';
import AppAppBar from '../components/AppAppBar.tsx';
import MainContent from '../components/MainContent.tsx';
import { Typography, CircularProgress} from '@mui/material';
import Footer from '../components/Footer.tsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import { Box } from "@mui/material";

import { useQuery } from '@tanstack/react-query';
import ProductService from '../service/ProductService.ts';

export default function Blog(props: { disableCustomTheme?: boolean }) {
   const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const images = [
  "https://salt.tikicdn.com/cache/w750/ts/tikimsp/1f/7f/6e/78d8c9976eb8b7b3b6133671573d1a56.png.webp",
  "https://salt.tikicdn.com/cache/w750/ts/tikimsp/f3/66/ca/6b55739dd59475b36abeb76dcc8c22bc.jpg.webp"
];
const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: ProductService.getAllProduct
  });
  console.log('san pham ', data);
  
  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Lỗi khi tải sản phẩm</Typography>;
return (
  <AppTheme {...props}>
    <CssBaseline enableColorScheme />

    {/* Nền xám bao toàn trang */}
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* AppBar tràn mép trên + rộng full + nền trắng + đổ bóng */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#fff',
          boxShadow: 2,
        }}
      >
        <AppAppBar />
      </Box>

      {/* Main (Slider + Content) */}
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            px: 2,
            py: 4,
          }}
        >
          <Slider {...settings}>
            {images.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Slide ${idx}`}
                style={{ width: '100%', borderRadius: 8 }}
              />
            ))}
          </Slider>

          <Box sx={{ mt: 3 }}>
            <MainContent products={data?.data || []}  />
          </Box>
        </Box>
      </Container>

      {/* Footer riêng khối trắng */}
      <Container maxWidth="md" sx={{ mt: 3, pb: 4 }}>
        <Box
          sx={{
            bgcolor: '#fff',
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
