
import React from 'react';

interface ChatMessageProps {
  message: string;
  sender: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  isCurrentUser: boolean;
}

const ChatMessage = ({
  message,
  sender,
  timestamp,
  isCurrentUser
}: ChatMessageProps) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isCurrentUser && (
        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gray-200 overflow-hidden mr-3">
          {sender.avatar ? (
            <img 
              src={sender.avatar} 
              alt={sender.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary text-white text-xs font-bold">
              {sender.name.charAt(0)}
            </div>
          )}
        </div>
      )}
      
      <div className={`max-w-[80%]`}>
        <div 
          className={`${
            isCurrentUser 
              ? 'bg-primary text-white rounded-t-lg rounded-bl-lg' 
              : 'bg-gray-100 text-gray-800 rounded-t-lg rounded-br-lg'
          } px-4 py-2`}
        >
          {message}
        </div>
        
        <div className={`flex mt-1 text-xs text-gray-500 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
          {!isCurrentUser && <span className="mr-1">{sender.name}</span>}
          <span>{timestamp}</span>
        </div>
      </div>
      
      {isCurrentUser && (
        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gray-200 overflow-hidden ml-3">
          {sender.avatar ? (
            <img 
              src={sender.avatar} 
              alt={sender.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary text-white text-xs font-bold">
              {sender.name.charAt(0)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
