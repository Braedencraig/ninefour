/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from "next/head";
import Image from "next/image";
import HeadInfo from "../components/HeadInfo";
import { createClient } from "contentful";
import logo from "../public/assets/logo.png";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_SPACE_TOKEN,
  });

  const homepage = await client.getEntries({ content_type: "homepage" });

  return {
    props: {
      homepage: homepage.items,
    },
    revalidate: 1,
  };
}

export default function Home({ homepage }) {
  const { fields } = homepage[0];
  const titleText = fields.title.split(" ");

  return (
    <div className="full-screen-video-container">
      <HeadInfo />
      <video autoPlay loop muted playsinline>
        <source src="http://www.w3schools.com/html/mov_bbb.mp4" />
        <source src="http://www.w3schools.com/html/mov_bbb.webm" onError="fallback(parentNode)" />
        <img src="http://www.w3schools.com/html/mov_bbb.gif" />
      </video>
      {/* <video autoPlay loop muted playsinline>
        <source src={`https://${fields.video.fields.file.url}`} type="video/mp4" />
      </video> */}
      {/* <video autoPlay loop muted>
        <source src="../assets/background.mp4" type="video/mp4" />
      </video> */}
      <div className="heroText">
        <h1>{fields.title}</h1>
        <h2>
          <span>{titleText[0]}</span>
          <span className="heroImgSpan">
            <Image src={logo} alt="Nine Four entertainment logo" />
          </span>
          <span>{titleText[1]}</span>
        </h2>
        <h3>{fields.description}</h3>
      </div>
    </div>
  );
}
