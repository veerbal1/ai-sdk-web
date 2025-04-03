import { TextGeneratorForm } from "@/features/text-generation/components/TextGeneratorForm";

export const maxDuration = 60;

export default async function Home() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <TextGeneratorForm />
    </div>
  );
}
