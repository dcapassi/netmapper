import React from "react";

import { Container } from "./styles";

function SidePanel() {
  return (
    <Container>
      <ul className="Venue">
        <li>Venue 1</li>
        <ul className="Area">
          <li>Area 1</li>
          <li>Area 2</li>
          <li>Area 3</li>
        </ul>
      </ul>
    </Container>
  );
}

export default SidePanel;
