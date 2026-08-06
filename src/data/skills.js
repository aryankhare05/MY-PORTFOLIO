// ---------------------------------------------------------------------------
// SKILLS - grouped by category. No fake proficiency percentages are used;
// each skill is shown as a clean, honest tag/card.
// ---------------------------------------------------------------------------

export const skillCategories = [
  {
    id: 'programming',
    label: 'Programming',
    skills: ['Java', 'C++','JavaScript'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: ['Node.js', 'Express.js'],
  },
  {
    id: 'databases',
    label: 'Databases',
    skills: ['MongoDB', 'SQL'],
  },
  {
    id: 'tools',
    label: 'Developer Tools',
    skills: ['Git', 'GitHub', 'Postman'],
  },
  {
    id: 'other',
    label: 'Other',
    skills: ['Data Structures & Algorithms', 'Machine Learning Basics'],
  },
]

// Flat list, useful for the terminal and AI assistant apps.
export const allSkills = skillCategories.flatMap((c) => c.skills)
