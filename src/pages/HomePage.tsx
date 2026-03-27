import AppLayout from "../ui/layouts/HomeLayout";
import Hero from "../ui/sections/Hero";
import Denial from "../ui/sections/Denial";
import Anger from '../ui/sections/Anger';
import Bargaining from "../ui/sections/Bargaining";
import Acceptance from '../ui/sections/Acceptance'
import Overflow from '../ui/sections/Overflow';
import useScrollReveal from "../utils/animations/useScrollReveal";
import Depression from "../ui/sections/Depression";

export default function HomePage({
  onRestart,
}: {
  onRestart?: () => void;
}) {

  useScrollReveal();

  return (
    <AppLayout>
      <Hero />
      <Denial />
      <Anger />
      <Bargaining />
      <Overflow />
      <Depression />
      <Acceptance onRestart={onRestart} />
    </AppLayout>
  );
}
