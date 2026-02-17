"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const QUESTIONS = [
  {
    id: "turning-point",
    category: "Turning Points",
    emoji: "🔄",
    question: "What moment changed how you see the world?",
    description: "Think about a time when your perspective shifted. It doesn't have to be dramatic — sometimes the smallest moments are the most revealing.",
    examples: [
      "A conversation that challenged your beliefs",
      "A failure that taught you something unexpected",
      "A moment when you realized something about yourself",
    ],
  },
  {
    id: "struggle-growth",
    category: "Struggle & Growth",
    emoji: "🌱",
    question: "What's a time you struggled and grew?",
    description: "Growth often comes from difficulty. What challenge pushed you to become who you are today?",
    examples: [
      "A skill you worked hard to develop",
      "A relationship you had to repair",
      "A fear you faced",
    ],
  },
  {
    id: "small-moment",
    category: "Small Moments",
    emoji: "✨",
    question: "What small, quiet moment reveals who you really are?",
    description: "The best essays often come from ordinary moments. What everyday scene captures something true about you?",
    examples: [
      "A ritual or habit that matters to you",
      "A conversation you keep thinking about",
      "A place where you feel most yourself",
    ],
  },
  {
    id: "curiosity",
    category: "Curiosity & Passion",
    emoji: "🔍",
    question: "What do you find yourself thinking about when your mind wanders?",
    description: "What questions, ideas, or interests pull at your attention? What could you talk about for hours?",
    examples: [
      "A problem you want to solve",
      "A subject you explore on your own",
      "Something you notice that others miss",
    ],
  },
  {
    id: "values",
    category: "Values & Beliefs",
    emoji: "💎",
    question: "What do you believe that most people your age don't?",
    description: "Your unique perspective is valuable. What conviction or value sets you apart?",
    examples: [
      "An unpopular opinion you hold",
      "A lesson you learned the hard way",
      "Something your experiences taught you",
    ],
  },
];

export default function DiscoverPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentStep) / QUESTIONS.length) * 100;
  const currentQuestion = QUESTIONS[currentStep];

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
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
    setResponses({ ...responses, [currentQuestion.id]: value });
  };

  const currentResponse = responses[currentQuestion?.id] || "";

  if (isComplete) {
    return <ResultsView responses={responses} />;
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
          <div className="text-sm text-slate-500">
            Step {currentStep + 1} of {QUESTIONS.length}
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="container mx-auto px-4 py-4">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-2">
          <CardHeader className="text-center pb-2">
            <Badge variant="secondary" className="w-fit mx-auto mb-2">
              {currentQuestion.emoji} {currentQuestion.category}
            </Badge>
            <CardTitle className="text-2xl leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {currentQuestion.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Examples */}
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm font-medium text-slate-600 mb-2">For example:</p>
              <ul className="space-y-1">
                {currentQuestion.examples.map((example, i) => (
                  <li key={i} className="text-sm text-slate-500 flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    {example}
                  </li>
                ))}
              </ul>
            </div>

            {/* Response */}
            <div>
              <Textarea
                placeholder="Write freely — this is just for you to explore. Don't worry about being perfect."
                value={currentResponse}
                onChange={(e) => handleResponseChange(e.target.value)}
                className="min-h-[200px] text-base"
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
                disabled={currentResponse.length < 20}
              >
                {currentStep === QUESTIONS.length - 1 ? "See My Stories →" : "Next →"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Skip hint */}
        <p className="text-center text-sm text-slate-400 mt-4">
          Write at least 20 characters to continue. The more detail, the better your story seeds.
        </p>
      </main>
    </div>
  );
}

function ResultsView({ responses }: { responses: Record<string, string> }) {
  const storySeeds = QUESTIONS.filter(q => responses[q.id]?.length > 50);

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
        {/* Results Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            ✨ Discovery Complete
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Your Story Seeds</h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            You've uncovered {storySeeds.length} potential essay foundations. 
            These are the raw materials for your authentic story.
          </p>
        </div>

        {/* Story Seeds */}
        <div className="space-y-6 mb-12">
          {QUESTIONS.map((question, index) => {
            const response = responses[question.id];
            if (!response || response.length < 20) return null;

            return (
              <Card key={question.id} className="border-l-4 border-l-amber-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{question.emoji}</span>
                    <Badge variant="outline">{question.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{question.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 whitespace-pre-wrap">{response}</p>
                  
                  {/* Potential strength indicator */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Story potential:</span>
                      <div className="flex items-center gap-1">
                        {response.length > 200 ? (
                          <Badge className="bg-green-100 text-green-700">Strong foundation</Badge>
                        ) : response.length > 100 ? (
                          <Badge className="bg-amber-100 text-amber-700">Good start</Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-600">Seed planted</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Next Steps */}
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
            <CardDescription>
              You've found your story seeds. Here's how to grow them into a powerful essay.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-700">1</div>
              <div>
                <p className="font-medium">Pick your strongest seed</p>
                <p className="text-sm text-slate-600">Which response surprised you? Which one has the most emotional truth?</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-700">2</div>
              <div>
                <p className="font-medium">Find the specific moment</p>
                <p className="text-sm text-slate-600">Zoom into a single scene. Where were you? What did you see, hear, feel?</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-700">3</div>
              <div>
                <p className="font-medium">Build your narrative arc</p>
                <p className="text-sm text-slate-600">Coming soon: Our Narrative Builder will help you structure your story.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" asChild>
            <Link href="/discover">Start Over</Link>
          </Button>
          <Button disabled>
            Build Narrative Arc (Coming Soon)
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
