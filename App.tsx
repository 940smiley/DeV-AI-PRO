
import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MessageList from './components/MessageList';
import ChatInputContainer from './components/ChatInputContainer';
import ApiKeyStatusIndicator from './components/ApiKeyStatusIndicator';
import { Message, SenderType, ExpertiseAreaId, UploadedImage } from './types';
import { generateDeveloperResponse } from './services/geminiService';
import { EXPERTISE_AREAS, DEFAULT_ERROR_MESSAGE } from './constants.tsx';

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);


const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentExpertise, setCurrentExpertise] = useState<ExpertiseAreaId>(ExpertiseAreaId.GENERAL_ASSISTANT);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 1024); // Collapsed on mobile by default

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleSendMessage = useCallback(async (prompt: string, uploadedImage?: UploadedImage) => {
    if (!prompt && !uploadedImage) return;

    const userMessageId = `user-${Date.now()}`;
    const userMessage: Message = {
      id: userMessageId,
      sender: SenderType.USER,
      text: prompt || (uploadedImage ? `Image: ${uploadedImage.name}` : "No prompt"),
      imagePreviewUrl: uploadedImage ? `data:${uploadedImage.mimeType};base64,${uploadedImage.base64}` : undefined,
      timestamp: Date.now(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const aiResponseText = await generateDeveloperResponse({
        prompt: prompt || `Describe this image.` , // Default prompt if only image
        expertise: currentExpertise,
        imageBase64: uploadedImage?.base64,
        mimeType: uploadedImage?.mimeType,
      });
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: SenderType.AI,
        text: aiResponseText,
        timestamp: Date.now(),
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

    } catch (error: any) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        sender: SenderType.ERROR,
        text: error.message || DEFAULT_ERROR_MESSAGE,
        timestamp: Date.now(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExpertise]); // Dependencies for useCallback

  const handleExpertiseChange = (expertiseId: ExpertiseAreaId) => {
    setCurrentExpertise(expertiseId);
    const selectedExpertise = EXPERTISE_AREAS.find(area => area.id === expertiseId);
    // Optionally, send a system message or clear chat when expertise changes
    setMessages(prev => [...prev, {
      id: `system-${Date.now()}`,
      sender: SenderType.AI, // Or a new SenderType.SYSTEM
      text: `Switched to ${selectedExpertise?.name || 'New Expertise'}. How can I help in this area?`,
      timestamp: Date.now()
    }]);
    if (window.innerWidth < 1024) { // Auto-collapse sidebar on mobile after selection
      setIsSidebarCollapsed(true);
    }
  };
  
  const currentExpertiseName = EXPERTISE_AREAS.find(e => e.id === currentExpertise)?.name || 'AI Assistant';

  return (
    <div className="flex h-screen max-h-screen overflow-hidden bg-gray-900">
      <ApiKeyStatusIndicator />
      <Sidebar 
        currentExpertise={currentExpertise} 
        onExpertiseChange={handleExpertiseChange}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <main className={`flex-grow flex flex-col transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <header className="bg-gray-800 p-3 border-b border-gray-700 shadow-sm flex items-center">
          <button onClick={toggleSidebar} className="lg:hidden p-2 mr-2 text-gray-300 hover:text-sky-400">
            <MenuIcon className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold text-sky-400">{currentExpertiseName}</h2>
        </header>
        <MessageList messages={messages} />
        <ChatInputContainer onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default App;