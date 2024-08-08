import { forwardRef } from 'react';
import { MaskedInput } from 'rsuite';

interface MyMaskedInputProps {
  error: string | undefined;
  id: string | undefined;
  label: string;
  onChange: (value: any) => void
  value: any
}

export const MyMaskedInput = forwardRef<HTMLInputElement, MyMaskedInputProps>(({label, error, id, onChange, value}, ref) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-base font-medium antialiased">{label}</label>
      <MaskedInput
        inputRef={ref}
        id={id}
        mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        showMask
        onChange={onChange}
        value={value}
        className={`w-full outline-none border px-4 py-2 rounded-md placeholder:font-medium ${
          error
            ? "border-red-400 bg-red-600/5"
            : "border-white bg-transparent focus:border-blue-400 focus:bg-blue-600/5 "
        } focus:scale-[1.015] transition-all`}
      />
      {/* <input
        {...props}
        id={id}
        ref={ref}
        className={`w-full outline-none border px-4 py-2 rounded-md placeholder:font-medium ${
          error
            ? "border-red-400 bg-red-600/5"
            : "border-white bg-transparent focus:border-blue-400 focus:bg-blue-600/5 "
        } focus:scale-[1.015] transition-all`}
      /> */}
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
});
