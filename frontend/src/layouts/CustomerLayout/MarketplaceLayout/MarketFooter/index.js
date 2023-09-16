import "./style.scss";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import TopSales from "./TopSales";

const listContact = [
  {
    name: "Liên hệ",
    link: "https://www.facebook.com/",
  },
  {
    name: "Điều khoản sử dụng",
    link: "https://www.facebook.com/",
  },
  {
    name: "Chính sách bảo mật",
    link: "https://www.facebook.com/",
  },
  {
    name: "Giới thiệu dự án",
    link: "https://www.facebook.com/",
  },
  {
    name: "Chợ nổi Cái Răng",
    link: "https://www.facebook.com/",
  },
  {
    name: "Cai Rang Floating Market",
    link: "https://www.facebook.com/",
  },
  {
    name: "Nụ Cười Mê Kông",
    link: "https://www.facebook.com/",
  },
  {
    name: "Mekong Smile Tour",
    link: "https://www.facebook.com/",
  },
];

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
                  <Box fontWeight="bold">CHỢ NỔI CÁI RĂNG</Box> ONLINE
                </Typography>
                <Typography variant="body2" color="#f5f5f5">
                  <img
                    src="https://chonoicairang.net/wp-content/uploads/2020/04/chonoicairang.net_.png"
                    alt="logo"
                    style={{ maxHeight: "90px" }}
                  />
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
                <Typography
                  variant="h6"
                  color="#f5f5f5"
                  gutterBottom
                  fontWeight={700}
                >
                  LIÊN KẾT HỮU ÍCH
                </Typography>
                {listContact.map((item, index) => {
                  return (
                    <Typography
                      variant="body2"
                      color="#f5f5f5"
                      style={{
                        borderBottom: "0.5px solid #ebebeb",
                        cursor: "pointer",
                      }}
                      fontWeight={600}
                      paddingTop={0.75}
                      paddingBottom={0.75}
                    >
                      {item.name}
                    </Typography>
                  );
                })}
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
    </div>
  );
};

export default MarketFooter;
