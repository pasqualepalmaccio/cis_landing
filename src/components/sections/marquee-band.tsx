import { VelocityMarquee } from "../motion/velocity-marquee";

export function MarqueeBand({ words }: { words: string[] }) {
  return (
    <div className="overflow-x-clip py-6">
      <div className="relative -rotate-2 scale-105 border-y border-line bg-navy-950 py-6 sm:py-8">
        <VelocityMarquee items={words} />
      </div>
    </div>
  );
}
