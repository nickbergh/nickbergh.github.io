interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const QuizProgress = ({ currentStep, totalSteps, className = "" }: QuizProgressProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progressPercentage)}% complete</span>
      </div>
      <div className="progress-bar h-3 w-full">
        <div 
          className="progress-fill transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};