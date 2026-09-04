import { createFileRoute } from "@tanstack/react-router";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/privacy-policy")({
  loader: () => getRequestOrigin(),
  head: ({ loaderData: origin }) => {
    const title = "Privacy Policy | ROY Agency";
    const description =
      "How ROY Agency LLC collects, uses, shares, and protects information from visitors to royagency.com and our related online services.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://royagency.com/privacy-policy" },
        { property: "og:image", content: "https://royagency.com/og-roy.jpg" },
      ],
      links: [{ rel: "canonical", href: "https://royagency.com/privacy-policy" }],
    };
  },
  component: PrivacyPolicyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="font-display text-2xl uppercase tracking-tight md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        {children}
      </div>
    </section>
  );
}

function Lead({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p>
      <span className="font-medium text-foreground">{label}:</span> {children}
    </p>
  );
}

function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="page-pad pt-32 pb-12">
        <div className="page-wrap">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Legal</p>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] md:text-7xl">
            Privacy<br />
            <span className="text-primary">Policy</span>
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            ROY Agency LLC ("we," "us," "our") values the trust you place in us when you use
            royagency.com and our other affiliated websites, applications, and online services that
            link to this Privacy Statement (collectively, our "Websites"). This Privacy Statement
            describes our collection, use, disclosure, and protection of your information.
          </p>
        </div>
      </section>

      <section className="page-pad pb-32">
        <div className="page-wrap max-w-4xl space-y-12">
          <p className="text-sm uppercase leading-relaxed tracking-[0.06em] text-foreground/80">
            By using our Websites, you are accepting the terms of this Privacy Statement and you are
            consenting to our collection, use, disclosure, and protection of your personal
            information as described here. If you do not agree, please do not use our Websites. We
            may make changes to this Privacy Statement from time to time and will post any changes
            to our Websites. Your continued use following the posting of any changes means you
            accept those changes.
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            This Privacy Statement does not apply to information you submit to us offline, or to
            third-party websites and applications that may link to the Websites or be linked to on
            the Websites. We are not responsible for the actions or privacy practices of third
            parties; please consult those websites and applications directly.
          </p>

          <Section title="Information We Collect About You">
            <p>
              We collect, process, and retain information about you and any devices you may use when
              you use or interact with our Websites, and in other ways described below.
            </p>
            <Lead label="Information you give us">
              We receive and store information you enter on our Websites or give us in any other
              way, including your name, mailing address, phone number, email address, social profile
              and portfolio.
            </Lead>
            <Lead label="Information we automatically collect">
              Our Websites use cookies, tagging and other tracking technologies to enhance your
              browsing experience and market our services. This includes page views, traffic to and
              from our Websites, referral URL, your IP address, device identifiers, browsing history
              and web log information.
            </Lead>
            <Lead label="Location information">
              We may receive information about your general location, including a unique identifier
              for your device, which allows us to provide location-based services such as
              advertising, search results, and other personalized content.
            </Lead>
            <Lead label="Information from social media">
              When you interact with us on a social media platform, we may collect the personal
              information you make available to us there, including your account ID or username and
              other information included in your posts.
            </Lead>
          </Section>

          <Section title="How We Use Your Information">
            <p>
              We use your information to personalize and continually improve your experience on the
              Websites, including fulfilling requests for information, analyzing trends and
              statistics, and communicating with you. We also may use your information to:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Provide, maintain, and improve the Websites and for internal business purposes</li>
              <li>Fulfill your requests for information and communicate with you</li>
              <li>Track and evaluate use of the Websites, including building user profiles</li>
              <li>Send you newsletters, marketing or other materials</li>
              <li>
                Detect, investigate, and prevent activities that may violate our policies or be
                fraudulent or illegal
              </li>
              <li>Optimize or improve our Websites, services and operations</li>
              <li>
                Perform statistical, demographic, and marketing analyses of users and their usage
                patterns
              </li>
            </ul>
            <p>
              We may use information from one portion of the Websites on other portions, and may
              combine information gathered across the Websites into a single record. We may also
              combine information collected offline or received from third-party sources to enhance,
              expand, and check the accuracy of our records.
            </p>
          </Section>

          <Section title="How We Share Your Information">
            <p>
              We may share your personal information with third parties as described below. We may
              also share information that does not specifically identify you, such as aggregate
              information, de-identified data, or device identifiers.
            </p>
            <Lead label="Service providers">
              We engage third parties to perform functions on our behalf such as hosting, content
              management, technical integration, marketing, analytics, and customer service. They
              may have access to your personal information when needed to perform those functions.
            </Lead>
            <Lead label="Business partners">
              We may share information that personally identifies you with business partners or
              affiliates who provide products and services we think you may be interested in.
            </Lead>
            <Lead label="Sale, assignment or change of control">
              We may transfer information about you to another entity, its affiliates or service
              providers in connection with a merger, acquisition, sale of assets, change in
              ownership, control, or financing transaction. We will request the acquiring party
              follow the practices described here, but cannot promise it will.
            </Lead>
            <Lead label="Law enforcement and legal process">
              We may use or disclose your personal information if required by law or on a good-faith
              belief that doing so is necessary to comply with legal process, protect our rights or
              property, or protect the personal safety of our users or the public.
            </Lead>
          </Section>

          <Section title="How to Access and Modify Your Information">
            <p>
              To request access, modification, correction, or deletion of personal information you
              have provided or that you believe we may have collected, contact us using the details
              below. We may not be able to delete your personal information without also deleting
              your user account, and you will not be permitted to examine the personal information
              of any other person or entity. To verify your identity, you may be required to provide
              personal information before accessing records about you. We may not accommodate a
              request if we believe doing so would violate a law or legal requirement, or cause the
              information to be incorrect.
            </p>
          </Section>

          <Section title="Your Choices">
            <Lead label="Marketing emails">
              Providing an email address acknowledges that we may use it to communicate with you
              about our services and select messages from our partners or affiliates. You can opt
              out of promotional emails using the "unsubscribe" link in our marketing emails, though
              you cannot opt out of communications regarding your account or transactions.
            </Lead>
            <Lead label="Business partners and affiliates">
              You can opt out of the information we share with our business partners and affiliates
              by contacting us at the address below.
            </Lead>
          </Section>

          <Section title="Cookies, Tracking and Analytics">
            <p>
              Like many websites, we use cookies, web beacons and similar technologies to record
              your preferences, track use of our Websites, and measure exposure to our online
              advertising. Most browsers accept cookies automatically, but you can usually change
              your browser settings to disable or reject them. If you do, some features of the
              Websites may not work as designed.
            </p>
            <p>
              We may partner with third-party advertising companies that use these tools to serve
              advertisements on our Websites or elsewhere. They may collect information about your
              online activity over time and across different websites, and use it to provide
              interest-based advertising. To learn more and opt out, visit the Network Advertising
              Initiative and the Digital Advertising Alliance. You can also limit mobile app
              tracking through your device settings on Apple, Android or Windows devices. Opting out
              does not stop all advertising, but it does exclude you from interest-based advertising
              through participating networks.
            </p>
            <p>
              Some content or applications on the Websites may be served by unaffiliated third
              parties. We do not control their tracking technologies and are not responsible for the
              content or privacy practices of any website we do not operate. Your browser or device
              may include "Do Not Track" functionality; our practices continue to operate as
              described here whether or not a Do Not Track signal is received.
            </p>
            <p>
              We use Google Analytics and other online analytics services, which use cookies or
              other tracking technologies to help us analyze how visitors use the Websites and
              compile reports on activity. These may collect your IP address, time of visit, whether
              you are a return visitor, any referring website, and similar information. We do not
              use Google Analytics to gather information that personally identifies you. Information
              generated by Google Analytics is transmitted to and stored by Google and is subject to
              Google's privacy policies.
            </p>
          </Section>

          <Section title="How We Secure Your Information">
            <p>
              We take reasonable security measures to help protect the personal information
              collected through our Websites. Please understand, however, that no transmission of
              data over the Internet or any other public network can be guaranteed to be 100 percent
              secure. You are responsible for the security of any personal information you transmit
              to us or access using unencrypted, public or otherwise unsecured networks.
            </p>
          </Section>

          <Section title="Other Important Information">
            <Lead label="Users under thirteen">
              Our Websites are intended for users ages 13 and older. We will not knowingly collect
              or use personal information from children we know to be under 13. If we become aware
              of such information in our database, we will delete it.
            </Lead>
            <Lead label="Users outside the United States">
              If you use our Websites outside the United States, you understand and consent to the
              transfer of your personal information to, and the collection, processing, and storage
              of your personal information in, the United States and elsewhere. Laws regarding
              personal information may differ from those of your state or country.
            </Lead>
          </Section>

          <Section title="Contact Us">
            <p>
              Questions about this Privacy Statement or how your information is handled? Reach out
              any time.
            </p>
            <p className="space-x-4">
              <a
                href="mailto:jordan@royagency.com"
                className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
              >
                hello@royagency.com
              </a>
              <a
                href="tel:+16142646965"
                className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
              >
                614-264-6965
              </a>
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              ROY Agency LLC · Columbus, Ohio
            </p>
          </Section>
        </div>
      </section>
    </main>
  );
}
