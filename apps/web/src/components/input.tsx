import { type LucideProps } from "lucide-react";
import React from "react";

interface InputProps {
  Icon: React.ComponentType<LucideProps>;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  Icon,
  type,
  placeholder,
  value,
  onChange,
}: InputProps): React.JSX.Element {
  return (
    <div className="relative mb-6">
      <div
        className="absolute inset-y-0 left-0 flex items-center 
        pl-3 pointer-events-none"
      >
        <Icon className="size-5 text-green-500" />
      </div>
      <input
        className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border 
      border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white
      placeholder-gray-400 transition duration-200"
        onChange={onChange}
        placeholder={`${placeholder}`}
        type={type}
        value={value}
      />
    </div>
  );
}

export default Input;
