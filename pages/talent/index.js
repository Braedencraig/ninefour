import React from "react";
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
  console.log(talent, talentInfo);
  //   DO THE PILLS HERE AND ON CLIKC TAKE TO PAGE.
  return (
    <div>
      {talent.map((item) => (
        <Link key={item.sys.id} href={`/talent/${item.fields.slug}`}>
          {/* IMAGES FROM CONTENTFUL */}
          {/* NEXT IMAGE */}
          <a>
            <Image
              alt="adasdas"
              src={`https:${item.fields.thumbnail.fields.file.url}`}
              width={item.fields.thumbnail.fields.file.details.image.width}
              height={item.fields.thumbnail.fields.file.details.image.height}
            />
            <div>{item.fields.title}</div>
          </a>
        </Link>
      ))}
    </div>
  );
}
