import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-white mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/#pricing" className="hover:text-black">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-black">
                  Features
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-black">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-black">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Chrome Store
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-black">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex items-center justify-between text-sm text-slate-600">
          <p>© 2025 SEO Advisor</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-black">
              Twitter
            </a>
            <a href="#" className="hover:text-black">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
