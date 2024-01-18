import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppName from "../AppName";

describe("AppName Component", () => {
  // Definisci il primo test: 'renders AppName component with provided name'.
  test("renders AppName component with provided name", () => {
    // Definisci il testo del nome dell'app.
    const appNameText = "My App";

    // Rendi il componente AppName con il nome specificato.
    render(<AppName name={appNameText} />);

    // Seleziona l'elemento del testo del nome dell'app dallo schermo.
    const appNameElement = screen.getByText(appNameText);

    // Verifica che l'elemento del testo del nome dell'app sia presente nella pagina.
    expect(appNameElement).toBeInTheDocument();
  });

  // Definisci il secondo test: 'renders AppName component with white theme'.
  test("renders AppName component with white theme", () => {
    // Definisci il testo del nome dell'app.
    const appNameText = "My App";

    // Abilita il tema bianco.
    const whiteTheme = true;

    // Rendi il componente AppName con il nome specificato e il tema bianco.
    render(<AppName name={appNameText} white={whiteTheme} />);

    // Seleziona l'elemento del testo del nome dell'app dallo schermo.
    const whiteTextElement = screen.getByText(appNameText);

    // Verifica che l'elemento del testo del nome dell'app abbia la classe 'text-white'.
    expect(whiteTextElement).toHaveClass("text-white");
  });
});
