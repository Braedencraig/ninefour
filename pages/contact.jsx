import React from "react";
import { createClient } from "contentful";
import WorkWithUs from "../components/WorkWithUs";

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
  return (
    <div className="contact">
      <WorkWithUs copy={contact.items[0].fields} />
    </div>
  );
}
