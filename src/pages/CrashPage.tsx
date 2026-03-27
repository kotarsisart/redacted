import { useNavigate, useParams } from "react-router-dom";
import CrashFlow from "../crash/CrashFlow";

/**
 * Wrapper for crash experience.
 * Handles navigation to main page after flow completion.
 */
export default function CrashPage() {

  // Navigate to localized home route after crash flow ends
  const navigate = useNavigate();
  const { lang } = useParams();

  return (
    <div className="crash-layout">
      <CrashFlow
        onFinish={() => {
          navigate(`/${lang}/home`, { replace: true });
        }}
      />
    </div>
  );
}
