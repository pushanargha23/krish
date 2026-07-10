import React, { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  icon?: React.ReactNode;
}

export const FloatingTextarea: React.FC<FloatingTextareaProps> = ({ 
  label, 
  registration, 
  error, 
  icon,
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative flex">
        {icon && (
          <div className={`absolute left-4 top-4 z-10 transition-colors duration-300 ${isFocused ? 'text-secondary' : 'text-gray-400'}`}>
            {icon}
          </div>
        )}
        <textarea
          {...registration}
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            registration.onBlur(e);
          }}
          placeholder=" "
          className={`
            peer w-full bg-white/50 backdrop-blur-md border border-gray-200 text-gray-900 rounded-xl
            px-4 pt-7 pb-3 transition-all duration-300 outline-none resize-none
            focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10
            hover:border-secondary/50
            ${icon ? 'pl-11' : ''}
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}
          `}
        />
        <label
          className={`
            absolute text-gray-500 transition-all duration-300 pointer-events-none
            ${icon ? 'left-11' : 'left-4'}
            top-4 -translate-y-2 text-xs font-medium text-secondary
            peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal
            peer-focus:top-4 peer-focus:-translate-y-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-secondary
          `}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="absolute -bottom-5 left-1 text-red-500 text-xs font-medium animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};
