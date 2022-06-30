/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { createClient } from "contentful";
import chevron from "../public/assets/chevron.png";
import styled from "styled-components";
import { Controller, Scene } from "react-scrollmagic";
// import { Controls, PlayState, Tween } from "react-gsap";
import { gsap } from "gsap";

import { Tween } from "react-gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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

export default function Brands({ copy, brand }) {
  const BrandItem = ({ data }) => {
    const { title, info, image } = data;
    return (
      <div className="brand-flex">
        <div className="brand-flex-left">
          <div className="circle pulse add-pulse"></div>
          <img className="margin-help" src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />

          <img className="secret" src={chevron.src} alt="" />
          <img className="secret" src={chevron.src} alt="" />
          <img className="secret" src={chevron.src} alt="" />
          {/* <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" /> */}
        </div>
        <div className="brand-flex-right">
          <div key={title}>
            <img src={`https://${image.fields.file.url}`} alt={title} />
            {/* <Image src={`https://${image.fields.file.url}`} width={image.fields.file.details.image.width} height={image.fields.file.details.image.height} alt={title} /> */}
            <p>{info}</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="brands">
      <h3>{copy.items[0].fields.description}</h3>
      <div className="brands-info">
        <div className="brands-list">
          {brand.items.map((item) => {
            return <BrandItem key={item.title} data={item.fields} />;
            // const { title, info, image } = item.fields;
            // return brandItem(title, info, image);
            // <div key={title}>
            //   <Image src={`https://${image.fields.file.url}`} width={image.fields.file.details.image.width} height={image.fields.file.details.image.height} alt={title} />
            //   <p>{info}</p>
            // </div>
          })}
        </div>
        {/* <div className="decorative">
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
        </div> */}
        {/* <div className="brands-list">
          {brand.items.map((item) => {
            const { title, info, image } = item.fields;
            return (
              <div key={title}>
                <Image src={`https://${image.fields.file.url}`} width={image.fields.file.details.image.width} height={image.fields.file.details.image.height} alt={title} />
                <p>{info}</p>
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
    // <Tween
    //   to={{
    //     x: "300px",
    //     scrollTrigger: {
    //       trigger: ".square",
    //       start: "100px center",
    //       end: "1000px center",
    //       scrub: 0.5,
    //       markers: true,
    //     },
    //   }}
    // >
    //   <div className="square" style={{ width: "100px", height: "100px", background: "#ccc" }} />
    // </Tween>
    // <ClassToggleStyled>
    //   <div className="section" />
    //   <div id="trigger" />
    //   <Controller>
    //     <Scene duration={200} classToggle="add-pulse" triggerElement="#trigger" indicators={true}>
    //       {(progress, event) => <div className="pulse add-pulse"></div>}
    //     </Scene>
    //   </Controller>
    //   <div className="section" />
    // </ClassToggleStyled>
  );
}
