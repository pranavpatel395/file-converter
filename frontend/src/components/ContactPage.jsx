import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import pranavImage from '../assets/pranav.jpg';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    firstname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your actual EmailJS service ID, template ID, and user ID
    const serviceID = 'service_h4xllzd';
    const templateID = 'template_6l3o14d';
    const userID = 'UaEzmf6qdOvz6D5rG';

    emailjs
      .sendForm(serviceID, templateID, e.target, userID)
      .then(
        (result) => {
          setResponseMessage('Your message has been sent successfully!');
          console.log(result.text);
          // Reset form after successful submission
          setFormData({
            name: '',
            firstname: '',
            email: '',
            phone: '',
            message: '',
          });
        },
        (error) => {
          setResponseMessage('Error sending message. Please try again.');
          console.error(error.text);
        }
      );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white m-8 shadow-xl rounded-md">
      {/* Form Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 p-8 bg-gray-800 shadow-lg rounded-md">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">Just say hi!</h2>
          <p className="text-gray-300 mb-8">
            Tell us more about you and we’ll contact you soon :)
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-gray-700 rounded border-none"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm">Firstname</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-gray-700 rounded border-none"
                  placeholder="Firstname"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border-none"
                placeholder="email@gmail.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border-none"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label className="block text-sm">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border-none"
                placeholder="Your message"
                required
              ></textarea>
            </div>
            <button type="submit" className="px-4 py-2 bg-yellow-500 text-black font-bold rounded">
              Submit
            </button>
          </form>
          {responseMessage && <p className="mt-4">{responseMessage}</p>}
        </div>

        {/* Contact Information and Image */}
        <div className="w-full md:w-1/2 p-8 bg-gray-100 text-gray-800 shadow-lg rounded-md">
          <div className="flex flex-col items-center">
            <img
             src={pranavImage}
              alt="Pranav"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-3xl font-bold mb-2">Pranav Patel</h2>
            <p className="text-center mb-4">
              523 Rosemary Street<br />
              Gujrat, 67000<br />
              India<br />
              Call us: +00 000000000<br />
              Monday - Friday: 9:00 AM - 6:00 PM
            </p>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="text-gray-800 hover:text-yellow-500"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-800 hover:text-yellow-500"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="text-gray-800 hover:text-yellow-500"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
