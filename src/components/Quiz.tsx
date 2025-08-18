import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QuizProgress } from '@/components/QuizProgress';
import { QuizOption } from '@/components/QuizOption';
import { quizQuestions, archetypes, levels } from '@/data/quizData';
import { QuizAnswers, QuizResult } from '@/types/quiz';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Quiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [email, setEmail] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState('');

  const totalSteps = quizQuestions.length + 2; // +1 for archetype, +1 for email
  const isLastQuizStep = currentStep === quizQuestions.length;
  const isEmailStep = currentStep === quizQuestions.length + 1;
  const canProceed = currentStep < quizQuestions.length 
    ? answers[quizQuestions[currentStep].id] 
    : isLastQuizStep 
      ? selectedArchetype 
      : email;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateScore = (): number => {
    return quizQuestions.reduce((total, question) => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        return total + (option?.points || 0);
      }
      return total;
    }, 0);
  };

  const getLevel = (score: number) => {
    return levels.find(level => score >= level.minScore && score <= level.maxScore) || levels[0];
  };

  const getArchetype = () => {
    return archetypes.find(arch => arch.key === selectedArchetype);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const level = getLevel(score);
    const archetype = getArchetype();

    if (!archetype) return;

    const result: QuizResult = {
      score,
      levelId: level.id,
      levelName: level.name,
      levelTitle: level.title,
      levelBlurb: level.blurb,
      levelHubUrl: level.hubUrl,
      archetype,
      email
    };

    // Store in sessionStorage
    sessionStorage.setItem('maiven_quiz_result', JSON.stringify(result));

    // Optional: Send to webhook for analytics
    try {
      fetch('https://example.com/quiz-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      });
    } catch (error) {
      console.log('Analytics webhook failed:', error);
    }

    // Redirect to results
    navigate('/results');
  };

  const renderCurrentStep = () => {
    if (currentStep < quizQuestions.length) {
      const question = quizQuestions[currentStep];
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {question.question}
            </h2>
          </div>
          <div className="space-y-4">
            {question.options.map((option) => (
              <QuizOption
                key={option.value}
                value={option.value}
                label={option.label}
                selected={answers[question.id] === option.value}
                onSelect={(value) => handleAnswer(question.id, value)}
                name={question.id}
              />
            ))}
          </div>
        </div>
      );
    }

    if (isLastQuizStep) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Which description feels most like you right now?
            </h2>
          </div>
          <div className="space-y-4">
            {archetypes.map((archetype) => (
              <QuizOption
                key={archetype.key}
                value={archetype.key}
                label={archetype.label}
                description={archetype.body}
                selected={selectedArchetype === archetype.key}
                onSelect={setSelectedArchetype}
                name="archetype"
              />
            ))}
          </div>
        </div>
      );
    }

    if (isEmailStep) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Get your personalized results
            </h2>
            <p className="text-muted-foreground">
              Enter your email to receive your AI readiness assessment and join the Maiven community.
            </p>
          </div>
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-2"
                required
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <QuizProgress 
          currentStep={currentStep + 1} 
          totalSteps={totalSteps}
          className="mb-8"
        />

        <div className="card-elevated rounded-xl p-8 mb-8">
          {renderCurrentStep()}
        </div>

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="btn-gradient flex items-center gap-2"
          >
            {isEmailStep ? 'Get Results' : 'Next'}
            {!isEmailStep && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};