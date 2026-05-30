import { useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
  FieldError,
} from "react-hook-form";

interface SSInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T>;
  error?: FieldError;
  autoComplete?: string;
}

const SSInput = <T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  required,
  icon,
  register,
  validation,
  error,
  autoComplete,
}: SSInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full max-w-full flex flex-col box-border">
      <label 
        htmlFor={name} 
        className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 text-left"
      >
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      
      <div className="relative w-full max-w-full flex items-center box-border">
        {icon && (
          <span className="absolute left-3 flex items-center justify-center text-slate-400 z-10 pointer-events-none">
            <i className={icon}></i>
          </span>
        )}
        
        <input
          type={inputType}
          id={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(name, validation)}
          className={`w-full h-11 block box-border rounded-xl border bg-transparent text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
            icon ? "pl-10" : "px-4"
          } ${type === "password" ? "pr-10" : "pr-4"} ${
            error
              ? "border-rose-500 focus:ring-rose-500/20 focus:border-rose-500"
              : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
          }`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 z-10"
          >
            <i className={showPassword ? "fi fi-rr-eye" : "fi fi-rr-eye-crossed"}></i>
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs font-medium text-rose-500 mt-1.5 text-left">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default SSInput;