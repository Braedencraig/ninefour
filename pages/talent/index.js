import React from "react";
import WorkWithUs from "../../components/WorkWithUs";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "contentful";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_SPACE_TOKEN,
  });

  const talent = await client.getEntries({ content_type: "talent" });

  const talentInfo = await client.getEntries({ content_type: "talentPage" });
  console.log(talentInfo);

  return {
    props: {
      talent: talent.items,
      talentInfo: talentInfo.items,
    },
    revalidate: 1,
  };
}

export default function Talent({ talent, talentInfo }) {
  return (
    <div className="talent">
      <div className="talent-container">
        {talent.map((item) => (
          <div key={item.sys.id} className="talent-item">
            <Link href={`/talent/${item.fields.slug}`}>
              <a>
                <Image
                  alt={item.fields.image.fields.description}
                  src={`https:${item.fields.thumbnail.fields.file.url}`}
                  width={item.fields.thumbnail.fields.file.details.image.width}
                  height={item.fields.thumbnail.fields.file.details.image.height}
                />
                <div className="talent-item-text">
                  {item.fields.title} <span>+</span>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <WorkWithUs copy={talentInfo[0].fields} />
    </div>
  );
}
