import { forwardRef } from 'react';

interface MyInputProps extends React.HTMLProps<HTMLInputElement> {
  error?: string;
  id?: string;
  label?: string;
}

export const MyInput = forwardRef<HTMLInputElement, MyInputProps>(({label, error, id, ...props}, ref) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label htmlFor={id} className="text-base font-medium antialiased">{label}</label>}
      <input
        {...props}
        id={id}
        ref={ref}
        className={`w-full border border-solid px-4 py-2 rounded-md placeholder:font-medium focus-visible:outline-none ${
          error
            ? "border-red-400 bg-red-600/5"
            : "border-white bg-transparent focus:border-blue-400 focus:bg-blue-600/5 "
        } focus:scale-[1.015] transition-all`}
      />
      {error && <span className="text-xs font-bold text-red-500">{error}</span>}
    </div>
  );
});
