import ReasoningAnimation from "@/features/reasoning-animation";

const ReasoningAnimationPage = () => {
  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col gap-2 absolute top-0 left-0 bg-white p-4">
        <h1 className="text-2xl font-bold">Reasoning Animation Simulator</h1>
        <p className="text-sm text-gray-500">
          This is a page that shows a reasoning animation. It is a animation
          simulation of the reasoning process of a LLM.
        </p>
      </div>
      <ReasoningAnimation />
    </div>
  );
};

export default ReasoningAnimationPage;
