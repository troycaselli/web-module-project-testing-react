import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Episode from "./../Episode";

// ----- EXAMPLE EPISODE TEST OBJECT -----
const exampleEpisodeData = {
  airdate: "2016-07-15",
  airstamp: "2016-07-15T12:00:00+00:00",
  airtime: "",
  id: 553946,
  image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
  name: "Chapter One: The Vanishing of Will Byers",
  number: 1,
  rating: { average: 8.2 },
  runtime: 49,
  season: 1,
  summary:
    "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
  type: "regular",
  url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
};

const exampleEpisodeDataMissingImage = {
    airdate: "2016-07-15",
    airstamp: "2016-07-15T12:00:00+00:00",
    airtime: "",
    id: 553947,
    image: null,
    name: "Chapter One: The Vanishing of Will Byers",
    number: 1,
    rating: { average: 8.2 },
    runtime: 49,
    season: 1,
    summary:
      "A young boy mysteriously disappears.",
    type: "regular",
    url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
  };


test("renders without error", () => {
    render(<Episode key={exampleEpisodeData.id} episode={exampleEpisodeData} />);
});

test("renders the summary test passed as prop", () => {
    render(<Episode key={exampleEpisodeData.id} episode={exampleEpisodeData} />);
    const summary = screen.getAllByText(/A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest./i);
    expect(summary).not.toBeNull();
    expect(summary).toHaveLength(1);
    expect(summary).toBeTruthy();
});

test("renders default image when image is not defined", () => {
    render(<Episode key={exampleEpisodeDataMissingImage.id} episode={exampleEpisodeDataMissingImage} />);
    const image = screen.getByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');
    expect(image).toBeTruthy();
});