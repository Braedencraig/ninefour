/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { createClient } from "contentful";
// import background from "../public/assets/background.png";
import TeamMembers from "../components/TeamMembers";
import { useInViewport } from "react-in-viewport";

import NumberCounter from "number-counter";

export default function About({ aboutInfo, teamMembers }) {

  const teamMembersObj = [
    {
      name: 'David Rosemon',
      bio: 'Rosemon, 28, has worked in the creator economy for over five years. He previously represented talent for industry-leading agencies including Fullscreen, UTA, Select and Jellysmack. He also ran his own boutique talent management company RAM, where he represented both digital and traditional talent. Based in LA, he currently serves as talent manager and COO at Nine Four.',
      image: '../assets/david.jpg'
    },
    {
      name: 'Parker Oks',
      bio: 'Oks, 29, launched Nine Four Entertainment in 2022, working with content creators on talent management and business development. He serves as CEO of the company. He has been in the creator and entertainment industry for over six years. Based in Las Vegas, his previous experience includes working with actors and creators at Brillstein Entertainment Partners and Daylight Holdings.',
      image: '../assets/oks.jpg'
    },
    {
      name: 'Colleen Rowbottom',
      bio: 'Rowbottom, 27, has worked in various sectors of entertainment with a focus on Music for the past 6 years. Coming from WME, she now serves as Talent Coordinator at Nine Four, where she assists with a wide range of management duties for some of the most exciting creators in the digital world.',
      image: '../assets/colleen.jpg'
    }
  ]




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
      <div className="text" style={{marginTop: 0, paddingTop: 0}}>We believe Creators are the new Founders. Our goal as talent managers is not just to build personalities, but to build creators into real business owners. We’re proud to have been able to launch some of the fastest growing creator driven brands in the industry!</div>
        {/* <div className="m-scroll">
          <span>
            {" "}
            ━━━━━━━━{" "}
            {carouselArr.map((item, i) => {
              return <>{item.replace(",", " ━━━━━━━━ ").toUpperCase()}</>;
            })}
          </span>
        </div> */}
      </div>
      <div className="about-banner">
        <h2 className="about-hero">The Team</h2>
      </div>
      <TeamMembers />
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
