/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "contentful";
import chevron from "../public/assets/chevron.png";
import styled from "styled-components";
import { Controller, Scene } from "react-scrollmagic";
// import { Controls, PlayState, Tween } from "react-gsap";
import { gsap } from "gsap";
import "animate.css/animate.min.css";

import { Tween } from "react-gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Brands({ copy, brand }) {
  const BrandItem = ({ data, idx }) => {
    const { title, info, image } = data;


    return (
      <div className="brand-flex" >
        <div className="brand-flex-left">
          <>
            <div id="trigger" />
            <div className="section" />
            <Controller>
              {/* <Scene duration={210} offset={idx === 0 ? 0 : idx * 210} classToggle="add-pulse" triggerElement="#trigger">
                {(progress, event) => <div className="pulse circle"></div>}
              </Scene> */}
               <Scene duration={210}>
                {(progress, event) => <div className="pulse circle"></div>}
              </Scene>
            </Controller>
          </>
          <img className="margin-help" src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />
          <img src={chevron.src} alt="" />

          {/* <img className="secret" src={chevron.src} alt="" />
          <img className="secret" src={chevron.src} alt="" />
          <img className="secret" src={chevron.src} alt="" /> */}
        </div>
        <div className="brand-flex-right">
          <div key={title}>
            <img src={`https://${image.fields.file.url}`} alt={title} />
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
          {brand.items.map((item, i) => {
            return <BrandItem idx={i} key={`${item.title}-${i}`} data={item.fields} />;
          })}
        </div>
      </div>
    </div>
  );
}

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
    revalidate: 10,
  };
}
