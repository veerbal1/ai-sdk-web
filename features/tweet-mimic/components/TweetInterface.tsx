'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { VerifiedBadge } from '@/shared/components/ui/verified-badge';
import { Tweet } from '@/entities/tweet/types';
import { SendIcon } from "lucide-react";
import React, { useState } from "react";

// Interface removed from here as it's imported

// Generate 10 dummy tweets (kept here for simplicity, could be passed as props)
const dummyTweets: Tweet[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  handle: `user${i + 1}`,
  avatarUrl: `https://api.dicebear.com/8.x/lorelei/svg?seed=${i + 1}`, // Using DiceBear for dummy avatars
  content: `This is dummy tweet number ${i + 1
    }. Just setting up the UI! #Nextjs #TailwindCSS`,
}));


export const TweetInterface = () => {
  const [inputValue, setInputValue] = useState<string>("");
  // Initialize state with dummy tweets
  const [tweets, setTweets] = useState<Tweet[]>(dummyTweets);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // Don't submit empty tweets

    // Placeholder for actual tweet submission logic
    console.log("New tweet content:", inputValue);

    // Add the new tweet to the list (example)
    const newTweet: Tweet = {
      id: Date.now(), // Use a more robust ID in a real app
      name: "Veerbal Singh", // Placeholder - Use actual logged-in user data
      handle: "VeerbalSingh", // Placeholder
      avatarUrl: "/me.jpg", // Placeholder
      content: inputValue,
    };
    setTweets([newTweet, ...tweets]);

    setInputValue(""); // Clear input field
  };

  return (
    <>
      {/* Input Section */}
      <form onSubmit={handleSubmit} className="flex items-start space-x-3 p-4 border border-border rounded-lg bg-card">
         <Avatar className="mt-1"> {/* Align avatar slightly */}
          <AvatarImage src="/me.jpg" alt="Veerbal's Profile Picture" />
          <AvatarFallback>VS</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Input
            type="text"
            placeholder="What's happening? e.g Trade Wars etc."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!inputValue.trim()} size="sm">
              <SendIcon className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </div>
        </div>
      </form>

      <Separator />

      {/* Tweet List - Changed to Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Updated class for grid layout */}
        {/* Render tweets from state */}
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="flex space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-150 bg-card" // Added bg-card for consistency
          >
            {/* Tweet Author Avatar */}
            <Avatar>
              <AvatarImage src={tweet.avatarUrl} alt={tweet.name} />
              <AvatarFallback>{tweet.name.substring(0, 2).toUpperCase()}</AvatarFallback> {/* Fallback with initials */}
            </Avatar>
            {/* Tweet Content Area */}
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-card-foreground hover:underline cursor-pointer">{tweet.name}</span>
                <VerifiedBadge /> {/* Added verified badge */}
                <span className="text-sm text-muted-foreground">@{tweet.handle}</span>
                {/* Optional: Add timestamp */}
                {/* <span className="text-sm text-muted-foreground">· 1h</span> */}
              </div>
              {/* Tweet Text */}
              <p className="mt-1 text-sm text-card-foreground whitespace-pre-wrap">{tweet.content}</p> {/* Handle line breaks */}
              {/* Optional: Add action buttons (reply, retweet, like) */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}; 