import { useEffect, useRef } from "react";

interface IUseClickOutside {
  handler: () => void;
  listenerCapturing?: boolean;
}

function useClickOutside({
  handler,
  listenerCapturing = true,
}: IUseClickOutside) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, listenerCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenerCapturing);
  }, [handler, ref, listenerCapturing]);

  return ref;
}

export default useClickOutside;
