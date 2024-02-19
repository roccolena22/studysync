export default function ChoiceRole({
  handleCheckBox,
  checkedTeacher,
  checkedStudent,
}) {
  const checkBoxContainerClasses = "flex space-x-2 items-center";
  return (
    <div data-testid="choiceRoleContainer" className="flex space-x-4 pt-2 mb-4">
      <div className="flex items-start">
        <span className="font-semibold">I am a...</span>
        <span className="text-red-500 text-xs">*</span>
      </div>
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
