import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Intellectual Property</h2>
            <p>All content included on this site, such as text, graphics, logos, images, is the property of Victorians Academy or its content suppliers.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Limitation of Liability</h2>
            <p>In no event shall Victorians Academy be liable for any damages arising out of the use or inability to use the materials on this website.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Governing Law</h2>
            <p>Any claim relating to Victorians Academy's website shall be governed by the laws of Bangladesh without regard to its conflict of law provisions.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
