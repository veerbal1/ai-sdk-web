"use client"

import { Button } from '@/shared/components/ui/button'
import { useChat, type Message } from '@ai-sdk/react'
import React, { useEffect } from 'react'
import { Loader2, Bot, User, Circle, Terminal, Send } from 'lucide-react'
import { Input } from '@/shared/components/ui/input'
import { Markdown } from '@/shared/components/ui/markdown'

// Define a specific type for message parts, excluding undefined possibility during indexing
type MessagePart = Exclude<Message['parts'], undefined>[number];

// Define MessagePartDisplay component for cleaner rendering
const MessagePartDisplay = ({ part }: { part: MessagePart }) => {
    if (part.type === 'text') {
        // Use Markdown for text parts
        return <Markdown content={part.text} />
    } else if (part.type === 'tool-invocation') {
        // Displaying the tool invocation clearly
        return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-2 rounded my-1">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>
                    Calling tool:{' '}
                    <code className="font-mono bg-background px-1 rounded">
                        {part.toolInvocation.toolName}
                    </code>
                    ...
                    {/* Arguments */}
                    {
                        part.toolInvocation?.args && (
                            <span className="block mt-1 ml-6 text-xs text-muted-foreground">
                                <span className="font-semibold text-foreground">Args:</span>
                                <code className="ml-1 font-mono bg-background px-1 py-0.5 rounded whitespace-pre-wrap break-all">
                                    {/* Display stringified args */}
                                    {JSON.stringify(part.toolInvocation.args)}
                                </code>
                            </span>
                        )
                    }
                    {/* Result */}
                    {
                        // @ts-expect-error - result is not defined on ToolInvocation
                        part.toolInvocation?.result && (
                            <span className="block mt-1 ml-6 text-xs text-muted-foreground">
                                <span className="font-semibold text-foreground">Result:</span>
                                <code className="ml-1 font-mono bg-background px-1 py-0.5 rounded">
                                    {/* Display stringified result - Truncate if needed? Consider responsiveness */}
                                    {/* @ts-expect-error - result is not defined on ToolInvocation */}
                                    {JSON.stringify(part.toolInvocation.result)}
                                </code>
                            </span>
                        )
                    }
                </span>
            </div>
        )
    }
    return null // Handle other part types if necessary
}

// Helper to safely parse JSON
const tryParseJSON = (jsonString: string | null | undefined): any => {
    if (!jsonString) return null;
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        return jsonString; // Return original string if parsing fails
    }
}

const MultipleToolCalling = () => {
    const { handleSubmit, messages, status, input, handleInputChange } = useChat({
        api: '/api/dynamic-tool-calling',
    })

    const isLoading = status === 'streaming'

    console.log('messages', messages)

    return (
        <div className="flex h-full w-full max-w-2xl mx-auto flex-col items-center py-8 px-4">
            <h1 className="text-2xl font-semibold mb-2">AI SDK - Dynamic Tool Calling</h1>
            <p className="text-muted-foreground text-center">
                It only have a single tool, but it dynamically creates the function for calculations and calls it with the relevent arguments.
            </p>

            {/* Chat Area */}
            <div className="flex-1 w-full mb-4 overflow-y-auto rounded-lg border bg-background p-4 space-y-4">
                {messages.length === 0 && !isLoading && (
                    <p className="text-muted-foreground text-center">
                        Test it out by asking anything calculation related.
                    </p>
                )}
                {messages.map((message, index) => {
                    const isToolResultMessage = (message.role as string) === 'tool';
                    const toolName = isToolResultMessage ? message.toolInvocations?.[0]?.toolName ?? 'unknown tool' : '';
                    const toolResult = isToolResultMessage ? tryParseJSON(message.content) : null;

                    return (
                        <div
                            key={index}
                            className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''
                                } ${isToolResultMessage && index > 0 && (messages[index - 1].role as string) === 'tool' ? 'mt-2' : ''
                                }`}
                        >
                            {/* Assistant Icon */}
                            {message.role === 'assistant' && !isToolResultMessage && (
                                <span className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow">
                                    <Bot className="h-5 w-5" />
                                </span>
                            )}
                            {/* Message Bubble or Tool Result Display */}
                            {isToolResultMessage ? (
                                <div className="w-full flex items-start gap-2 text-xs text-muted-foreground p-2 bg-muted rounded">
                                    <Terminal className="h-4 w-4 mt-0.5 text-foreground flex-shrink-0" />
                                    <div className="flex-grow">
                                        Tool Result (<code className="font-mono bg-background px-1 rounded">{toolName}</code>):
                                        <pre className="mt-1 text-[11px] whitespace-pre-wrap break-all bg-background p-1.5 rounded">
                                            {typeof toolResult === 'string' ? toolResult : JSON.stringify(toolResult, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`rounded-lg px-3 py-2 text-sm max-w-[80%] break-words ${message.role === 'user'
                                        ? 'bg-primary/10 text-primary-foreground'
                                        : 'bg-background'
                                        }`}
                                >
                                    {/* Display message content or parts */}
                                    {message.content ? (
                                        // Use Markdown for direct message content
                                        <Markdown content={message.content} />
                                    ) : (
                                        message.parts && message.parts.map((part, partIndex) => (
                                            <MessagePartDisplay key={partIndex} part={part} />
                                        ))
                                    )}
                                </div>
                            )}
                            {/* User Icon */}
                            {message.role === 'user' && (
                                <span className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-muted text-muted-foreground shadow">
                                    <User className="h-5 w-5" />
                                </span>
                            )}
                        </div>
                    );
                })}
                {/* Loading indicator at the end when assistant is processing */}
                {status === 'submitted' && !isLoading && (
                    <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow">
                            <Bot className="h-5 w-5" />
                        </span>
                        <div className="rounded-lg px-3 py-2 text-sm bg-muted flex items-center gap-2">
                            <Circle className="h-2 w-2 fill-current animate-bounce delay-100" />
                            <Circle className="h-2 w-2 fill-current animate-bounce delay-200" />
                            <Circle className="h-2 w-2 fill-current animate-bounce delay-300" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="w-full flex gap-2 items-center">
                {/* Keep the hidden input approach */}
                <Input
                    value={input}
                    className="w-full"
                    onChange={handleInputChange}
                    placeholder='Ask anything calculation related...'
                />
                <Button type="submit" disabled={isLoading || !input} size="icon">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </>
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                </Button>
            </form>
        </div>
    )
}

export default MultipleToolCalling