import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";
import { UserContext } from "../Context/UserContext";
import { MemoryRouter } from "react-router-dom";
jest.mock("axios", () => ({
  create: () => ({
    get: jest.fn(),
    post: jest.fn(),
  }),
}));
// Mock Heart component (so it doesn’t cause side effects)
jest.mock("./Heart", () => () => <div />);
// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

test("renders movie poster, title, and correct stars", () => {
  const movie = {
    id: 1,
    title: "Inception",
    poster_path: "/poster.jpg",
    vote_average: 8.0,
  };

  const setSelectedMovie = jest.fn();

  render(
    <MemoryRouter>
      <UserContext.Provider value={{ setSelectedMovie }}>
        <MovieCard movie={movie} />
      </UserContext.Provider>
    </MemoryRouter>
  );

  // Select poster using alt text
  const poster = screen.getByAltText("Inception");
  expect(poster).toHaveAttribute(
    "src",
    "https://image.tmdb.org/t/p/original/poster.jpg"
  );

  // Select title using text
  const title = screen.getByText("Inception");
  expect(title).toBeInTheDocument();

  // Count filled stars (those with className 'star filled')
  const filledStars = document.querySelectorAll(".star.filled");
  expect(filledStars.length).toBe(4);
});

test("clicking movie card sets selected movie and navigates", () => {
  const movie = {
    id: 1,
    title: "Inception",
    poster_path: "/poster.jpg",
    vote_average: 8.0,
  };

  const setSelectedMovie = jest.fn();

  render(
    <MemoryRouter>
      <UserContext.Provider value={{ setSelectedMovie }}>
        <MovieCard movie={movie} />
      </UserContext.Provider>
    </MemoryRouter>
  );

  // Find the clickable card (parent div of the title)
  const card = screen.getByText("Inception").closest(".movie-card");
  fireEvent.click(card);

  expect(setSelectedMovie).toHaveBeenCalledWith(movie);
  expect(mockNavigate).toHaveBeenCalledWith("/movie/1");
});
