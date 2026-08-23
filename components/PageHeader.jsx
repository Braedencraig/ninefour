export default function PageHeader({ eyebrow, title }) {
  return (
    <header className="section-header">
      <p>{eyebrow}</p>
      <h1>{title}</h1>
    </header>
  );
}
