import React from "react";

import { Container } from "./styles";

function SidePanel() {
  return (
    <Container>
      <ul className="Root">
        <li>Global</li>
        <ul className="Country">
          <li>Brazil</li>
          <ul className="Region">
            <li>São Paulo</li>
            <ul className="Venue">
              <li>Airport XYZ</li>
              <ul className="Building">
                <li>Terminal 1</li>
                <ul className="Floor">
                  <li>First Floor</li>
                  <li>Second Floor</li>
                  <li>Third Floor</li>
                </ul>
              </ul>
            </ul>
          </ul>
        </ul>
      </ul>
    </Container>
  );
}

export default SidePanel;
