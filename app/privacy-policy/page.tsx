import CookiePreferencesButton from '@/components/CookiePreferencesButton';

export const metadata = {
  title: 'Privacy Policy | Primary & Urgent Care Centers',
  description:
    'How Primary & Urgent Care Centers collects, uses, and protects information, including cookies and tracking technologies.',
  alternates: {
    canonical: 'https://primaryuc.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-white py-16 px-4 lg:px-[60px]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Privacy Policy</h1>

        <div className="rounded-xl border border-yellow-300 bg-yellow-50 text-yellow-900 text-sm p-4 mb-8">
          <strong>Placeholder legal content.</strong> This page is a practical outline of our
          data and cookie practices. It has not been reviewed by an attorney and must be
          finalized by qualified legal/compliance counsel before being relied upon as the
          site&apos;s official privacy policy.
        </div>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-black mb-2">Overview</h2>
            <p>
              Primary &amp; Urgent Care Centers (&quot;we&quot;, &quot;us&quot;) operates
              primaryuc.com. This policy describes what information we collect when you visit
              our website or submit a form, how we use it, and the choices available to you.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">Information We Collect</h2>
            <p>
              When you submit an appointment or contact form, we collect the information you
              provide directly, such as your name, phone number, email address, and the reason
              for your request. This information is used to respond to your request and is not
              sold to third parties.
            </p>
            <p className="mt-2">
              We do not transmit medical symptoms, diagnoses, treatment details, or other
              Protected Health Information (PHI) you may reference in a form to analytics,
              advertising, or other third-party platforms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">Cookies &amp; Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies in the following categories:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Necessary</strong> — required for core site functionality, security, and form operation. Always active.</li>
              <li><strong>Analytics</strong> — helps us understand website performance using privacy-conscious analytics.</li>
              <li><strong>Marketing</strong> — helps measure advertising performance and improve relevant campaigns.</li>
              <li><strong>Functional</strong> — supports optional features like embedded maps or language translation, when used.</li>
            </ul>
            <p className="mt-2">
              Non-essential cookies are only set after you provide consent. You can accept all,
              reject all, or choose specific categories at any time using the button below or
              the &quot;Cookie Preferences&quot; link in the footer.
            </p>
            <div className="mt-4">
              <CookiePreferencesButton className="inline-flex items-center justify-center rounded-lg bg-[#D52128] hover:bg-[#b81b22] text-white text-sm font-semibold px-5 py-2.5 transition-colors" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">Your Choices</h2>
            <p>
              You may reject non-essential cookies at any time without affecting your ability to
              call our clinics, submit an appointment request, or browse the site. Depending on
              your state of residence, you may have additional rights to access, delete, or
              opt out of the sale/sharing of personal information; contact us using the details
              below to make a request.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">Contact Us</h2>
            <p>
              If you have questions about this policy or how your information is handled, please
              call us at (561) 355-2651 or use the contact form on this site.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
