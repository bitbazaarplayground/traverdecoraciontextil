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

// import { AnimatePresence, motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import styled from "styled-components";
// import logoImg from "../assets/logo2.png";

// // NAV CONTAINER
// const Nav = styled.nav`
//   height: 70px; /* fixed small height */
//   padding: 0 2rem;
//   display: flex;
//   align-items: center;

//   background: ${({ $scrolled }) =>
//     $scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.55)"};
//   backdrop-filter: blur(12px);
//   -webkit-backdrop-filter: blur(12px);

//   border-bottom: 1px solid rgba(0, 0, 0, 0.08);
//   box-shadow: ${({ $scrolled }) =>
//     $scrolled ? "0 2px 12px rgba(0,0,0,0.08)" : "none"};

//   transition: background 0.25s ease, box-shadow 0.25s ease;
//   z-index: 1000;
// `;

// const LeftWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   flex: 1;
// `;

// const RightWrapper = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
// `;

// // LOGO TEXT (inner pages only)
// const LogoText = styled.h1`
//   font-size: 1.4rem;
//   font-weight: 700;
//   cursor: pointer;
//   margin-left: 1rem;
//   color: ${({ $scrolled }) => ($scrolled ? "#111" : "#222")};
//   transition: color 0.25s ease;
// `;

// // DESKTOP LINKS
// const DesktopLinks = styled.div`
//   display: none;

//   @media (min-width: 768px) {
//     display: flex;
//     gap: 2rem;
//   }
// `;

// const Link = styled.a`
//   color: #111;
//   text-decoration: none;
//   font-size: 1rem;
//   font-weight: 500;

//   transition: color 0.2s ease;

//   &:hover {
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// // LOGO IMAGE (LEFT SIDE)
// const LogoImage = styled.img`
//   height: 160px;
//   width: auto;
//   cursor: pointer;

//   position: relative;
//   top: 20px; /* moves logo downward slightly */
//   margin-bottom: 20px; /* prevents navbar from stretching */

//   @media (max-width: 768px) {
//     height: 70px;
//     top: 10px;
//     margin-bottom: -20px;
//   }
// `;

// // MOBILE MENU ICON
// const MenuButton = styled.button`
//   font-size: 1.8rem;
//   background: none;
//   border: none;
//   cursor: pointer;
//   margin-left: 1.5rem;

//   color: #111;

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// const Backdrop = styled(motion.div)`
//   position: fixed;
//   inset: 0;
//   background: rgba(0, 0, 0, 0.3);
//   z-index: 1500;
// `;

// const MobileMenu = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   right: 0;
//   width: 70%;
//   height: 100vh;
//   background: #fff;
//   padding: 2rem;
//   z-index: 2000;
//   box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
// `;

// const MobileLink = styled.a`
//   display: block;
//   margin-bottom: 1.8rem;
//   font-size: 1.3rem;
//   font-weight: 600;
//   text-decoration: none;
//   color: #111;

//   &:hover {
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();

//   const isHome = location.pathname === "/";

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => setMenuOpen(false), [location.pathname]);

//   return (
//     <>
//       <Nav $scrolled={scrolled}>
//         {/* LEFT SIDE — LOGO */}
//         <LeftWrapper>
//           <a href="/">
//             <LogoImage src={logoImg} alt="Traver Decoración Textil" />
//           </a>

//           {/* Only show text name on inner pages */}
//           {!isHome && <LogoText $scrolled={scrolled}>TRAVER</LogoText>}
//         </LeftWrapper>

//         {/* RIGHT SIDE — LINKS + MENU BUTTON */}
//         <RightWrapper>
//           <DesktopLinks>
//             <Link href="#services">Servicios</Link>
//             <Link href="#showroom">Showroom</Link>
//             <Link href="#about">Nosotros</Link>
//             <Link href="#contact">Contacto</Link>
//           </DesktopLinks>

//           <MenuButton onClick={() => setMenuOpen(true)}>☰</MenuButton>
//         </RightWrapper>
//       </Nav>

//       {/* MOBILE MENU */}
//       <AnimatePresence>
//         {menuOpen && (
//           <>
//             <Backdrop
//               onClick={() => setMenuOpen(false)}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />

//             <MobileMenu
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ duration: 0.35 }}
//             >
//               <MobileLink href="#services">Servicios</MobileLink>
//               <MobileLink href="#showroom">Showroom</MobileLink>
//               <MobileLink href="#about">Nosotros</MobileLink>
//               <MobileLink href="#contact">Contacto</MobileLink>
//             </MobileMenu>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
