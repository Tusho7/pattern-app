import React, { useEffect } from "react";
import { CheckCircle, X, Eye, Copy } from "lucide-react";
import type { ToastProps } from "../types/toast";

export const Toast: React.FC<ToastProps> = ({
  isVisible,
  message,
  onClose,
  type = "success",
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "preview":
        return <Eye className="w-5 h-5 text-blue-500 flex-shrink-0" />;
      case "copy":
        return <Copy className="w-5 h-5 text-green-500 flex-shrink-0" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "preview":
        return "bg-blue-50 border-blue-200";
      case "copy":
        return "bg-green-50 border-green-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-2">
      <div
        className={`${getBgColor()} backdrop-blur-sm rounded-xl shadow-xl p-4 flex items-center gap-3 min-w-[320px] max-w-md border`}
      >
        {getIcon()}
        <span className="text-gray-700 flex-1 font-medium">{message}</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};
