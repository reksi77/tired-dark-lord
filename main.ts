import { mkdirSync, writeFileSync } from "node:fs";

// The Tired Dark Lord: A 100-Word Villain Monologue.
// One monologue, spoken by the keeper of a toll bridge who has collected
// the same toll — one true story, told standing in the rain — for sixty
// years. The tiredness lives in the ritual, the short sentences and the
// small deflections; it is never announced.
const MONOLOGUE =
  "Sixty years I have kept this bridge, and sixty years the toll has been the same: one true story, told standing in the rain. I have heard four thousand, two hundred and nine. I remember the good ones. A miller who lied about his wife. A girl who traded her name for a boat. Yours will be short. They always are. Cross, then. The planks are loose — mind the third one, it bites. And when you reach my door with your sword drawn, knock twice. Once, for the villain you expect. Twice, for the man who kept the bridge.";

mkdirSync("/output", { recursive: true });

// Gate validation (the sealed scorer requires 1-600 UTF-8 characters,
// not only whitespace; the brief wants ~100 words and forbids stating
// the tiredness outright or leaning on stock scenery).
const chars = [...MONOLOGUE].length;
const words = MONOLOGUE.trim().split(/\s+/).filter(Boolean).length;
const BANNED = [
  "tired",
  "weary",
  "exhausted",
  "dark throne",
  "black castle",
  "mortal",
  "foolish hero",
  "bow before me",
];
const lower = MONOLOGUE.toLowerCase();
const hit = BANNED.find((b) => lower.includes(b));
if (chars < 1 || chars > 600) {
  console.error(`gate fail: ${chars} characters (need 1-600)`);
  process.exit(1);
}
if (MONOLOGUE.trim().length === 0) {
  console.error("gate fail: entry is only whitespace");
  process.exit(1);
}
if (words < 98 || words > 102) {
  console.error(`gate fail: ${words} words (need 98-102)`);
  process.exit(1);
}
if (hit) {
  console.error(`gate fail: banned phrase present: ${hit}`);
  process.exit(1);
}

writeFileSync("/output/entry.txt", MONOLOGUE, "utf8");

console.log(`wrote /output/entry.txt (${words} words, ${chars} characters)`);
