import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
        
        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Refund Eligibility</h2>
            <p>We want you to be satisfied with your purchase. Refunds may be considered under specific circumstances such as service failure or product defects that cannot be resolved.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Processing Time</h2>
            <p>If a refund is approved, it will be processed within 5-7 business days and credited back to the original payment method.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Non-Refundable Items</h2>
            <p>Certain digital products or services may be non-refundable once accessed or used. Please review the specific terms for each product.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Contact Us</h2>
            <p>If you have any questions about our Refund Policy, please contact our support team.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
