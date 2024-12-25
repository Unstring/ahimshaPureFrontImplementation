const About = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        About AhimshaPure
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            AhimshaPure is dedicated to bringing you the purest organic products, starting with our signature traditional cow ghee. We believe in maintaining the highest standards of quality while preserving traditional methods of production.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Our mission is to provide customers with authentic, chemical-free products that not only taste great but also contribute to their overall well-being.
          </p>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Our Values
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>✓ Quality and Purity</li>
              <li>✓ Traditional Methods</li>
              <li>✓ Sustainability</li>
              <li>✓ Customer Satisfaction</li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Why Choose Us?
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">Pure & Natural</h3>
              <p className="text-gray-600 dark:text-gray-400">100% organic products with no additives or preservatives</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">Traditional Process</h3>
              <p className="text-gray-600 dark:text-gray-400">Following time-tested traditional methods</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">Quality Assurance</h3>
              <p className="text-gray-600 dark:text-gray-400">Rigorous quality checks at every stage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;