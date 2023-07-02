import { render, screen } from "@testing-library/react"
import Favorites from "./Favorites"
import React from "react"
import { MOCK_SHIPS } from "../App.test";

const setup = () => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    favorites: MOCK_SHIPS,
    comments: {},
    setComments: jest.fn()
  });
  render(<Favorites />)
}

describe("Favorites", () => {
  test('should show favorites if they have been added', () => {
    setup();
    const mockShip = MOCK_SHIPS[0];
    expect(screen.getByText(mockShip.name)).toBeInTheDocument();   
    expect(screen.getByText(mockShip.manufacturer)).toBeInTheDocument();   
    expect(screen.getByText(`Passengers: ${mockShip.passengers}`)).toBeInTheDocument();
    expect(screen.queryAllByAltText('Star')).toHaveLength(4);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  })
})