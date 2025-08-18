import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Users, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Discover Your AI Readiness Level + Archetype
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Take our comprehensive assessment to unlock personalized insights about your AI journey. 
            Find your community, accelerate your growth, and transform how you work.
          </p>
          <Button 
            asChild
            size="lg" 
            className="btn-gradient text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/quiz">
              Start Your Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Take the Maiven Assessment?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get personalized insights into your AI journey and connect with a community 
              of growth-minded women transforming their work and lives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-elevated p-8 rounded-xl text-center">
              <div className="hero-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Know Your Level
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Discover where you stand on your AI journey - from Curious beginner 
                to Confident innovator. Each level comes with tailored resources and community.
              </p>
            </div>

            <div className="card-elevated p-8 rounded-xl text-center">
              <div className="hero-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Find Your Archetype
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Understand your unique AI personality - whether you're a Tech-Aware Entrepreneur, 
                Curious Career Pivoter, or one of our other archetypes.
              </p>
            </div>

            <div className="card-elevated p-8 rounded-xl text-center">
              <div className="hero-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Join Your Tribe
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with like-minded women at your level. Get access to exclusive 
                communities, resources, and support for your AI journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Women Assessed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <div className="text-muted-foreground">AI Readiness Levels</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <div className="text-muted-foreground">Unique Archetypes</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Discover Your AI Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the 5-minute assessment and join thousands of women who are 
            transforming their relationship with AI technology.
          </p>
          <Button 
            asChild
            size="lg"
            className="btn-gradient text-lg px-8 py-6 rounded-xl"
          >
            <Link to="/quiz">
              Start Assessment Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
