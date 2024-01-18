import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Icon from '../Icon';

describe('Icon Component', () => {
  test('renders the correct icon based on the provided name', () => {
    const { container } = render(<Icon name="search" />);
    const iconElement = container.firstChild;
    
    // Verifica che l'elemento icona sia presente nel DOM.
    expect(iconElement).toBeInTheDocument();
    // Aggiungi altri test specifici all'elemento icona se necessario.
  });

  test('calls onClick prop when the icon is clicked', () => {
    const onClickMock = jest.fn();
    const { container } = render(<Icon name="search" onClick={onClickMock} />);
    const iconElement = container.firstChild;

    // Simula un clic sull'icona utilizzando la funzione fireEvent.
    fireEvent.click(iconElement);

    // Assicura che la funzione onClick mockata sia stata chiamata esattamente una volta.
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('applies the specified color class to the icon', () => {
    const { container } = render(<Icon name="search" color="red" />);
    const iconElement = container.firstChild;

    // Verifica che l'elemento icona abbia la classe colore specificata.
    expect(iconElement).toHaveClass('text-red');
  });

  test('applies additional styles to the icon', () => {
    const { container } = render(<Icon name="search" style="additional-styles" />);
    const iconElement = container.firstChild;

    // Verifica che l'elemento icona abbia la classe di stile aggiuntiva specificata.
    expect(iconElement).toHaveClass('additional-styles');
  });

  test('does not apply a color class if color prop is not provided', () => {
    const { container } = render(<Icon name="search" />);
    const iconElement = container.firstChild;

    // Verifica che l'elemento icona abbia la classe predefinita quando la prop color non è fornita.
    expect(iconElement).toHaveClass('text-cyan-700');
  });

  // Aggiungi altri test per scenari specifici o altre icone se necessario.
});
