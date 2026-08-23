import React, { useEffect, useRef, useState } from "react";
import { createClient } from "contentful";
import PageHeader from "../components/PageHeader";
import WorkWithUs from "../components/WorkWithUs";

export default function Contact({ contact }) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    // <MagneticButton
    //   className="button-1"
    //   style={{ backgroundColor: "transparent" }}
    //   scale={2}
    //   tollerance={0.8}
    //   speed={0.3}
    //   borderRadius="50%"
    //   onClick={() => {
    //     console.log("click");
    //   }}
    // >
    //   <MagneticButton
    //     className="button-1"
    //     scale={4}
    //     tollerance={1}
    //     speed={0.5}
    //     borderRadius="50%"
    //     onClick={() => {
    //       console.log("click");
    //     }}
    //   >
    //     Inception
    //   </MagneticButton>
    // </MagneticButton>
    <>
      <PageHeader eyebrow="Start a conversation" title="Contact" />
      <div className="contact">{!isSSR && <WorkWithUs copy={contact.items[0].fields} />}</div>
    </>
  );
}

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
    revalidate: 10,
  };
}
