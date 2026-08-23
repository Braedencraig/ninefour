import Head from "next/head";

const articles = [
  {
    publication: "Variety",
    date: "May 14, 2025",
    title: "Skybound Acquires Nine Four Entertainment",
    summary:
      "Variety reports on Nine Four joining Skybound as its digital creator and influencer representation arm, alongside plans for a new incubator focused on creator-led brands.",
    url: "https://variety.com/2025/tv/news/skybound-acquires-nine-four-entertainment-1236396969/",
  },
  {
    publication: "Tubefilter",
    date: "May 14, 2025",
    title:
      "‘Walking Dead’ producer Skybound has its eye on creators with Nine Four acquisition",
    summary:
      "Tubefilter explores how the partnership brings Nine Four’s creator representation and business development experience into Skybound’s multiplatform entertainment ecosystem.",
    url: "https://www.tubefilter.com/2025/05/14/skybound-entertainment-nine-four-acquisitions-creators-hollywood/",
  },
];

export default function Press() {
  return (
    <>
      <Head>
        <title>Press | Nine Four Entertainment</title>
        <meta
          name="description"
          content="Read the latest news and coverage featuring Nine Four Entertainment."
        />
      </Head>

      <main className="press-page">
        <header className="press-hero">
          <p>News &amp; coverage</p>
          <h1>Press</h1>
        </header>

        <section className="press-intro">
          <p className="press-label">In the news</p>
          <h2>
            Building the future of creator-led entertainment and business.
          </h2>
        </section>

        <section className="press-articles" aria-label="Press coverage">
          {articles.map((article, index) => (
            <a
              className="press-article"
              href={article.url}
              key={article.publication}
              target="_blank"
              rel="noreferrer"
              aria-label={`Read ${article.title} on ${article.publication}`}
            >
              <div className="press-article__number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="press-article__publication">
                <span>{article.publication}</span>
                <time>{article.date}</time>
              </div>
              <div className="press-article__body">
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
                <span className="press-article__link">
                  Read article <span aria-hidden="true">↗</span>
                </span>
              </div>
            </a>
          ))}
        </section>
      </main>
    </>
  );
}
