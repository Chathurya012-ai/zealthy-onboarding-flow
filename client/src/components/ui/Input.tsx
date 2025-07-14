import React from 'react';

interface InputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    error?: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({
                                         label,
                                         type = 'text',
                                         placeholder,
                                         value,
                                         onChange,
                                         required = false,
                                         error,
                                         className = ''
                                     }) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error ? 'border-red-500' : ''
                }`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Input;