import { Box, Container, Divider, Stack, Typography, alpha } from "@mui/material";
import { Shield } from "lucide-react";

const LAST_UPDATED = "June 2026";

// ─── shared sub-components ────────────────────────────────────────────────────

function ProseLink({
  href,
  children,
  external = true,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Typography
      component="a"
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      sx={{ color: "primary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
    >
      {children}
    </Typography>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
      {children}
    </Typography>
  );
}

function ProseList({ items }: { items: React.ReactNode[] }) {
  return (
    <Box component="ul" sx={{ pl: 3, m: 0, color: "text.secondary" }}>
      {items.map((item, i) => (
        <Box
          key={i}
          component="li"
          sx={{ mb: 1, lineHeight: 1.8, fontSize: "1rem" }}
        >
          {item}
        </Box>
      ))}
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPolicy() {
  return (
    <Box sx={{ width: "100%" }}>
      {/* Hero */}
      <Box
        component="section"
        sx={{
          bgcolor: "background.default",
          pt: 10,
          pb: 10,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              display: "inline-flex",
              px: 2,
              py: 0.75,
              borderRadius: 99,
              bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
              color: "primary.main",
              mb: 4,
            }}
          >
            <Shield size={16} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Last updated: {LAST_UPDATED}
            </Typography>
          </Stack>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              mb: 3,
              fontSize: { xs: "2.25rem", md: "3rem" },
            }}
          >
            Privacy Policy
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              fontSize: "1.1rem",
              maxWidth: 580,
              mx: "auto",
            }}
          >
            This Privacy Policy explains how Atlas Earth HQ collects, uses, and protects
            information when you visit this website.
          </Typography>
        </Container>
      </Box>

      {/* Policy Content */}
      <Box component="section" sx={{ py: 10, bgcolor: "background.default" }}>
        <Container maxWidth="md">
          <Stack sx={{ gap: 6 }}>

            <Section title="1. Who We Are">
              <Prose>
                Atlas Earth HQ is an independent, fan-made website created and maintained by
                Atlas Earth community members. We are not affiliated with, endorsed by, or
                connected to Atlas Reality, Inc. or the official Atlas Earth game. This site is
                operated as a free community resource for informational purposes only.
              </Prose>
            </Section>

            <Section title="2. Information We Collect">
              <Stack sx={{ gap: 2 }}>
                <Prose>
                  We do not require you to create an account or provide any personal information
                  to use this website. However, some information may be collected automatically:
                </Prose>
                <ProseList
                  items={[
                    <>
                      <Typography component="strong" sx={{ color: "text.primary", fontWeight: 700 }}>
                        Usage data:
                      </Typography>{" "}
                      Standard web server logs may include your IP address, browser type,
                      referring pages, time and date of your visit, and pages you view. This
                      information is used in aggregate to understand how the site is used and to
                      improve it.
                    </>,
                    <>
                      <Typography component="strong" sx={{ color: "text.primary", fontWeight: 700 }}>
                        Cookies:
                      </Typography>{" "}
                      This site uses cookies. Cookies are small text files stored in your
                      browser. Some cookies are essential for the site to function; others are
                      used by third-party advertising partners (see Section 5 below).
                    </>,
                  ]}
                />
              </Stack>
            </Section>

            <Section title="3. How We Use Your Information">
              <Stack sx={{ gap: 2 }}>
                <Prose>We use the information described above to:</Prose>
                <ProseList
                  items={[
                    "Operate and maintain this website",
                    "Understand how visitors use the site so we can improve the content and experience",
                    "Serve relevant advertisements through third-party advertising networks (see Section 5)",
                    "Comply with applicable laws and regulations",
                  ]}
                />
                <Prose>We do not sell, rent, or trade your personal information to third parties.</Prose>
              </Stack>
            </Section>

            <Section title="4. Cookies">
              <Stack sx={{ gap: 2 }}>
                <Prose>We use cookies for the following purposes:</Prose>
                <ProseList
                  items={[
                    <>
                      <Typography component="strong" sx={{ color: "text.primary", fontWeight: 700 }}>
                        Essential cookies:
                      </Typography>{" "}
                      Necessary for the basic functionality of this website. These cannot be
                      disabled.
                    </>,
                    <>
                      <Typography component="strong" sx={{ color: "text.primary", fontWeight: 700 }}>
                        Analytics cookies:
                      </Typography>{" "}
                      Help us understand aggregate visitor behavior so we can improve the site.
                      These do not personally identify you.
                    </>,
                    <>
                      <Typography component="strong" sx={{ color: "text.primary", fontWeight: 700 }}>
                        Advertising cookies:
                      </Typography>{" "}
                      Used by Google AdSense and other advertising partners to serve personalized
                      advertisements based on your browsing activity (see Section 5).
                    </>,
                  ]}
                />
                <Prose>
                  You can control cookies through your browser settings. Note that disabling
                  cookies may affect the functionality of some parts of this website.
                </Prose>
              </Stack>
            </Section>

            <Section title="5. Google AdSense and Advertising">
              <Stack sx={{ gap: 2 }}>
                <Prose>
                  This website uses Google AdSense, a third-party advertising service provided
                  by Google LLC. Google AdSense uses cookies, including the DoubleClick cookie,
                  to serve ads based on your prior visits to this website and other websites
                  across the internet.
                </Prose>
                <Prose>
                  Google's use of advertising cookies enables it and its partners to serve ads
                  to you based on your visit to this site and/or other sites on the internet.
                </Prose>
                <Prose>
                  You may opt out of personalized advertising by visiting{" "}
                  <ProseLink href="https://www.google.com/settings/ads">
                    Google Ads Settings
                  </ProseLink>
                  {" "}or by visiting{" "}
                  <ProseLink href="https://www.aboutads.info/choices/">
                    www.aboutads.info/choices
                  </ProseLink>
                  {" "}or the{" "}
                  <ProseLink href="https://optout.networkadvertising.org/">
                    Network Advertising Initiative opt-out page
                  </ProseLink>
                  .
                </Prose>
                <Prose>
                  For more information about how Google collects and uses data, please review{" "}
                  <ProseLink href="https://policies.google.com/technologies/partner-sites">
                    Google's Privacy &amp; Terms
                  </ProseLink>
                  .
                </Prose>
              </Stack>
            </Section>

            <Section title="6. Third-Party Links">
              <Prose>
                This website contains links to external websites, including the official Atlas
                Earth website, Reddit, Facebook, and other community platforms. We are not
                responsible for the privacy practices or content of those external sites. We
                encourage you to review the privacy policies of any third-party websites you
                visit.
              </Prose>
            </Section>

            <Section title="7. Children's Privacy">
              <Prose>
                This website is not directed at children under the age of 13, and we do not
                knowingly collect personal information from children under 13. If you believe a
                child has provided personal information to us, please contact us and we will
                take steps to remove that information.
              </Prose>
            </Section>

            <Section title="8. Data Retention">
              <Prose>
                We retain server log data for a limited period for security and operational
                purposes, after which it is deleted. We do not store any personally identifiable
                information beyond what is described in this policy.
              </Prose>
            </Section>

            <Section title="9. Your Rights">
              <Stack sx={{ gap: 2 }}>
                <Prose>
                  Depending on where you live, you may have certain rights regarding your
                  personal information, including the right to access, correct, or delete data
                  we hold about you. Since we collect minimal personal data, most requests will
                  have limited applicability.
                </Prose>
                <Prose>
                  If you are in the European Economic Area (EEA), you have rights under the
                  General Data Protection Regulation (GDPR), including the right to object to
                  data processing. If you are a California resident, you have rights under the
                  California Consumer Privacy Act (CCPA).
                </Prose>
              </Stack>
            </Section>

            <Section title="10. Changes to This Policy">
              <Prose>
                We may update this Privacy Policy from time to time. When we do, we will update
                the "Last Updated" date at the top of this page. We encourage you to review
                this policy periodically. Your continued use of this website after any changes
                constitutes your acceptance of the updated policy.
              </Prose>
            </Section>

            <Section title="11. Contact">
              <Prose>
                If you have any questions or concerns about this Privacy Policy, you can reach
                us through the community channels listed on our{" "}
                <ProseLink href="/contact" external={false}>
                  Contact page
                </ProseLink>
                . As a community-run site, community channels are the most reliable way to get
                in touch with the maintainers.
              </Prose>
            </Section>

            <Box sx={{ pt: 2 }}>
              <Divider sx={{ mb: 4 }} />
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                <Typography component="strong" sx={{ color: "text.primary", fontWeight: 700 }}>
                  Disclaimer:
                </Typography>{" "}
                Atlas Earth HQ is an independent fan site. We are not affiliated with Atlas
                Reality, Inc. All product names, logos, and brands referenced are the property
                of their respective owners.
              </Typography>
            </Box>

          </Stack>
        </Container>
      </Box>
    </Box>
  );
}