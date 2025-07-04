export interface ToastProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  type?: 'success' | 'preview' | 'copy';
}