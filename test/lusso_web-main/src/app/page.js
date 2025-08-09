import React from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import NewCollectionSection from '@/components/home/NewCollectionSection';
import AboutSection from "@/components/home/AboutSection";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: "75vh", md: "90vh" },
          backgroundImage: 'url("/images/banner.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
          mb: 6,
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box sx={{ zIndex: 2, position: "relative", top: { xs: "160px", md: "200px" } }}>
          <Typography
            variant="h4"
            fontWeight={400}
            mb={2}
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              letterSpacing: 2,
              fontStyle: "italic",
            }}
          >
            "Quiet elegance, every day."
          </Typography>
          <Typography
            variant="body1"
            mb={4}
            sx={{ fontWeight: 300, fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            Thời trang hiện đại – Sang trọng mỗi ngày
          </Typography>
          <Link href="/shop" passHref>
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#e96b2a",
      color: "white",
      px: 4,
      py: 1.5,
      fontWeight: 600,
      "&:hover": {
        backgroundColor: "#cc591f",
      },
    }}
    size="large"
  >
    KHÁM PHÁ NGAY
  </Button>
</Link>
        </Box>
      </Box>

      {/* Curated by Lusso */}
      <FeaturedCollection />
      <AboutSection />

    </>
  );
}
