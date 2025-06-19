import React from 'react';
import { motion } from "framer-motion";
import "../assets/css/card.css"

// Main App component
const Card = (props) => {
  // Destructure cardSize from props, with a default of 'medium'
  const { cardSize = 300 } = props;
  const {name="name"}=props;
  const {type="Attack"}=props;
  const {hp=51}=props;
  const {attack=52}=props;
  const {defence=53}=props;
  const {speed=54}=props;


  // Define an inline style object to apply the dynamic max-width
  const cardStyle = {
    maxWidth: `${cardSize}px`,
  };

  return (
    <div className="app-container">
      <motion.div
        whileHover={{ y: -10 }}
        className="polaroid-card" style={cardStyle}>
        <div className="image-container">
          {/* Placeholder SVG for the image */}
          <div className="image-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15 12V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM2 5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2zm3.5-3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.496 7.422a.5.5 0 0 0-.8-.11l-3.23 2.923L2.5 7.644a.5.5 0 0 0-.646.002L.892 9.02a.5.5 0 0 0-.002.646L4 13.5l1.646-1.492a.5.5 0 0 0 .646-.002l3.23-2.923L13.108 14a.5.5 0 0 0 .798-.11l1.5-3a.5.5 0 0 0-.8-.11L13 9.422l-3.504-2.113z" />
            </svg>
          </div>
        </div>
        <div className="text-content">
          <span class="price">{name}</span>
          <br />
          <span class="price">Type : </span>
          <span>{type}</span>
          <br />
          <span class="status">HP </span>
          <span>{hp}</span>
          <br />
          <span class="status">Attack </span>
          <span>{attack}</span>
          <br />

          <span class="status">Defence </span>
          <span>{defence}</span>

          <br />
          <span class="status">Speed </span>
          <span>{speed}</span>

        </div>
      </motion.div>
    </div>
  );
};

export default Card;