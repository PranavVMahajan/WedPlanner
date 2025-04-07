
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-primary mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h1>

        <motion.p
          className="text-gray-600 text-lg sm:text-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Welcome to <span className="font-semibold text-primary">WedConnect</span> – your trusted partner in planning
          the wedding of your dreams. Our platform connects you with the finest wedding professionals in
          the industry — from photographers and decorators to caterers and mehendi artists.
        </motion.p>
      </div>

      <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.img
          src="https://plus.unsplash.com/premium_photo-1682092592909-8d26686e7f5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Wedding Planning"
          className="w-full h-96 object-cover rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />

        <motion.div
          className="text-gray-700 text-lg space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p>
            Whether you're organizing a small intimate gathering or a grand traditional wedding,
            our goal is to make the process smooth, joyful, and customized to your vision.
          </p>
          <p>
            Explore top-rated vendors, compare services, read genuine reviews, and book directly
            through our easy-to-use platform. With real-time booking features, transparent pricing,
            and detailed portfolios — your perfect wedding is just a few clicks away.
          </p>
          <p className="font-semibold text-primary">
            Start planning today and make your wedding unforgettable!
          </p>
        </motion.div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          To empower couples with a seamless, reliable, and delightful wedding planning experience by
          connecting them to verified professionals across every service.
        </p>
      </div>
    </div>
  );
};

export default About;
