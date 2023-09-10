import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import PageLayout from "examples/LayoutContainers/PageLayout";

export default function Unauthorized() {
  return (
    <PageLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h1">401</Typography>
              <Typography variant="h6">
                You are not authorized to access this page.
              </Typography>
              <Button variant="contained">Back Home</Button>
            </Grid>
            <Grid xs={6}>
              <img
                src="https://cdn.dribbble.com/users/761395/screenshots/6287961/error_401.jpg"
                alt=""
                width={500}
                height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PageLayout>
  );
}
