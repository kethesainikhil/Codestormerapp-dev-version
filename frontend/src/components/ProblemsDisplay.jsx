import React, { useEffect } from 'react';

const ProblemsDisplay = () => {
  useEffect(() => {
    // Dynamically create script element
    const scriptElement = document.createElement('script');
    
    // Set the source and type attributes for the script element
    scriptElement.src = 'https://www.jdoodle.com/assets/jdoodle-pym.min.js';
    scriptElement.type = 'text/javascript';

    // Append the script element to the document body
    document.body.appendChild(scriptElement);

    // Clean up when the component unmounts
    return () => {
      document.body.removeChild(scriptElement);
    };
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const handleSubmit = (e) => {
    e.preventDefault(); // You were missing the parentheses here
    // Add your form submission logic here
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <h1>problems display</h1>
          <h3>
            Given an array of integers nums and an integer target, return indices
            of the two numbers such that they add up to target.
            You may assume that each input would have exactly one solution, and you may not use the same element twice.
            You can return the answer in any order.
          </h3>
        </div>
        <div data-pym-src="https://www.jdoodle.com/embed/v1/d17cd4a8c177d1b2"></div>
      </form>
    </div>
  );
};

export default ProblemsDisplay;
