import React from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Atom, FlaskConical } from "lucide-react";

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="relative mb-4">
        <Atom className="h-16 w-16 text-green-500 mb-2" />
        <FlaskConical className="h-8 w-8 text-green-400 absolute -bottom-1 -right-1" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Welcome to Chemistry Assistant</h3>
      <p className="text-muted-foreground max-w-md">
        Ask me about molecular structures, chemical reactions, organic chemistry,
        or any chemistry concepts. I can help explain complex molecules and their
        diagrams!
      </p>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <Badge variant="outline" className="text-xs">
          Molecular Diagrams
        </Badge>
        <Badge variant="outline" className="text-xs">
          Chemical Reactions
        </Badge>
        <Badge variant="outline" className="text-xs">
          Organic Chemistry
        </Badge>
        <Badge variant="outline" className="text-xs">
          IUPAC Naming
        </Badge>
      </div>
    </div>
  );
}; 