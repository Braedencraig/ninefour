/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { createClient } from "contentful";
import chevron from "../public/assets/chevron.png";
import styled from "styled-components";
import { Controller, Scene } from "react-scrollmagic";
import { Controls, PlayState, Tween } from "react-gsap";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_SPACE_TOKEN,
  });

  const copy = await client.getEntries({ content_type: "brandsPage" });
  const brand = await client.getEntries({ content_type: "brand" });

  return {
    props: {
      copy,
      brand,
    },
    revalidate: 1,
  };
}

const ClassToggleStyled = styled.div`
  .section {
    height: 100vh;
  }
`;

// <div className="brands">

{
  /* <h3>{copy.items[0].fields.description}</h3>
      <div className="brands-info">
        <div className="decorative">
          <div className="circle"></div>
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <div className="circle-new"></div>
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <div className="circle-new"></div>
        </div>
        <div className="brands-list">
          {brand.items.map((item) => {
            const { title, info, image } = item.fields;
            return (
              <div key={title}>
                <Image src={`https://${image.fields.file.url}`} width={image.fields.file.details.image.width} height={image.fields.file.details.image.height} alt={title} />
                <p>{info}</p>
              </div>
            );
          })}
        </div>
      </div> */
}
// </div>

export default function Brands({ copy, brand }) {
  return (
    // <ClassToggleStyled>
    //   <div className="section" />
    //   <div id="trigger" />
    //   <Controller>
    //     <Scene duration={200} classToggle="add-pulse" triggerElement="#trigger" indicators={true}>
    //       {(progress, event) => <div className="pulse"></div>}
    //     </Scene>
    //   </Controller>
    //   <div className="section" />
    // </ClassToggleStyled>
    <Controls playState={PlayState.stop}>
      <Tween to={{ x: "200px", rotation: 180 }} duration={2} ease="back.out(1.7)">
        <div style={{ width: "100px", height: "100px", background: "#ccc" }} />
      </Tween>
    </Controls>
  );
}
