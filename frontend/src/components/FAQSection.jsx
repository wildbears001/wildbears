import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Title from './Title';

const faqs = [
  {
    question: "How can I place an order?",
    answer: "You can easily place an order by browsing our products, adding your desired items to the cart, and proceeding to checkout. Follow the simple steps to enter your shipping and payment details."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, net banking, and wallet payments."
  },
  {
    question: "How long will delivery take?",
    answer: "Standard delivery usually takes 5-7 business days depending on your location. You will receive a tracking link once your order is shipped."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we offer shipping within select countries. Please check our shipping policy page for the full list of supported locations."
  },
  {
    question: "How will I get my refund?",
    answer: "Refunds are processed back to your original payment method within 7-10 business days after we receive and inspect your returned item."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="text-center py-8 text-3xl">
        <Title text1={'FREQUENTLY'} text2={'ASKED QUESTIONS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Find answers to common questions about our products, shipping, and returns.
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col justify-center">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 pb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
              >
                <span className={`text-base sm:text-lg font-medium transition-colors ${openIndex === index ? 'text-[#4A2F1A]' : 'text-gray-700 group-hover:text-[#4A2F1A]'}`}>
                  {faq.question}
                </span>
                <span className="ml-4 text-gray-500 group-hover:text-[#4A2F1A] transition-colors flex-shrink-0">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed pb-2 pt-1">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
