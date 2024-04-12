/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import TalentBar from "../../components/TalentBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_SPACE_TOKEN,
});

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
    youtubeurl,
    instagramurl,
    bio,
  } = talent.fields;

  return (
    <>
      <div className="talent-container-single">
        <div className="mobile-talent">
          <div className="mobile-image">
            <img src={`https://${url}`} alt={description} />
          </div>
          <h2>{title}</h2>
          <div
            className={
              youtubefollowers !== undefined || instagramfollowers !== undefined
                ? "socials"
                : "socials"
            }
          >
            {title === "Brain Leak" && (
              <a href={instagramurl} className="socials-spacing">
                <div className="social">
                  <FontAwesomeIcon icon={faSpotify} />
                </div>
              </a>
            )}
            {title === "Yokai" && (
              <a
                href={
                  "https://open.spotify.com/artist/5acEBp4nbqoEjROkF8nLj4?si=9QaLkKADRsK8u4fCJYja3w&nd=1"
                }
                className="socials-spacing"
                style={{ paddingLeft: "5vw" }}
              >
                <div className="social">
                  <FontAwesomeIcon icon={faSpotify} />
                </div>
              </a>
            )}
            {title === "Blowback" && (
              <a
                href={
                  "https://open.spotify.com/artist/5acEBp4nbqoEjROkF8nLj4?si=9QaLkKADRsK8u4fCJYja3w&nd=1"
                }
                className="socials-spacing listen"
              >
                Listen here
              </a>
            )}
            {instagramfollowers !== undefined &&
              title !== "Brain Leak" &&
              title !== "Yokai" && (
                <a href={instagramurl} className="socials-spacing">
                  <div className="social">
                    <FontAwesomeIcon icon={faInstagram} />
                  </div>
                  <p>{instagramfollowers}</p>
                </a>
              )}
            {youtubefollowers !== undefined &&
              title !== "Brain Leak" &&
              title !== "Yokai" && (
                <a href={youtubeurl}>
                  <div className="social">
                    <FontAwesomeIcon icon={faYoutube} />
                  </div>
                  <p>{youtubefollowers}</p>
                </a>
              )}
          </div>
          <p className="bio">{bio.content[0].content[0].value}</p>

          <Link href="/talent">
            <a className="back-to-gallery">
              <div className="boxes">
                <div>
                  <div className="box"></div>
                  <div className="box"></div>
                </div>
                <div>
                  <div className="box"></div>
                  <div className="box"></div>
                </div>
              </div>
              <a>BACK TO TALENT GALLERY</a>
            </a>
          </Link>
        </div>

        <div className="flex-container desktop-talent">
          <h2>{title}</h2>
          {/* <div className="mobile-image">
            <img src={`https://${url}`} alt={description} />
          </div> https://open.spotify.com/artist/5acEBp4nbqoEjROkF8nLj4?si=9QaLkKADRsK8u4fCJYja3w&nd=1 */}
          <div className="socials">
            {title === "Brain Leak" && (
              <a href={instagramurl} className="socials-spacing">
                <div className="social">
                  <FontAwesomeIcon icon={faSpotify} />
                </div>
              </a>
            )}
            {title === "Yokai" && (
              <a
                href={
                  "https://open.spotify.com/artist/5acEBp4nbqoEjROkF8nLj4?si=9QaLkKADRsK8u4fCJYja3w&nd=1"
                }
                className="socials-spacing"
              >
                <div className="social">
                  <FontAwesomeIcon icon={faSpotify} />
                </div>
              </a>
            )}
            {title === "Blowback" && (
              <a
                href={
                  "https://open.spotify.com/artist/5acEBp4nbqoEjROkF8nLj4?si=9QaLkKADRsK8u4fCJYja3w&nd=1"
                }
                className="socials-spacing listen"
              >
                Listen here
              </a>
            )}
            {instagramfollowers !== undefined && title !== "Brain Leak" && (
              <a href={instagramurl} className="socials-spacing">
                <div className="social">
                  <FontAwesomeIcon icon={faInstagram} />
                </div>
                <p>{instagramfollowers}</p>
              </a>
            )}
            {youtubefollowers !== undefined && title !== "Brain Leak" && (
              <a href={youtubeurl}>
                <div className="social">
                  <FontAwesomeIcon icon={faYoutube} />
                </div>
                <p>{youtubefollowers}</p>
              </a>
            )}
          </div>
          <p className="bio">{bio.content[0].content[0].value}</p>
        </div>
        <div
          className="talent-image"
          style={{
            backgroundImage: `url("https://${url}")`,
            backgroundPosition: "center",
            backgroundSize: "550px",
            width: "550px",
            height: "550px",
            clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <img src={`https://${url}`} alt={description} /> */}
          {/* <img className="overlay" src="../assets/overlay.png" alt="overlay for image" /> */}
        </div>
      </div>
      <TalentBar data={talentImages} />
    </>
  );
}

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
    revalidate: 10,
  };
}
