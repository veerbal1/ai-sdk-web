"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CheckCircle2, Loader, Expand, Minimize } from "lucide-react";

const content = `Flicker was a fox. He lived in Whispering Woods. He was not the biggest fox, and he was not the strongest. But Flicker was very, very clever.

His biggest wish right now was to get some eggs. Farmer McGregor had a hen named Henrietta. People said Henrietta’s eggs were the best. The problem was Farmer McGregor’s new dog, Brutus. Brutus was a big, noisy dog. He always watched the chicken coop, where Henrietta lived.

For many days, Flicker watched the farm. He learned when Brutus walked around. He learned when Farmer McGregor gave water to the animals. He also saw that Brutus loved one thing very much: an old red ball.

One sunny morning, Flicker decided it was time. The night before, he had made a very small hole at the back of the chicken coop. It was just big enough for a fox.

First, Flicker needed to move Brutus. He went to the edge of the farm. He made a high, sad sound, like a small animal in trouble. Brutus heard it and ran, barking loudly. When Brutus came around the corner of the house, Flicker quickly pushed the red ball with his nose. The ball rolled down a small hill towards the duck pond.

Brutus stopped barking. He looked around. The sad noise was gone. But there was his red ball, near the water! He wanted to be a good guard, but he really wanted his ball. The ball won. Brutus ran to get it.

Now Brutus was busy. Flicker ran to the barn. Farmer McGregor was inside, cleaning. The barn door was open a little bit. Flicker went in quietly. He knew the farmer kept a bag of dry corn there. He pushed the bag, and some corn fell out. He made a trail of corn from the barn, past the chicken coop, and to the fence at the edge of the farm.

Next, he went to the chicken coop. He went in through the small hole he made. Henrietta made an unhappy clucking sound. Flicker gently pushed her. He didn’t want to eat Henrietta. He wanted her to help him.

He guided Henrietta out of the hole and onto the trail of corn. Henrietta loved corn. She happily started eating the corn along the trail.

Just then, Brutus came back. He had his red ball in his mouth. He saw the trail of corn. And at the end of the trail, he saw Henrietta eating corn near the fence. Brutus dropped his ball. This was a new game! He started to bark, a happy "look what I found!" bark.

Farmer McGregor heard Brutus and came out of the barn. He saw the corn. He saw Henrietta near the fence. He saw Brutus "guarding" her. "Well, look at that!" said the farmer. "Silly Henrietta, you walked away again. Good boy, Brutus, for finding her!" He petted Brutus. Brutus was very proud.

While the farmer was busy with Henrietta and praising Brutus, Flicker went back. No one saw him. He went into the chicken coop again. It was empty and quiet. He carefully took three large, beautiful eggs. He put them in some soft grass he had ready.

He went out through his small hole and ran back to the woods. Farmer McGregor was leading Henrietta back to the coop. He did not know about the clever fox.

That evening, Flicker ate the wonderful eggs. He was very happy. Being clever was even better than eating tasty eggs!`;

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
    <div className="flex flex-col gap-2 border rounded-xl p-2 w-full min-h-[100px] max-w-[65ch] overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isStreaming ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <p className="text-sm font-medium text-gray-700">Reasoning...</p>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <p className="text-sm font-medium text-gray-700">
                Reasoned a few seconds
              </p>
            </>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors cursor-pointer"
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
          className={`prose prose-sm bg-white py-4 px-2 whitespace-pre-wrap no-scrollbar ${
            isExpanded 
              ? "overflow-visible max-h-[50vh] overflow-y-auto" 
              : "max-h-[20vh] overflow-y-auto"
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
