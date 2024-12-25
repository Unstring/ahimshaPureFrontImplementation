import { useEffect } from 'react';

const FAQ = () => {


  const faqItems = [
    {
      id: 'one',
      question: 'What is special about AhimshaPure Ghee?',
      answer: 'Our ghee is made from pure A2 cow milk using traditional methods. We ensure the highest quality and purity in every batch, maintaining the authentic taste and nutritional benefits.'
    },
    {
      id: 'two',
      question: 'How should I store the ghee?',
      answer: 'Store the ghee in a cool, dry place away from direct sunlight. Our ghee doesn\'t require refrigeration and can be stored at room temperature for up to 12 months.'
    },
    {
      id: 'three',
      question: 'Do you offer bulk orders?',
      answer: 'Yes, we do offer bulk orders for both retail and wholesale customers. Please contact our sales team for special bulk pricing and arrangements.'
    },
    {
      id: 'four',
      question: 'What is your shipping policy?',
      answer: 'We offer free shipping on orders above ₹999. Standard delivery typically takes 3-5 business days, and we currently deliver across India.'
    },
    {
      id: 'five',
      question: 'What is your return policy?',
      answer: 'We have a 30-day return policy. If you\'re not satisfied with your purchase, you can return the unused product in its original packaging for a full refund.'
    },
    {
      id: 'six',
      question: 'Is your packaging eco-friendly?',
      answer: 'Yes, we use sustainable packaging materials that are both food-grade and environmentally friendly. Our containers are reusable and recyclable.'
    }
  ];

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
          Your questions, answered
        </h2>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">
          Answers to the most frequently asked questions.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Accordion */}
        <div className="hs-accordion-group">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="hs-accordion hs-accordion-active:bg-gray-100 rounded-xl p-6 dark:hs-accordion-active:bg-white/10"
              id={`hs-basic-with-title-and-arrow-stretched-heading-${item.id}`}
            >
              <button
                className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${item.id}`}
              >
                {item.question}
                <svg
                  className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div
                id={`hs-basic-with-title-and-arrow-stretched-collapse-${item.id}`}
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${item.id}`}
              >
                <p className="text-gray-800 dark:text-neutral-200">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 