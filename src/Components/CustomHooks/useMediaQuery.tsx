import { useEffect, useState } from "react"

export const useMediaQuery = (query:string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        let media = window.matchMedia(query);
        setMatches(media.matches);
        const listener = () => {
            setMatches(media.matches);
        }
        media.addEventListener("change", listener);
        return () => {
            media.removeEventListener("change", listener);
        }
    }, []);

    return matches;
}