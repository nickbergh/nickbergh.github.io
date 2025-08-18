import { QuizQuestion, ArchetypeOption, QuizLevel } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'How prepared are you for the future of AI in your field or projects?',
    options: [
      { value: '3', label: 'I am actively integrating AI into my work and projects.', points: 3 },
      { value: '2', label: 'I have found a few AI tools that help me, but I am still learning.', points: 2 },
      { value: '1', label: 'I am just starting to explore what AI can do.', points: 1 }
    ]
  },
  {
    id: 'q2',
    question: 'What happens if you encounter a new AI tool?',
    options: [
      { value: '3', label: 'I dive deep and customize it for my needs.', points: 3 },
      { value: '2', label: 'I test it to see how it fits into my routine.', points: 2 },
      { value: '1', label: 'I read articles or watch demos to understand it first.', points: 1 }
    ]
  },
  {
    id: 'q3',
    question: 'How often do you use AI tools in your tasks or projects?',
    options: [
      { value: '3', label: 'Frequently, they are a core part of my workflow.', points: 3 },
      { value: '2', label: 'Occasionally, when I find them useful.', points: 2 },
      { value: '1', label: 'Rarely, I am still figuring out how they work.', points: 1 }
    ]
  },
  {
    id: 'q4',
    question: 'How confident are you in explaining AI concepts to others?',
    options: [
      { value: '3', label: 'Very confident, I can teach others how to use AI effectively.', points: 3 },
      { value: '2', label: 'Somewhat confident, I can explain the basics.', points: 2 },
      { value: '1', label: 'Not very confident, I am still learning myself.', points: 1 }
    ]
  },
  {
    id: 'q5',
    question: 'How do you handle updates in AI technology?',
    options: [
      { value: '3', label: 'I stay on top of updates and implement them quickly.', points: 3 },
      { value: '2', label: 'I follow updates and try them when I can.', points: 2 },
      { value: '1', label: 'I try to keep up, but it feels overwhelming.', points: 1 }
    ]
  },
  {
    id: 'q6',
    question: 'Do you use AI tools in your work, creative projects, or daily routines?',
    options: [
      { value: '3', label: 'Absolutely, they are essential to what I do.', points: 3 },
      { value: '2', label: 'Yes, I use them occasionally for specific needs.', points: 2 },
      { value: '1', label: 'Not yet, but I am interested in learning more.', points: 1 }
    ]
  },
  {
    id: 'q7',
    question: 'Which best describes your AI knowledge right now?',
    options: [
      { value: '3', label: 'I am advanced and always exploring new innovations.', points: 3 },
      { value: '2', label: 'I have some experience and use AI tools regularly.', points: 2 },
      { value: '1', label: 'I am a beginner, just getting started.', points: 1 }
    ]
  },
  {
    id: 'q8',
    question: 'How often do you run into challenges with AI?',
    options: [
      { value: '3', label: 'Rarely, I am quite comfortable with it.', points: 3 },
      { value: '2', label: 'Sometimes, but I am learning to overcome them.', points: 2 },
      { value: '1', label: 'Often, I am not sure where to start.', points: 1 }
    ]
  },
  {
    id: 'q9',
    question: 'What is your biggest current challenge with AI?',
    options: [
      { value: '3', label: 'Staying ahead of the curve and innovating with it.', points: 3 },
      { value: '2', label: 'Finding the right tools and learning to use them effectively.', points: 2 },
      { value: '1', label: 'Understanding the basics and how it applies to me.', points: 1 }
    ]
  },
  {
    id: 'q10',
    question: 'How do you approach a situation where AI could improve your work, creativity, or daily life?',
    options: [
      { value: '3', label: 'I implement AI solutions immediately to optimize.', points: 3 },
      { value: '2', label: 'I experiment with a few tools to test solutions.', points: 2 },
      { value: '1', label: 'I need guidance to see how AI can help.', points: 1 }
    ]
  }
];

export const archetypes: ArchetypeOption[] = [
  {
    key: 'tech_aware_entrepreneur',
    label: 'The Tech-Aware Entrepreneur',
    body: 'Women entrepreneurs embracing tech, exploring AI opportunities and scaling their businesses through intelligent automation.'
  },
  {
    key: 'curious_career_pivoter',
    label: 'The Curious Career Pivoter',
    body: 'Professionals exploring new opportunities, industries, and career paths with AI as their strategic advantage.'
  },
  {
    key: 'self_growth_seeker',
    label: 'The Self-Growth Seeker',
    body: 'Growth-minded women using AI to enhance personal productivity, streamline daily tasks, and unlock new possibilities.'
  },
  {
    key: 'career_driven_decision_maker',
    label: 'Career-driven Decision Makers',
    body: 'Leaders using AI to make smarter decisions, drive innovation, and stay ahead in competitive markets.'
  }
];

export const levels: QuizLevel[] = [
  {
    id: 1,
    name: 'Level 1',
    title: 'Curious',
    blurb: 'You are exploring. You have heard about AI, maybe tested ChatGPT once or twice, but it still feels a little abstract. You are here to understand how it works and what it can do for you.',
    minScore: 0,
    maxScore: 13,
    hubUrl: 'https://your-circle-level-1-url'
  },
  {
    id: 2,
    name: 'Level 2',
    title: 'Capable',
    blurb: 'You are experimenting. You have found ways AI saves time or sparks ideas, and now you want to make that a habit. You want to feel more fluent and less clunky.',
    minScore: 14,
    maxScore: 23,
    hubUrl: 'https://your-circle-level-2-url'
  },
  {
    id: 3,
    name: 'Level 3',
    title: 'Confident',
    blurb: 'You are integrating. You are shaping tools, building custom GPTs and chaining prompts, and leading innovation in your company, project, or community.',
    minScore: 24,
    maxScore: 30,
    hubUrl: 'https://your-circle-level-3-url'
  }
];

export const momentumText = "Wherever you land today, you are in the right place. These levels are not about labels, they are about momentum. Use your result as a guidepost, not a finish line.";