import { useEffect, useRef } from "react";

function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenerCapturing: boolean = true
): React.MutableRefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, listenerCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenerCapturing);
  }, [handler, listenerCapturing]);

  return ref;
}

export default useOutsideClick;
