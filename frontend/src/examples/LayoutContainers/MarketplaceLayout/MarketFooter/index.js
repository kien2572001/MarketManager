import "./style.scss"
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import TopSales from "./TopSales";


const MarketFooter = () => {
  return (
    <div>
      <div className="container-footer">
        <Box
          component="footer"
          sx={{
            backgroundColor: "black",
            p: 6,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" color="#f5f5f5" gutterBottom>
                  CHỢ NỔI CÁI RĂNG ONLINE
                </Typography>
                <Typography variant="body2" color="#f5f5f5">
                  <img src="https://chonoicairang.net/wp-content/uploads/2020/04/chonoicairang.net_.png" alt="logo" style={{ maxHeight: "90px" }} />
                  Chợ nổi Cái Răng Online - một dự án của Nụ Cười Mê Kông
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" color="#f5f5f5" gutterBottom>
                  SẢN PHẨM BÁN CHẠY
                </Typography>
                <Typography variant="body2" color="#f5f5f5">
                  <TopSales />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" color="#f5f5f5" gutterBottom>
                  LIÊN KẾT HỮU ÍCH
                </Typography>
                <Typography variant="body2" color="#f5f5f5" style={{ borderBottom: '1px solid #ebebeb', height: '30px' }}>
                  Liên hệ
                </Typography>
                <Typography variant="body2" color="#f5f5f5" style={{ borderBottom: '1px solid #ebebeb', height: '30px' }}>
                  Điều khoản sử dụng
                </Typography>
                <Typography variant="body2" color="#f5f5f5" style={{ borderBottom: '1px solid #ebebeb', height: '30px' }}>
                  Chính sách bảo mật
                </Typography>
                <Typography variant="body2" color="#f5f5f5" style={{ borderBottom: '1px solid #ebebeb', height: '30px' }}>
                  Giới thiệu dự án
                </Typography>
                <Typography variant="body2" color="#f5f5f5" style={{ borderBottom: '1px solid #ebebeb', height: '30px' }}>
                  Chợ nổi Cái Răng
                </Typography>
                <Typography variant="body2" color="#f5f5f5" style={{ borderBottom: '1px solid #ebebeb', height: '30px' }}>
                  Cai Rang Floating Market
                </Typography>
                <Typography variant="body2" color="#f5f5f5" style={{ borderBottom: '1px solid #ebebeb', height: '30px' }}>
                  Nụ Cười Mê Kông
                </Typography>
                <Typography variant="body2" color="#f5f5f5" style={{ borderBottom: '1px solid #ebebeb', height: '30px' }}>
                  Mekong Smile Tour
                </Typography>

              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" color="#f5f5f5" gutterBottom>
                  CHÚNG TÔI TRÊN FACEBOOK
                </Typography>
                <Link
                  href="https://www.facebook.com/"
                  color="#f5f5f5"
                  sx={{ pl: 2, pr: 2, fontSize: 40 }}
                >
                  <Facebook />
                </Link>
                <Link
                  href="https://www.instagram.com/"
                  color="#f5f5f5"
                  sx={{ pl: 2, pr: 2, fontSize: 40 }}
                >
                  <Instagram />
                </Link>
                <Link
                  href="https://www.twitter.com/"
                  color="#f5f5f5"
                  sx={{ pl: 2, pr: 2, fontSize: 40 }}
                >
                  <Twitter />
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Typography variant="body2" color="#f5f5f5" align="center">
                {"Copyright © "}
                <Link color="#f5f5f5" href="https://your-website.com/">
                  Vinh Aka 2607 PN
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            </Box>
          </Container>
        </Box>
      </div>
    </div >
  );
};

export default MarketFooter;