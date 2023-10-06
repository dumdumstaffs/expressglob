import { ReactNode, useEffect, useState } from "react";

const heroImages = ["february_2022.png", "march_2022.png"];

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const [hero, setHero] = useState("");

  useEffect(() => {
    const today = new Date().getDate();
    const index = today % heroImages.length;
    const hero = heroImages[index];

    setHero(hero);
  }, []);

  if (!hero) return null;

  return (
    <div className="hero_homepage_v1 aem-GridColumn aem-GridColumn--default--12">
      {/* HERO START */}
      <div
        className="fxg-hero fxg-hero_homepage   "
        style={{ textAlign: "center" }}
      >
        {/* HERO IMAGE */}
        <div
          className="fxg-hero__image cc-aem-u-width--100 cc-aem-u-bg--cover cc-aem-u-position--absolute cc-aem-u-z-index--min-1"
          style={{
            backgroundImage: `url(/images/hero/${hero})`,
            backgroundPosition: "50% 50%",
            display: "block",
          }}
        ></div>
        {children}
      </div>
      {/* HERO END */}
    </div>
  );
};
