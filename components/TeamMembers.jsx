/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function TeamMember({ data }) {
  return (
    <div className="members">
      {data.map((member, i) => {
        return (
          <div className="member" key={i}>
            <img src={member.fields.image.fields.file.url} alt={member.fields.image.fields.title} />
            <p>{member.fields.title}</p>
            <p className="member-bio">{member.fields.bio}</p>
          </div>
        );
      })}
    </div>
  );
}
