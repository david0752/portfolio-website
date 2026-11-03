// A böngészőfül címének beállítása oldalanként (nyelvváltáskor is frissül).
import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
