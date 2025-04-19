'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { VerifiedBadge } from '@/shared/components/ui/verified-badge';
import { Tweet } from '@/entities/tweet/types';
import { SendIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";
import trumpImage from "../assets/images/trump.jpg";
import elonImage from "../assets/images/elon.jpg";
import navalImage from "../assets/images/naval.jpg";
import jordanImage from "../assets/images/jordan.jpg";
import billImage from "../assets/images/bill.jpg";
import steveImage from "../assets/images/steve.jpg";

const usersMetaData = {
    "Donald Trump": {
        name: "Donald Trump",
        handle: "DonaldTrump",
        avatarUrl: trumpImage.src,
    },
    "Elon Musk": {
        name: "Elon Musk",
        handle: "ElonMusk",
        avatarUrl: elonImage.src,
    },
    "Naval Ravikant": {
        name: "Naval Ravikant",
        handle: "NavalRavikant",
        avatarUrl: navalImage.src,
    },
    "Jordan B. Peterson": {
        name: "Jordan B. Peterson",
        handle: "JordanBPeterson",
        avatarUrl: jordanImage.src,
    },
    "Bill Gates": {
        name: "Bill Gates",
        handle: "BillGates",
        avatarUrl: billImage.src,
    },
    "Steve Jobs": {
        name: "Steve Jobs",
        handle: "SteveJobs",
        avatarUrl: steveImage.src,
    }
}

export const TweetInterface = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        setIsLoading(true);
        try {
            const response = await fetch("/api/tweet-mimic", {
                method: "POST",
                body: JSON.stringify({ prompt: inputValue }),
            });

            if (!response.ok) {
                console.error("API request failed:", response.statusText);
                setTweets([{
                    id: 'error-' + Date.now(),
                    name: 'System',
                    handle: 'error',
                    avatarUrl: '',
                    content: `Failed to generate tweets. Status: ${response.status}`,
                }, ...tweets]);
                return;
            }

            const data = await response.json();

            const newTweetsData = Object.keys(data).map((key) => {
                const metaDataKey = key as keyof typeof usersMetaData;
                const meta = usersMetaData[metaDataKey];
                if (!meta) {
                    console.warn(`Metadata not found for key: ${key}`);
                    return null;
                }
                const tweet: Tweet = {
                    id: meta.name.toLowerCase().replace(/\s+/g, '') + '-' + Date.now(),
                    name: meta.name,
                    handle: meta.handle,
                    avatarUrl: meta.avatarUrl,
                    content: data[key as keyof typeof data] as string,
                };
                return tweet;
            }).filter((item): item is Tweet => item !== null);

            setTweets(prevTweets => [...newTweetsData, ...prevTweets]);
            setInputValue("");
        } catch (error) {
            console.error("Error during tweet generation:", error);
            setTweets([{
                id: 'error-' + Date.now(),
                name: 'System',
                handle: 'error',
                avatarUrl: '',
                content: `An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
            }, ...tweets]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Input Section */}
            <form onSubmit={handleSubmit} className="flex items-start space-x-3 p-4 border border-border rounded-lg bg-card w-full">
                <Avatar className="mt-1"> {/* Align avatar slightly */}
                    <AvatarImage src="/me.jpg" alt="Veerbal's Profile Picture" />
                    <AvatarFallback>VS</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2 w-full">
                    <Input
                        type="text"
                        placeholder="What's happening? e.g Trade Wars etc."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={!inputValue.trim() || isLoading} size="sm">
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <SendIcon className="w-4 h-4 mr-2" />
                            )}
                            {isLoading ? 'Generating...' : 'Generate'}
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