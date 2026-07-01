import Hero from "@/components/home/Hero";
import { CloudIntro } from "@/components/home/CloudIntro";
import { CloudTransition } from "@/components/shared/CloudTransition";
import { images } from "@/lib/images";
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
      <CloudIntro />
      <Hero />
      <TrustStrip />
      <WhoWeHelp />
      <CloudTransition src={images.clevelandSkyline} kicker="Cleveland, Ohio" />
      <HowItWorks />
      <CloudTransition src={images.handshake} kicker="Relationships First" />
      <WhyOG />
      <FinalCTA />
    </>
  );
}
