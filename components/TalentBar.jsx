/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function TalentBar({ data }) {
  return (
    <div className="talent-bar">
      {data.map(({ fields: { tinycircle, title, slug } }) => {
        return (
          <div className="talent-circle" key={title}>
            <Link href={`/talent/${slug}`}>
              <a>
                <img src={`https://${tinycircle.fields.file.url}`} alt={title} />
                <p>{tinycircle.fields.title}</p>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
