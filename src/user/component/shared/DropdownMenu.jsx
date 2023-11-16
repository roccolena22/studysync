const DropdownMenu = ({
  label,
  register,
  errorMessage,
  options,
  onOptionSelected,
}) => {
  return (
    <div className="mb-4 w-full">
      <p className="font-semibold block">{label}</p>
      <div>
        <select
          className="w-full border border-slate-400 rounded-lg px-2 py-2 w-full cursor-pointer"
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
