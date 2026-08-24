import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import TalentBar from "../../components/TalentBar";
import contentfulImageLoader from "../../components/contentfulImageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faSpotify,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_SPACE_TOKEN,
});

export default function TalentDetails({ talent, talentImages }) {
  const {
    slug,
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

  const imageUrl = url.startsWith("//") ? `https:${url}` : url;
  const biography = bio?.content?.[0]?.content?.[0]?.value;
  const isPodcast = title === "Brain Leak" || title === "Yokai";
  const spotifyUrl =
    title === "Yokai"
      ? "https://open.spotify.com/artist/5acEBp4nbqoEjROkF8nLj4?si=9QaLkKADRsK8u4fCJYja3w"
      : instagramurl;

  return (
    <>
      <Head>
        <title>{title} | Nine Four Entertainment</title>
        <meta
          name="description"
          content={biography || `Learn more about ${title}.`}
        />
      </Head>

      <main className="talent-profile">
        <section className="talent-profile__hero">
          <div className="talent-profile__content">
            <Link href="/talent" className="talent-profile__back">
              <span aria-hidden="true">←</span> All talent
            </Link>

            <h1>{title}</h1>

            <div className="talent-profile__socials">
              {isPodcast && spotifyUrl && (
                <a href={spotifyUrl} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faSpotify} />
                  <span>Listen</span>
                </a>
              )}
              {title === "Blowback" && (
                <a
                  href="https://blowback.show/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Listen here</span>
                </a>
              )}
              {!isPodcast && instagramfollowers && instagramurl && (
                <a href={instagramurl} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faInstagram} />
                  <span>{instagramfollowers}</span>
                </a>
              )}
              {!isPodcast && youtubefollowers && youtubeurl && (
                <a href={youtubeurl} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faYoutube} />
                  <span>{youtubefollowers}</span>
                </a>
              )}
            </div>

            {biography && <p className="talent-profile__bio">{biography}</p>}
          </div>

          <div className="talent-profile__image">
            <Image
              src={imageUrl}
              alt={description || `${title} portrait`}
              loader={contentfulImageLoader}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 850px) 100vw, 50vw"
              priority
              quality={70}
            />
          </div>
        </section>

        <TalentBar data={talentImages} currentSlug={slug} />
      </main>
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
    props: {
      talent: items[0],
      talentImages: talentImages.items.map(({ sys, fields }) => ({
        id: sys.id,
        slug: fields.slug,
        title: fields.title,
        imageUrl: `https:${fields.image.fields.file.url}`,
        imageAlt:
          fields.image.fields.description || `${fields.title} portrait`,
      })),
    },
    revalidate: 10,
  };
}
