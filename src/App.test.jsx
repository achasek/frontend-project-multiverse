import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App.jsx', () => {
    render(<App />);

    it('renders the home page', () => {
        const elementToView = screen.queryByText('More Art');

        expect(elementToView).toBeDefined();
    })

    it('has initial data populated in the <ArtCard />', () => {
        const elementToView = screen.queryByText('Two-and-a-Half Dollar Coin');

        expect(elementToView).toBeDefined();
    })

    it('replaces the initial data on button click', async () => {
        const elementToView = screen.queryByText('Two-and-a-Half Dollar Coin');

        const user = userEvent.setup();

        const button = screen.queryByText('More Art');

        await user.click(button);

        expect(elementToView).toBeNull();
    })
});