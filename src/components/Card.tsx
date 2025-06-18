import React from 'react';
import { motion } from "framer-motion";

// Main App component
const Card = (props) => {
    // Destructure cardSize from props, with a default of 'medium'
    const { cardSize = 300 } = props;


    // Define an inline style object to apply the dynamic max-width
    const cardStyle = {
        maxWidth: `${cardSize}px`,
    };

    return (
        <div className="app-container">
            {/* Styles are defined here to mimic a separate CSS file */}
            <style>
                {`
          /* Universal box-sizing for consistent layout */
          *, *::before, *::after {
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f0f0f0; /* Light gray background */
            padding: 20px; /* Add some overall padding for smaller screens */
          }

          .app-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            /* No direct padding here, handled by body and card */
          }

          .polaroid-card {
            background-color: #fff;
            border-radius: 16px; /* Slightly more rounded corners for the card */
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15); /* More pronounced, softer shadow */
            padding: 25px; /* Generous inner padding for the white frame effect */
            width: 100%; /* Make it responsive */
            text-align: left;
            overflow: hidden; /* Ensure rounded corners clip content */
          }

          .image-container {
            width: 100%;
            padding-top: 100%; /* 1:1 Aspect Ratio (creates a square) */
            position: relative;
            background-color: #e0e0e0; /* Gray background for placeholder */
            border-radius: 10px; /* Slightly more rounded corners for the image area */
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px; /* Increased space below image to match visual */
            overflow: hidden; /* Ensure rounded corners clip content */
            /* Subtle inner shadow for definition, mimicking the image */
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
          }

          .image-placeholder {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #b0b0b0; /* Light gray for icon */
          }

          .image-placeholder svg {
            width: 60px;
            height: 60px;
          }

          .text-content h3 {
            font-size: 1.3em; /* Larger title */
            font-weight: 700; /* Bolder */
            margin: 0 0 8px 0; /* Adjusted margin */
            color: #333;
          }

          .text-content .price {
            font-size: 1.2em; /* Prominent price */
            font-weight: 700;
            margin: 0 0 12px 0; /* Adjusted margin */
            color: #222;
          }

          .text-content p {
            font-size: 0.95em; /* Slightly smaller body text */
            margin: 0; /* Remove default margin */
            color: #555;
            line-height: 1.4; /* Improve readability */
          }

          /* Responsive adjustments */
          @media (max-width: 600px) {
            .polaroid-card {
              max-width: 90%; /* Smaller max-width on smaller screens */
              padding: 20px; /* Adjust padding for smaller screens */
              border-radius: 12px;
            }
            .image-container {
              margin-bottom: 15px; /* Adjust margin for smaller screens */
            }
            .text-content h3 {
              font-size: 1.2em;
              margin-bottom: 6px;
            }
            .text-content .price {
              font-size: 1.1em;
              margin-bottom: 10px;
            }
            .image-placeholder svg {
              width: 50px;
              height: 50px;
            }
          }
        `}
            </style>
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
                    <h3>Name</h3>
                    <span class="price">HP </span>
                    <span>51</span>
                    <br />
                    <span class="price">Attack </span>
                    <span>52</span>
                    <br />

                    <span class="price">Defence </span>
                    <span>53</span>

                    <br />
                    <span class="price">Speed </span>
                    <span>54</span>

                </div>
            </motion.div>
        </div>
    );
};

export default Card;