"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CheckCircle, Loader, Expand, Minimize } from "lucide-react";

const content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero earum a
        perferendis dolore ullam perspiciatis ad commodi sequi quos deleniti nam
        quia, accusantium aut expedita totam omnis quis quibusdam cupiditate?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
        necessitatibus quia voluptatem repudiandae, rerum iste possimus
        temporibus blanditiis distinctio hic est, quas placeat odit veritatis
        corrupti numquam, doloremque cumque! Praesentium. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Vero earum a perferendis dolore ullam
        perspiciatis ad commodi sequi quos deleniti nam quia, accusantium aut
        expedita totam omnis quis quibusdam cupiditate? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Rem necessitatibus quia voluptatem
        repudiandae, rerum iste possimus temporibus blanditiis distinctio hic
        est, quas placeat odit veritatis corrupti numquam, doloremque cumque!
        Praesentium. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Vero earum a perferendis dolore ullam perspiciatis ad commodi sequi quos
        deleniti nam quia, accusantium aut expedita totam omnis quis quibusdam
        cupiditate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
        necessitatibus quia voluptatem repudiandae, rerum iste possimus
        temporibus blanditiis distinctio hic est, quas placeat odit veritatis
        corrupti numquam, doloremque cumque! Praesentium.`;

const ReasoningAnimation = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <TextSection />
    </div>
  );
};

const TextSection = () => {
  const [streamingText, setStreamingText] = useState("");
  const textRef = useRef<HTMLParagraphElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const [isStreaming, setIsStreaming] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const words = content.split(" ");
    let currentIndex = 0;
    setIsStreaming(true);
    const streamWords = () => {
      if (currentIndex < words.length) {
        setStreamingText(
          (prev) => prev + (prev ? " " : "") + words[currentIndex]
        );
        currentIndex++;
        setTimeout(streamWords, 20); // Add a word every 100ms
      } else {
        setIsStreaming(false);
      }
    };

    streamWords();
  }, []);

  // Continuous smooth scroll with GSAP
  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;

      // Kill any existing scroll animation
      if (scrollTween.current) {
        scrollTween.current.kill();
      }

      // Calculate target scroll position
      const maxScroll = element.scrollHeight - element.clientHeight;
      const targetScroll = maxScroll;

      // Only animate if there's a significant difference
      if (Math.abs(element.scrollTop - targetScroll) > 0) {
        scrollTween.current = gsap.to(element, {
          scrollTop: targetScroll,
          duration: 1.5, // Smooth 600ms animation
          ease: "power2.out", // Custom easing for natural feel
          overwrite: true, // Overwrite any existing scroll animations
        });
      }
    }
  }, [streamingText]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTween.current) {
        scrollTween.current.kill();
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 border rounded-xl p-2 w-full min-h-[100px] max-w-[65ch]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isStreaming ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <p className="text-sm font-medium text-gray-700">Reasoning...</p>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <p className="text-sm font-medium text-gray-700">
                Reasoned a few seconds
              </p>
            </>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
        >
          {isExpanded ? (
            <>
              <Minimize className="w-3 h-3" />
              Collapse
            </>
          ) : (
            <>
              <Expand className="w-3 h-3" />
              Expand
            </>
          )}
        </button>
      </div>
      <div className="overflow-hidden px-2 relative border-t-transparent rounded-t-none rounded-xl select-none">
        {!isExpanded && <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white to-transparent"></div>}
        <p
          ref={textRef}
          className={`prose prose-sm bg-white py-4 px-2 ${
            isExpanded 
              ? "overflow-visible" 
              : "max-h-[20vh] overflow-y-auto no-scrollbar"
          }`}
        >
          {streamingText}
        </p>
        {!isExpanded && <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent"></div>}
      </div>
    </div>
  );
};

export default ReasoningAnimation;
