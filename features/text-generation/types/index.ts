export interface Source {
  title?: string;
  url: string;
}

export interface TextGenerationResponse {
  text: string;
  sources: Source[];
} 