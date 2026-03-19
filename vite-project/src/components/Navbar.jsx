// src/components/Navbar.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, Link as RouterLink, useLocation } from "react-router-dom";
import styled from "styled-components";

/* =========================
   NAV CONTAINER
========================= */

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;

  padding: ${({ $isHome }) => ($isHome ? "1.2rem 2rem" : "0.70rem 2rem")};

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${({ $scrolled, $isHome }) =>
    $isHome
      ? $scrolled
        ? "rgba(255,255,255,0.95)"
        : "transparent"
      : "rgba(255,255,255,0.95)"};

  box-shadow: ${({ $scrolled, $isHome }) =>
    !$isHome || $scrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none"};

  transition: background 0.3s ease, box-shadow 0.3s ease;
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
    height: ${({ $scrolled, $isHome }) =>
      $isHome ? ($scrolled ? "34px" : "42px") : "34px"};
    width: auto;
    transition: height 0.25s ease;
  }
`;

const NavWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  --header-h: ${({ $isHome }) => ($isHome ? "84px" : "72px")};

  transition: transform 240ms ease, opacity 240ms ease;
  transform: ${({ $hidden }) =>
    $hidden ? "translateY(-110%)" : "translateY(0)"};
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  pointer-events: ${({ $hidden }) => ($hidden ? "none" : "auto")};
`;

/* =========================
   LINKS
========================= */

const DesktopLinks = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    gap: 2rem;
  }
`;

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

/* =========================
   MOBILE MENU (BASE STYLES)
   - We render these always (no framer needed)
========================= */

const BackdropBase = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1500;

  opacity: 0;
  transition: opacity 200ms ease;
  pointer-events: none;

  &[data-open="true"] {
    opacity: 1;
    pointer-events: auto;
  }
`;

const MobileMenuBase = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background: #fff;
  padding: 2rem;
  z-index: 2000;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);

  transform: translateX(100%);
  transition: transform 280ms ease;
  will-change: transform;

  &[data-open="true"] {
    transform: translateX(0);
  }
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

/* =========================
   COMPONENT
========================= */

export default function Navbar({ hidden }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [fm, setFm] = useState(null); // framer-motion module when loaded
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  // ✅ Load framer-motion ONLY when menu opens (mobile interaction)
  useEffect(() => {
    if (!menuOpen) return;
    let alive = true;

    (async () => {
      const mod = await import("framer-motion");
      if (alive) setFm(mod);
    })();

    return () => {
      alive = false;
    };
  }, [menuOpen]);

  const Motion = useMemo(() => {
    if (!fm) return null;
    return { AnimatePresence: fm.AnimatePresence, motion: fm.motion };
  }, [fm]);

  return (
    <>
      <NavWrap $hidden={hidden} $isHome={isHome}>
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
                <img
                  src="/logo-640.webp"
                  srcSet="/logo160.webp 160w, /logo320.webp 320w, /logo640.webp 640w"
                  sizes="(max-width: 768px) 160px, 220px"
                  alt="Traver logo"
                  width="220"
                  height="62"
                  loading="eager"
                  decoding="async"
                />
              </Logo>
            )}
          </LeftWrapper>

          <RightWrapper>
            <DesktopLinks>
              <StyledLink to="/services" $scrolled={scrolled} $isHome={isHome}>
                Servicios
              </StyledLink>
              <StyledLink
                to="/propuestas"
                $scrolled={scrolled}
                $isHome={isHome}
              >
                Propuestas
              </StyledLink>
              <StyledLink to="/nosotros" $scrolled={scrolled} $isHome={isHome}>
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
              aria-label="Abrir menú"
            >
              ☰
            </MenuButton>
          </RightWrapper>
        </Nav>
      </NavWrap>

      {/* ======= MOBILE MENU =======
          Base CSS menu works instantly.
          If Framer is loaded, we use it for nicer enter/exit.
      */}

      {Motion ? (
        <Motion.AnimatePresence>
          {menuOpen && (
            <>
              <Motion.motion.div
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.3)",
                  zIndex: 1500,
                }}
              />

              <Motion.motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35 }}
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  width: "70%",
                  height: "100vh",
                  background: "#fff",
                  padding: "2rem",
                  zIndex: 2000,
                  boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <MobileLink to="/services">Servicios</MobileLink>
                <MobileLink to="/propuestas">Propuestas</MobileLink>
                <MobileLink to="/nosotros">Nosotros</MobileLink>
                <MobileLink to="/contact">Contacto</MobileLink>
              </Motion.motion.aside>
            </>
          )}
        </Motion.AnimatePresence>
      ) : (
        <>
          <BackdropBase
            data-open={menuOpen ? "true" : "false"}
            onClick={() => setMenuOpen(false)}
          />
          <MobileMenuBase data-open={menuOpen ? "true" : "false"}>
            <MobileLink to="/services">Servicios</MobileLink>
            <MobileLink to="/propuestas">Propuestas</MobileLink>
            <MobileLink to="/nosotros">Nosotros</MobileLink>
            <MobileLink to="/contact">Contacto</MobileLink>
          </MobileMenuBase>
        </>
      )}
    </>
  );
}
