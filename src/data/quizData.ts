import { QuizQuestion, ArchetypeOption, QuizLevel } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Where are you right now with AI in your work or projects?',
    options: [
      { value: '5', label: 'I use AI throughout my day and I am piloting new ideas', points: 5 },
      { value: '4', label: 'I use AI often and I have a few workflows or templates I rely on', points: 4 },
      { value: '3', label: 'I use AI for common tasks and I am getting more comfortable', points: 3 },
      { value: '2', label: 'I have tried a few simple prompts', points: 2 },
      { value: '1', label: 'I am just getting curious about it', points: 1 }
    ]
  },
  {
    id: 'q2',
    question: 'When you come across a new AI tool, what do you usually do?',
    options: [
      { value: '5', label: 'I plug it into a workflow and look at the impact', points: 5 },
      { value: '4', label: 'I tweak settings, prompts, or templates so it fits me', points: 4 },
      { value: '3', label: 'I test it in my routine for a few days', points: 3 },
      { value: '2', label: 'I do a quick try just to see how it feels', points: 2 },
      { value: '1', label: 'I read about it and might come back later', points: 1 }
    ]
  },
  {
    id: 'q3',
    question: 'How often are you using AI right now?',
    options: [
      { value: '5', label: 'Every day with automations or custom setups', points: 5 },
      { value: '4', label: 'Every day', points: 4 },
      { value: '3', label: 'A few times a week', points: 3 },
      { value: '2', label: 'A few times a month', points: 2 },
      { value: '1', label: 'Rarely', points: 1 }
    ]
  },
  {
    id: 'q4',
    question: 'How comfortable do you feel explaining AI to someone else?',
    options: [
      { value: '5', label: 'Very. I mentor and share best practices', points: 5 },
      { value: '4', label: 'Confident. I can teach practical use cases', points: 4 },
      { value: '3', label: 'Pretty comfortable with the basics', points: 3 },
      { value: '2', label: 'Somewhat. I can explain with a little help', points: 2 },
      { value: '1', label: 'Not yet', points: 1 }
    ]
  },
  {
    id: 'q5',
    question: 'How woven into your work or life is AI at the moment?',
    options: [
      { value: '5', label: 'Deeply. I use custom GPTs, agents, or plugins to get things done', points: 5 },
      { value: '4', label: 'Quite a bit. I work from prompt libraries or templates', points: 4 },
      { value: '3', label: 'Some. I use it for content, planning, or research', points: 3 },
      { value: '2', label: 'A little. Mostly simple tasks', points: 2 },
      { value: '1', label: 'Not really yet', points: 1 }
    ]
  },
  {
    id: 'q6',
    question: 'When you spot a chance to use AI, how do you move forward?',
    options: [
      { value: '5', label: 'I redesign the process and lead the way', points: 5 },
      { value: '4', label: 'I set up a small pilot and measure what happens', points: 4 },
      { value: '3', label: 'I compare options and choose something workable', points: 3 },
      { value: '2', label: 'I try one tool to see if it helps', points: 2 },
      { value: '1', label: 'I look for guidance on where it fits', points: 1 }
    ]
  }
];

export const archetypes: ArchetypeOption[] = [
  {
    key: 'tech_aware_entrepreneur',
    label: 'The Tech‑Aware Entrepreneur',
    body: 'You are building or growing a small business and you use AI to automate, test new ideas, and scale smart.'
  },
  {
    key: 'curious_career_pivoter',
    label: 'The Curious Career Pivoter',
    body: 'You are exploring new roles or industries and you want to use AI to make the move with confidence.'
  },
  {
    key: 'self_growth_seeker',
    label: 'The Self‑Growth Seeker',
    body: 'You are focused on personal productivity and you use AI to simplify life and create more room to grow.'
  },
  {
    key: 'career_driven_decision_maker',
    label: 'Career‑Driven Decision Makers',
    body: 'You lead teams or projects and you use AI to make better decisions and drive innovation.'
  }
];

export const levels: QuizLevel[] = [
  {
    id: 1,
    name: 'Level 1',
    title: 'Curious',
    blurb: 'You are getting started and that is perfect. You have heard about AI and you may have tried a few simple prompts. It still feels a bit abstract, and you want clear next steps that match your world.\n\nRight now, you might be:\n\n• Reading or watching short explainers\n• Trying first prompts in ChatGPT\n• Looking for a simple place to begin\n• Wanting a little guidance from people who get it',
    minScore: 6,
    maxScore: 12,
    hubUrl: 'https://your-circle-level-1-url'
  },
  {
    id: 2,
    name: 'Level 2',
    title: 'Capable',
    blurb: 'You are experimenting and it shows. You have found ways AI saves time or sparks ideas, and now you want it to feel smooth and reliable. You are ready to build habits that stick.\n\nRight now, you might be:\n\n• Using AI for emails, content, planning, or research\n• Saving prompts that work for you\n• Testing tools and learning when to use each one\n• Building light workflows that fit your week',
    minScore: 13,
    maxScore: 22,
    hubUrl: 'https://your-circle-level-2-url'
  },
  {
    id: 3,
    name: 'Level 3',
    title: 'Confident',
    blurb: 'You are integrating AI into how you work and create. You are not just using tools, you are shaping them. You build custom GPTs, you chain prompts, and you lead thoughtful adoption with your team or community.\n\nRight now, you might be:\n\n• Automating tasks and processes with AI\n• Building custom GPTs, agents, or plugins\n• Using prompt chaining for advanced outcomes\n• Sharing what you learn and mentoring others\n• Measuring impact and improving the process',
    minScore: 23,
    maxScore: 30,
    hubUrl: 'https://your-circle-level-3-url'
  }
];

export const momentumText = "Wherever you are today, you are in the right place. These levels are about momentum, not labels. Use your result as a guidepost, not a finish line.";