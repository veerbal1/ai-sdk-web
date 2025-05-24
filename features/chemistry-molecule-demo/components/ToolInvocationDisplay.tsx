import React from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Atom } from "lucide-react";

interface ToolInvocationProps {
  toolInvocation: any; // Type this properly based on your tool invocation structure
}

export const ToolInvocationDisplay: React.FC<ToolInvocationProps> = ({
  toolInvocation,
}) => {
  return (
    <div className="space-y-3">
      {/* Tool invocation header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Atom className="h-4 w-4" />
        <span>Generating molecular structure...</span>
        {toolInvocation.state === "result" && (
          <Badge variant="outline" className="text-xs">
            Complete
          </Badge>
        )}
      </div>

      {/* Show generated image */}
      {toolInvocation.state === "result" &&
        toolInvocation.result?.success &&
        toolInvocation.result?.imageUrl && (
          <div className="space-y-2">
            <div className="relative rounded-lg overflow-hidden border border-green-200 dark:border-green-800">
              <img
                src={toolInvocation.result.imageUrl}
                alt={`Molecular structure: ${
                  toolInvocation.result.molecules?.join(", ") || "Unknown"
                }`}
                className="w-full h-auto max-w-md mx-auto block"
                onError={(e) => {
                  console.error("Failed to load molecule image:", e);
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="text-xs text-muted-foreground text-center">
              {toolInvocation.result.message}
              {toolInvocation.result.expiresIn && (
                <span> • Expires in {toolInvocation.result.expiresIn}</span>
              )}
            </div>
          </div>
        )}

      {/* Show error if tool failed */}
      {toolInvocation.state === "result" &&
        !toolInvocation.result?.success && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 dark:bg-red-950 dark:border-red-800">
            <div className="text-red-800 dark:text-red-200 text-sm">
              ❌ Failed to generate molecular structure
            </div>
            {toolInvocation.result?.error && (
              <div className="text-red-600 dark:text-red-400 text-xs mt-1">
                {toolInvocation.result.error}
              </div>
            )}
          </div>
        )}
    </div>
  );
}; 