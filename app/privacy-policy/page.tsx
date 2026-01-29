import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to provider, maintain, and improve our services, process transactions, and communicate with you.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
            <p>We do not share your personal information with third parties except as described in this policy or with your consent.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
