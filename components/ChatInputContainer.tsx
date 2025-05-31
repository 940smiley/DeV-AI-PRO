
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import LoadingSpinner from './LoadingSpinner';
import { UploadedImage } from '../types';

interface ChatInputContainerProps {
  onSendMessage: (prompt: string, image?: UploadedImage) => void;
  isLoading: boolean;
}

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

const ChatInputContainer: React.FC<ChatInputContainerProps> = ({ onSendMessage, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((prompt.trim() || uploadedImage) && !isLoading) {
      onSendMessage(prompt.trim(), uploadedImage || undefined);
      setPrompt('');
      setUploadedImage(null); // Clear image after sending
    }
  };

  const handleImageUpload = (image: UploadedImage | null) => {
    setUploadedImage(image);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };


  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-800">
      <div className="flex items-end space-x-2 bg-gray-700 rounded-lg p-2 shadow-md">
        <ImageUpload onImageUpload={handleImageUpload} disabled={isLoading} />
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your AI assistant..."
          className="flex-grow p-2 bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none resize-none max-h-32"
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || (!prompt.trim() && !uploadedImage)}
          className="p-2 rounded-md text-sky-400 hover:bg-gray-600 disabled:text-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {isLoading ? <LoadingSpinner /> : <SendIcon className="w-6 h-6" />}
        </button>
      </div>
    </form>
  );
};

export default ChatInputContainer;
