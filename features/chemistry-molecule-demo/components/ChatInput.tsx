import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { SendHorizontal, Loader } from "lucide-react";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  status: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  status,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full flex-col">
      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
        <Badge
          variant="outline"
          className="text-xs border-green-300 text-green-700 dark:border-green-600 dark:text-green-300"
        >
          Chemistry AI
        </Badge>
        <span>•</span>
        <span>Molecular structure analysis enabled</span>
      </div>
      <div className="flex-1 relative">
        <Input
          className="pr-12 py-6 text-base rounded-full w-full border-green-200 focus:border-green-400 dark:border-green-800 dark:focus:border-green-600"
          value={input}
          placeholder="Ask about molecules, reactions, or chemistry concepts..."
          onChange={handleInputChange}
          disabled={isLoading}
          aria-label="Chemistry chat input"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim() || status === "streaming"}
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-green-600 hover:bg-green-700"
          aria-label="Send message"
        >
          {isLoading || status === "streaming" ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal className="h-4 w-4" />
          )}
        </Button>
      </div>
    </form>
  );
}; 