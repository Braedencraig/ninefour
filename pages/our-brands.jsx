import React from "react";
import Image from "next/image";
import { createClient } from "contentful";

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
  return (
    <div className="brands">
      <h3>{copy.items[0].fields.description}</h3>
      <div className="brands-info">
        <div className="decorative">
          <div className="circle"></div>
        </div>
        <div className="brands-list">
          {brand.items.map((item) => {
            const { title, info, image } = item.fields;
            return (
              <div key={title}>
                <Image src={`https://${image.fields.file.url}`} width={image.fields.file.details.image.width} height={image.fields.file.details.image.height} alt={title} />
                <p>{info}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
