export interface Source {
  title?: string;
  url: string;
  image?: string | null;
}

export interface TextGenerationResponse {
  text: string;
  sources: Source[];
} 