import { TextGeneratorForm } from "@/features/text-generation/components/TextGeneratorForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Web Search Agent',
    description: 'AI-powered web search agent that generates text content with relevant sources',
    keywords: 'web search, AI agent, text generation, content research',
    openGraph: {
        title: 'Web Search Agent',
        description: 'AI-powered web search agent that generates text content with relevant sources',
        type: 'website'
    }
}

const WebSearchAgentPage = () => {
    return <TextGeneratorForm />
}

export default WebSearchAgentPage