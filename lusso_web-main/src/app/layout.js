// src/app/layout.js
import ThemeRegistry from "@/theme/ThemeRegistry";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";        // <-- thêm
import { OrderProvider } from "@/context/OrderContext";
import { NotificationProvider } from "@/context/NotificationContext";

export const metadata = {
  title: "LUSSO",
  description: "Thời trang quiet luxury hiện đại",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <UserProvider>            {/* <-- thêm UserProvider */}
              <CartProvider>
                <OrderProvider>
                  <NotificationProvider>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                  </NotificationProvider>
                </OrderProvider>
              </CartProvider>
            </UserProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
