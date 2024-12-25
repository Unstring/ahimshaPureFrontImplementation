const Privacy = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Privacy Policy
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>1. Information We Collect</h2>
        <p>
          At AhimshaPure.com, we take your privacy seriously. This policy describes what personal information we collect and how we use it.
        </p>
        {/* Add more privacy policy content */}
      </div>
    </div>
  );
};

export default Privacy;