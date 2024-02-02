import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChoiceRole from "../ChoiceRole";

const checkBoxContainerClasses = "flex space-x-2 items-center";

test("renders ChoiceRole component with checkboxes", () => {
  const handleCheckBox = jest.fn();
  const checkedTeacher = true;
  const checkedStudent = false;

  render(
    <ChoiceRole
      handleCheckBox={handleCheckBox}
      checkedTeacher={checkedTeacher}
      checkedStudent={checkedStudent}
    />
  );

  const teacherCheckbox = screen.getByLabelText("Teacher");
  const studentCheckbox = screen.getByLabelText("Student");
  expect(teacherCheckbox.tagName).toBe("INPUT");
  expect(teacherCheckbox.parentElement.tagName).toBe("DIV");
  expect(studentCheckbox.tagName).toBe("INPUT");
  expect(studentCheckbox.parentElement.tagName).toBe("DIV");

  expect(teacherCheckbox).toBeInTheDocument();
  expect(studentCheckbox).toBeInTheDocument();

  expect(teacherCheckbox).toBeChecked();
  expect(studentCheckbox).not.toBeChecked();

  expect(teacherCheckbox.parentElement).toHaveClass(checkBoxContainerClasses);
  expect(studentCheckbox.parentElement).toHaveClass(checkBoxContainerClasses);
});

test("renders ChoiceRole component with checkboxes", () => {
  const handleCheckBox = jest.fn();
  const checkedTeacher = false;
  const checkedStudent = true;

  render(
    <ChoiceRole
      handleCheckBox={handleCheckBox}
      checkedTeacher={checkedTeacher}
      checkedStudent={checkedStudent}
    />
  );

  const teacherCheckbox = screen.getByLabelText("Teacher");
  const studentCheckbox = screen.getByLabelText("Student");

  expect(teacherCheckbox).toBeInTheDocument();
  expect(studentCheckbox).toBeInTheDocument();

  expect(teacherCheckbox).not.toBeChecked();
  expect(studentCheckbox).toBeChecked();

  expect(teacherCheckbox.parentElement).toHaveClass(checkBoxContainerClasses);
  expect(studentCheckbox.parentElement).toHaveClass(checkBoxContainerClasses);
});
