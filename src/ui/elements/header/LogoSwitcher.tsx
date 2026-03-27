import "./_logo-switcher.scss";

interface BrandLogo {
  short: string;
  long: string;
  alt?: string;
}

interface LogoSwitcherProps {
  main: BrandLogo;
  alt: BrandLogo;
  className?: string;
}

export default function LogoSwitcher({
  main,
  alt,
  className = "",
}: LogoSwitcherProps) {
  return (
    <div className={`kts-logo ${className}`}>
      {/* MAIN (Redacted) */}
      <div className="kts-logo__version kts-logo__version--main">
        <img
          src={main.short}
          alt={main.alt}
          className="kts-logo__img kts-logo__img--short"
        />
        <img
          src={main.long}
          alt={main.alt}
          className="kts-logo__img kts-logo__img--long"
        />
      </div>

      {/* ALT (Kotarsis) */}
      <div className="kts-logo__version kts-logo__version--alt">
        <img
          src={alt.short}
          alt={alt.alt}
          className="kts-logo__img kts-logo__img--short"
        />
        <img
          src={alt.long}
          alt={alt.alt}
          className="kts-logo__img kts-logo__img--long"
        />
      </div>
    </div>
  );
}
