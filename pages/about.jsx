/* eslint-disable @next/next/no-img-element */
import React from "react";
import { createClient } from "contentful";
import background from "../public/assets/background.png";
import TeamMembers from "../components/TeamMembers";

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
    revalidate: 1,
  };
}

export default function About({ aboutInfo, teamMembers }) {
  const { title } = aboutInfo.items[0].fields;
  const metrics = [aboutInfo.items[0].fields.metric1, aboutInfo.items[0].fields.metric2, aboutInfo.items[0].fields.metric3];
  const { carousel } = aboutInfo.items[0].fields;
  const carouselArr = carousel.content[0].content[0].value.split(" ");

  return (
    <div className="about-container">
      <div className="about-banner">
        <img src={background.src} alt="overlay" />
        <h2 className="about-hero">{title.content[0].content[0].value}</h2>
      </div>
      <div className="metrics">
        {metrics.map((metric, i) => {
          const textArr = metric.split(" ");
          return (
            <div className="metric" key={i}>
              <span>{textArr[0]} </span>
              {textArr[1]} {textArr[2]}
            </div>
          );
        })}
      </div>
      <div className="scroll">
        <div className="m-scroll">
          <span>
            ━━━━━━━━{" "}
            {carouselArr.map((item, i) => {
              return <>{item.replace(",", " ━━━━━━━━").toUpperCase()}</>;
            })}
          </span>{" "}
          ━━━━━━━━
          <span>
            ━━━━━━━━{" "}
            {carouselArr.map((item, i) => {
              return <>{item.replace(",", " ━━━━━━━━").toUpperCase()}</>;
            })}
          </span>{" "}
          ━━━━━━━━
          <span>
            ━━━━━━━━{" "}
            {carouselArr.map((item, i) => {
              return <>{item.replace(",", " ━━━━━━━━").toUpperCase()}</>;
            })}
          </span>{" "}
          ━━━━━━━━
        </div>
      </div>
      <TeamMembers data={teamMembers.items} />
    </div>
  );
}
