import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App.jsx', () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );

    it('renders the home page', () => {
        const elementToView = screen.queryByText('More Art');

        expect(elementToView).toBeDefined();
    })

    it('has initial data populated in the <ArtCard />', () => {
        const elementToView = screen.queryByText('Candlestick');

        expect(elementToView).toBeDefined();
    })

    it('replaces the initial data on button click', async () => {
        const elementToView = screen.queryByText('Candlestick');

        const user = userEvent.setup();

        const button = screen.queryByText('More Art');

        await user.click(button);

        expect(elementToView).toBeNull();
    })

    it('successfully redirects upon interaction with the nav bar', async () => {
        const elementToView = screen.queryByText('Candlestick');

        const user = userEvent.setup();
        
        const navBarButton = screen.queryByText('Favorites');

        await user.click(navBarButton);

        expect(elementToView).toBeNull();
    });
});