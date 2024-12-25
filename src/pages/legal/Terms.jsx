const Terms = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Terms & Conditions
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>1. Introduction</h2>
        <p>
          Welcome to AhimshaPure.com. By accessing and using our website, you accept and agree to be bound by the terms and conditions outlined below.
        </p>
        {/* Add more terms content */}
      </div>
    </div>
  );
};

export default Terms;