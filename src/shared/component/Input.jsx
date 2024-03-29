export default function Input({
  label,
  placeholder,
  errorMessage,
  type = "text",
  register,
  children,
  required,
}) {
  return (
    <div className="py-2 w-full">
      <div className="flex">
        {label && <label className="font-semibold">{label}:</label>}
        {required && <p className="text-red-500 text-xs">*</p>}
      </div>
      <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 w-full bg-white">
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className="w-full focus:outline-none bg-white"
        />
        {children}
      </div>
      <p className="text-red-500 mt-1">{errorMessage}</p>
    </div>
  );
}
