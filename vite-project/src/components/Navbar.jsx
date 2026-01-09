import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, Link as RouterLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

// NAV CONTAINER
const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.2rem 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  /* ⭐ NEW: Background depends on page */
  background: ${({ $scrolled, $isHome }) =>
    $isHome
      ? $scrolled
        ? "rgba(255,255,255,0.95)"
        : "transparent"
      : "rgba(255,255,255,0.95)"};

  box-shadow: ${({ $scrolled, $isHome }) =>
    !$isHome || $scrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none"};

  transition: background 0.3s ease, box-shadow 0.3s ease;
  z-index: 1000;
`;

const LeftWrapper = styled.div`
  flex: 1;
`;

const RightWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    height: ${({ $scrolled }) => ($scrolled ? "34px" : "42px")};
    width: auto;
    transition: height 0.25s ease;
  }
`;

// DESKTOP LINKS
const DesktopLinks = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    gap: 2rem;
  }
`;

// ⭐ UPDATED LINK LOGIC
const StyledLink = styled(RouterLink)`
  color: ${({ $scrolled, $isHome }) =>
    !$isHome || $scrolled ? "#111" : "#fff"};

  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MenuButton = styled.button`
  font-size: 1.6rem;
  background: none;
  border: none;
  cursor: pointer;

  margin-left: 1.5rem;
  color: ${({ $scrolled, $isHome }) =>
    !$isHome || $scrolled ? "#111" : "#fff"};

  transition: color 0.3s ease;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1500;
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background: #fff;
  padding: 2rem;
  z-index: 2000;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
`;

const MobileLink = styled(RouterLink)`
  display: block;
  margin-bottom: 1.8rem;
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: none;
  color: #111;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <>
      <Nav $scrolled={scrolled} $isHome={isHome}>
        <LeftWrapper>
          {!isHome && (
            <Logo
              as={Link}
              to="/"
              $scrolled={scrolled}
              $isHome={isHome}
              aria-label="Volver a inicio"
            >
              <img src={logo} alt="Traver logo" />
            </Logo>
          )}
        </LeftWrapper>

        <RightWrapper>
          <DesktopLinks>
            <StyledLink to="/services" $scrolled={scrolled} $isHome={isHome}>
              Servicios
            </StyledLink>
            <StyledLink to="/propuestas" $scrolled={scrolled} $isHome={isHome}>
              Propuestas
            </StyledLink>
            <StyledLink to="/#about" $scrolled={scrolled} $isHome={isHome}>
              Nosotros
            </StyledLink>
            <StyledLink to="/contact" $scrolled={scrolled} $isHome={isHome}>
              Contacto
            </StyledLink>
          </DesktopLinks>

          <MenuButton
            $scrolled={scrolled}
            $isHome={isHome}
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </MenuButton>
        </RightWrapper>
      </Nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <Backdrop
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <MobileMenu
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
            >
              <MobileLink to="/services">Servicios</MobileLink>
              <MobileLink to="/propuestas">Propuestas</MobileLink>
              <MobileLink to="/about">Nosotros</MobileLink>
              <MobileLink to="/contact">Contacto</MobileLink>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
