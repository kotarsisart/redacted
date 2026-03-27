import kotarsis from "../../../assets/icons/logos/kotarsis-preloader.svg";
import "./_preloader.scss";

type Props = {
  hide: boolean; // controls exit state (fade-out / disable interaction)
  projectContent: React.ReactNode; // injected project-specific content (logo / title / custom JSX)
  className?: string; // allows external styling extensions (modifiers, themes)
};

/**
 * BasePreloader
 *
 * Shared cinematic entry component for all Kotarsis projects.
 *
 * Displays a unified brand intro ("Kotarsis presents")
 * followed by project-specific content.
 *
 * Designed to be reusable across the entire ecosystem,
 * ensuring consistent entry experience and branding.
 */
export default function BasePreloader({
  hide,
  projectContent,
  className = "",
}: Props) {
  return (
    <div
      className={`preloader ${
        hide ? "preloader--hide" : ""
      } ${className}`}
    >
      {/* Layout container for centering and animation sequencing */}
      <div className="preloader__content">

        {/* Core brand block */}
        <div className="preloader__kotarsis">
          <img
            src={kotarsis}
            className="preloader__kotarsis-icon fade-up-1"
            alt="Kotarsis logo"
          />
          <p className="preloader__kotarsis-title fade-up-1">
            kotarsis
          </p>
        </div>

        {/* Visual separator between brand and project */}
        <div className="preloader__divider" />

        {/* Presentation cue */}
        <p className="preloader__presents fade-up-2">
          PRESENTS
        </p>

        {/* Project-specific content */}
        <div className="preloader__project fade-up-3">
          {projectContent}
        </div>

      </div>
    </div>
  );
}