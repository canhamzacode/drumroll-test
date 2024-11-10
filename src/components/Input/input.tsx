import React from "react";
import { Field, FieldProps } from "formik";

interface CustomInputProps {
  type: string;
  placeholder?: string;
  name: string;
  label?: string;
  customStyle?: string;
  readonly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  containerClass?: string;
  additionalStyle?: string;
}

const TextInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  name,
  label,
  customStyle,
  readonly,
  onChange,
  icon,
  containerClass = "",
  additionalStyle = "",
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className="w-full flex flex-col gap-2">
          {label && (
            <label htmlFor={name} className={`text-base font-bold ${customStyle || "text-text-color"}`}>
              {label}
            </label>
          )}
          <div
            className={`flex w-full gap-3 text-text-color ${additionalStyle || "border "} border-text-color items-center p-3 rounded-lg ${containerClass}`}
          >
            {icon && <div>{icon}</div>}
            <input
              type={type}
              placeholder={placeholder}
              className={`border-none outline-none w-full ${
                customStyle || "placeholder:text-gray-400"
              } bg-transparent`}
              readOnly={readonly}
              {...field}
              {...(onChange && { onChange })}
            />
          </div>
          {meta.touched && meta.error && (
            <p className="text-red-600 capitalize text-sm">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  );
};

export default TextInput;
