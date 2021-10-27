import { useEffect, useRef } from "react";

export const useSvgFromString = (svg:string) => {
    const svgWrapperRef = useRef(null);
    useEffect(() => {
      svgWrapperRef.current.innerHTML = svg;
    }, [])
    return {
      svgWrapperRef
    }
  }