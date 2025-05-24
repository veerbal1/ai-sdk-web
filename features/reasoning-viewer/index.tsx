import { CheckCircle2, Expand, Loader, Minimize } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ReasoningViewer = ({ content }: { content: string }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isStreaming, setIsStreaming] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Update streaming state based on content changes
  useEffect(() => {
    // Content is changing, so we're streaming
    setIsStreaming(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a timeout to mark streaming as false after content stops changing
    timeoutRef.current = setTimeout(() => {
      setIsStreaming(false);
    }, 1000); // 1 second delay after content stops changing

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content]);

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
  }, [content]);

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
        {!isExpanded && (
          <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white to-transparent"></div>
        )}
        <p
          ref={textRef}
          className={`prose prose-sm bg-white py-4 px-2 whitespace-pre-wrap no-scrollbar ${
            isExpanded
              ? "overflow-visible max-h-[50vh] overflow-y-auto"
              : "max-h-[20vh] overflow-y-auto"
          }`}
        >
          {content}
        </p>
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent"></div>
        )}
      </div>
    </div>
  );
};

export default ReasoningViewer;
