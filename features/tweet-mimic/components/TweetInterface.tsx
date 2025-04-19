'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { VerifiedBadge } from '@/shared/components/ui/verified-badge';
import { Tweet, Source } from '@/entities/tweet/types';
import { SendIcon, Loader2, LinkIcon } from "lucide-react";
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { Skeleton } from "@/shared/components/ui/skeleton";
import trumpImage from "../assets/images/trump.jpg";
import elonImage from "../assets/images/elon.jpg";
import navalImage from "../assets/images/naval.jpg";
import jordanImage from "../assets/images/jordan.jpg";
import billImage from "../assets/images/bill.jpg";
import garryImage from "../assets/images/garry.jpg";

const usersMetaData = {
    "Donald Trump": {
        name: "Donald Trump",
        handle: "realDonaldTrump",
        avatarUrl: trumpImage.src,
    },
    "Elon Musk": {
        name: "Elon Musk",
        handle: "elonmusk",
        avatarUrl: elonImage.src,
    },
    "Naval Ravikant": {
        name: "Naval",
        handle: "naval",
        avatarUrl: navalImage.src,
    },
    "Garry Tan": {
        name: "Garry Tan",
        handle: "garrytan",
        avatarUrl: garryImage.src,
    },
    "Jordan B. Peterson": {
        name: "Jordan B. Peterson",
        handle: "jordanbpeterson",
        avatarUrl: jordanImage.src,
    },
    "Bill Gates": {
        name: "Bill Gates",
        handle: "BillGates",
        avatarUrl: billImage.src,
    }
}

export const TweetInterface = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [sources, setSources] = useState<Source[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        setIsLoading(true);
        setTweets([]);
        setSources([]);
        try {
            const response = await fetch("/api/tweet-mimic", {
                method: "POST",
                body: JSON.stringify({ prompt: inputValue }),
            });

            if (!response.ok) {
                console.error("API request failed:", response.statusText);
                setTweets([
                    {
                        id: 'error-' + Date.now(),
                        name: 'System',
                        handle: 'error',
                        avatarUrl: '',
                        content: `Failed to generate tweets. Status: ${response.status}`,
                    }
                ]);
                return;
            }

            const responseData = await response.json();
            const data = responseData.tweets;
            const fetchedSources: Source[] = responseData.sources || [];

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

            setTweets(newTweetsData);
            setSources(fetchedSources);
            setInputValue("");
        } catch (error) {
            console.error("Error during tweet generation:", error);
            setTweets([
                {
                    id: 'error-' + Date.now(),
                    name: 'System',
                    handle: 'error',
                    avatarUrl: '',
                    content: `An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
                }
            ]);
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

            {/* Loading State: Sources Skeleton */}
            {isLoading && (
                <div className="mt-6 p-4 border border-border rounded-lg bg-card">
                    <Skeleton className="h-6 w-1/3 mb-4" /> {/* Skeleton for Accordion Trigger, added margin */}
                    <div className="space-y-2"> {/* Skeleton for Accordion Content */}
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
            )}

            {/* Sources Section - Render only when not loading and sources exist */}
            {!isLoading && sources && sources.length > 0 && (
                <Accordion type="single" collapsible className="w-full mt-6 border border-border rounded-lg bg-card">
                    <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger className="p-4 hover:no-underline">
                           Sources Found ({sources.length})
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-0">
                            <ul className="space-y-2">
                                {sources.map((source) => (
                                    <li key={source.id || source.url} className="text-sm">
                                        <a
                                            href={source.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-blue-500 hover:text-blue-700 hover:underline transition-colors"
                                        >
                                            <LinkIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="truncate">{source.title || source.url}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}

            {/* Loading State: Tweet Skeletons */}
            {isLoading && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {[...Array(6)].map((_, index) => ( // Show 6 skeleton tweets
                        <div key={index} className="flex space-x-3 p-4 border border-border rounded-lg bg-card">
                            <Skeleton className="h-10 w-10 rounded-full" /> {/* Avatar Skeleton */}
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-3/4" /> {/* Name/Handle Skeleton */}
                                <Skeleton className="h-4 w-full" /> {/* Content Line 1 Skeleton */}
                                <Skeleton className="h-4 w-5/6" /> {/* Content Line 2 Skeleton */}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tweet List - Render only when not loading and tweets exist */}
            {!isLoading && tweets.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {tweets.map((tweet: Tweet) => (
                        <div
                            key={tweet.id}
                            className="flex space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-150 bg-card"
                        >
                            {/* Tweet Author Avatar */}
                            <Avatar>
                                <AvatarImage src={tweet.avatarUrl} alt={tweet.name} />
                                <AvatarFallback>{tweet.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            {/* Tweet Content Area */}
                            <div className="flex-1">
                                <div className="flex items-center space-x-1">
                                    <span className="font-semibold text-card-foreground hover:underline cursor-pointer">{tweet.name}</span>
                                    <VerifiedBadge />
                                    <span className="text-sm text-muted-foreground">@{tweet.handle}</span>
                                </div>
                                {/* Tweet Text */}
                                <p className="mt-1 text-sm text-card-foreground whitespace-pre-wrap">{tweet.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}; 