import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../../store/index';

/**
 * About page component
 * Displays company information with theme-specific styling
 */
const About: React.FC = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);

  /**
   * Team member data
   */
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww',
      description: 'Passionate about creating amazing user experiences.'
    },
    {
      name: 'Jane Smith',
      role: 'Lead Designer',
      image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww',
      description: 'Expert in creating beautiful and functional designs.'
    },
    {
      name: 'Mike Johnson',
      role: 'Senior Developer',
      image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww',
      description: 'Full-stack developer with years of experience.'
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
          <h2 className="text-2xl font-bold text-theme2-text mb-6">Quick Links</h2>
          <nav className="space-y-2">
            {['Our Story', 'Team', 'Mission', 'Values'].map((link) => (
              <button
                key={link}
                className="w-full text-left px-3 py-2 rounded text-theme2-text hover:bg-theme2-accent/20 transition-colors"
              >
                {link}
              </button>
            ))}
          </nav>
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
            About Us
          </h1>
          <p
            className={`
              max-w-3xl mx-auto text-lg
              ${currentTheme === 'theme-1' && 'text-gray-600'}
              ${currentTheme === 'theme-2' && 'text-xl text-theme2-text/80'}
              ${currentTheme === 'theme-3' && 'text-lg text-theme3-text/80'}
            `}
          >
            We are passionate about creating innovative solutions that enhance user experiences. 
            Our team combines creativity with technical expertise to deliver exceptional results.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`
            grid md:grid-cols-2 gap-8 items-center mt-5
            ${currentTheme === 'theme-3' && 'bg-theme3-secondary p-8 rounded-2xl'}
          `}
        >
          <div className="space-y-4">
            <h2
              className={`
                text-3xl font-bold
                ${currentTheme === 'theme-1' && 'text-theme1-text'}
                ${currentTheme === 'theme-2' && 'text-theme2-text font-serif'}
                ${currentTheme === 'theme-3' && 'text-theme3-text font-pacifico'}
              `}
            >
              Our Mission
            </h2>
            <p
              className={`
                text-lg
                ${currentTheme === 'theme-1' && 'text-gray-600'}
                ${currentTheme === 'theme-2' && 'text-theme2-text/80'}
                ${currentTheme === 'theme-3' && 'text-theme3-text/80'}
              `}
            >
              To revolutionize the way people interact with technology by creating 
              intuitive, beautiful, and accessible applications that make a difference 
              in people's lives.
            </p>
          </div>
          <div className={`
            p-8 rounded-lg
            ${currentTheme === 'theme-1' && 'bg-gray-50'}
            ${currentTheme === 'theme-2' && 'bg-theme2-secondary'}
            ${currentTheme === 'theme-3' && 'bg-theme3-primary'}
          `}>
            <h3
              className={`
                text-xl font-semibold mb-4
                ${currentTheme === 'theme-1' && 'text-theme1-text'}
                ${currentTheme === 'theme-2' && 'text-theme2-accent'}
                ${currentTheme === 'theme-3' && 'text-theme3-accent'}
              `}
            >
              Key Values
            </h3>
            <ul className="space-y-2">
              {['Innovation', 'Quality', 'User-Centric', 'Collaboration'].map((value) => (
                <li
                  key={value}
                  className={`
                    flex items-center space-x-2
                    ${currentTheme === 'theme-1' && 'text-gray-700'}
                    ${currentTheme === 'theme-2' && 'text-theme2-text'}
                    ${currentTheme === 'theme-3' && 'text-theme3-text'}
                  `}
                >
                  <span className="text-green-500">✓</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <h2
            className={`
              text-3xl font-bold text-center mt-5
              ${currentTheme === 'theme-1' && 'text-theme1-text'}
              ${currentTheme === 'theme-2' && 'text-theme2-text font-serif'}
              ${currentTheme === 'theme-3' && 'text-theme3-text font-pacifico'}
            `}
          >
            Meet Our Team
          </h2>
          <div className={`
            grid md:grid-cols-3 gap-8 
            ${currentTheme === 'theme-3' && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}
          `}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`
                  text-center p-6 rounded-lg
                  ${currentTheme === 'theme-1' && 'bg-white border border-gray-200 shadow-sm'}
                  ${currentTheme === 'theme-2' && 'bg-theme2-secondary border border-theme2-accent/20'}
                  ${currentTheme === 'theme-3' && 'bg-theme3-primary border-2 border-theme3-accent shadow-lg'}
                `}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3
                  className={`
                    text-xl font-semibold mb-2
                    ${currentTheme === 'theme-1' && 'text-theme1-text'}
                    ${currentTheme === 'theme-2' && 'text-theme2-text font-serif'}
                    ${currentTheme === 'theme-3' && 'text-theme3-text font-pacifico'}
                  `}
                >
                  {member.name}
                </h3>
                <p
                  className={`
                    font-medium mb-3
                    ${currentTheme === 'theme-1' && 'text-blue-600'}
                    ${currentTheme === 'theme-2' && 'text-theme2-accent'}
                    ${currentTheme === 'theme-3' && 'text-theme3-accent'}
                  `}
                >
                  {member.role}
                </p>
                <p
                  className={`
                    text-sm
                    ${currentTheme === 'theme-1' && 'text-gray-600'}
                    ${currentTheme === 'theme-2' && 'text-theme2-text/70'}
                    ${currentTheme === 'theme-3' && 'text-theme3-text/80'}
                  `}
                >
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About; 