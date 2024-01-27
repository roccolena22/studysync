export default function ChoiceOfRole({
  handleCheckBox,
  checkedTeacher,
  checkedStudent,
}) {
  return (
    <div className="flex items-center space-x-4 pt-2 mb-4">
      <p className="font-semibold">I am a...</p>
      <div className="flex space-x-2 items-center">
        <p>Teacher</p>
        <input
          checked={checkedTeacher}
          type="checkbox"
          onChange={() => handleCheckBox(0)}
        />
      </div>
      <div className="flex space-x-2 items-center">
        <p>Student</p>
        <input
          checked={checkedStudent}
          type="checkbox"
          onChange={() => handleCheckBox(1)}
        />
      </div>
    </div>
  );
}
