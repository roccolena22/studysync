import { UserRoles } from "../../../src/shared/models";

interface ChoiceRoleProps {
  handleChange: (value: UserRoles) => void;
  selectedRole: UserRoles;
  studentLabel: string;
  teacherLabel: string;
}

export default function ChoiceRole({
  handleChange,
  selectedRole,
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
        <input
          id="teacherRadio"
          type="radio"
          name="role"
          value={UserRoles.TEACHER}
          checked={selectedRole === UserRoles.TEACHER}
          onChange={() => handleChange(UserRoles.TEACHER)}
        />
        <label htmlFor="teacherRadio">{teacherLabel}</label>
      </div>
      <div className={checkBoxContainerClasses}>
        <input
          id="studentRadio"
          type="radio"
          name="role"
          value={UserRoles.STUDENT}
          checked={selectedRole === UserRoles.STUDENT}
          onChange={() => handleChange(UserRoles.STUDENT)}
        />
        <label htmlFor="studentRadio">{studentLabel}</label>
      </div>
    </div>
  );
}
