import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/lib/posts";

/**
 * Renders a post's block array as semantic HTML.
 *
 * Nothing here uses dangerouslySetInnerHTML — inline markup is parsed into
 * real React nodes, so a stray character in the content can never inject
 * markup into the page.
 */

const INLINE_PATTERN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

/** Parses the `**bold**` and `[label](/href)` subset used inside block text. */
function renderInline(text: string): ReactNode[] {
  return text.split(INLINE_PATTERN).map((chunk, index) => {
    if (!chunk) return null;

    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-ink-950">
          {chunk.slice(2, -2)}
        </strong>
      );
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(chunk);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("http")) {
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-600 underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-500"
          >
            {label}
          </a>
        );
      }
      return (
        <Link
          key={index}
          href={href}
          className="font-medium text-brand-600 underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-500"
        >
          {label}
        </Link>
      );
    }

    return <span key={index}>{chunk}</span>;
  });
}

export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return (
              <p key={index} className="text-lg leading-[1.75] text-ink-700">
                {renderInline(block.text)}
              </p>
            );

          case "h2":
            return (
              <h2
                key={index}
                id={block.id}
                className="mt-8 scroll-mt-28 text-2xl font-semibold sm:text-3xl"
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={index}
                id={block.id}
                className="mt-4 scroll-mt-28 text-xl font-semibold sm:text-[1.375rem]"
              >
                {block.text}
              </h3>
            );

          case "list":
            return block.ordered ? (
              <ol key={index} className="flex list-none flex-col gap-3.5 pl-0">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-4">
                    <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 font-mono text-xs font-medium text-brand-700">
                      {itemIndex + 1}
                    </span>
                    <span className="text-lg leading-[1.7] text-ink-700">
                      {renderInline(item)}
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={index} className="flex flex-col gap-3">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-brand-400"
                    />
                    <span className="text-lg leading-[1.7] text-ink-700">
                      {renderInline(item)}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "quote":
            return (
              <figure key={index} className="my-4 border-l-2 border-brand-500 pl-6">
                <blockquote className="text-xl font-medium leading-relaxed text-ink-900 sm:text-2xl">
                  {renderInline(block.text)}
                </blockquote>
                {block.cite ? (
                  <figcaption className="mt-3 text-sm text-ink-500">
                    — {block.cite}
                  </figcaption>
                ) : null}
              </figure>
            );

          case "callout":
            return (
              <aside
                key={index}
                className="my-4 rounded-2xl bg-paper-subtle p-6 ring-1 ring-ink-100"
              >
                <p className="font-semibold text-ink-950">{block.title}</p>
                <p className="mt-2 leading-relaxed text-ink-600">
                  {renderInline(block.text)}
                </p>
              </aside>
            );

          case "table":
            return (
              <figure key={index} className="my-4">
                <div className="overflow-x-auto rounded-2xl ring-1 ring-ink-100">
                  <table className="w-full min-w-[36rem] border-collapse text-left">
                    <thead>
                      <tr className="bg-paper-subtle">
                        {block.head.map((cell) => (
                          <th
                            key={cell}
                            scope="col"
                            className="whitespace-nowrap px-5 py-3.5 text-sm font-semibold text-ink-950"
                          >
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-100">
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="bg-white">
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={
                                cellIndex === 0
                                  ? "px-5 py-3.5 text-[0.9375rem] font-medium text-ink-900"
                                  : "px-5 py-3.5 text-[0.9375rem] text-ink-600"
                              }
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-sm text-ink-500">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
