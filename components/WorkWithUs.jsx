import React, { useEffect } from "react";
import MagneticButton from "./MagneticButton";

export default function WorkWithUs({ copy }) {
  return (
    <div className="work-with-us">
      <h4>{copy.title}</h4>
      <a href="mailto:webmaster@example.com">
        <MagneticButton
          className="button-2"
          style={{ backgroundColor: "transparent" }}
          scale={2}
          tollerance={0.8}
          speed={0.3}
          borderRadius="50%"
          onClick={() => {
            console.log("click");
          }}
        >
          <MagneticButton
            className="button-1"
            scale={4}
            tollerance={1}
            speed={0.5}
            borderRadius="50%"
            onClick={() => {
              console.log("click");
            }}
          >
            {copy.ctaText}
          </MagneticButton>
        </MagneticButton>
      </a>
    </div>
  );
}
