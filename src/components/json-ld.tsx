/**
 * Renders a JSON-LD block.
 *
 * Next.js recommends a plain <script type="application/ld+json"> in the body
 * for structured data. The `<` escape prevents a malformed string in the data
 * from breaking out of the script tag.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
