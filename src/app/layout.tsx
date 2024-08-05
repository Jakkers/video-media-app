import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

// Importing radix theme
import "@radix-ui/themes/styles.css";
import { Container, Section, Theme } from "@radix-ui/themes";
import { url } from "inspector";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   if (window.location.href === "http://localhost:3000") {
  //     return (
  //       <ClerkProvider>
  //         <html lang="en">
  //           <body className={inter.className}>
  //             <Theme appearance="dark">
  //               {" "}
  //               <Container size="4"> {children}</Container>{" "}
  //             </Theme>
  //           </body>
  //         </html>
  //       </ClerkProvider>
  //     );
  //   } else {
  //     return (
  //       <ClerkProvider>
  //         <html lang="en">
  //           <body className={inter.className}>
  //             <Theme appearance="dark">
  //               {" "}
  //               <Container size="4">
  //                 {" "}
  //                 <Header />
  //                 {children}
  //               </Container>{" "}
  //             </Theme>
  //           </body>
  //         </html>
  //       </ClerkProvider>
  //     );
  //   }
  // }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Theme appearance="dark">
            {" "}
            <Container size="4">
              {" "}
              <Header />
              {children}
            </Container>{" "}
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
