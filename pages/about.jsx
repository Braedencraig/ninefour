import React from "react";
import { createClient } from "contentful";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_SPACE_TOKEN,
  });

  const aboutInfo = await client.getEntries({ content_type: "about" });
  const teamMembers = await client.getEntries({ content_type: "teamMember" });

  return {
    props: {
      aboutInfo,
      teamMembers,
    },
    revalidate: 1,
  };
}

export default function About({ aboutInfo, teamMembers }) {
  console.log(aboutInfo, teamMembers);
  return <div>About</div>;
}
