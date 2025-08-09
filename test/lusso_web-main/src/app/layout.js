import ThemeRegistry from "@/theme/ThemeRegistry";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext"; // 1. Import CartProvider từ context

export const metadata = {
  title: "LUSSO",
  description: "Thời trang quiet luxury hiện đại",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <ThemeRegistry>
          {/* 2. Bọc Navbar, children, và Footer trong CartProvider */}
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}