import React from "react";
import Image from "next/image";

export default function TalentBar({ data }) {
  return (
    <div className="talent-bar">
      {data.map(({ fields: { thumbnail, title } }) => {
        return <Image key={title} src={`https://${thumbnail.fields.file.url}`} alt={title} width={90} height={80} />;
      })}
    </div>
  );
}
