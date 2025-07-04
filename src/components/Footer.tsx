import { Github, Palette, Twitter } from "lucide-react";
import type { FooterProps } from "../types/footer";

const Footer = ({ previewPattern }: FooterProps) => {
  return (
    <footer
      className={`border-t mt-24 transition-all duration-500 ${
        !previewPattern
          ? "bg-white/95 backdrop-blur-sm border-gray-200/50"
          : "bg-white/85 backdrop-blur-md border-white/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-2xl text-gray-900">
              PatternCraft
            </span>
          </div>

          <p className="text-gray-600 text-lg mb-4 max-w-md mx-auto">
            A curated collection of modern CSS background patterns for
            developers and designers.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <a
              href="https://github.com/Tusho7"
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/SandroTusho"
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            Built by{" "}
            <a
              href="https://github.com/Tusho7"
              className="underline hover:text-indigo-500"
            >
              Sandro Tushurashvili
            </a>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Patterns are free to use under the MIT license.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
