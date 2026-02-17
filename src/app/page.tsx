import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <span className="font-bold text-xl">Story Builder</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900">
              Log in
            </Link>
            <Button asChild>
              <Link href="/signup">Start Your Story</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          ✨ Discover what makes you unforgettable
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
          Find Your<br />
          <span className="text-amber-600">Authentic Story</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          College consultants charge $3,000-$50,000 to help students find their narrative. 
          Story Builder guides you through the same process — powered by AI, priced for everyone.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/discover">Start Discovering</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#how-it-works">How It Works</Link>
          </Button>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">The hardest question in admissions:</h2>
            <p className="text-2xl text-slate-600 italic mb-8">
              &ldquo;What makes you unique?&rdquo;
            </p>
            <p className="text-lg text-slate-600 mb-6">
              Most students freeze. They list activities. They sound like everyone else.
              <br /><br />
              The students who get into top schools? They tell a <strong>compelling story</strong> — 
              one that connects their experiences into a clear narrative about who they are.
            </p>
            <p className="text-lg font-medium text-amber-700">
              Story Builder helps you discover that story.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          How Story Builder Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <StepCard
            number="1"
            title="Reflect"
            description="Answer guided questions about your values, experiences, and turning points."
          />
          <StepCard
            number="2"
            title="Map"
            description="Input your activities. Our AI identifies connecting themes across your life."
          />
          <StepCard
            number="3"
            title="Discover"
            description="See patterns you'd miss. Find your unique angle — what makes you, you."
          />
          <StepCard
            number="4"
            title="Apply"
            description="Get essay topics tailored to YOUR story, matched to Common App prompts."
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What you get
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              emoji="🔍"
              title="Self-Discovery Modules"
              description="Values clarification, turning points, passion mapping — the exercises top consultants use."
            />
            <FeatureCard
              emoji="🎯"
              title="Activity → Story Mapping"
              description="See how your experiences ladder together. Find your unique 'spike.'"
            />
            <FeatureCard
              emoji="💡"
              title="10+ Essay Topics"
              description="Generated from YOUR life — not generic prompts. Ranked by uniqueness."
            />
            <FeatureCard
              emoji="📋"
              title="Narrative Blueprint"
              description="Your personal positioning statement + themes with supporting evidence."
            />
            <FeatureCard
              emoji="✨"
              title="AI-Powered Insights"
              description="Pattern recognition a human would miss. Authenticity scoring."
            />
            <FeatureCard
              emoji="🎓"
              title="Common App Ready"
              description="Your story, matched to all 7 Common App prompts."
            />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
          <p className="text-lg text-slate-600 mb-4">
            We believe in <strong>scaffolding, not writing</strong>.
          </p>
          <p className="text-slate-600">
            Story Builder helps you discover and articulate your story — it never writes for you. 
            That would be unethical, detectable, and counterproductive. Your voice is your greatest asset. 
            We just help you find it.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-amber-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <PricingCard
              title="Free"
              price="$0"
              description="Get started"
              features={["Values exercise", "1 theme identified", "Basic essay topic"]}
            />
            <PricingCard
              title="Starter"
              price="$49"
              description="Most popular"
              features={["Full discovery modules", "5 essay topics", "Theme mapping", "Activity analysis"]}
              featured
            />
            <PricingCard
              title="Complete"
              price="$149"
              description="Everything"
              features={["All Starter features", "Narrative blueprint", "10+ essay topics", "Common App matching", "Export & share"]}
            />
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Your Writing Toolkit</h2>
        <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Three powerful tools to take you from blank page to polished essay.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-amber-300">
            <CardHeader>
              <div className="text-4xl mb-2">🔍</div>
              <CardTitle>Story Finder</CardTitle>
              <CardDescription>
                Discover your best stories through guided reflection prompts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/discover">Start Discovery</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-amber-300">
            <CardHeader>
              <div className="text-4xl mb-2">📐</div>
              <CardTitle>Narrative Arc</CardTitle>
              <CardDescription>
                Structure your story with a proven 5-part framework.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/arc">Build Your Arc</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-amber-300">
            <CardHeader>
              <div className="text-4xl mb-2">✨</div>
              <CardTitle>Show Don't Tell</CardTitle>
              <CardDescription>
                Transform generic statements into vivid scenes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/transform">Transform Writing</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Your story is waiting to be discovered
          </h2>
          <p className="text-amber-100 mb-8 max-w-xl mx-auto">
            Start with the free values exercise. No credit card required. 
            See what makes you unique in 10 minutes.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/discover">Start Free Discovery</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          © 2026 Story Builder. Your story, your voice, your future.
        </div>
      </footer>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 font-bold text-xl flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}

function FeatureCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="text-4xl mb-2">{emoji}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function PricingCard({ 
  title, 
  price, 
  description, 
  features, 
  featured = false 
}: { 
  title: string; 
  price: string; 
  description: string; 
  features: string[]; 
  featured?: boolean;
}) {
  return (
    <Card className={featured ? "border-amber-500 border-2 shadow-lg" : ""}>
      <CardHeader>
        {featured && <Badge className="w-fit mb-2">Most Popular</Badge>}
        <CardTitle>{title}</CardTitle>
        <div className="text-3xl font-bold">{price}</div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full mt-6" variant={featured ? "default" : "outline"}>
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
