import { Icon, type IconName } from "./icons";

/* Il cerchio che porta le icone: Avorio con anello Oro e segno Blu Lario,
   oppure anello e segno Cremisi dove il tema è la tutela. */
const RING = {
  gold: "border-gold-500 text-navy-900",
  crimson: "border-bordeaux text-bordeaux",
} as const;

const SIZE = {
  md: ["size-13", "size-6.5"],
  sm: ["size-11", "size-5.5"],
} as const;

type Props = { name: IconName; ring?: keyof typeof RING; size?: keyof typeof SIZE; className?: string };

export function IconBadge({ name, ring = "gold", size = "md", className = "" }: Props) {
  const [box, glyph] = SIZE[size];
  return (
    <span className={`grid shrink-0 place-items-center rounded-full border-[1.5px] bg-cream ${box} ${RING[ring]} ${className}`}>
      <Icon name={name} className={glyph} />
    </span>
  );
}
