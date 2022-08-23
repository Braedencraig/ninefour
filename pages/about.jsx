/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { createClient } from "contentful";
// import background from "../public/assets/background.png";
import TeamMembers from "../components/TeamMembers";
import { useInViewport } from "react-in-viewport";

import NumberCounter from "number-counter";

export default function About({ aboutInfo, teamMembers }) {
  const { title } = aboutInfo.items[0].fields;
  const metrics = [aboutInfo.items[0].fields.metric1, aboutInfo.items[0].fields.metric2, aboutInfo.items[0].fields.metric3];
  const { carousel } = aboutInfo.items[0].fields;
  const carouselArr = carousel.content[0].content[0].value.split(" ");
  carouselArr.map((word, i) => {
    if (word === "Talent,") {
      carouselArr[i] = "Talent Management";
    }
  });

  const myRef = useRef();
  const { inViewport, enterCount, leaveCount } = useInViewport(myRef);

  return (
    <div className="about-container">
      <div className="about-banner">
        <h2 className="about-hero">{title.content[0].content[0].value}</h2>
      </div>
      <div className="text">
        Nine Four is founded on the idea that creators are the new founders. We exist and are driven by a roster of some of the most talented and ambitious creators in the world.
      </div>
      <div className="metrics">
        {metrics.map((metric, i) => {
          if (metric !== undefined) {
            const textArr = metric.split(" ");
            if (i === 0) {
              return (
                <div className="metric" key={i}>
                  <span>
                    <NumberCounter end={Number(textArr[0])} delay={2} className="increment" />
                  </span>
                  <div ref={myRef}>
                    <p>
                      {textArr[1]} {textArr[2]}
                    </p>
                    <p>
                      {textArr[3]} {textArr[4]}
                    </p>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="metric" key={i}>
                  <span>
                    <NumberCounter end={Number(textArr[0])} delay={2} className="increment" />
                  </span>
                  <p>
                    {textArr[1]} {textArr[2]}
                  </p>
                  <p>
                    {textArr[3]} {textArr[4]}
                  </p>
                </div>
              );
            }
          }
        })}
      </div>
      <div className="scroll">
        <div className="m-scroll">
          <span>
            {" "}
            ━━━━━━━━{" "}
            {carouselArr.map((item, i) => {
              return <>{item.replace(",", " ━━━━━━━━ ").toUpperCase()}</>;
            })}
          </span>
        </div>
      </div>
      {/* <TeamMembers data={teamMembers.items} /> */}
    </div>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_SPACE_TOKEN,
  });

  const aboutInfo = await client.getEntries({ content_type: "about" });
  const teamMembers = await client.getEntries({ content_type: "teamMember" });

  return {
    props: {
      aboutInfo,
      teamMembers,
    },
    revalidate: 10,
  };
}
