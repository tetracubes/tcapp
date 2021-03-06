import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter } from "react-router-dom";

import NotAuthorisedContent from "./NotAuthorisedContent";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <NotAuthorisedContent />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
