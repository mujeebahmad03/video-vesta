import { AnimatedSection } from "@/components/common";
import {
  CTA,
  Features,
  Footer,
  Header,
  Hero,
  HowItWorks,
  Pricing,
} from "@/components/website";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <AnimatedSection>
          <Features />
        </AnimatedSection>
        <AnimatedSection>
          <HowItWorks />
        </AnimatedSection>
        <AnimatedSection>
          <Pricing />
        </AnimatedSection>
        <AnimatedSection>
          <CTA />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
