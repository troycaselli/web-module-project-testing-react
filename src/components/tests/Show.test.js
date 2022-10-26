import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event';

const exampleShow = {
    name: 'Teletubbies',
    summary: 'Silly creatures with televisions embedded in their bellies prance around.',
    seasons: [
        {id: 0, name: 'season 1', episodes: []},
        {id: 1, name: 'season 2', episodes: []},
        {id: 2, name: 'season 3', episodes: []},
    ]
}

test('renders without errors', () => { 
    render(<Show show={exampleShow} selectedSeason='none' />);
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} selectedSeason='none' />);
    const loading = screen.getByTestId('loading-container');
    expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={exampleShow} selectedSeason='none' />);
    const seasonOptions = screen.getAllByTestId('season-option');
    expect(seasonOptions).toHaveLength(3);

});

test('handleSelect is called when a season is selected', () => { 
    const handleSelect = jest.fn();
    render(<Show show={exampleShow} selectedSeason={'none'} handleSelect={handleSelect} />)
    const select = screen.getByLabelText(/Select A Season/i);
    expect(select).toBeInTheDocument();
    
    fireEvent.change(select, { target: { value: 1 } });
    const options = screen.getAllByTestId('season-option');
    expect(options).toHaveLength(3);
    expect(options[1].selected).toBeTruthy();

    expect(handleSelect).toHaveBeenCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const {rerender} = render(<Show show={exampleShow} selectedSeason={'none'} />);
    let episodeWrapper = screen.queryByTestId(/episodes-container/i);
    expect(episodeWrapper).not.toBeInTheDocument();

    rerender(<Show show={exampleShow} selectedSeason={'1'} />);
    episodeWrapper = screen.queryByTestId(/episodes-container/i);
    expect(episodeWrapper).toBeInTheDocument();
});

// - [ ] Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.