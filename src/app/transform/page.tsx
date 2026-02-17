"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const GENERIC_PATTERNS = [
  { pattern: /i learned (a lot|so much)/i, suggestion: "What specifically did you learn? Show us through a moment." },
  { pattern: /it was (hard|difficult|challenging)/i, suggestion: "What made it hard? What did that feel like in your body?" },
  { pattern: /i grew as a person/i, suggestion: "How exactly? What's different about you now?" },
  { pattern: /i realized that/i, suggestion: "Great — but show us the moment of realization. Where were you?" },
  { pattern: /i am passionate about/i, suggestion: "Don't tell us you're passionate — show us in action." },
  { pattern: /this experience taught me/i, suggestion: "What's one specific scene that captures this lesson?" },
  { pattern: /i felt (happy|sad|nervous|excited)/i, suggestion: "Show the feeling physically. What happened in your body?" },
  { pattern: /it changed my life/i, suggestion: "How? Be specific about what's different now." },
];

const SENSORY_PROMPTS = [
  { sense: "👁️ See", question: "What did you see? Colors, shapes, movement, faces?" },
  { sense: "👂 Hear", question: "What did you hear? Voices, sounds, silence?" },
  { sense: "✋ Feel", question: "What did you physically feel? Temperature, texture, your body?" },
  { sense: "👃 Smell", question: "Any smells? Places often have distinct scents." },
  { sense: "💭 Think", question: "What was going through your mind in that exact moment?" },
];

const BEFORE_AFTER_EXAMPLES = [
  {
    before: "I learned a lot about myself.",
    after: "My palms were sweating as I reached for the microphone. I wasn't sure if I would remember a single word.",
    why: "Shows the moment of growth rather than stating it.",
  },
  {
    before: "I am passionate about science.",
    after: "At 2 AM, I was still adjusting the microscope, convinced that one more slide would reveal the answer I'd been chasing for weeks.",
    why: "Demonstrates passion through action, not declaration.",
  },
  {
    before: "It was a difficult time for my family.",
    after: "The kitchen fell silent when Dad set down his fork. None of us knew what to say, so we just listened to the clock.",
    why: "Creates a scene we can feel rather than a statement to accept.",
  },
  {
    before: "I realized I wanted to help people.",
    after: "When Mrs. Chen grabbed my hand and said 'you're the first person who actually listened,' something clicked into place.",
    why: "Grounds the realization in a specific human moment.",
  },
];

export default function TransformPage() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<{ issues: string[]; suggestions: string[] } | null>(null);

  const analyzeText = () => {
    const issues: string[] = [];
    const suggestions: string[] = [];

    GENERIC_PATTERNS.forEach(({ pattern, suggestion }) => {
      if (pattern.test(input)) {
        const match = input.match(pattern);
        if (match) {
          issues.push(`"${match[0]}"`);
          suggestions.push(suggestion);
        }
      }
    });

    setAnalysis({ issues, suggestions });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <span className="font-bold text-xl">Story Builder</span>
          </Link>
          <Badge variant="outline">Show Don't Tell</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            ✨ Transform Your Writing
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Show, Don't Tell</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Great essays don't tell us you learned something — they show us the moment it happened. 
            Transform generic statements into vivid scenes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paste Your Text</CardTitle>
                <CardDescription>
                  Enter a paragraph from your essay to check for "telling" language.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your essay paragraph here... We'll identify generic phrases that could be stronger."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[200px]"
                />
                <Button onClick={analyzeText} disabled={input.length < 20} className="w-full">
                  🔍 Analyze My Writing
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysis && (
              <Card className={analysis.issues.length > 0 ? "border-amber-300 bg-amber-50" : "border-green-300 bg-green-50"}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {analysis.issues.length > 0 ? "🎯 Found Some Opportunities" : "✅ Looking Good!"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysis.issues.length > 0 ? (
                    <div className="space-y-4">
                      {analysis.issues.map((issue, i) => (
                        <div key={i} className="bg-white rounded-lg p-4 border">
                          <p className="font-medium text-amber-700">Found: {issue}</p>
                          <p className="text-sm text-slate-600 mt-1">💡 {analysis.suggestions[i]}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-green-700">No obvious "telling" patterns detected. Nice work!</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Help Section */}
          <div className="space-y-6">
            {/* Sensory Prompts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Sensory Detail</CardTitle>
                <CardDescription>
                  When you find a generic statement, ask yourself these questions:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {SENSORY_PROMPTS.map((prompt, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-lg">{prompt.sense.split(" ")[0]}</span>
                      <div>
                        <span className="font-medium">{prompt.sense.split(" ")[1]}: </span>
                        <span className="text-slate-600">{prompt.question}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Before/After Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Before → After Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {BEFORE_AFTER_EXAMPLES.map((example, i) => (
                  <div key={i} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-2 mb-2">
                      <Badge variant="outline" className="bg-red-50 text-red-600 shrink-0">Before</Badge>
                      <p className="text-sm text-slate-500 italic">"{example.before}"</p>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <Badge variant="outline" className="bg-green-50 text-green-600 shrink-0">After</Badge>
                      <p className="text-sm text-slate-700">"{example.after}"</p>
                    </div>
                    <p className="text-xs text-amber-600 ml-14">↳ {example.why}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Tips */}
        <Card className="mt-8 bg-slate-50">
          <CardHeader>
            <CardTitle>The Show Don't Tell Rule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="font-medium text-red-600 mb-1">❌ Don't write:</p>
                <p className="text-sm text-slate-600">"I was nervous."</p>
              </div>
              <div>
                <p className="font-medium text-green-600 mb-1">✅ Do write:</p>
                <p className="text-sm text-slate-600">"My hands trembled as I turned the doorknob."</p>
              </div>
              <div>
                <p className="font-medium text-amber-600 mb-1">💡 Why it works:</p>
                <p className="text-sm text-slate-600">Physical details let readers feel the emotion themselves.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" asChild>
            <Link href="/discover">Find Stories</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/arc">Build Narrative Arc</Link>
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
