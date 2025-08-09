//components/home/AboutSection
"use client";

import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function AboutSection() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      id="story-section"
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 6, md: 12 },
        backgroundColor: "#f8f7f3",
      }}
    >
      {/* SECTION 1 */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="center" // Canh giữa toàn bộ khối
        sx={{ mb: { xs: 8, md: 12 } }} // Thêm khoảng cách dưới cho section 1
      >
        {/* Hình ảnh bên trái */}
        <Box
          component="img"
          src="/images/about.jpg"
          alt="LUSSO Detail"
          sx={{
            width: { xs: "100%", md: "40%" },
            aspectRatio: { xs: "auto", md: "2 / 3" },
            objectFit: "cover",
            borderRadius: 2,
            boxShadow: 2,
          }}
        />

        {/* Nội dung bên phải */}
        <Box
          sx={{
            pl: { md: 8 }, // Tăng nhẹ padding để có thêm không gian
            pt: { xs: 4, md: 0 },
            width: { xs: "100%", md: "50%" },
          }}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            fontFamily="serif"
            sx={{
              mb: 2,
              fontSize: { xs: "1.7rem", md: "2.2rem" },
            }}
          >
            LUSSO – Quiet Luxury
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 3,
              fontSize: { xs: "1rem", md: "1.125rem" },
              lineHeight: 1.8,
            }}
          >
            LUSSO đại diện cho phong cách thanh lịch đầy tinh tế. Với triết lý
            “Quiet Luxury” – chúng tôi mang đến sự hiện đại kết hợp bền vững,
            nơi chất liệu và phom dáng kể lên câu chuyện của một thẩm mỹ trường
            tồn.
          </Typography>
        </Box>
      </Box>

      {/* SECTION 2 */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="center" // Canh giữa toàn bộ khối
      >
        {/* Nội dung bên trái */}
        <Box
          sx={{
            pr: { md: 8 }, // Tăng nhẹ padding để có thêm không gian
            pb: { xs: 4, md: 0 },
            width: { xs: "100%", md: "50%" },
            order: { xs: 2, md: 1 }, // Đảo vị trí trên mobile và desktop
          }}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            fontFamily="serif"
            sx={{
              mb: 2,
              fontSize: { xs: "1.7rem", md: "2.2rem" },
            }}
          >
            Khám phá tinh thần LUSSO
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              lineHeight: 1.8,
            }}
          >
            Mỗi thiết kế của LUSSO là một sự giao thoa giữa thẩm mỹ hiện đại và
            tinh thần thủ công truyền thống. Chúng tôi không chỉ tạo ra trang
            phục, mà còn truyền tải giá trị sống – nơi vẻ đẹp đến từ sự tối
            giản, chất lượng và cảm xúc chân thực.
          </Typography>
        </Box>

        {/* Hình ảnh bên phải */}
        <Box
          component="img"
          src="/images/about_02.jpg"
          alt="LUSSO Detail"
          sx={{
            width: { xs: "100%", md: "40%" },
            aspectRatio: { xs: "auto", md: "2 / 3" },
            objectFit: "cover",
            borderRadius: 2,
            boxShadow: 2,
            order: { xs: 1, md: 2 }, // Đảo vị trí trên mobile và desktop
          }}
        />
      </Box>
    </Box>
  );
}
