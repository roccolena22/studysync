import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ExternalLink from '../ExternalLink';

describe('ExternalLink Component', () => {
  test("renders link with correct text", () => {
    const linkText = "www.test.com";
    const { getByText } = render(<ExternalLink link={linkText} />);
    const linkElement = getByText(linkText);

    expect(linkElement).toBeInTheDocument();
  });

  test("renders link with truncated text when 'paste' is true", () => {
    const longLinkText = "www.thisisaverylonglink.com";
    const { getByText } = render(<ExternalLink link={longLinkText} paste={true} />);
    const truncatedLink = getByText(/^www\.thisisav/); // Verifica che il link sia troncato correttamente.

    expect(truncatedLink).toBeInTheDocument();
  });

  test("renders link without truncation when 'paste' is false", () => {
    const longLinkText = "www.thisisaverylonglink.com";
    const { getByText } = render(<ExternalLink link={longLinkText} paste={false} />);
    const fullLink = getByText(longLinkText);

    expect(fullLink).toBeInTheDocument();
  });

  test("renders link with correct 'href' attribute", () => {
    const linkText = "www.test.com";
    const { getByText } = render(<ExternalLink link={linkText} />);
    const linkElement = getByText(linkText);

    // Verifica che il link abbia l'attributo 'href' corretto.
    expect(linkElement).toHaveAttribute('href', linkText);
  });

  // Aggiungi altri test se necessario per coprire altre funzionalità del componente.
});
