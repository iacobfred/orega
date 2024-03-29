import Footer from "@components/Footer";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Navbar from "@components/Navbar";
import { useSession } from "next-auth/react";
import { MENU_ITEMS, SITE_TITLE } from "./constants";

interface LayoutProps {
  children: React.ReactNode;
  fluid?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function Layout({ children, fluid = false, maxWidth }: LayoutProps) {
  const { data: session } = useSession();
  const logo = (
    <Typography
      variant="h3"
      sx={{
        fontFamily: "Alexandria",
        fontSize: "1.9rem",
        "&:hover": {
          textDecoration: "none",
        },
        display: {
          xs: "block",
          sm: "flex",
        },
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "center",
      }}
    >
      {SITE_TITLE}
    </Typography>
  );
  return (
    <div style={{ height: "100%", maxHeight: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar siteTitle={SITE_TITLE} menuItems={MENU_ITEMS} logo={logo} session={session} />
      <Container
        component={"main"}
        {...(fluid ? { maxWidth: false } : maxWidth ? { maxWidth } : { maxWidth: "md" })}
        sx={{
          flexGrow: 1,
          py: 2,
          position: "relative",
        }}
      >
        {children}
      </Container>
      <Footer height={"2.5rem"} />
    </div>
  );
}
