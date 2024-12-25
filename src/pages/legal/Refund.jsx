const Refund = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Refund Policy
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>1. Return Process</h2>
        <p>
          We want you to be completely satisfied with your purchase. If you're not satisfied with your order, here's how our refund process works.
        </p>
        {/* Add more refund policy content */}
      </div>
    </div>
  );
};

export default Refund; 