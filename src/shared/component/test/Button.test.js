import "@testing-library/jest-dom"; 
import { render, fireEvent } from "@testing-library/react"; 
import Button from "../Button"; 

describe("Button Component", () => {
  // Testa se il bottone viene renderizzato con il testo corretto.
  test("renders button with correct text", () => {
    // Rende il componente Button con un certo testo.
    const { getByText } = render(<Button name="Click Me" />);
    // Cerca un elemento con il testo "Click Me" (ignorando maiuscole/minuscole).
    const buttonElement = getByText(/Click Me/i);
    // Assicura che l'elemento del bottone sia presente nel DOM.
    expect(buttonElement).toBeInTheDocument();
  });

  // Testa se la prop onClick viene chiamata quando il bottone viene cliccato.
  test("calls onClick prop when clicked", () => {
    // Crea una funzione mock per simulare la prop onClick.
    const onClickMock = jest.fn();
    // Rende il componente Button con un certo testo e la funzione onClick mockata.
    const { getByText } = render(
      <Button name="Click Me" onClick={onClickMock} />
    );
    // Cerca un elemento con il testo "Click Me" (ignorando maiuscole/minuscole).
    const buttonElement = getByText(/Click Me/i);

    // Simula un clic sul bottone utilizzando la funzione fireEvent.
    fireEvent.click(buttonElement);

    // Assicura che la funzione onClick mockata sia stata chiamata esattamente una volta.
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
