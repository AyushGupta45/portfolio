"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BAG_ITEMS, type BagItemId } from "@/lib/bag-items";
import { sfx } from "@/lib/sfx";

type MobileView = "list" | "content";

interface BagContextValue {
  bagOpen: boolean;
  booting: boolean;
  openBag: () => void;
  finishBoot: () => void;
  items: typeof BAG_ITEMS;
  activeId: BagItemId;
  setActiveId: (id: BagItemId) => void;
  /** Move the list cursor one step; used by arrow keys AND the D-pad. */
  moveCursor: (dir: 1 | -1) => void;
  /** Confirm the highlighted item (Enter key / A button / ▶). */
  confirmSelection: () => void;
  /** Back out: content→list on mobile, list→intro otherwise (Esc / B / ◀). */
  backOut: () => void;
  mobileView: MobileView;
  goBackToList: () => void;
}

const BagContext = createContext<BagContextValue | null>(null);

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used within <BagProvider>");
  return ctx;
}

export function BagProvider({ children }: { children: ReactNode }) {
  const [bagOpen, setBagOpen] = useState(false);
  const [booting, setBooting] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);
  const [activeId, setActiveIdState] = useState<BagItemId>(BAG_ITEMS[0].id);
  const [mobileView, setMobileView] = useState<MobileView>("list");

  const setActiveId = useCallback((id: BagItemId) => {
    setActiveIdState(id);
    setMobileView("content");
    sfx.select();
  }, []);

  // One codepath for the keyboard and the physical D-pad buttons.
  const moveCursor = useCallback((dir: 1 | -1) => {
    setActiveIdState((cur) => {
      const index = BAG_ITEMS.findIndex((i) => i.id === cur);
      return BAG_ITEMS[(index + dir + BAG_ITEMS.length) % BAG_ITEMS.length].id;
    });
    sfx.nav();
  }, []);

  const confirmSelection = useCallback(() => {
    setMobileView("content");
    sfx.select();
  }, []);

  const backOut = useCallback(() => {
    if (mobileView === "content") {
      setMobileView("list");
    } else {
      setBagOpen(false);
    }
    sfx.back();
  }, [mobileView]);

  const goBackToList = useCallback(() => {
    setMobileView("list");
    sfx.back();
  }, []);

  const finishBoot = useCallback(() => {
    setBooting(false);
    setHasBooted(true);
  }, []);

  const openBag = useCallback(() => {
    setBagOpen(true);
    if (!hasBooted) setBooting(true);
    sfx.select();
  }, [hasBooted]);

  // Keyboard nav mirrors the hardware controls: ↑/↓ move the cursor,
  // Enter selects (and on mobile swaps the list for the content pane),
  // Escape backs out to the intro screen.
  useEffect(() => {
    if (!bagOpen || booting) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        moveCursor(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        moveCursor(-1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        confirmSelection();
      } else if (e.key === "Escape") {
        e.preventDefault();
        backOut();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bagOpen, booting, moveCursor, confirmSelection, backOut]);

  const value = useMemo<BagContextValue>(
    () => ({
      bagOpen,
      booting,
      openBag,
      finishBoot,
      items: BAG_ITEMS,
      activeId,
      setActiveId,
      moveCursor,
      confirmSelection,
      backOut,
      mobileView,
      goBackToList,
    }),
    [
      bagOpen,
      booting,
      openBag,
      finishBoot,
      activeId,
      setActiveId,
      moveCursor,
      confirmSelection,
      backOut,
      mobileView,
      goBackToList,
    ]
  );

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}
