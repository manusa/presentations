import React from 'react';
import {ClaudeLogo} from './';

import './styles/chat-gpt.scss';

export const ChatGptGreeting = ({title = 'GREETINGS PROFESSOR FALKEN.'}) => {
  return (
    <div className='chat-gpt__greeting'>
      <div className='chat-gpt__greeting-icon'>
        <ClaudeLogo />
      </div>
      <div className='chat-gpt__greeting-title'>
        {title}
      </div>
    </div>
  );
};

export const ChatGptUserMessage = ({
  avatar = 'PF',
  className = '',
  children
}) => {
  return (
    <div className={`chat-gpt__user-message ${className}`}>
      <div className='chat-gpt__user-message-avatar'>{avatar}</div>
      <div className='chat-gpt__user-message-text'>{children}</div>
    </div>
  );
};

export const ChatGptAssistantMessage = ({
  className = '',
  children
}) => {
  return (
    <div className={`chat-gpt__assistant-message ${className}`}>
      {children}
    </div>
  );
};

export const ChatGptToolCallMessage = ({
  className = '',
  toolName
}) => {
  return (
    <div className={`chat-gpt__tool-call-message ${className}`}>
      <i className='fa-solid fa-screwdriver-wrench'></i>
      <div className='chat-gpt__tool-call-message-tool-name'>{toolName}</div>
      <i className='fa-solid fa-angle-down'></i>
    </div>
  );
}

export const ChatGptComposer = ({
  input = '',
  placeHolderText = 'How can I help you today?',
  hasTools = false
}) => {
  return (
    <div className='chat-gpt__composer'>
      <div className='chat-gpt__composer-input'>
        {input && <div className='chat-gpt__composer-input_text'>{input}</div>}
        {!input && <div className='chat-gpt__composer-input_placeholder'>{placeHolderText}</div>}
      </div>
      <div className='chat-gpt__composer-tools'>
        <div className='chat-gpt__composer-tools-options'>
          {hasTools && <div className='chat_gpt__composer-button'><i className='fa-solid fa-screwdriver-wrench'></i></div>}
        </div>
        <div className='chat-gpt__composer-model-selector chat_gpt__composer-button'>
          <div className='chat-gpt__composer-model-selector-text'>Hal 9000</div>
          <i className='fa-solid fa-angle-down'></i>
        </div>
        <button className='chat-gpt__composer-send-button'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z"></path></svg>
        </button>
      </div>
    </div>
  );
};

export const ChatGpt = ({children}) => {
  return (
    <div className='chat-gpt'>
      {children}
    </div>
  );
};
