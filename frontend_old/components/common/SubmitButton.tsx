import { ReactNode } from 'react';
import { Spinner } from '@/components/common';

interface SubmitButtonProps {
  btnText: string;
  isLoading: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  children?: ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  btnText,
  isLoading,
  onClick,
  disabled = false,
  type = 'button',
  children,
}) => {
  return (
    <button
      type={type}
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner sm /> : children || btnText}
    </button>
  );
};

export default SubmitButton;
