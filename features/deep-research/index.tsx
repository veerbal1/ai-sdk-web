"use client"
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Markdown } from '@/shared/components/ui/markdown';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { cn } from '@/shared/lib/utils';
import { Message, useChat } from '@ai-sdk/react'
import { Loader, SendHorizonal } from 'lucide-react';
import { useEffect } from 'react';
import { useRef } from 'react';

const DeepResearch = () => {
    const { messages, input, handleInputChange, handleSubmit, status } = useChat({
        api: '/api/deep-research'
    })

    // Ref for scrolling to bottom
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const isLoading = status === 'streaming'
    const isDisabled = isLoading || !input.trim()


    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);
    return (
        <div className='w-full h-full overflow-hidden max-w-2xl mx-auto px-4'>
            <ScrollArea className="flex-grow h-[70vh] mb-4 pr-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {messages.length > 0
                        ? messages.map((m: Message) => (
                            <div
                                key={m.id}
                                className={cn(
                                    'flex flex-col items-start rounded-lg',
                                )}
                            >
                                <span className="font-semibold text-sm capitalize">
                                    {m.role === 'user' ? <span className='inline-flex items-center'>
                                        <span className='text-primary'>🫵</span>
                                        <span className='ml-2 text-sm'>You</span>
                                    </span> : <span className='inline-flex items-center'>
                                        <span className='text-primary inline-block bg-primary w-4 h-4 rounded-full'></span>
                                        <span className='ml-2 text-sm'>AI</span>
                                    </span>}
                                </span>
                                <Markdown content={m.content} />
                            </div>
                        ))
                        : (
                            <p className="text-muted-foreground text-center">Start the conversation by typing below.</p>
                        )}
                    {status === 'submitted' && !isLoading && (
                        <div className='flex flex-col items-start gap-2'>
                            <span className='inline-flex items-center'>
                                <span className='text-primary inline-block bg-primary w-4 h-4 rounded-full'></span>
                                <span className='ml-2 text-sm'>AI</span>
                            </span>
                            <span className='text-muted-foreground text-sm italic flex gap-1'><Loader className='w-4 h-4 animate-spin mr-2' />Thinking...</span>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full">
                <Input
                    className="flex-grow"
                    value={input}
                    placeholder="Ask anything..."
                    onChange={handleInputChange}
                    disabled={status === 'streaming'}
                    aria-label="Chat input"
                />
                <Button type="submit" disabled={isDisabled || !input.trim()} size="icon" aria-label="Send message">
                    <SendHorizonal className="h-4 w-4" />
                </Button>
            </form>
        </div>
    )
}

export default DeepResearch