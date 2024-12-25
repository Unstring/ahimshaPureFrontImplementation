const Refund = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Section */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl">
          Refund Policy
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto">
        <div className="space-y-8">
          {/* Return Process */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              1. Return Process
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We want you to be completely satisfied with your purchase. If you're not satisfied with your order, here's how our refund process works:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Initiate a return within 30 days of receiving your order</li>
              <li>Product must be unused and in its original packaging</li>
              <li>Include all original tags and documentation</li>
              <li>Provide order number and reason for return</li>
            </ul>
          </div>

          {/* Eligible Items */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              2. Eligible Items
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The following items are eligible for returns:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Unopened products in original packaging</li>
              <li>Damaged or defective products</li>
              <li>Incorrect items received</li>
            </ul>
          </div>

          {/* Non-Eligible Items */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              3. Non-Eligible Items
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The following items cannot be returned:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Opened or used products (for hygiene reasons)</li>
              <li>Products without original packaging</li>
              <li>Items marked as "Final Sale"</li>
              <li>Customized or personalized products</li>
            </ul>
          </div>

          {/* Refund Process */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              4. Refund Process
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Once we receive your return:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>We will inspect the item within 2 business days</li>
              <li>You will receive an email confirming the refund</li>
              <li>Refund will be processed to original payment method</li>
              <li>Please allow 5-10 business days for the refund to appear</li>
            </ul>
          </div>

          {/* Shipping Costs */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              5. Shipping Costs
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Return shipping costs are the responsibility of the customer unless:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>The product received was defective</li>
              <li>We sent the wrong item</li>
              <li>The product was damaged during shipping</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 dark:bg-gray-900 shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Need Help with Returns?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our customer service team is here to help with your return or refund:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:support@ahimsapure.com"
                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </a>
              <button 
                type="button"
                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Return FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund; 