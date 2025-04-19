import React from "react";
import { TweetInterface } from "@/features/tweet-mimic/components/TweetInterface";

const TweetMimicPage = () => {

  return (
    // Basic layout container - kept max-w-4xl for consistency
    <div className="max-w-4xl mx-auto p-4 space-y-6 bg-background text-foreground w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Tweet Mimic</h1>

      {/* Feature Description */}
      <p className="text-center text-muted-foreground">
        Enter a topic, and this tool will generate tweets mimicking the distinctive styles of various public figures. 
        Currently, it can generate tweets in the style of: Donald Trump, Elon Musk, Naval Ravikant, Garry Tan, Jordan B. Peterson, and Bill Gates. 
        It also attempts to find relevant source links for the generated content.
      </p>

      {/* Render the client component */}
      <TweetInterface />
    </div>
  );
};

export default TweetMimicPage;