import React from "react";
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
  console.log(brand);
  return (
    <div className="brands">
      <h3>{copy.items[0].fields.description}</h3>
      <div></div>
    </div>
  );
}
