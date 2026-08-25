import { CATEGORY_TYPE, POKEMON_TYPE } from "@/lib/pixel-types";
import type { ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Map a raw Pokemon type name ("Electric", "Fire", etc.) to its CSS class. */
function getBadgeClass(typeName: string): string {
  if (typeName in POKEMON_TYPE) return POKEMON_TYPE[typeName].className;
  return "type-normal";
}

/**
 * Unified type-badge — used for both project categories AND pokemon types.
 *
 * - `<TypeBadge category="Web Development" />` → renders "Water" badge
 * - `<TypeBadge type="Electric" />` → renders "Electric" badge directly
 */
export function TypeBadge({
  category,
  type,
  className,
}: {
  /** Project category — mapped to a Pokemon type name internally. */
  category?: ProjectCategory;
  /** Raw Pokemon type name — used directly. Mutually exclusive with `category`. */
  type?: string;
  className?: string;
}) {
  const resolved = category ? CATEGORY_TYPE[category] : type ? { name: type, className: getBadgeClass(type) } : null;
  if (!resolved) return null;

  return (
    <span className={cn("type-badge font-pixel text-[9px] text-center leading-none", resolved.className, className)}>
      {resolved.name}
    </span>
  );
}
