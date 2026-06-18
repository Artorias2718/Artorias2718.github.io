import { Shield } from "lucide-react";

const LAST_UPDATED = "June 2025";

export default function PrivacyPolicy() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-background pt-16 pb-16 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            <span>Last updated: {LAST_UPDATED}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            This Privacy Policy explains how Atlas Earth Guide collects, uses, and protects information when you visit this website.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-slate max-w-none space-y-10">

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">1. Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                Atlas Earth Guide is an independent, fan-made website created and maintained by Atlas Earth community members. We are not affiliated with, endorsed by, or connected to Atlas Reality, Inc. or the official Atlas Earth game. This site is operated as a free community resource for informational purposes only.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not require you to create an account or provide any personal information to use this website. However, some information may be collected automatically:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>
                  <strong className="text-foreground">Usage data:</strong> Standard web server logs may include your IP address, browser type, referring pages, time and date of your visit, and pages you view. This information is used in aggregate to understand how the site is used and to improve it.
                </li>
                <li>
                  <strong className="text-foreground">Cookies:</strong> This site uses cookies. Cookies are small text files stored in your browser. Some cookies are essential for the site to function; others are used by third-party advertising partners (see Section 5 below).
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the information described above to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Operate and maintain this website</li>
                <li>Understand how visitors use the site so we can improve the content and experience</li>
                <li>Serve relevant advertisements through third-party advertising networks (see Section 5)</li>
                <li>Comply with applicable laws and regulations</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We do not sell, rent, or trade your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">4. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground leading-relaxed">
                <li>
                  <strong className="text-foreground">Essential cookies:</strong> Necessary for the basic functionality of this website. These cannot be disabled.
                </li>
                <li>
                  <strong className="text-foreground">Analytics cookies:</strong> Help us understand aggregate visitor behavior so we can improve the site. These do not personally identify you.
                </li>
                <li>
                  <strong className="text-foreground">Advertising cookies:</strong> Used by Google AdSense and other advertising partners to serve personalized advertisements based on your browsing activity (see Section 5).
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of some parts of this website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">5. Google AdSense and Advertising</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This website uses Google AdSense, a third-party advertising service provided by Google LLC. Google AdSense uses cookies, including the DoubleClick cookie, to serve ads based on your prior visits to this website and other websites across the internet.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the internet.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Ads Settings
                </a>
                {" "}or by visiting{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  www.aboutads.info/choices
                </a>
                {" "}or the{" "}
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  Network Advertising Initiative opt-out page
                </a>
                .
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For more information about how Google collects and uses data, please review{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  Google's Privacy & Terms
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">6. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website contains links to external websites, including the official Atlas Earth website, Reddit, Facebook, and other community platforms. We are not responsible for the privacy practices or content of those external sites. We encourage you to review the privacy policies of any third-party websites you visit.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">7. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website is not directed at children under the age of 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided personal information to us, please contact us and we will take steps to remove that information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">8. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain server log data for a limited period for security and operational purposes, after which it is deleted. We do not store any personally identifiable information beyond what is described in this policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">9. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on where you live, you may have certain rights regarding your personal information, including the right to access, correct, or delete data we hold about you. Since we collect minimal personal data, most requests will have limited applicability.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you are in the European Economic Area (EEA), you have rights under the General Data Protection Regulation (GDPR), including the right to object to data processing. If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">10. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically. Your continued use of this website after any changes constitutes your acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">11. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions or concerns about this Privacy Policy, you can reach us through the community channels listed on our{" "}
                <a href="/contact" className="text-primary hover:underline">
                  Contact page
                </a>
                . As a community-run site, community channels are the most reliable way to get in touch with the maintainers.
              </p>
            </div>

            <div className="border-t border-border/50 pt-8">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Disclaimer:</strong> Atlas Earth Guide is an independent fan site. We are not affiliated with Atlas Reality, Inc. All product names, logos, and brands referenced are the property of their respective owners.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
