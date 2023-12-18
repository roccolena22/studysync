export default function Input({
  label,
  placeholder,
  errorMessage,
  type = "text",
  register,
  onChange,
  value,
}) {
  return (
    <div className="py-2 w-full">
      {label && <label className="font-semibold">{label}:</label>}
      <input
        {...register}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        className="border border-zinc-400 rounded-lg px-3 py-2 w-full bg-white" />
      <p className="text-red-500 mt-1">{errorMessage}</p>
    </div>
  );
}
