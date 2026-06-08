import Hero from "@/components/home/Hero";
import {
  TrustStrip,
  WhoWeHelp,
  HowItWorks,
  WhyOG,
  FinalCTA,
} from "@/components/home/HomeSections";
import { Featured } from "@/components/home/Featured";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhoWeHelp />
      <HowItWorks />
      <WhyOG />
      <Featured />
      <FinalCTA />
    </>
  );
}
