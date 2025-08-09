//components/home/FeaturedCollection

import React from "react";
import Link from "next/link";
import { Box, Typography, Grid } from "@mui/material";

const featuredItems = [
  {
    title: "Dresses",
    image: "/images/featured_dress.jpg",
    slug: "dresses",
  },
  {
    title: "Coats",
    image: "/images/featured_coat.jpg",
    slug: "coats",
  },
  {
    title: "Shoes",
    image: "/images/featured_shoes01.jpg",
    slug: "shoes",
  },
  {
    title: "Accessories",
    image: "/images/featured_accessories.jpg",
    slug: "accessories",
  },
];

export default function FeaturedCollection() {
  return (
    <Box sx={{ px: { xs: 2, md: 10 }, py: 2 }}>
      <Typography
        variant="h4"
        fontWeight={500}
        fontFamily="serif"
        textAlign="center"
        mb={6}
      >
        TUYỂN CHỌN BỞI LUSSO
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {featuredItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link
              href={`/collections/${item.slug}`}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  borderRadius: 0,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover img": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: 360,
                    objectFit: "cover",
                    transition: "transform 0.3s ease-in-out",
                    transform: "scale(0.98)",
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                fontWeight={500}
                fontSize={14}
                fontFamily="serif"
                textAlign="center"
                mt={1.5}
              >
                {item.title}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
