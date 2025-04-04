'use client';

import { Card, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Source } from "../types";
import Link from "next/link";
import Image from "next/image";

interface SourceCardProps {
  source: Source;
}

export function SourceCard({ source }: SourceCardProps) {
  return (
    <Card className="overflow-hidden w-48 flex-shrink-0 pt-0">
      {source.image ? (
        <div className="relative h-24 w-full">
          <Image
            src={source.image}
            alt={source.title || source.url}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ) : (
        <div className="h-24 w-full bg-gray-200 flex items-center justify-center text-gray-500">
          {/* Placeholder for missing image */}
          <span>No Image</span> {/* Or an icon component */}
        </div>
      )}
      <CardHeader className="p-4 pt-2">
        <h3 className="text-lg font-semibold line-clamp-2 overflow-hidden">
          {source.title || source.url}
        </h3>
      </CardHeader>
      <CardFooter>
        <Link
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  );
} 