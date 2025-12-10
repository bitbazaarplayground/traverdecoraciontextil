import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

// NAV CONTAINER
const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.2rem 2rem;

  display: flex;
  justify-content: space-between; /* spreads left + right wrappers */
  align-items: center;

  background: ${({ $scrolled }) =>
    $scrolled ? "rgba(255,255,255,0.95)" : "transparent"};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none"};
  transition: background 0.3s ease, box-shadow 0.3s ease;

  z-index: 1000;
`;

const LeftWrapper = styled.div`
  flex: 1; /* Always reserves left side space */
`;

const RightWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end; /* Push all child items to the right */
  align-items: center;
`;

// LOGO
const Logo = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  color: ${({ $scrolled, theme }) => ($scrolled ? theme.colors.dark : "#fff")};
  transition: color 0.3s ease;
`;

// DESKTOP LINKS
const DesktopLinks = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    gap: 2rem;
  }
`;

const Link = styled.a`
  color: ${({ $scrolled }) => ($scrolled ? "#111" : "#fff")};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;

  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// MOBILE MENU ICON
const MenuButton = styled.button`
  font-size: 1.6rem;
  background: none;
  border: none;
  cursor: pointer;

  margin-left: 1.5rem;
  color: ${({ $scrolled }) => ($scrolled ? "#111" : "#fff")};
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

const MobileLink = styled.a`
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
      <Nav $scrolled={scrolled}>
        {/* LEFT SIDE (logo or empty placeholder) */}
        <LeftWrapper>
          {!isHome && <Logo $scrolled={scrolled}>TRAVER</Logo>}
        </LeftWrapper>

        {/* RIGHT SIDE (links + menu button) */}
        <RightWrapper>
          <DesktopLinks>
            <Link $scrolled={scrolled} href="#services">
              Servicios
            </Link>
            <Link $scrolled={scrolled} href="#showroom">
              Showroom
            </Link>
            <Link $scrolled={scrolled} href="#about">
              Nosotros
            </Link>
            <Link $scrolled={scrolled} href="#contact">
              Contacto
            </Link>
          </DesktopLinks>

          <MenuButton $scrolled={scrolled} onClick={() => setMenuOpen(true)}>
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
              <MobileLink href="#services" onClick={() => setMenuOpen(false)}>
                Servicios
              </MobileLink>
              <MobileLink href="#showroom" onClick={() => setMenuOpen(false)}>
                Showroom
              </MobileLink>
              <MobileLink href="#about" onClick={() => setMenuOpen(false)}>
                Nosotros
              </MobileLink>
              <MobileLink href="#contact" onClick={() => setMenuOpen(false)}>
                Contacto
              </MobileLink>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
