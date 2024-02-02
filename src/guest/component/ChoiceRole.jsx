export default function ChoiceRole({
  handleCheckBox,
  checkedTeacher,
  checkedStudent,
}) {
  const checkBoxContainerClasses = "flex space-x-2 items-center";
  return (
    <div className="flex items-center space-x-4 pt-2 mb-4">
      <p className="font-semibold">I am a...</p>
      <div className={checkBoxContainerClasses}>
        <label htmlFor="teacherCheckbox">Teacher</label>
        <input
          id="teacherCheckbox"
          checked={checkedTeacher}
          type="checkbox"
          onChange={() => handleCheckBox(0)}
        />
      </div>
      <div className={checkBoxContainerClasses}>
        <label htmlFor="studentCheckbox">Student</label>
        <input
          id="studentCheckbox"
          checked={checkedStudent}
          type="checkbox"
          onChange={() => handleCheckBox(1)}
        />
      </div>
    </div>
  );
}
