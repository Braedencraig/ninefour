/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function TeamMember({ data }) {
  const teamMembersObj = [
    {
      name: "Parker Oks",
      bio: "Oks, 29, launched Nine Four Entertainment in 2022, working with content creators on talent management and business development. He serves as CEO of the company. He has been in the creator and entertainment industry for over six years. Based in Las Vegas, his previous experience includes working with actors and creators at Brillstein Entertainment Partners and Daylight Holdings.",
      image: "../assets/oks-new.jpeg",
    },
    // {
    //   name: "Mark Miskell",
    //   bio: "Mark Miskell serves as an Assistant at Nine Four Entertainment, bringing six years of experience in the entertainment industry. Passionate about the digital creator space, Mark plays a vital role in supporting talent and driving projects forward. Based in Los Angeles, his previous experience includes working with actors and writers at LRE.",
    //   image: "../assets/mark-new.jpg",
    // },
    {
      name: "Colleen Rowbottom",
      bio: "Rowbottom, 27, has worked in various sectors of entertainment with a focus on Music for the past six years. Coming from WME, she now serves as Talent Coordinator at Nine Four, where she assists with a wide range of management duties for some of the most exciting creators in the digital world.",
      image: "../assets/colleen-new.jpg",
    },
  ];

  return (
    <div className="members">
      {teamMembersObj.map((member, i) => {
        return (
          <div className="member" key={i}>
            <img src={member.image} alt={member.name} />
            <p>{member.name}</p>
            <p className="member-bio">{member.bio}</p>
          </div>
        );
      })}
    </div>
  );
}
