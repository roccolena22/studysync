interface ChoiceRoleProps {
  handleCheckBox: (index: number) => void;
  checkedTeacher: boolean;
  checkedStudent: boolean;
  studentLabel: string;
  teacherLabel: string;
}

export default function ChoiceRole({
  handleCheckBox,
  checkedTeacher,
  checkedStudent,
  studentLabel,
  teacherLabel, 
}: ChoiceRoleProps): JSX.Element {
  const checkBoxContainerClasses = "flex space-x-2 items-center";

  return (
    <div data-testid="choiceRoleContainer" className="flex space-x-4 pt-2 mb-4">
      <div className="flex items-start">
        <span className="font-semibold">I am a...</span>
        <span className="text-red-500 text-xs">*</span>
      </div>
      <div className={checkBoxContainerClasses}>
        <label htmlFor="teacherCheckbox">{teacherLabel}</label>
        <input
          id="teacherCheckbox"
          checked={checkedTeacher}
          type="checkbox"
          onChange={() => handleCheckBox(0)}
        />
      </div>
      <div className={checkBoxContainerClasses}>
        <label htmlFor="studentCheckbox">{studentLabel}</label>
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
