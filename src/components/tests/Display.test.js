import React from 'react';
import { render, fireEvent, screen, waitFor, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import MockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

const exampleShow = {
    name: 'Teletubbies',
    summary: 'Silly creatures with televisions embedded in their bellies prance around.',
    seasons: [
        {id: 0, name: 'season 1', episodes: []},
        {id: 1, name: 'season 2', episodes: []},
        {id: 2, name: 'season 3', episodes: []},
    ]
}

test('renders without errors with no props', () => { 
    render(<Display />);
});

test('renders Show component when the button is clicked ', async () => { 
    MockFetchShow.mockResolvedValueOnce(exampleShow);
    render(<Display />);

    const revealButton = screen.queryByText(/Press to Get Show Data/i);
    let showWrapper = screen.queryByTestId(/show-container/i);
    expect(revealButton).toBeInTheDocument();
    expect(showWrapper).not.toBeInTheDocument();

    fireEvent.click(revealButton);
    await waitFor(() => {
        showWrapper = screen.queryByTestId(/show-container/i);
        expect(showWrapper).toBeInTheDocument();
    })
});

test('renders show season options matching your data when the button is clicked', async () => { 
    MockFetchShow.mockResolvedValueOnce(exampleShow);
    const displayFunc = jest.fn();
    render(<Display displayFunc={displayFunc} />);

    const revealButton = screen.getByText(/Press to Get Show Data/i);
    fireEvent.click(revealButton);

    await waitFor(() => {
        const seasons = screen.getAllByTestId(/season-option/i);
        expect(seasons).toHaveLength(3);
        expect(displayFunc).toHaveBeenCalled();
    });
});
