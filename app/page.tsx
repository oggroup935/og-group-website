import Hero from "@/components/home/Hero";
import {
  TrustStrip,
  WhoWeHelp,
  HowItWorks,
  WhyOG,
  FinalCTA,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhoWeHelp />
      <HowItWorks />
      <WhyOG />
      <FinalCTA />
    </>
  );
}
