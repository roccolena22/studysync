export default function Input({
  label,
  placeholder,
  errorMessage,
  type = "text",
  register,
  children,
}) {
  return (
    <div className="py-2 w-full">
      {label && <label className="font-semibold">{label}:</label>}
      <div className="flex items-center border border-zinc-400 rounded-lg px-3 py-2 w-full bg-white">
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className="w-full"
        />
        {children}
      </div>
      <p className="text-red-500 mt-1">{errorMessage}</p>
    </div>
  );
}
