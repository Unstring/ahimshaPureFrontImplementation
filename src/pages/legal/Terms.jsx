const Terms = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Section */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl">
          Terms & Conditions
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome to AhimshaPure.com. By accessing and using our website, you accept and agree to be bound by the terms and conditions outlined below.
            </p>
          </div>

          {/* Definitions */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              2. Definitions
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>"Website" refers to AhimshaPure.com</li>
              <li>"User," "You," and "Your" refers to you, as a user of the Website</li>
              <li>"We," "Us," and "Our" refers to AhimshaPure</li>
              <li>"Products" refers to the items available for purchase on our Website</li>
            </ul>
          </div>

          {/* Use License */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              3. Use License
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Permission is granted to temporarily access and use the Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on the Website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </div>

          {/* Continue with other sections using the same pattern */}
          {/* Product Information */}
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              4. Product Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions or prices are accurate, complete, reliable, current, or error-free.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-50 dark:bg-gray-900 shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Need Help?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="mailto:contact@ahimsapure.com"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;