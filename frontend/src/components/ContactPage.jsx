import React from 'react';

const ContactPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white m-8 shadow-xl rounded-md">
      {/* Form Section with Shadow */}
      <div className="w-full md:w-1/2 p-8 bg-gray-800 shadow-lg rounded-md">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Just say hi!</h2>
        <p className="text-gray-300 mb-8">
          Tell us more about you and we’ll contact you soon :)
        </p>
        <form className="space-y-6">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm">Name</label>
              <input type="text" className="w-full p-2 mt-1 bg-gray-700 rounded border-none" placeholder="Name" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm">Firstname</label>
              <input type="text" className="w-full p-2 mt-1 bg-gray-700 rounded border-none" placeholder="Firstname" />
            </div>
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input type="email" className="w-full p-2 mt-1 bg-gray-700 rounded border-none" placeholder="email@gmail.com" />
          </div>
          <div>
            <label className="block text-sm">Phone Number</label>
            <input type="text" className="w-full p-2 mt-1 bg-gray-700 rounded border-none" placeholder="Phone Number" />
          </div>
          <div>
            <label className="block text-sm">Message</label>
            <textarea className="w-full p-2 mt-1 bg-gray-700 rounded border-none" placeholder="Your message"></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-yellow-500 text-black font-bold rounded">Submit</button>
        </form>
      </div>
      {/* Information Section with Shadow */}
      <div className="w-full md:w-1/2 p-8 bg-gray-100 text-gray-800 shadow-lg rounded-md">
        <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
        <p className="mb-4">
          523 Rosemary Street<br />
          Strasbourg, 67000<br />
          France<br />
          Call us: +33 (0)6 99 87 76 54<br />
          We are open from Monday - Friday: 9:00 AM - 6:00 PM
        </p>
        <div className="flex space-x-4 text-2xl">
          <a href="#" className="text-gray-800 hover:text-yellow-500"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-gray-800 hover:text-yellow-500"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="text-gray-800 hover:text-yellow-500"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
