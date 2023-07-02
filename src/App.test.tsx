import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Api from './api';

export const MOCK_SHIPS: Starship[] = [
  {
    name: 'The Test Star',
    manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
    passengers: '843342',
    hyperdrive_rating: '4.0',
    comments: '',    
  }
]

const setup = async (response?: Partial<SWAPIResponse>) => { 
  jest.spyOn(Api, 'request').mockResolvedValue({
    next: 'https://www.fakeurl.com/',
    previous: 'https://www.fakeurl.com/',
    results: MOCK_SHIPS,
    ...response,
  })
  render(<App />, { wrapper: BrowserRouter });
  await waitForElementToBeRemoved(screen.queryByAltText('Loading...'));
}

describe('The app', () => {
  test('renders Star Wars Starships and their data', async () => {
    await setup();
    const mockShip = MOCK_SHIPS[0];
    expect(screen.getByText(mockShip.name)).toBeInTheDocument();   
    expect(screen.getByText(mockShip.manufacturer)).toBeInTheDocument();   
    expect(screen.getByText(`Passengers: ${mockShip.passengers}`)).toBeInTheDocument();
    expect(screen.queryAllByAltText('Star')).toHaveLength(4);
  });

  test('should show an empty message when there are no ships', async () => {
    await setup({
      results: []
    });
    expect(screen.getByTestId('no-results')).toBeInTheDocument();
  });

  test('renders previous/next buttons', async () => {
    await setup();
    expect(screen.getByText("Previous page")).toBeInTheDocument();
    expect(screen.getByText("Next page")).toBeInTheDocument();
  })
  test('prev/next buttons are disabled if they are null', async () => {
    await setup({
      next: null,
      previous: null
    });
    expect(screen.getByText("Previous page")).toBeDisabled()
    expect(screen.getByText("Next page")).toBeDisabled()
  })
});