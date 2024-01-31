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
  
    // Verifica che gli elementi della tua componente siano presenti
    const teacherCheckbox = screen.getByLabelText("Teacher");
    const studentCheckbox = screen.getByLabelText("Student");
  
    expect(teacherCheckbox).toBeInTheDocument();
    expect(studentCheckbox).toBeInTheDocument();
  
    // Verifica che le checkbox abbiano i valori corretti
    expect(teacherCheckbox).toBeChecked();
    expect(studentCheckbox).not.toBeChecked();

  });