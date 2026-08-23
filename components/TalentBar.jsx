import Image from "next/image";
import Link from "next/link";
import contentfulImageLoader from "./contentfulImageLoader";

export default function TalentBar({ data, currentSlug }) {
  const remainingTalent = data.filter(
    ({ fields }) => fields.slug !== currentSlug
  );

  return (
    <section className="talent-explore" aria-labelledby="explore-talent-title">
      <div className="talent-explore__heading">
        <p>Keep exploring</p>
        <h2 id="explore-talent-title">More talent</h2>
      </div>
      <div className="talent-explore__rail">
        {remainingTalent.map(({ sys, fields: { image, title, slug } }) => {
          const imageUrl = `https:${image.fields.file.url}`;

          return (
            <Link href={`/talent/${slug}`} key={sys.id}>
              <a className="talent-explore__item">
                <span className="talent-explore__image">
                  <Image
                    src={imageUrl}
                    alt={image.fields.description || `${title} portrait`}
                    loader={contentfulImageLoader}
                    layout="fill"
                    objectFit="cover"
                    sizes="120px"
                    quality={65}
                  />
                </span>
                <span>{title}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
