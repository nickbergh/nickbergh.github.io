interface QuizOptionProps {
  value: string;
  label: string;
  description?: string;
  selected: boolean;
  onSelect: (value: string) => void;
  name: string;
}

export const QuizOption = ({ value, label, description, selected, onSelect, name }: QuizOptionProps) => {
  return (
    <label 
      className={`quiz-option block p-4 rounded-lg cursor-pointer ${selected ? 'selected' : ''}`}
      htmlFor={`${name}-${value}`}
    >
      <input
        type="radio"
        id={`${name}-${value}`}
        name={name}
        value={value}
        checked={selected}
        onChange={() => onSelect(value)}
        className="sr-only"
      />
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 transition-all duration-200 ${
          selected 
            ? 'border-primary bg-primary' 
            : 'border-muted-foreground'
        }`}>
          {selected && (
            <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
          )}
        </div>
        <div className="flex-1">
          <div className="font-medium text-foreground mb-1">{label}</div>
          {description && (
            <div className="text-sm text-muted-foreground">{description}</div>
          )}
        </div>
      </div>
    </label>
  );
};