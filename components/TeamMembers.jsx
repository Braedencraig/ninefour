import React from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Parker Oks",
    bio: "Parker launched Nine Four Entertainment in 2022, working with content creators on talent management and business development. He serves as President of the company. He has been in the creator and entertainment industry for over a decade. Based in Las Vegas, his previous experience includes working with actors and creators at Brillstein Entertainment Partners and Daylight Holdings.",
    image: "/assets/oks-new.jpg",
    imagePosition: "50% 0%",
  },
  {
    name: "Colleen Rowbottom",
    bio: "Colleen has spent the last 10 years working in various sectors of entertainment. Coming from WME, she joined the Nine Four team as a coordinator in 2023. Now, she serves as Head of Talent. Managing her own roster of digital creators, while working with the rest of the team to identify opportunities across the entire Nine Four roster. Colleen is extremely passionate about working with creators, guiding several clients through surges of popularity ensuring they find staying power in their corner of the digital world, with relevance and value to audiences at the core.",
    image: "/assets/colleen.jpg",
    imagePosition: "50% 18%",
  },
  {
    name: "Devon Black",
    bio: "Devon leads brand partnerships at Nine Four Entertainment, building opportunities for creators across branded content, original programming and live experiences. After beginning her career at Warner Bros. Television and Revelations Entertainment, Devon brings a perspective shaped by both traditional and creator-led entertainment.",
    image: "/assets/Devon.jpg",
    imagePosition: "50% 18%",
  },
  {
    name: "Greg Cassius",
    bio: "Greg is a consumer products and brand executive specializing in product strategy, licensing, merchandising, and operations across fashion, sports, gaming, toys, and collectibles. He has held leadership roles with Win Brands Group, Primitive Skate, PSD Underwear, Oakley, Speedo, Nike, and MGA Entertainment, building brands through innovative products, strategic partnerships, and cross functional collaboration.",
    image: "/assets/greg-cassius.jpg",
    imagePosition: "50% 20%",
  },
  {
    name: "Taryn Rose",
    bio: "Taryn is a Junior Manager at Nine Four Entertainment, bringing over six years of experience in the digital creator economy. Having grown alongside the evolving creator landscape, she is passionate about helping talent build sustainable, impactful careers across platforms. Since joining the team nearly two years ago, Taryn has supported talent strategy, campaign management, and day-to-day operations, working closely with creators and brand partners alike. She is excited to continue building alongside the NFE team and contributing to the growth of both the company and its talent roster.",
    image: "/assets/taryn.jpg",
    imagePosition: "50% 20%",
  },
  {
    name: "Taylor Hajek",
    bio: "Taylor, 25, has worked across gaming, esports, brand partnerships, and creator marketing for the past six years. Prior to joining Nine Four Entertainment, Taylor held multiple marketing and partnership roles at Razer, focusing on creator collaborations and strategic brand partnerships. He now serves as a Talent Manager at Nine Four, where he works closely with creators and brands to secure partnerships, manage campaigns, and support the long-term growth of some of the industry's leading digital talent.",
    image: "/assets/Taylor.jpeg",
    imagePosition: "50% 35%",
  },
  {
    name: "Monica Ring",
    bio: "Monica is a Short-Form Talent Manager at Nine Four Entertainment, bringing five years of industry experience and a genuine love for storytelling to every client relationship. Originally from Upstate New York, Monica’s west coast journey started in the most unexpected way: creating “The Vampire Diaries” reaction content on TikTok (and briefly on YouTube!). What began as a passion project opened the door to Los Angeles in 2021, where she initially worked as a content creator before realizing her true calling was behind the scenes — helping creators turn their dreams into sustainable careers. Monica is always on the lookout for creators with an inspiring story to tell or a drive to make a positive impact in their community.",
    image: "/assets/Monica.jpg",
    imagePosition: "50% 22%",
  },
  {
    name: "Wayne Chen Delgado",
    bio: "Wayne is the executive assistant to founder Parker Oks, supporting him across talent management and business development at Nine Four. His background is in traditional film entertainment, having previously worked in production at Artists Equity, the studio founded by Ben Affleck and Matt Damon. At Nine Four, he assists with outreach, research, and client coordination across the company's roster of creators.",
    image: "/assets/Wayne.jpg",
    imagePosition: "50% 25%",
  },
];

export default function TeamMembers() {
  return (
    <div className="team-grid">
      {teamMembers.map((member) => (
        <article className="team-card" key={member.name}>
          <div className="team-card__portrait">
            {member.image ? (
              <Image
                src={member.image}
                alt={`${member.name}, Nine Four Entertainment team member`}
                fill
                sizes="(max-width: 650px) 100vw, (max-width: 1199px) 48vw, 360px"
                style={{
                  objectFit: "cover",
                  objectPosition: member.imagePosition,
                }}
              />
            ) : (
              <div
                className="team-card__placeholder"
                role="img"
                aria-label={`${member.name} portrait coming soon`}
              >
                <span>NFE</span>
              </div>
            )}
          </div>
          <div className="team-card__content">
            <h3>{member.name}</h3>
            {member.bio && <p>{member.bio}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}
