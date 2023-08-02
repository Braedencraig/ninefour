/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import WorkWithUs from "../../components/WorkWithUs";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "contentful";

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

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

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
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }

    setShuff(shuffle(talent));
  }, [shuffTalent, talent]);

  return (
    <div className="talent">
      <div className="talent-container">
        {shuffTalent.map((item, i) => {
          return (
            <Link key={item.sys.id} href={`/talent/${item.fields.slug}`}>
              <a
                className={`img img${i + 1} talent-item testing ${
                  item.fields.title === "Legendary Jay" ||
                  item.fields.title === "Dontai"
                    ? "talent-item-jay"
                    : ""
                }`}
                style={{
                  backgroundImage: `url("https:${item.fields.image.fields.file.url}")`,
                  //               backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
                  // url("https:${item.fields.image.fields.file.url}")`,
                  //               backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
                  // url("https:${item.fields.image.fields.file.url}")`,
                  backgroundPosition: "center",
                  backgroundSize: "550px",
                }}
              >
                <div>
                  <div className="talent-item-text">
                    {item.fields.title} <span>+</span>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
      {!isSSR && <WorkWithUs copy={talentInfo[0].fields} />}
    </div>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_SPACE_TOKEN,
  });

  const talent = await client.getEntries({ content_type: "talent" });

  const talentInfo = await client.getEntries({ content_type: "talentPage" });

  return {
    props: {
      talent: talent.items,
      talentInfo: talentInfo.items,
    },
    revalidate: 10,
  };
}
