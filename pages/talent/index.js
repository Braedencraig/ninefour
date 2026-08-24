import Head from "next/head";
import WorkWithUs from "../../components/WorkWithUs";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "contentful";
import contentfulImageLoader, {
  contentfulPillImageLoader,
} from "../../components/contentfulImageLoader";

const profileImageWidths = [360, 640, 750, 828, 1080, 1200, 1600];
const prefetchedProfileImages = new Set();

function prefetchProfileImage(src) {
  if (typeof window === "undefined") {
    return;
  }

  const layoutWidth =
    window.innerWidth <= 900 ? window.innerWidth : window.innerWidth * 0.5;
  const desiredWidth = layoutWidth * window.devicePixelRatio;
  const width =
    profileImageWidths.find((size) => size >= desiredWidth) ||
    profileImageWidths[profileImageWidths.length - 1];
  const imageUrl = contentfulImageLoader({ src, width, quality: 70 });

  if (!prefetchedProfileImages.has(imageUrl)) {
    prefetchedProfileImages.add(imageUrl);
    const image = new window.Image();
    image.src = imageUrl;
  }
}

export default function Talent({ talent, workWithUs }) {
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
          {talent.map(({ id, imageAlt, imageUrl, slug, title }, index) => {
            return (
              <Link
                key={id}
                href={`/talent/${slug}`}
                className={`talent-pill img img${(index % 24) + 1}`}
                onFocus={() => prefetchProfileImage(imageUrl)}
                onMouseEnter={() => prefetchProfileImage(imageUrl)}
                onTouchStart={() => prefetchProfileImage(imageUrl)}
              >
                <div className="talent-pill__image">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    loader={contentfulPillImageLoader}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 780px) 90vw, 42vw"
                    priority={index < 2}
                    quality={60}
                  />
                </div>
                <div className="talent-pill__shade" aria-hidden="true" />
                <div className="talent-pill__title">
                  {title}
                  <span aria-hidden="true">+</span>
                </div>
              </Link>
            );
          })}
        </section>

        <WorkWithUs copy={workWithUs} />
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
      talent: talent.items.map(({ sys, fields }) => ({
        id: sys.id,
        slug: fields.slug,
        title: fields.title,
        imageUrl: `https:${fields.image.fields.file.url}`,
        imageAlt:
          fields.image.fields.description || `${fields.title} portrait`,
      })),
      workWithUs: {
        title: talentInfo.items[0].fields.title,
        ctaText: talentInfo.items[0].fields.ctaText,
      },
    },
    revalidate: 10,
  };
}
