/**
 * PDF case studies wrap each chapter in <section id="background"> and start it
 * with "## Background". Astro then gives the heading the same id, which makes
 * the id appear twice on the page. This plugin runs before Astro's heading ids
 * and, for any heading whose slug equals a section id, sets the heading's id to
 * "<slug>-title" so every id stays unique. Section ids (used by the chapter
 * rail and links) are unchanged.
 */
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/g, "-");

const textOf = (node) =>
  node.type === "text"
    ? node.value
    : (node.children ?? []).map(textOf).join("");

const visit = (node, fn) => {
  fn(node);
  for (const child of node.children ?? []) visit(child, fn);
};

export default function rehypeSectionHeadingIds() {
  return (tree) => {
    const sectionIds = new Set();
    visit(tree, (node) => {
      if (node.type === "mdxJsxFlowElement" && node.name === "section") {
        const id = node.attributes?.find(
          (attribute) => attribute.name === "id",
        )?.value;
        if (typeof id === "string") sectionIds.add(id);
      } else if (node.type === "element" && node.tagName === "section") {
        const id = node.properties?.id;
        if (typeof id === "string") sectionIds.add(id);
      }
    });
    if (!sectionIds.size) return;
    visit(tree, (node) => {
      if (node.type !== "element" || !/^h[1-6]$/.test(node.tagName)) return;
      if (node.properties?.id) return;
      const slug = slugify(textOf(node));
      if (sectionIds.has(slug)) {
        node.properties = { ...node.properties, id: `${slug}-title` };
      }
    });
  };
}
