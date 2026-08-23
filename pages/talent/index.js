import Head from "next/head";
import WorkWithUs from "../../components/WorkWithUs";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "contentful";
import contentfulImageLoader from "../../components/contentfulImageLoader";

export default function Talent({ talent, talentInfo }) {
  return (
    <>
      <Head>
        <title>Talent | Nine Four Entertainment</title>
        <meta
          name="description"
          content="Meet the creators represented by Nine Four Entertainment."
        />
      </Head>

      <main className="talent-directory">
        <header className="talent-directory__hero">
          <p>Our roster</p>
          <h1>Talent</h1>
        </header>

        <section className="talent-pill-grid" aria-label="Talent roster">
          {talent.map(({ sys, fields }, index) => {
            const imageUrl = `https:${fields.image.fields.file.url}`;
            const imageAlt =
              fields.image.fields.description || `${fields.title} portrait`;

            return (
              <Link key={sys.id} href={`/talent/${fields.slug}`}>
                <a
                  className={`talent-pill img img${(index % 24) + 1}`}
                >
                  <div className="talent-pill__image">
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      loader={contentfulImageLoader}
                      layout="fill"
                      objectFit="cover"
                      sizes="(max-width: 780px) 90vw, 42vw"
                      priority={index < 4}
                      quality={78}
                    />
                  </div>
                  <div className="talent-pill__shade" aria-hidden="true" />
                  <div className="talent-pill__title">
                    {fields.title}
                    <span aria-hidden="true">+</span>
                  </div>
                </a>
              </Link>
            );
          })}
        </section>

        <WorkWithUs copy={talentInfo[0].fields} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_SPACE_TOKEN,
  });

  const talent = await client.getEntries({ content_type: "talent" });

  const talentInfo = await client.getEntries({ content_type: "talentPage" });

  return {
    props: {
      talent: talent.items,
      talentInfo: talentInfo.items,
    },
    revalidate: 10,
  };
}
