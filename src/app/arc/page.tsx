"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const ARC_STEPS = [
  {
    id: "hook",
    title: "The Hook",
    emoji: "🎣",
    instruction: "Drop us into a moment.",
    description: "Start with a vivid scene. Where are you? What's happening? Make us feel like we're there with you.",
    prompt: "Describe a specific moment — use sensory details. What do you see, hear, feel?",
    tips: [
      "Start in the middle of the action",
      "Use present tense for immediacy",
      "Avoid starting with 'I was...' or 'It was...'",
    ],
    example: "The sterile scent of the hospital corridor mixed with my nervous anticipation as I stepped into the emergency room.",
  },
  {
    id: "rising",
    title: "Rising Action",
    emoji: "📈",
    instruction: "Build the tension.",
    description: "What's at stake? What challenge or conflict are you facing? Let us feel the pressure.",
    prompt: "What was the challenge or conflict? Why did it matter to you?",
    tips: [
      "Show us what you wanted or needed",
      "Include obstacles or doubts",
      "Let us feel the emotional stakes",
    ],
    example: "Mr. Rodriguez was my first real patient interaction. I had rehearsed what to say, but nothing prepared me for the weight of his gaze — tired, yet searching for something I wasn't sure I could give.",
  },
  {
    id: "climax",
    title: "The Turning Point",
    emoji: "⚡",
    instruction: "What changed everything?",
    description: "This is the pivotal moment — the realization, decision, or event that shifted your perspective.",
    prompt: "What was the moment of change? What did you realize, decide, or discover?",
    tips: [
      "Be specific about the exact moment",
      "Show the internal shift, not just external events",
      "This is often a single sentence or scene",
    ],
    example: "Then he asked me about my dreams, not his prognosis. In that moment, I understood — he wasn't looking for a doctor. He was looking for a human.",
  },
  {
    id: "falling",
    title: "The Reflection",
    emoji: "💭",
    instruction: "What did you learn?",
    description: "How did this experience change you? What did you realize about yourself, others, or the world?",
    prompt: "What insight or growth came from this experience?",
    tips: [
      "Go beyond 'I learned that...'",
      "Connect to your values or beliefs",
      "Show how you're different now",
    ],
    example: "Through our conversations, I saw how compassion and curiosity can coexist — that medicine isn't just about saving lives, it's about witnessing them.",
  },
  {
    id: "conclusion",
    title: "The Forward Look",
    emoji: "🔮",
    instruction: "Where are you headed?",
    description: "Connect your story to your future. How does this experience shape who you'll become?",
    prompt: "How does this story connect to your path forward? What kind of person will you be?",
    tips: [
      "Be specific about your direction",
      "Don't just list goals — show purpose",
      "End with an image or line that resonates",
    ],
    example: "Now, when I imagine my future in medicine, I don't just see a white coat. I see a thousand conversations waiting to happen — each one a chance to be human first.",
  },
];

export default function ArcBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentStep) / ARC_STEPS.length) * 100;
  const currentArc = ARC_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < ARC_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleResponseChange = (value: string) => {
    setResponses({ ...responses, [currentArc.id]: value });
  };

  const currentResponse = responses[currentArc?.id] || "";

  if (isComplete) {
    return <EssayPreview responses={responses} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <span className="font-bold text-xl">Story Builder</span>
          </Link>
          <Badge variant="outline">Narrative Arc Builder</Badge>
        </div>
      </header>

      {/* Arc Visualization */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          {ARC_STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                index === currentStep ? "scale-110" : "opacity-50"
              } transition-all`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  index < currentStep
                    ? "bg-green-100 text-green-600"
                    : index === currentStep
                    ? "bg-amber-100 text-amber-600 ring-2 ring-amber-400"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {index < currentStep ? "✓" : step.emoji}
              </div>
              <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2 max-w-md mx-auto" />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 max-w-2xl">
        <Card className="border-2">
          <CardHeader className="text-center pb-2">
            <div className="text-4xl mb-2">{currentArc.emoji}</div>
            <CardTitle className="text-2xl">{currentArc.title}</CardTitle>
            <p className="text-amber-600 font-medium">{currentArc.instruction}</p>
            <CardDescription className="text-base mt-2">
              {currentArc.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Example */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-medium text-green-700 mb-2">✨ Example:</p>
              <p className="text-sm text-green-800 italic">"{currentArc.example}"</p>
            </div>

            {/* Tips */}
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm font-medium text-slate-600 mb-2">Tips:</p>
              <ul className="space-y-1">
                {currentArc.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-slate-500 flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Writing Area */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                {currentArc.prompt}
              </label>
              <Textarea
                placeholder="Write your section here..."
                value={currentResponse}
                onChange={(e) => handleResponseChange(e.target.value)}
                className="min-h-[180px] text-base"
              />
              <p className="text-xs text-slate-400 mt-2 text-right">
                {currentResponse.length > 0 && `${currentResponse.length} characters`}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                ← Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentResponse.length < 30}
              >
                {currentStep === ARC_STEPS.length - 1 ? "Preview Essay →" : "Next Section →"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function EssayPreview({ responses }: { responses: Record<string, string> }) {
  const fullEssay = ARC_STEPS.map(step => responses[step.id]).filter(Boolean).join("\n\n");
  const wordCount = fullEssay.split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <span className="font-bold text-xl">Story Builder</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            🎉 Draft Complete
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Your Essay Draft</h1>
          <p className="text-slate-600">
            {wordCount} words • {ARC_STEPS.length} sections
          </p>
        </div>

        {/* Essay Sections */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            {ARC_STEPS.map((step, index) => (
              <div key={step.id} className="mb-6 last:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <span>{step.emoji}</span>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    {step.title}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {responses[step.id] || "(empty)"}
                </p>
                {index < ARC_STEPS.length - 1 && (
                  <div className="border-b border-dashed border-slate-200 mt-6" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Full Essay View */}
        <Card className="mb-8 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Full Essay (Copy-Ready)</CardTitle>
            <CardDescription>Your narrative without section markers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 rounded-lg p-6 font-serif text-slate-800 leading-relaxed whitespace-pre-wrap">
              {fullEssay}
            </div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigator.clipboard.writeText(fullEssay)}
            >
              📋 Copy to Clipboard
            </Button>
          </CardContent>
        </Card>

        {/* Word Count Guide */}
        <Card className="bg-amber-50 border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Word Count Check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span>Your essay: <strong>{wordCount} words</strong></span>
              <Badge variant={wordCount >= 250 && wordCount <= 650 ? "default" : "secondary"}>
                {wordCount < 250 ? "Expand more" : wordCount > 650 ? "Consider trimming" : "Good length!"}
              </Badge>
            </div>
            <p className="text-sm text-slate-600 mt-2">
              Common App essays should be 250-650 words. Most successful essays are 500-650 words.
            </p>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/arc">Edit Draft</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/discover">Find Another Story</Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          © 2026 Story Builder. Your story, your voice, your future.
        </div>
      </footer>
    </div>
  );
}
