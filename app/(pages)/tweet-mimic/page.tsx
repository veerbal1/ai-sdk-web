// Removed 'use client'

// Removed client-side imports like useState, SendIcon, specific ui components
import React from "react";
// Removed Tweet type import as it's used in client component
// Removed VerifiedBadge import as it's used in client component
import { TweetInterface } from "@/features/tweet-mimic/components/TweetInterface";

// Removed dummyTweets generation
// Removed local state and handleSubmit function

const TweetMimicPage = () => {

  return (
    // Basic layout container - kept max-w-4xl for consistency
    <div className="max-w-4xl mx-auto p-4 space-y-6 bg-background text-foreground">
      <h1 className="text-2xl font-bold text-center mb-6">Tweet Mimic</h1>

      {/* Render the client component */}
      <TweetInterface />

      {/* Removed Separator and Tweet list rendering - moved to TweetInterface */}
    </div>
  );
};

export default TweetMimicPage; // Renamed export for clarity