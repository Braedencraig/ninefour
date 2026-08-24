import Image from "next/image";
import Link from "next/link";
import { contentfulSquareImageLoader } from "./contentfulImageLoader";

export default function TalentBar({ data, currentSlug }) {
  const remainingTalent = data.filter(({ slug }) => slug !== currentSlug);

  return (
    <section className="talent-explore" aria-labelledby="explore-talent-title">
      <div className="talent-explore__heading">
        <p>Keep exploring</p>
        <h2 id="explore-talent-title">More talent</h2>
      </div>
      <div className="talent-explore__rail">
        {remainingTalent.map(({ id, imageAlt, imageUrl, slug, title }) => {
          return (
            <Link
              href={`/talent/${slug}`}
              key={id}
              className="talent-explore__item"
            >
              <span className="talent-explore__image">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  loader={contentfulSquareImageLoader}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="120px"
                  quality={50}
                />
              </span>
              <span>{title}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
