const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
        {/* Left Section: Logo & Description */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-white">🎬 DaisyTV</h2>
          <p className="text-sm text-gray-400 mt-1">
            Discover top-rated, popular, and upcoming movies!
          </p>
        </div>

        <div className="flex space-x-6 text-md my-4">
          <a href="#" className="hover:text-white">
            Home
          </a>
          <a href="#" className="hover:text-white">
            Top Rated
          </a>
          <a href="#" className="hover:text-white">
            Upcoming
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </div>

        {/* Newsletter Subscription */}
        <form>
          <h3 className="text-md font-semibold text-white mb-2">
            Stay Updated
          </h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 text-gray-900 rounded-md focus:outline-none bg-white"
          />
          <button
            type="submit"
            className="mt-2 w-full bg-orange-600 hover:bg-red-600 text-white py-2 rounded-md"
          >
            Subscribe
          </button>
        </form>
      </div>
      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} MovieFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
