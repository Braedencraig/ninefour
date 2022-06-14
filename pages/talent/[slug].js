/* eslint-disable @next/next/no-img-element */
import React from "react";
import TalentBar from "../../components/TalentBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_SPACE_TOKEN,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "talent" });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "talent",
    "fields.slug": params.slug,
  });

  const talentImages = await client.getEntries({ content_type: "talent" });

  return {
    props: { talent: items[0], talentImages: talentImages.items },
  };
}

export default function TalentDetails({ talent, talentImages }) {
  const {
    title,
    image: {
      fields: {
        description,
        file: { url },
      },
    },
    instagramfollowers,
    youtubefollowers,
    bio,
  } = talent.fields;
  return (
    <>
      <div className="talent-container-single">
        <div className="flex-container">
          <h2>{title}</h2>
          <div className="socials">
            <div className="socials-spacing">
              <div className="social">
                <FontAwesomeIcon icon={faInstagram} />
              </div>
              <p>{instagramfollowers}</p>
            </div>
            <div>
              <div className="social">
                <FontAwesomeIcon icon={faYoutube} />
              </div>
              <p>{youtubefollowers}</p>
            </div>
          </div>
          <p className="bio">{bio.content[0].content[0].value}</p>
        </div>
        <img src={`https://${url}`} alt={description} />
        <img className="overlay" src="../assets/overlay.png" alt="overlay for image" />
      </div>
      <TalentBar data={talentImages} />
    </>
  );
}
