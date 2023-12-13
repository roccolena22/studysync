const DropdownMenu = ({
  label,
  register,
  errorMessage,
  options,
  onOptionSelected,
}) => {
  return (
    <div className="mb-4 w-full">
      <p className="font-semibold">{label}</p>
      <div className="border border-zinc-400 rounded-lg px-3 py-2 w-full bg-white">
        <select
        className="w-full"
          {...register}
          onChange={(e) => {
            onOptionSelected(e.target.value);
          }}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <p className="text-red-500 mt-1">{errorMessage}</p>
    </div>
  );
};

export default DropdownMenu;
