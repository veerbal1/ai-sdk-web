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
    <Card className="overflow-hidden">
      {source.image && (
        <div className="relative h-48 w-full">
          <Image
            src={source.image}
            alt={source.title || source.url}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <CardHeader>
        <h3 className="text-lg font-semibold line-clamp-2">
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