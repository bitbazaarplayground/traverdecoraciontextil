// src/components/heroes/ServiceHero.jsx
import { Link } from "react-router-dom";
import styled from "styled-components";
import { trackEvent } from "../../lib/analytics";

const Hero = styled.section`
  position: relative;
  min-height: 45vh;
  display: flex;
  margin-top: 3.5rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 2rem;
  color: #fff;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const HeroMedia = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const HeroImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $objectPosition }) => $objectPosition || "center"};
  transform: scale(1.02);
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      1200px 700px at 50% 35%,
      rgba(0, 0, 0, 0.06),
      rgba(0, 0, 0, 0.45)
    ),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.22) 0%,
      rgba(0, 0, 0, 0.48) 55%,
      rgba(0, 0, 0, 0.58) 100%
    );
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 920px;
  text-align: center;
`;

const Eyebrow = styled.p`
  margin: 0 0 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.72);
`;

const HeroTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 650;
  line-height: 1.06;
  margin: 0 0 1.1rem;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.35rem;
    line-height: 1.1;
  }
`;

const HeroSubtitle = styled.p`
  margin: 0 auto;
  max-width: 68ch;
  font-size: 1.12rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.78);
`;

const HeroActions = styled.div`
  margin-top: 1.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  flex-wrap: wrap;
`;

const sharedButtonFocus = `
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(255,255,255,0.18);
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.1rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #0b0c0f;
  font-weight: 850;
  text-decoration: none;
  transition: transform 0.25s ease, opacity 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.92;
      transform: translateY(-1px);
    }
  }

  ${sharedButtonFocus}
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.05rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.92);
  font-weight: 650;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
  }

  ${sharedButtonFocus}
`;

export default function ServiceHero({
  eyebrow,
  title,
  subtitle,
  hero480,
  hero768,
  hero1280,
  hero1920,
  objectPosition = "center",
  primaryLabel,
  primaryTo = "/contact",
  primaryTrackSource,
  primaryPack,
  onOpenAsesoramiento,
  secondaryLabel,
  secondaryHref,
}) {
  const hasPrimary = Boolean(primaryLabel);
  const hasSecondary = Boolean(secondaryLabel && secondaryHref);

  const heroSrcSet = [
    hero480 ? `${hero480} 480w` : null,
    hero768 ? `${hero768} 768w` : null,
    hero1280 ? `${hero1280} 1280w` : null,
    hero1920 ? `${hero1920} 1920w` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const handlePrimaryClick = (e) => {
    if (!primaryTrackSource || !primaryPack) return;

    trackEvent("open_quick_enquiry", {
      source: primaryTrackSource,
      pack: primaryPack,
    });

    if (typeof onOpenAsesoramiento === "function") {
      e.preventDefault();
      onOpenAsesoramiento(primaryPack, primaryTrackSource);
    }
  };

  return (
    <Hero>
      <HeroMedia aria-hidden="true">
        <HeroImg
          src={hero1280 || hero768 || hero480}
          srcSet={heroSrcSet}
          sizes="100vw"
          width="1920"
          height="1080"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          alt=""
          $objectPosition={objectPosition}
        />
      </HeroMedia>

      <HeroOverlay />

      <HeroContent>
        <Eyebrow>{eyebrow}</Eyebrow>
        <HeroTitle>{title}</HeroTitle>
        <HeroSubtitle>{subtitle}</HeroSubtitle>

        {(hasPrimary || hasSecondary) && (
          <HeroActions>
            {hasPrimary && (
              <PrimaryButton to={primaryTo} onClick={handlePrimaryClick}>
                {primaryLabel}
              </PrimaryButton>
            )}

            {hasSecondary && (
              <SecondaryButton href={secondaryHref}>
                {secondaryLabel}
              </SecondaryButton>
            )}
          </HeroActions>
        )}
      </HeroContent>
    </Hero>
  );
}

// export default function ServiceHero({
//   eyebrow,
//   title,
//   subtitle,
//   hero480,
//   hero768,
//   hero1280,
//   hero1920,
//   objectPosition = "center",
//   primaryLabel,
//   primaryTo = "/contact",
//   primaryTrackSource,
//   primaryPack,
//   onOpenAsesoramiento,
//   secondaryLabel,
//   secondaryHref,
// }) {
//   const hasPrimary = Boolean(primaryLabel);
//   const hasSecondary = Boolean(secondaryLabel && secondaryHref);

//   const handlePrimaryClick = (e) => {
//     if (!primaryTrackSource || !primaryPack) return;

//     trackEvent("open_quick_enquiry", {
//       source: primaryTrackSource,
//       pack: primaryPack,
//     });

//     if (typeof onOpenAsesoramiento === "function") {
//       e.preventDefault();
//       onOpenAsesoramiento(primaryPack, primaryTrackSource);
//     }
//   };

//   return (
//     <Hero>
//       <HeroMedia aria-hidden="true">
//         <HeroImg
//           src={hero768}
//           srcSet={`${hero480} 480w, ${hero768} 768w, ${hero1280} 1280w, ${hero1920} 1920w`}
//           sizes="100vw"
//           width="1920"
//           height="1080"
//           loading="eager"
//           decoding="async"
//           fetchPriority="high"
//           alt=""
//           $objectPosition={objectPosition}
//         />
//       </HeroMedia>

//       <HeroOverlay />

//       <HeroContent>
//         <Eyebrow>{eyebrow}</Eyebrow>
//         <HeroTitle>{title}</HeroTitle>
//         <HeroSubtitle>{subtitle}</HeroSubtitle>

//         {(hasPrimary || hasSecondary) && (
//           <HeroActions>
//             {hasPrimary && (
//               <PrimaryButton to={primaryTo} onClick={handlePrimaryClick}>
//                 {primaryLabel}
//               </PrimaryButton>
//             )}

//             {hasSecondary && (
//               <SecondaryButton href={secondaryHref}>
//                 {secondaryLabel}
//               </SecondaryButton>
//             )}
//           </HeroActions>
//         )}
//       </HeroContent>
//     </Hero>
//   );
// }
