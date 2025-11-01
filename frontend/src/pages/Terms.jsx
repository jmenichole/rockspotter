/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Terms of Service Page
 */

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Rock Spotter, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Rock Spotter is a social platform for rock and mineral enthusiasts to share discoveries, 
                connect with fellow collectors, and build a community around geological interests.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You must be at least 13 years old to use this service</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You agree to provide accurate and complete information</li>
                <li>One account per person is allowed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Content Guidelines</h2>
              <p className="text-gray-700 mb-4">You agree not to post content that:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Is illegal, harmful, or offensive</li>
                <li>Violates intellectual property rights</li>
                <li>Contains false or misleading information</li>
                <li>Promotes dangerous activities</li>
                <li>Includes personal information of others without consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                You retain ownership of content you post, but grant us a license to use, display, 
                and distribute it through our platform. Our platform and its original content 
                are protected by copyright and other laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Prohibited Activities</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Attempting to hack or disrupt the service</li>
                <li>Creating fake accounts or impersonating others</li>
                <li>Spamming or sending unsolicited messages</li>
                <li>Collecting user information without permission</li>
                <li>Using the service for commercial purposes without authorization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to suspend or terminate accounts that violate these terms. 
                You may delete your account at any time through your account settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                Rock Spotter is provided "as is" without warranties. We are not liable for any 
                damages arising from your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We may update these terms from time to time. Continued use of the service 
                constitutes acceptance of updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these terms, contact us at:{' '}
                <a href="mailto:jmenichole007@outlook.com" className="text-primary-600 hover:text-primary-800">
                  jmenichole007@outlook.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms