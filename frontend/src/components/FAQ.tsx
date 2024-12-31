import React from 'react';

const faqs = [
  {
    question: "How does the AI optimization work?",
    answer: "Our AI analyzes job descriptions and your profile to highlight relevant skills and experiences, tailoring each application to maximize your chances of success."
  },
  {
    question: "Can I use this for non-AI jobs?",
    answer: "While our platform specializes in AI and tech roles, the optimization techniques work well for any technical position."
  },
  {
    question: "How long does the application process take?",
    answer: "With our Quick Apply system, you can submit multiple optimized applications in just minutes."
  },
  {
    question: "What's included in the expert review?",
    answer: "Industry professionals review your application, providing feedback on your resume, cover letter, and overall presentation."
  }
];

export default function FAQ() {
  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}