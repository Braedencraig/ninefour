/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
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
  // useEffect(() => {
  //   let imgArr = document.querySelectorAll(".img");
  //   let prevX = 0;
  //   let prevY = 0;
  //   let moveXAmount = 0;
  //   let moveYAmount = 0;

  //   document.addEventListener("mousemove", function (e) {
  //     mousePos(e);
  //   });

  //   function mousePos(e) {
  //     moveXAmount = e.pageX - prevX;
  //     moveYAmount = e.pageY - prevY;
  //     moveImg(moveXAmount, moveYAmount);

  //     prevX = e.pageX;
  //     prevY = e.pageY;
  //   }

  //   function moveImg(xAmount, yAmount) {
  //     imgArr.forEach((img) => {
  //       let movementStrength = 5 + Math.random() * 105;
  //       img.style.left = img.offsetLeft - (xAmount / movementStrength) + "px";
  //       img.style.top = img.offsetTop - (yAmount / movementStrength) + "px";
  //     });
  //   }
  // });
  return (
    <div className="talent">
      <div className="talent-container">
      {talent.map((item, i) => (
          <div key={item.sys.id} className={`img img${i + 1} talent-item`}>
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
