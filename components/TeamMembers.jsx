/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function TeamMember({ data }) {
    const teamMembersObj = [
    {
      name: 'David Rosemon',
      bio: 'Rosemon, 28, has worked in the creator economy for over five years. He previously represented talent for industry-leading agencies including Fullscreen, UTA, Select and Jellysmack. He also ran his own boutique talent management company RAM, where he represented both digital and traditional talent. Based in LA, he currently serves as talent manager and COO at Nine Four.',
      image: '../assets/david.jpg'
    },
    {
      name: 'Parker Oks',
      bio: 'Oks, 29, launched Nine Four Entertainment in 2022, working with content creators on talent management and business development. He serves as CEO of the company. He has been in the creator and entertainment industry for over six years. Based in Las Vegas, his previous experience includes working with actors and creators at Brillstein Entertainment Partners and Daylight Holdings.',
      image: '../assets/oks.jpg'
    },
    {
      name: 'Colleen Rowbottom',
      bio: 'Rowbottom, 27, has worked in various sectors of entertainment with a focus on Music for the past 6 years. Coming from WME, she now serves as Talent Coordinator at Nine Four, where she assists with a wide range of management duties for some of the most exciting creators in the digital world.',
      image: '../assets/colleen.jpg'
    }
  ]

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
