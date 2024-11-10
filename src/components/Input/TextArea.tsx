import React from "react";
import { Field, FieldProps } from "formik";

interface CustomTextAreaProps {
  placeholder?: string;
  name: string;
  label?: string;
  customStyle?: string;
  readonly?: boolean;
  icon?: React.ReactNode;
  containerClass?: string;
  additionalClass?: string;
}

const TextArea: React.FC<CustomTextAreaProps> = ({
  placeholder,
  name,
  label,
  customStyle,
  readonly,
  icon,
  containerClass = "",
  additionalClass = "",
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
            className={`flex w-full gap-3 text-text-color ${additionalClass || "border "} border-text-color items-center p-3 rounded-lg ${containerClass}`}
          >
            {icon && <div>{icon}</div>}
            <textarea
              id={name}
              placeholder={placeholder}
              className={`border-none outline-none text-text-color w-full p-2 resize-none ${
                customStyle || "placeholder:text-gray-400"
              } bg-transparent`}
              readOnly={readonly}
              {...field}
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

export default TextArea;
