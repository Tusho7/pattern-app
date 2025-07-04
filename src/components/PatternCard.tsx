import React from "react";
import { Eye, Copy } from "lucide-react";
import type { Pattern } from "../types/pattern";

interface PatternCardProps {
  pattern: Pattern;
  onPreview: (pattern: Pattern) => void;
  onCopy: (code: string, name: string) => void;
  isCurrentlyPreviewed?: boolean;
}

export const PatternCard: React.FC<PatternCardProps> = ({
  pattern,
  onPreview,
  onCopy,
  isCurrentlyPreviewed = false,
}) => {
  return (
    <div
      className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
        isCurrentlyPreviewed
          ? "border-blue-400 ring-2 ring-blue-200 shadow-blue-100"
          : "border-gray-200/50 hover:border-indigo-300"
      }`}
    >
      <div
        className="h-40 w-full relative cursor-pointer overflow-hidden"
        style={pattern.style}
        onClick={() => onPreview(pattern)}
      >
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[1px]">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform duration-200">
            <Eye className="w-5 h-5 text-gray-700" />
            <span className="text-gray-700 font-medium text-sm">
              Live Preview
            </span>
          </div>
        </div>

        {pattern.badge && (
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
              {pattern.badge}
            </span>
          </div>
        )}

        {isCurrentlyPreviewed && (
          <div className="absolute top-3 left-3">
            <div className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Live
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3
              className={`font-bold text-gray-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors ${
                isCurrentlyPreviewed ? "text-blue-600" : ""
              }`}
            >
              {pattern.name}
            </h3>
            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full capitalize font-medium">
              {pattern.category}
            </span>
          </div>
        </div>

        {pattern.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {pattern.description}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => onPreview(pattern)}
            className={`flex-1 text-sm py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
              isCurrentlyPreviewed
                ? "bg-blue-100 text-blue-700 border border-blue-200"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300"
            }`}
          >
            <Eye className="w-4 h-4" />
            {isCurrentlyPreviewed ? "Previewing" : "Preview"}
          </button>
          <button
            onClick={() => onCopy(pattern.code, pattern.name)}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
          >
            <Copy className="w-4 h-4" />
            Copy Code
          </button>
        </div>
      </div>
    </div>
  );
};
