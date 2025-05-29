
import { SelectHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: number; label: string }[];
  registration: UseFormRegisterReturn;
  error?: string;
}

export default function Select({ label, options, registration, error, ...rest }: SelectProps) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <select
        {...registration}
        {...rest}
        className={`w-full border rounded px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Seleccione una opción</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
