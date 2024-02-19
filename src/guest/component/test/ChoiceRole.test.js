import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ChoiceRole from "../ChoiceRole";

const checkBoxContainerClasses = "flex space-x-2 items-center";

function renderChoiceRole({ handleCheckBox, checkedTeacher, checkedStudent }) {
  render(
    <ChoiceRole
      handleCheckBox={handleCheckBox}
      checkedTeacher={checkedTeacher}
      checkedStudent={checkedStudent}
    />
  );
  const teacherCheckbox = screen.getByLabelText("Teacher");
  const studentCheckbox = screen.getByLabelText("Student");

  const container = screen.getByTestId("choiceRoleContainer");
  expect(container).toHaveClass("flex space-x-4 pt-2 mb-4");

  return { teacherCheckbox, studentCheckbox };
}

test("renders ChoiceRole component with checkboxes (checkedTeacher=true)", () => {
  const { teacherCheckbox, studentCheckbox } = renderChoiceRole({
    handleCheckBox: jest.fn(),
    checkedTeacher: true,
    checkedStudent: false,
  });

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

test("renders ChoiceRole component with checkboxes (checkedStudent=true)", () => {
  const { teacherCheckbox, studentCheckbox } = renderChoiceRole({
    handleCheckBox: jest.fn(),
    checkedTeacher: false,
    checkedStudent: true,
  });

  expect(teacherCheckbox.tagName).toBe("INPUT");
  expect(teacherCheckbox.parentElement.tagName).toBe("DIV");
  expect(studentCheckbox.tagName).toBe("INPUT");
  expect(studentCheckbox.parentElement.tagName).toBe("DIV");

  expect(teacherCheckbox).toBeInTheDocument();
  expect(studentCheckbox).toBeInTheDocument();

  expect(teacherCheckbox).not.toBeChecked();
  expect(studentCheckbox).toBeChecked();

  expect(teacherCheckbox.parentElement).toHaveClass(checkBoxContainerClasses);
  expect(studentCheckbox.parentElement).toHaveClass(checkBoxContainerClasses);
});

test("renders ChoiceRole component without props functions", () => {
  const { teacherCheckbox, studentCheckbox } = renderChoiceRole({});

  expect(teacherCheckbox.tagName).toBe("INPUT");
  expect(teacherCheckbox.parentElement.tagName).toBe("DIV");
  expect(studentCheckbox.tagName).toBe("INPUT");
  expect(studentCheckbox.parentElement.tagName).toBe("DIV");

  expect(teacherCheckbox).toBeInTheDocument();
  expect(studentCheckbox).toBeInTheDocument();

  expect(teacherCheckbox).not.toBeChecked();
  expect(studentCheckbox).not.toBeChecked();

  expect(teacherCheckbox.parentElement).toHaveClass(checkBoxContainerClasses);
  expect(studentCheckbox.parentElement).toHaveClass(checkBoxContainerClasses);
});

test("handles click on Teacher checkbox", () => {
  const handleCheckBox = jest.fn();
  const { teacherCheckbox } = renderChoiceRole({ handleCheckBox });

  fireEvent.click(teacherCheckbox);

  expect(handleCheckBox).toHaveBeenCalledWith(0);
});

test("handles click on Student checkbox", () => {
  const handleCheckBox = jest.fn();
  const { studentCheckbox } = renderChoiceRole({ handleCheckBox });

  fireEvent.click(studentCheckbox);

  expect(handleCheckBox).toHaveBeenCalledWith(1);
});

test("renders both checkboxes unchecked", () => {
  const handleCheckBox = jest.fn();
  const { teacherCheckbox, studentCheckbox } = renderChoiceRole({
    handleCheckBox,
  });

  expect(teacherCheckbox).not.toBeChecked();
  expect(studentCheckbox).not.toBeChecked();
});

test("renders checkboxes with correct CSS classes", () => {
  const handleCheckBox = jest.fn();
  const { teacherCheckbox, studentCheckbox } = renderChoiceRole({
    handleCheckBox,
  });

  expect(teacherCheckbox.parentElement).toHaveClass(checkBoxContainerClasses);
  expect(studentCheckbox.parentElement).toHaveClass(checkBoxContainerClasses);
});
