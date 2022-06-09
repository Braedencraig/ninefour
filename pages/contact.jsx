import React from "react";
import { createClient } from "contentful";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_SPACE_TOKEN,
  });

  const contact = await client.getEntries({ content_type: "talentPage" });

  return {
    props: {
      contact,
    },
    revalidate: 1,
  };
}

export default function Contact({ contact }) {
  console.log(contact);
  return <div>C</div>;
}
