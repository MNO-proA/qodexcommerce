// components/shopping-view/footer.jsx
import { Instagram, Facebook, Twitter, Github } from "lucide-react";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";


function ShoppingFooter() {
  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>123 Shopping Street</p>
              <p>City, Country 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@example.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="cursor-pointer hover:text-primary">About Us</p>
              <p className="cursor-pointer hover:text-primary">Privacy Policy</p>
              <p className="cursor-pointer hover:text-primary">Terms & Conditions</p>
              <p className="cursor-pointer hover:text-primary">FAQ</p>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Categories</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="cursor-pointer hover:text-primary">Beauty</p>
              <p className="cursor-pointer hover:text-primary">Accessories</p>
              {/* <p className="cursor-pointer hover:text-primary">Home & Living</p>
              <p className="cursor-pointer hover:text-primary">Books</p> */}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
                <Link to="https://qodexcore.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                > 
                    <Facebook className="w-5 h-5 cursor-pointer hover:text-primary" />
                </Link>

                <Link to="https://qodexcore.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <Instagram className="w-5 h-5 cursor-pointer hover:text-primary" />
                </Link>

                <Link to="https://qodexcore.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <Twitter className="w-5 h-5 cursor-pointer hover:text-primary" />
                </Link>

                {/* <Link to="https://qodexcore.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <Github className="w-5 h-5 cursor-pointer hover:text-primary" />
                </Link> */}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Store. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Powered by</span>
            <Link 
              to="https://qodexcore.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold hover:text-primary"
            >
              Qodexcore
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;