import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../../store/index';

/**
 * Contact form data interface
 */
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Contact page component
 * Displays contact information and form with theme-specific styling
 */
const Contact: React.FC = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle form input changes
   * @param e - Form event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission
   * @param e - Form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
    
    // Show success message (in a real app, you'd use a toast notification)
    alert('Message sent successfully!');
  };

  /**
   * Contact information data
   */
  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      content: '123 Main Street, City, State 12345'
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'contact@themeapp.com'
    },
    {
      icon: '📞',
      title: 'Phone',
      content: '+1 (555) 123-4567'
    }
  ];

  return (
    <div className={`
      ${currentTheme === 'theme-1' && 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}
      ${currentTheme === 'theme-2' && 'flex min-h-screen'}
      ${currentTheme === 'theme-3' && 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}
    `}>
      {/* Theme 2 Sidebar */}
      {currentTheme === 'theme-2' && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-theme2-primary p-6 border-r border-theme2-accent"
        >
          <h2 className="text-2xl font-bold text-theme2-text mb-6">Contact Info</h2>
          <div className="space-y-4">
            {contactInfo.map((info) => (
              <div key={info.title} className="space-y-2">
                <div className="text-2xl">{info.icon}</div>
                <h3 className="font-semibold text-theme2-text">{info.title}</h3>
                <p className="text-sm text-theme2-text/70">{info.content}</p>
              </div>
            ))}
          </div>
        </motion.aside>
      )}

      {/* Main Content */}
      <div className={currentTheme === 'theme-2' ? 'flex-1 p-8' : 'space-y-12'}>
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1
            className={`
              font-bold
              ${currentTheme === 'theme-1' && 'text-5xl text-theme1-text'}
              ${currentTheme === 'theme-2' && 'text-6xl text-theme2-text font-serif'}
              ${currentTheme === 'theme-3' && 'text-5xl text-theme3-text font-pacifico'}
            `}
          >
            Get in Touch
          </h1>
          <p
            className={`
              max-w-2xl mx-auto text-lg
              ${currentTheme === 'theme-1' && 'text-gray-600'}
              ${currentTheme === 'theme-2' && 'text-xl text-theme2-text/80'}
              ${currentTheme === 'theme-3' && 'text-lg text-theme3-text/80'}
            `}
          >
            Have a question or want to work together? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </motion.section>

        {/* Contact Form and Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`
            grid lg:grid-cols-1 gap-12
            ${currentTheme === 'theme-3' && 'bg-theme3-secondary p-8 rounded-2xl'}
          `}
        >
          {/* Contact Form */}
          <div className="space-y-6 mt-5">
            <h2
              className={`
                text-3xl font-bold text-center
                ${currentTheme === 'theme-1' && 'text-theme1-text'}
                ${currentTheme === 'theme-2' && 'text-theme2-text font-serif'}
                ${currentTheme === 'theme-3' && 'text-theme3-text font-pacifico'}
              `}
            >
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`
                      block text-sm font-medium mb-2
                      ${currentTheme === 'theme-1' && 'text-gray-700'}
                      ${currentTheme === 'theme-2' && 'text-theme2-text'}
                      ${currentTheme === 'theme-3' && 'text-theme3-text'}
                    `}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`
                      w-full px-4 py-3 rounded-lg border transition-colors
                      ${currentTheme === 'theme-1' && 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
                      ${currentTheme === 'theme-2' && 'border-theme2-accent/20 bg-theme2-secondary text-theme2-text focus:border-theme2-accent'}
                      ${currentTheme === 'theme-3' && 'border-theme3-accent bg-theme3-primary text-theme3-text focus:border-theme3-accent'}
                    `}
                  />
                </div>
                <div>
                  <label
                    className={`
                      block text-sm font-medium mb-2
                      ${currentTheme === 'theme-1' && 'text-gray-700'}
                      ${currentTheme === 'theme-2' && 'text-theme2-text'}
                      ${currentTheme === 'theme-3' && 'text-theme3-text'}
                    `}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`
                      w-full px-4 py-3 rounded-lg border transition-colors
                      ${currentTheme === 'theme-1' && 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
                      ${currentTheme === 'theme-2' && 'border-theme2-accent/20 bg-theme2-secondary text-theme2-text focus:border-theme2-accent'}
                      ${currentTheme === 'theme-3' && 'border-theme3-accent bg-theme3-primary text-theme3-text focus:border-theme3-accent'}
                    `}
                  />
                </div>
              </div>
              <div>
                <label
                  className={`
                    block text-sm font-medium mb-2
                    ${currentTheme === 'theme-1' && 'text-gray-700'}
                    ${currentTheme === 'theme-2' && 'text-theme2-text'}
                    ${currentTheme === 'theme-3' && 'text-theme3-text'}
                  `}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`
                    w-full px-4 py-3 rounded-lg border transition-colors
                    ${currentTheme === 'theme-1' && 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
                    ${currentTheme === 'theme-2' && 'border-theme2-accent/20 bg-theme2-secondary text-theme2-text focus:border-theme2-accent'}
                    ${currentTheme === 'theme-3' && 'border-theme3-accent bg-theme3-primary text-theme3-text focus:border-theme3-accent'}
                  `}
                />
              </div>
              <div>
                <label
                  className={`
                    block text-sm font-medium mb-2
                    ${currentTheme === 'theme-1' && 'text-gray-700'}
                    ${currentTheme === 'theme-2' && 'text-theme2-text'}
                    ${currentTheme === 'theme-3' && 'text-theme3-text'}
                  `}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`
                    w-full px-4 py-3 rounded-lg border transition-colors resize-none
                    ${currentTheme === 'theme-1' && 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
                    ${currentTheme === 'theme-2' && 'border-theme2-accent/20 bg-theme2-secondary text-theme2-text focus:border-theme2-accent'}
                    ${currentTheme === 'theme-3' && 'border-theme3-accent bg-theme3-primary text-theme3-text focus:border-theme3-accent'}
                  `}
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200
                  ${currentTheme === 'theme-1' && 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400'}
                  ${currentTheme === 'theme-2' && 'bg-theme2-accent text-white hover:bg-blue-600 disabled:bg-gray-600'}
                  ${currentTheme === 'theme-3' && 'bg-theme3-accent text-white hover:bg-red-500 disabled:bg-gray-400'}
                `}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </div>

          {/* Contact Information */}
          {currentTheme !== 'theme-2' && (
            <div className="space-y-8">
              <h2
                className={`
                  text-3xl font-bold
                  ${currentTheme === 'theme-1' && 'text-theme1-text'}
                  ${currentTheme === 'theme-3' && 'text-theme3-text font-pacifico'}
                `}
              >
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`
                      flex items-start space-x-4 p-4 rounded-lg
                      ${currentTheme === 'theme-1' && 'bg-gray-50'}
                      ${currentTheme === 'theme-3' && 'bg-theme3-primary'}
                    `}
                  >
                    <div className="text-3xl">{info.icon}</div>
                    <div>
                      <h3
                        className={`
                          font-semibold mb-1
                          ${currentTheme === 'theme-1' && 'text-theme1-text'}
                          ${currentTheme === 'theme-3' && 'text-theme3-text'}
                        `}
                      >
                        {info.title}
                      </h3>
                      <p
                        className={`
                          ${currentTheme === 'theme-1' && 'text-gray-600'}
                          ${currentTheme === 'theme-3' && 'text-theme3-text/80'}
                        `}
                      >
                        {info.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default Contact; 