import { useState, useMemo } from "react";
import { Toast } from "./components/Toast";
import { Palette, Github, Twitter, X, ArrowUp, Sparkles } from "lucide-react";
import { PatternCard } from "./components/PatternCard";
import { SearchAndFilter } from "./components/SearchAndFilter";
import type { Pattern } from "./types/pattern";
import patternsData from "./data/pattern.json";
const gridPatterns: Pattern[] = patternsData as Pattern[];
import Footer from "./components/Footer";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "preview" | "copy">(
    "success"
  );
  const [previewPattern, setPreviewPattern] = useState<Pattern | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(gridPatterns.map((pattern) => pattern.category)));
  }, []);

  const filteredPatterns = useMemo(() => {
    return gridPatterns.filter((pattern) => {
      const matchesSearch =
        pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pattern.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || pattern.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handlePreview = (pattern: Pattern) => {
    setPreviewPattern(pattern);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setToastMessage(
      `Now previewing "${pattern.name}" - see it live on the website!`
    );
    setToastType("preview");
    setShowToast(true);
  };

  const handleCopy = async (code: string, name: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setToastMessage(`"${name}" code copied to clipboard!`);
      setToastType("copy");
      setShowToast(true);
    } catch (err) {
      console.error("Failed to copy code:", err);
      setToastMessage("Failed to copy code. Please try again.");
      setToastType("success"); 
      setShowToast(true);
    }
  };

  const clearPreview = () => {
    setPreviewPattern(null);
    setToastMessage("Preview cleared - back to normal view");
    setToastType("success");
    setShowToast(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative">
      {previewPattern && (
        <div className="fixed inset-0 z-0" style={previewPattern.style} />
      )}

      <div
        className={`relative z-10 min-h-screen ${
          !previewPattern
            ? "bg-gradient-to-br from-slate-50 via-white to-blue-50"
            : ""
        }`}
      >
        <header
          className={`border-b sticky top-0 z-40 transition-all duration-500 ${
            !previewPattern
              ? "bg-white/95 backdrop-blur-sm border-gray-200/50 shadow-sm"
              : "bg-white/85 backdrop-blur-md border-white/30 shadow-xl"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl shadow-lg">
                  <Palette className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    PatternPulse
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">
                    Beautiful background patterns
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {previewPattern ? (
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-5 py-2.5 rounded-full shadow-sm">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700 font-semibold text-sm">
                        Live: {previewPattern.name}
                      </span>
                    </div>
                    <button
                      onClick={clearPreview}
                      className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2.5 rounded-full transition-all duration-200 border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span className="hidden sm:inline font-medium">
                        Clear
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                    <span className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold border border-emerald-200">
                      {filteredPatterns.length} patterns
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <a
                    href="https://github.com/Tusho7"
                    className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com/SandroTusho"
                    className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 px-5 py-2.5 rounded-full mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-indigo-700 font-bold text-sm">
                Production Ready Patterns
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
              Beautiful Background
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Patterns
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Copy and paste stunning CSS background patterns for your next
              project. All patterns are production-ready, fully customizable,
              and optimized for modern web development.
            </p>

            {previewPattern && (
              <div className="mt-10 p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-3xl inline-block shadow-xl max-w-2xl">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <p className="text-blue-800 font-black text-xl">
                    Live Preview: {previewPattern.name}
                  </p>
                </div>
                <p className="text-blue-600 font-medium mb-2">
                  🎨 You're seeing this pattern applied to the entire website
                  background
                </p>
                {previewPattern.description && (
                  <p className="text-blue-700 text-sm italic bg-blue-100/50 px-4 py-2 rounded-xl">
                    "{previewPattern.description}"
                  </p>
                )}
              </div>
            )}
          </div>

          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />

          {filteredPatterns.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredPatterns.map((pattern) => (
                <PatternCard
                  key={pattern.id}
                  pattern={pattern}
                  onPreview={handlePreview}
                  onCopy={handleCopy}
                  isCurrentlyPreviewed={previewPattern?.id === pattern.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-300 mb-6">
                <Palette className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                No patterns found
              </h3>
              <p className="text-gray-500 text-lg">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </main>

        <Footer previewPattern={previewPattern} />
      </div>

      {previewPattern && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-4 rounded-full shadow-xl border border-gray-200 transition-all duration-200 cursor-pointer hover:shadow-2xl hover:scale-105"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <Toast
        isVisible={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
        type={toastType}
      />
    </div>
  );
}

export default App;