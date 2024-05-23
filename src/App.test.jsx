import { render, screen } from '@testing-library/react'
import App from './App';

describe('App.jsx', () => {
    render(<App />);

    const elementToView = screen.getByText('More Art');

    it('renders the home page', () => {
        expect(elementToView).toBeDefined();
    })
});