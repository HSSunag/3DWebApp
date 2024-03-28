import React, { useState, useEffect } from "react";

export default function AudioPlayer({ src, loop }) {
  const [audio] = useState(new Audio(src));

  useEffect(() => {
    audio.loop = loop;
    audio.play(); // Start playing audio when component mounts

    return () => {
      audio.pause(); // Pause audio when component unmounts
      audio.currentTime = 0;
    };
  }, [loop]);

  return null; // Since this is an invisible component, return null
}
