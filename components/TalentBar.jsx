/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function TalentBar({ data }) {
  const [shuffTalent, setShuff] = useState([]);
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

    setShuff(shuffle(data));
  }, [shuffTalent, data]);

  return (
    <div className="talent-bar">
      {shuffTalent.map(({ fields: { tinycircle, title, slug } }) => {
        return (
          <div className="talent-circle" key={title}>
            <Link href={`/talent/${slug}`}>
              <a>
                <p>{tinycircle.fields.title}</p>
                <img src={`https://${tinycircle.fields.file.url}`} alt={title} />
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
