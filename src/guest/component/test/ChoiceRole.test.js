import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChoiceRole from "../ChoiceRole";

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

  expect(teacherCheckbox).toBeInTheDocument();
  expect(studentCheckbox).toBeInTheDocument();

  expect(teacherCheckbox).toBeChecked();
  expect(studentCheckbox).not.toBeChecked();
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
});
