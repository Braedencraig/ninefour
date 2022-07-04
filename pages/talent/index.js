/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
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
  const [shuffTalent, setShuff] = useState([]);
  // useEffect(() => {
  //   let imgArr = document.querySelectorAll(".img");
  //   let prevX = 0;
  //   let prevY = 0;
  //   let moveXAmount = 0;
  //   let moveYAmount = 0;

  //   Array.from(imgArr).map((img) => {
  //     img.addEventListener("mousemove", function (e) {
  //       mousePos(e);
  //     });
  //   });

  // document.addEventListener("mousemove", function (e) {
  //   mousePos(e);
  // });

  // function mousePos(e) {
  //   moveXAmount = e.pageX - prevX;
  //   moveYAmount = e.pageY - prevY;
  //   moveImg(moveXAmount, moveYAmount);

  //   prevX = e.pageX;
  //   prevY = e.pageY;
  // }

  // function moveImg(xAmount, yAmount) {
  //   imgArr.forEach((img) => {
  //     let movementStrength = 5 + Math.random() * 105;
  //     // console.log(xAmount);
  //     // img.style.left = xAmount + "px";
  //     // img.style.top = yAmount + "px";

  //     // img.style.left = img.offsetLeft - xAmount / movementStrength + "px";
  //     // img.style.top = img.offsetTop - yAmount / movementStrength + "px";
  //   });
  // }
  // });

  useEffect(() => {
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }

      return array;
    }

    setShuff(shuffle(talent));
  }, [shuffTalent, talent]);

  console.log(talent);
  console.log(shuffTalent);
  return (
    <div className="talent">
      <div className="talent-container">
        {shuffTalent.map((item, i) => (
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
