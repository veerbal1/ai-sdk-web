"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

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
  
  useEffect(() => {
    const words = content.split(' ');
    let currentIndex = 0;
    
    const streamWords = () => {
      if (currentIndex < words.length) {
        setStreamingText(prev => prev + (prev ? ' ' : '') + words[currentIndex]);
        currentIndex++;
        setTimeout(streamWords, 20); // Add a word every 100ms
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
          overwrite: true // Overwrite any existing scroll animations
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
    <div className="overflow-hidden px-2 relative border rounded-xl select-none">
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white to-transparent"></div>
      <p 
        ref={textRef}
        className="prose prose-sm bg-white max-h-[20vh] overflow-y-auto py-4 px-2 no-scrollbar"
      >
        {streamingText}
      </p>
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default ReasoningAnimation;
