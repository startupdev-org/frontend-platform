export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">BookBeauty</h3>
            <p className="text-gray-400">
              Your trusted platform for booking beauty and barbershop services.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="/admin/login" className="text-gray-400 hover:text-white transition-colors">
                  Business Login
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">Email: info@bookbeauty.md</p>
            <p className="text-gray-400">Phone: +373 69 000 000</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BookBeauty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
