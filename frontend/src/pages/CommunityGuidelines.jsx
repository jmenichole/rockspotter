/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Community Guidelines Page
 */

const CommunityGuidelines = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Community Guidelines</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Rock Spotter is built on the foundation of shared passion for geology and rock collecting. 
              These guidelines help maintain a welcoming, educational, and respectful community for all members.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">🌟 Be Respectful</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Treat all community members with kindness and respect</li>
                <li>Welcome newcomers and share your knowledge generously</li>
                <li>Disagree respectfully when discussing geological topics</li>
                <li>Avoid personal attacks, harassment, or discriminatory language</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">🪨 Share Quality Content</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Post clear, well-lit photos of your rock and mineral finds</li>
                <li>Include accurate location information when possible and safe</li>
                <li>Provide helpful descriptions and context</li>
                <li>Credit sources when sharing information from other places</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semiboted text-gray-900 mb-4">🎓 Educational Focus</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Share accurate geological information to the best of your knowledge</li>
                <li>If unsure about identification, ask for help rather than guessing</li>
                <li>Provide constructive feedback on identifications</li>
                <li>Share educational resources and learning opportunities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">🌍 Environmental Responsibility</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Promote responsible collecting practices</li>
                <li>Respect private property and protected areas</li>
                <li>Follow Leave No Trace principles</li>
                <li>Share information about legal collecting locations</li>
                <li>Encourage sustainable and ethical collecting</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">🚫 What's Not Allowed</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Selling or commercial promotion without permission</li>
                <li>Spam, excessive self-promotion, or off-topic content</li>
                <li>Sharing locations of sensitive or protected sites</li>
                <li>Posting content that encourages illegal collecting</li>
                <li>Harassment, bullying, or toxic behavior</li>
                <li>False information or misleading identifications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">💎 Best Practices</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Use descriptive titles for your posts</li>
                <li>Tag your posts with relevant rock types and locations</li>
                <li>Engage with others through thoughtful comments</li>
                <li>Share your collecting stories and experiences</li>
                <li>Help identify rocks and minerals for fellow collectors</li>
                <li>Participate in community discussions and events</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">⚖️ Enforcement</h2>
              <p className="text-gray-700 mb-4">
                Violations of these guidelines may result in:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Content removal</li>
                <li>Temporary account restrictions</li>
                <li>Permanent account suspension</li>
              </ul>
              <p className="text-gray-700 mt-4">
                We review reports promptly and fairly. If you see content that violates these guidelines, 
                please report it to our moderation team.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">📧 Questions or Concerns</h2>
              <p className="text-gray-700">
                If you have questions about these guidelines or need to report an issue, 
                please contact us at:{' '}
                <a href="mailto:jmenichole007@outlook.com" className="text-primary-600 hover:text-primary-800">
                  jmenichole007@outlook.com
                </a>
              </p>
            </section>

            <div className="bg-primary-50 p-6 rounded-lg mt-8">
              <p className="text-primary-800 font-medium">
                Remember: Rock Spotter is a community built by passionate collectors for passionate collectors. 
                Let's work together to create an inclusive, educational, and inspiring space for everyone 
                interested in the amazing world of rocks and minerals! 🪨✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityGuidelines