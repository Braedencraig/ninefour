import React from "react";

export default function WorkWithUs({ copy }) {
  return (
    <div className="work-with-us">
      <h4>{copy.title}</h4>
      <a href="mailto:webmaster@example.com">
        <div>{copy.ctaText}</div>
      </a>
    </div>
  );
}
