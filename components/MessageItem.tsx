
import React from 'react';
import { Message, SenderType } from '../types';
import { GitHubIcon } from '../constants.tsx'; // Use the new GitHubIcon component

// Simple user icon
const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
  </svg>
);

// A simple AI icon using the GitHubIcon component
const AiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const { className, ...restProps } = props;
  return (
    <GitHubIcon 
      className={`${className || ''} transform scale-x-[-1]`} 
      {...restProps} 
    />
  );
};


const ErrorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.519 13.007a3.001 3.001 0 01-2.599 4.504H4.482a3.001 3.001 0 01-2.598-4.504L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);


interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.sender === SenderType.USER;
  const isError = message.sender === SenderType.ERROR;

  const alignmentClass = isUser ? 'justify-end' : 'justify-start';
  const bubbleColorClass = isUser ? 'bg-sky-600 text-white' : isError ? 'bg-red-700 text-white' : 'bg-gray-700 text-gray-200';
  
  const Icon = isUser ? UserIcon : isError ? ErrorIcon : AiIcon;

  // Basic markdown-like code block styling
  const formatText = (text: string): React.ReactNode[] => {
    const parts = text.split(/(```[\s\S]*?```|`[^`]*`)/g);
    return parts.map((part, index) => {
      if (part === undefined || part === null) return null; // Skip undefined/null parts
      if (part.startsWith('```') && part.endsWith('```')) {
        const codeContent = part.substring(3, part.length - 3).trim();
        // Determine language (optional, basic detection)
        const firstLineEndIndex = codeContent.indexOf('\n');
        let language = '';
        let actualCode = codeContent;
        
        if (firstLineEndIndex !== -1) {
            const firstLine = codeContent.substring(0, firstLineEndIndex).trim();
            // A simple heuristic for language identifiers (e.g., python, javascript)
            if (/^[a-zA-Z0-9]+$/.test(firstLine) && firstLine.length < 20) { // Avoid long first lines as language
                 language = firstLine;
                 actualCode = codeContent.substring(firstLineEndIndex + 1).trimStart();
            }
        }


        return (
          <pre key={index} className="bg-gray-800 p-3 rounded-md my-2 text-sm overflow-x-auto">
            {language && <div className="text-xs text-gray-400 mb-1 capitalize">{language}</div>}
            <code>{actualCode}</code>
          </pre>
        );
      } else if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="bg-gray-600 text-pink-400 px-1 py-0.5 rounded text-sm">{part.substring(1, part.length - 1)}</code>;
      }
      // Handle newlines by splitting and wrapping in divs or using <br />
      return part.split('\n').map((line, i) => (
        <React.Fragment key={`${index}-${i}`}>
          {line}
          {i < part.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    }).filter(Boolean); // Remove any null items from the array
  };

  return (
    <div className={`flex ${alignmentClass} mb-4`}>
      <div className={`flex items-end max-w-xs md:max-w-md lg:max-w-2xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <Icon className={`w-8 h-8 rounded-full p-1 flex-shrink-0 ${isUser ? 'ml-2 bg-sky-600 text-white' : 'mr-2 bg-gray-700 text-gray-200'} ${isError && 'bg-red-700 text-white'}`} />
        <div className={`p-3 rounded-lg shadow ${bubbleColorClass}`}>
          {message.imagePreviewUrl && (
            <img src={message.imagePreviewUrl} alt="Uploaded content" className="max-w-full h-auto rounded-md mb-2 max-h-64 object-contain" />
          )}
          <div className="text-sm whitespace-pre-wrap break-words">
            {formatText(message.text)}
          </div>
          <p className={`text-xs mt-1 ${isUser ? 'text-sky-200 text-right' : 'text-gray-400 text-left'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;