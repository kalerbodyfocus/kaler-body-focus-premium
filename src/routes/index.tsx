import { createFileRoute } from "@tanstack/react-router";
import Nav from "@/components/site/Nav";
import { ScrollProgress, FloatingActions, MobileStickyCTA } from "@/components/site/Floating";
import {
  Hero, TrustBar, About, Personal, Online, Services,
  Transformations, Testimonials, Reviews, FAQ, Contact, Footer,
} from "@/components/site/Sections";
import { InquiryForm } from "@/components/site/InquiryForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kaler Body Focus | Personal Trainer Christchurch NZ" },
      { name: "description", content: "Evidence-based personal training and online coaching with Ranjit Singh. Fat loss, muscle building, strength training and lifestyle transformation." },
      { property: "og:title", content: "Kaler Body Focus | Personal Trainer Christchurch NZ" },
      { property: "og:description", content: "Evidence-based personal training and online coaching with Ranjit Singh. Fat loss, muscle building, strength training and lifestyle transformation." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kaler Body Focus | Personal Trainer Christchurch NZ" },
      { name: "twitter:description", content: "Evidence-based personal training and online coaching with Ranjit Singh." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Nav />
      <Hero />
      <TrustBar />
      <About />
      <Personal />
      <Online />
      <Services />
      <Transformations />
      <Testimonials />
      <Reviews />
      <InquiryForm />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingActions />
      <MobileStickyCTA />
      <div className="md:hidden h-20" />
    </main>
  );
}
