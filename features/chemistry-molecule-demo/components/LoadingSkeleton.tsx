import React from "react";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { FlaskConical } from "lucide-react";

export const LoadingSkeleton = () => (
  <div className="flex items-start gap-3">
    <Avatar className="h-8 w-8">
      <AvatarFallback>
        <FlaskConical className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
); 