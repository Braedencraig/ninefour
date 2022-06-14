import React from "react";

export default function WorkWithUs({ copy }) {
  return (
    <a className="work-with-us" href="mailto:webmaster@example.com">
      <h4>{copy.title}</h4>
      <div>{copy.ctaText}</div>
    </a>
  );
}
