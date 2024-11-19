const questions = [
  // Mindfulness and Awareness
  {
    question: "What is mindfulness?",
    options: [
      "A type of meditation",
      "A state of being aware",
      "Both",
      "None of the above",
    ],
    answer: 2,
    hint: "Think about what mindfulness entails in daily life.",
    explanation:
      "Mindfulness is both a type of meditation and a state of being aware, focusing on the present moment.",
  },
  {
    question: "Which of the following is a mindfulness exercise?",
    options: [
      "Deep breathing",
      "Overthinking",
      "Multitasking",
      "Procrastination",
    ],
    answer: 0,
    hint: "It involves regulating your breath.",
    explanation:
      "Deep breathing is a common mindfulness exercise to stay calm and present.",
  },
  {
    question: "What is the primary goal of mindfulness practice?",
    options: [
      "To escape reality",
      "To focus on the present moment",
      "To avoid emotions",
      "To achieve perfection",
    ],
    answer: 1,
    hint: 'It involves being aware of the "now."',
    explanation:
      "Mindfulness aims to focus on the present moment, accepting it without judgment.",
  },
  {
    question: "What is a body scan exercise?",
    options: [
      "A stress response",
      "A mindfulness technique",
      "A type of physical fitness",
      "A form of deep relaxation",
    ],
    answer: 1,
    hint: "It involves mentally scanning your body for tension.",
    explanation:
      "A body scan is a mindfulness technique where you focus attention on different parts of the body to relieve tension and stress.",
  },

  // Stress Management
  {
    question: "What is the fight-or-flight response?",
    options: [
      "A relaxation technique",
      "A stress response",
      "A type of mindfulness practice",
      "None of the above",
    ],
    answer: 1,
    hint: "It’s the body’s natural reaction to danger.",
    explanation:
      "The fight-or-flight response is the body’s reaction to stress or perceived threats.",
  },
  {
    question: "Which activity can help reduce stress levels?",
    options: ["Exercise", "Skipping meals", "Avoiding sleep", "Overworking"],
    answer: 0,
    hint: "Physical movement helps release stress hormones.",
    explanation:
      "Regular exercise can reduce stress and improve mental health.",
  },
  {
    question: "What does chronic stress affect the most?",
    options: ["Physical health", "Mental health", "Both", "None"],
    answer: 2,
    hint: "Stress has widespread effects.",
    explanation:
      "Chronic stress impacts both physical and mental health over time.",
  },
  {
    question: "Which of these is a symptom of burnout?",
    options: [
      "Feeling refreshed at work",
      "Increased productivity",
      "Emotional exhaustion",
      "Improved social connections",
    ],
    answer: 2,
    hint: "It involves feeling drained.",
    explanation:
      "Emotional exhaustion is a key symptom of burnout caused by prolonged stress.",
  },

  // Emotional Well-being
  {
    question: "What is emotional resilience?",
    options: [
      "Avoiding challenges",
      "Bouncing back from adversity",
      "Ignoring feelings",
      "Suppressing emotions",
    ],
    answer: 1,
    hint: "It’s about recovering after tough times.",
    explanation:
      "Emotional resilience refers to the ability to adapt and recover from stress or adversity.",
  },
  {
    question: "Which of these is an example of a positive coping mechanism?",
    options: [
      "Binge eating",
      "Journaling",
      "Ignoring emotions",
      "Self-isolation",
    ],
    answer: 1,
    hint: "It helps in processing emotions.",
    explanation:
      "Journaling allows individuals to reflect on and manage their emotions constructively.",
  },
  {
    question: "What is emotional intelligence?",
    options: [
      "The ability to suppress emotions",
      "The ability to understand and manage emotions",
      "The ability to read minds",
      "A scientific term for happiness",
    ],
    answer: 1,
    hint: "It involves awareness of feelings.",
    explanation:
      "Emotional intelligence is the ability to recognize, understand, and manage one’s own and others’ emotions effectively.",
  },
  {
    question: "How can practicing gratitude benefit mental health?",
    options: [
      "It increases stress",
      "It improves mood and well-being",
      "It decreases sleep quality",
      "It leads to negative thoughts",
    ],
    answer: 1,
    hint: "Gratitude involves appreciation.",
    explanation:
      "Practicing gratitude enhances positive emotions and overall well-being.",
  },

  // Coping Mechanisms
  {
    question: "What is grounding?",
    options: [
      "A mindfulness technique",
      "A stress response",
      "An emotional reaction",
      "A fitness routine",
    ],
    answer: 0,
    hint: "It involves connecting to the present moment.",
    explanation:
      'Grounding techniques help bring focus to the "here and now," reducing anxiety.',
  },
  {
    question: "Which of the following is NOT a healthy coping strategy?",
    options: [
      "Talking to a friend",
      "Substance abuse",
      "Practicing gratitude",
      "Meditation",
    ],
    answer: 1,
    hint: "It involves harmful habits.",
    explanation:
      "Substance abuse is not a healthy way to cope with stress or emotional challenges.",
  },
  {
    question: "Which of the following is a sign of good coping mechanisms?",
    options: [
      "Increased anxiety",
      "Better problem-solving",
      "Avoiding responsibilities",
      "Increased conflict",
    ],
    answer: 1,
    hint: "It’s about dealing with challenges effectively.",
    explanation:
      "Healthy coping mechanisms often lead to better problem-solving and reduced stress.",
  },

  // General Mental Health Awareness
  {
    question: 'What does "self-care" mean?',
    options: [
      "Selfishness",
      "Maintaining physical and emotional health",
      "Ignoring others",
      "Avoiding responsibilities",
    ],
    answer: 1,
    hint: "It’s about taking care of yourself.",
    explanation:
      "Self-care involves activities and practices to maintain one’s overall well-being.",
  },
  {
    question: "What is the purpose of therapy?",
    options: [
      "To fix people",
      "To explore thoughts and feelings",
      "To avoid problems",
      "To please others",
    ],
    answer: 1,
    hint: "It’s a safe space for reflection.",
    explanation:
      "Therapy provides a space to understand and address one’s emotions, thoughts, and challenges.",
  },
  {
    question: "What is a common symptom of depression?",
    options: [
      "Increased energy",
      "Loss of interest in activities",
      "Improved focus",
      "Enhanced mood",
    ],
    answer: 1,
    hint: "It involves losing enthusiasm.",
    explanation:
      "A loss of interest in previously enjoyed activities is a common symptom of depression.",
  },

  {
    question: "What is mindfulness?",
    options: [
      "A type of meditation",
      "A state of being aware",
      "Both",
      "None of the above",
    ],
    answer: 2,
    hint: "Think about what mindfulness entails in daily life.",
    explanation:
      "Mindfulness is both a type of meditation and a state of being aware, focusing on the present moment.",
  },
  {
    question: "Which of the following is a mindfulness exercise?",
    options: [
      "Deep breathing",
      "Overthinking",
      "Multitasking",
      "Procrastination",
    ],
    answer: 0,
    hint: "It involves regulating your breath.",
    explanation:
      "Deep breathing is a common mindfulness exercise to stay calm and present.",
  },

  // ... (previous 16 questions included here)

  // Expanded Questions
  // Stress Management
  {
    question: 'Which hormone is often called the "stress hormone"?',
    options: ["Dopamine", "Cortisol", "Serotonin", "Oxytocin"],
    answer: 1,
    hint: "It’s released during the fight-or-flight response.",
    explanation:
      'Cortisol is known as the "stress hormone" because it is released in response to stress.',
  },
  {
    question: "What is progressive muscle relaxation?",
    options: [
      "Tensing and relaxing muscle groups",
      "A type of aerobic exercise",
      "A form of deep sleep",
      "None of the above",
    ],
    answer: 0,
    hint: "It involves systematic tensing and relaxing.",
    explanation:
      "Progressive muscle relaxation is a stress-reduction technique that involves tensing and relaxing different muscle groups.",
  },
  {
    question: "How can stress affect sleep?",
    options: [
      "Improves sleep quality",
      "Leads to insomnia or restless sleep",
      "Has no effect on sleep",
      "Makes you fall asleep faster",
    ],
    answer: 1,
    hint: "It often disrupts rest.",
    explanation:
      "Stress can lead to insomnia or restless sleep due to overactive thoughts and physical tension.",
  },

  // Coping Mechanisms
  {
    question: "Which of the following is an example of avoidance coping?",
    options: [
      "Talking to a therapist",
      "Journaling emotions",
      "Ignoring problems",
      "Practicing mindfulness",
    ],
    answer: 2,
    hint: "It involves not facing issues directly.",
    explanation:
      "Avoidance coping refers to ignoring or escaping problems rather than addressing them.",
  },
  {
    question: 'What is the "5-4-3-2-1" grounding technique used for?',
    options: [
      "Improving memory",
      "Managing anxiety",
      "Physical exercise",
      "Enhancing productivity",
    ],
    answer: 1,
    hint: "It’s a way to calm the mind.",
    explanation:
      'The "5-4-3-2-1" technique is a grounding exercise used to manage anxiety by focusing on the senses.',
  },

  // Emotional Well-being
  {
    question: "What is the purpose of practicing self-compassion?",
    options: [
      "To ignore emotions",
      "To be kind to oneself",
      "To avoid accountability",
      "To suppress feelings",
    ],
    answer: 1,
    hint: "It involves kindness toward yourself.",
    explanation:
      "Self-compassion involves treating yourself with kindness during times of difficulty or failure.",
  },
  {
    question: "Which of these is an example of emotional regulation?",
    options: [
      "Yelling during an argument",
      "Deep breathing to calm down",
      "Avoiding all emotions",
      "Suppressing feelings entirely",
    ],
    answer: 1,
    hint: "It’s about managing emotions constructively.",
    explanation:
      "Deep breathing to calm down is an example of emotional regulation, as it helps manage intense emotions effectively.",
  },

  // Mental Health Awareness
  {
    question: "What does stigma in mental health refer to?",
    options: [
      "Encouraging support",
      "Negative attitudes or discrimination",
      "Raising awareness",
      "None of the above",
    ],
    answer: 1,
    hint: "It’s about societal views.",
    explanation:
      "Stigma refers to negative attitudes or discrimination against people with mental health conditions.",
  },
  {
    question: "Which of the following is a common symptom of anxiety?",
    options: [
      "Increased heart rate",
      "Feeling calm",
      "Improved focus",
      "Enhanced sleep",
    ],
    answer: 0,
    hint: "It’s a physical reaction.",
    explanation:
      "An increased heart rate is a common symptom of anxiety due to heightened physiological arousal.",
  },
  {
    question: "What is the purpose of mental health advocacy?",
    options: [
      "To increase stigma",
      "To promote awareness and support",
      "To discourage treatment",
      "None of the above",
    ],
    answer: 1,
    hint: "It’s about creating positive change.",
    explanation:
      "Mental health advocacy aims to promote awareness, reduce stigma, and encourage access to mental health resources.",
  },

  // Miscellaneous Topics
  {
    question: "Which neurotransmitter is associated with happiness?",
    options: ["Cortisol", "Serotonin", "Adrenaline", "Dopamine"],
    answer: 3,
    hint: "It’s linked to the brain’s reward system.",
    explanation:
      "Dopamine is a neurotransmitter that plays a key role in feelings of pleasure and happiness.",
  },
  {
    question: 'What does "burnout" usually result from?',
    options: [
      "Excessive relaxation",
      "Chronic workplace stress",
      "Regular exercise",
      "Positive feedback",
    ],
    answer: 1,
    hint: "It’s related to prolonged stress.",
    explanation:
      "Burnout often results from chronic workplace stress or prolonged emotional demands.",
  },
  {
    question: "What is the primary benefit of therapy for mental health?",
    options: [
      "Immediate problem-solving",
      "Exploring and addressing underlying issues",
      "Avoiding emotions",
      "Suppressing thoughts",
    ],
    answer: 1,
    hint: "It’s about deeper understanding.",
    explanation:
      "Therapy provides a safe space to explore and address underlying emotional and mental health challenges.",
  },
  {
    question: "What is mindfulness?",
    options: [
      "A type of meditation",
      "A state of being aware",
      "Both",
      "None of the above",
    ],
    answer: 2,
    hint: "Think about what mindfulness entails in daily life.",
    explanation:
      "Mindfulness is both a type of meditation and a state of being aware, focusing on the present moment.",
  },
  {
    question: "Which of the following is a mindfulness exercise?",
    options: [
      "Deep breathing",
      "Overthinking",
      "Multitasking",
      "Procrastination",
    ],
    answer: 0,
    hint: "It involves regulating your breath.",
    explanation:
      "Deep breathing is a common mindfulness exercise to stay calm and present.",
  },

  // ... (previous 16 questions included here)

  // Expanded Questions
  // Stress Management
  {
    question: 'Which hormone is often called the "stress hormone"?',
    options: ["Dopamine", "Cortisol", "Serotonin", "Oxytocin"],
    answer: 1,
    hint: "It’s released during the fight-or-flight response.",
    explanation:
      'Cortisol is known as the "stress hormone" because it is released in response to stress.',
  },
  {
    question: "What is progressive muscle relaxation?",
    options: [
      "Tensing and relaxing muscle groups",
      "A type of aerobic exercise",
      "A form of deep sleep",
      "None of the above",
    ],
    answer: 0,
    hint: "It involves systematic tensing and relaxing.",
    explanation:
      "Progressive muscle relaxation is a stress-reduction technique that involves tensing and relaxing different muscle groups.",
  },
  {
    question: "How can stress affect sleep?",
    options: [
      "Improves sleep quality",
      "Leads to insomnia or restless sleep",
      "Has no effect on sleep",
      "Makes you fall asleep faster",
    ],
    answer: 1,
    hint: "It often disrupts rest.",
    explanation:
      "Stress can lead to insomnia or restless sleep due to overactive thoughts and physical tension.",
  },

  // Coping Mechanisms
  {
    question: "Which of the following is an example of avoidance coping?",
    options: [
      "Talking to a therapist",
      "Journaling emotions",
      "Ignoring problems",
      "Practicing mindfulness",
    ],
    answer: 2,
    hint: "It involves not facing issues directly.",
    explanation:
      "Avoidance coping refers to ignoring or escaping problems rather than addressing them.",
  },
  {
    question: 'What is the "5-4-3-2-1" grounding technique used for?',
    options: [
      "Improving memory",
      "Managing anxiety",
      "Physical exercise",
      "Enhancing productivity",
    ],
    answer: 1,
    hint: "It’s a way to calm the mind.",
    explanation:
      'The "5-4-3-2-1" technique is a grounding exercise used to manage anxiety by focusing on the senses.',
  },

  // Emotional Well-being
  {
    question: "What is the purpose of practicing self-compassion?",
    options: [
      "To ignore emotions",
      "To be kind to oneself",
      "To avoid accountability",
      "To suppress feelings",
    ],
    answer: 1,
    hint: "It involves kindness toward yourself.",
    explanation:
      "Self-compassion involves treating yourself with kindness during times of difficulty or failure.",
  },
  {
    question: "Which of these is an example of emotional regulation?",
    options: [
      "Yelling during an argument",
      "Deep breathing to calm down",
      "Avoiding all emotions",
      "Suppressing feelings entirely",
    ],
    answer: 1,
    hint: "It’s about managing emotions constructively.",
    explanation:
      "Deep breathing to calm down is an example of emotional regulation, as it helps manage intense emotions effectively.",
  },

  // Mental Health Awareness
  {
    question: "What does stigma in mental health refer to?",
    options: [
      "Encouraging support",
      "Negative attitudes or discrimination",
      "Raising awareness",
      "None of the above",
    ],
    answer: 1,
    hint: "It’s about societal views.",
    explanation:
      "Stigma refers to negative attitudes or discrimination against people with mental health conditions.",
  },
  {
    question: "Which of the following is a common symptom of anxiety?",
    options: [
      "Increased heart rate",
      "Feeling calm",
      "Improved focus",
      "Enhanced sleep",
    ],
    answer: 0,
    hint: "It’s a physical reaction.",
    explanation:
      "An increased heart rate is a common symptom of anxiety due to heightened physiological arousal.",
  },
  {
    question: "What is the purpose of mental health advocacy?",
    options: [
      "To increase stigma",
      "To promote awareness and support",
      "To discourage treatment",
      "None of the above",
    ],
    answer: 1,
    hint: "It’s about creating positive change.",
    explanation:
      "Mental health advocacy aims to promote awareness, reduce stigma, and encourage access to mental health resources.",
  },

  // Miscellaneous Topics
  {
    question: "Which neurotransmitter is associated with happiness?",
    options: ["Cortisol", "Serotonin", "Adrenaline", "Dopamine"],
    answer: 3,
    hint: "It’s linked to the brain’s reward system.",
    explanation:
      "Dopamine is a neurotransmitter that plays a key role in feelings of pleasure and happiness.",
  },
  {
    question: 'What does "burnout" usually result from?',
    options: [
      "Excessive relaxation",
      "Chronic workplace stress",
      "Regular exercise",
      "Positive feedback",
    ],
    answer: 1,
    hint: "It’s related to prolonged stress.",
    explanation:
      "Burnout often results from chronic workplace stress or prolonged emotional demands.",
  },
  {
    question: "What is the primary benefit of therapy for mental health?",
    options: [
      "Immediate problem-solving",
      "Exploring and addressing underlying issues",
      "Avoiding emotions",
      "Suppressing thoughts",
    ],
    answer: 1,
    hint: "It’s about deeper understanding.",
    explanation:
      "Therapy provides a safe space to explore and address underlying emotional and mental health challenges.",
  },
  {
    question: "What is the purpose of practicing mindfulness?",
    options: [
      "To focus on the present moment",
      "To avoid emotions",
      "To dwell on the past",
      "To multitask effectively",
    ],
    answer: 0,
    hint: 'It involves staying in the "now."',
    explanation:
      "Mindfulness helps you focus on the present moment, reducing stress and promoting emotional balance.",
  },
  {
    question: "What is a healthy way to deal with negative emotions?",
    options: [
      "Bottling them up",
      "Acknowledging and expressing them",
      "Blaming others",
      "Ignoring them completely",
    ],
    answer: 1,
    hint: "It involves understanding your feelings.",
    explanation:
      "Acknowledging and expressing negative emotions in a constructive way helps process and manage them effectively.",
  },
  {
    question: "Which of the following helps boost emotional resilience?",
    options: [
      "Focusing on problems",
      "Building a support system",
      "Avoiding relationships",
      "Ignoring self-care",
    ],
    answer: 1,
    hint: "It involves connecting with others.",
    explanation:
      "Building a support system of trusted friends or family helps you navigate challenges and boosts resilience.",
  },
  {
    question: "How can a positive mindset impact mental health?",
    options: [
      "By increasing stress levels",
      "By improving coping skills",
      "By reducing problem-solving ability",
      "By ignoring real-life challenges",
    ],
    answer: 1,
    hint: "It’s about finding a healthy perspective.",
    explanation:
      "A positive mindset can improve coping skills and help you handle stress more effectively.",
  },
  {
    question: "What is an effective way to relax your mind during anxiety?",
    options: [
      "Engage in grounding techniques",
      "Avoid any activity",
      "Focus on fears",
      "Keep thinking about worst-case scenarios",
    ],
    answer: 0,
    hint: "It involves connecting with the present moment.",
    explanation:
      "Grounding techniques like focusing on your senses help bring you back to the present moment and reduce anxiety.",
  },
  {
    question:
      "Which activity can help improve sleep quality for mental health?",
    options: [
      "Drinking caffeine before bed",
      "Following a bedtime routine",
      "Using bright screens before sleeping",
      "Sleeping at inconsistent times",
    ],
    answer: 1,
    hint: "It involves creating a habit.",
    explanation:
      "A consistent bedtime routine helps signal your body to relax and improves sleep quality.",
  },
  {
    question: "How can gratitude practice impact mental well-being?",
    options: [
      "By promoting a sense of lack",
      "By fostering positive emotions",
      "By increasing envy",
      "By amplifying stress",
    ],
    answer: 1,
    hint: "It’s about appreciating what you have.",
    explanation:
      "Practicing gratitude fosters positive emotions and improves overall mental well-being.",
  },
  {
    question: "Which of these is a sign of burnout?",
    options: [
      "Feeling motivated",
      "Chronic exhaustion and irritability",
      "Improved productivity",
      "Increased energy levels",
    ],
    answer: 1,
    hint: "It involves emotional and physical depletion.",
    explanation:
      "Burnout is characterized by chronic exhaustion, irritability, and reduced efficiency.",
  },
  {
    question: "What is an effective strategy to deal with overwhelming tasks?",
    options: [
      "Breaking them into smaller steps",
      "Avoiding them entirely",
      "Rushing through without a plan",
      "Procrastinating",
    ],
    answer: 0,
    hint: "It involves managing workload in smaller parts.",
    explanation:
      "Breaking tasks into smaller steps makes them more manageable and reduces stress.",
  },
  {
    question: "How does spending time outdoors affect mental health?",
    options: [
      "Increases anxiety",
      "Promotes relaxation and improves mood",
      "Causes isolation",
      "Reduces physical activity",
    ],
    answer: 1,
    hint: "Nature has a calming effect.",
    explanation:
      "Spending time outdoors promotes relaxation, reduces stress, and improves overall mood.",
  },
  {
    question: "What is a healthy way to challenge negative thoughts?",
    options: [
      "Accept them as facts",
      "Replace them with balanced thoughts",
      "Suppress them completely",
      "Blame others for their occurrence",
    ],
    answer: 1,
    hint: "It involves balanced thinking.",
    explanation:
      "Replacing negative thoughts with balanced and realistic ones helps improve mental well-being.",
  },
  {
    question: "Which of these activities is considered a self-care practice?",
    options: [
      "Skipping meals",
      "Spending time on a hobby",
      "Overworking",
      "Avoiding social interaction",
    ],
    answer: 1,
    hint: "It’s something that brings you joy.",
    explanation:
      "Spending time on a hobby you enjoy is an effective self-care practice that improves mental health.",
  },
  {
    question: "How can regular exercise impact mental health?",
    options: [
      "By increasing stress hormones",
      "By improving mood and reducing anxiety",
      "By causing sleep issues",
      "By amplifying irritability",
    ],
    answer: 1,
    hint: "It releases feel-good chemicals.",
    explanation:
      "Regular exercise releases endorphins, which improve mood and reduce symptoms of anxiety and depression.",
  },
  {
    question:
      "Which strategy can help you stay mentally balanced during tough times?",
    options: [
      "Practicing self-compassion",
      "Criticizing yourself constantly",
      "Avoiding self-reflection",
      "Comparing yourself to others",
    ],
    answer: 0,
    hint: "It involves being kind to yourself.",
    explanation:
      "Practicing self-compassion involves treating yourself with kindness during tough times, improving emotional resilience.",
  },
  {
    question: "What is the goal of deep breathing exercises?",
    options: [
      "To hold your breath as long as possible",
      "To slow down and calm the nervous system",
      "To increase tension",
      "To distract yourself",
    ],
    answer: 1,
    hint: "It’s about creating calmness.",
    explanation:
      "Deep breathing helps slow your heart rate, calm the nervous system, and reduce stress.",
  },
  {
    question: "Which practice helps in releasing pent-up emotions?",
    options: [
      "Ignoring your feelings",
      "Engaging in creative activities like painting or writing",
      "Avoiding personal expression",
      "Suppressing emotions completely",
    ],
    answer: 1,
    hint: "It’s a form of creative release.",
    explanation:
      "Engaging in creative activities like painting or writing helps release pent-up emotions in a healthy way.",
  },
  {
    question: "What is one benefit of volunteering for mental health?",
    options: [
      "Increased loneliness",
      "Sense of purpose and connection",
      "Reduced social interaction",
      "Heightened stress levels",
    ],
    answer: 1,
    hint: "It’s about helping others.",
    explanation:
      "Volunteering provides a sense of purpose and connection, which boosts mental well-being.",
  },
  {
    question: "Which type of thoughts contribute to mental well-being?",
    options: [
      "Catastrophic thoughts",
      "Balanced and realistic thoughts",
      "Self-critical thoughts",
      "Obsessive thoughts",
    ],
    answer: 1,
    hint: "It’s about finding a healthy perspective.",
    explanation:
      "Balanced and realistic thoughts help maintain emotional stability and support mental well-being.",
  },
  {
    question: "What is the role of humor in mental health?",
    options: [
      "Increasing stress",
      "Providing emotional relief and reducing tension",
      "Making situations worse",
      "Avoiding responsibilities",
    ],
    answer: 1,
    hint: "It’s about seeing the lighter side.",
    explanation:
      "Humor provides emotional relief and reduces tension, promoting a positive outlook.",
  },
  {
    question: "What is the first step to managing overwhelming emotions?",
    options: [
      "Ignore them",
      "Suppress them",
      "Identify and label them",
      "React impulsively",
    ],
    answer: 2,
    hint: "Think about emotional awareness and acknowledgment.",
    explanation:
      "Identifying and labeling emotions is the first step to managing them effectively, as it helps increase emotional clarity.",
  },
  {
    question: "Which of these is a healthy way to express anger?",
    options: [
      "Yelling at others",
      "Bottling it up",
      "Writing in a journal",
      "Breaking objects",
    ],
    answer: 2,
    hint: "Consider an outlet that is non-destructive.",
    explanation:
      "Writing in a journal allows you to process anger constructively without harming yourself or others.",
  },
  {
    question: "Which practice can help improve self-esteem?",
    options: [
      "Self-criticism",
      "Practicing self-compassion",
      "Ignoring your emotions",
      "Setting unrealistic goals",
    ],
    answer: 1,
    hint: "Think about how you would treat a friend in need.",
    explanation:
      "Practicing self-compassion involves being kind to yourself, which fosters self-esteem and emotional resilience.",
  },
  {
    question: "What is a grounding technique you can use during anxiety?",
    options: [
      "Holding your breath",
      "Focusing on the present moment",
      "Avoiding the situation",
      "Overthinking the worst-case scenario",
    ],
    answer: 1,
    hint: "It involves being mindful of your surroundings.",
    explanation:
      "Grounding techniques, such as focusing on the present, can help reduce anxiety by shifting attention away from distressing thoughts.",
  },
  {
    question: "Which of these habits can help improve sleep quality?",
    options: [
      "Consuming caffeine before bed",
      "Creating a bedtime routine",
      "Using your phone in bed",
      "Going to bed at random times",
    ],
    answer: 1,
    hint: "Think about consistency and relaxation.",
    explanation:
      "Creating a bedtime routine trains your body and mind to relax, improving sleep quality and overall mental health.",
  },
  {
    question: "What is an effective way to cope with sadness?",
    options: [
      "Isolate yourself",
      "Reach out to a trusted friend",
      "Dwell on negative thoughts",
      "Suppress your feelings",
    ],
    answer: 1,
    hint: "Think about social support.",
    explanation:
      "Reaching out to a trusted friend provides emotional support and helps process feelings of sadness more constructively.",
  },
  {
    question: "Which mindfulness activity can help you manage stress?",
    options: [
      "Meditation",
      "Multitasking",
      "Ruminating on past mistakes",
      "Avoiding deep breaths",
    ],
    answer: 0,
    hint: "Think about practices that calm the mind.",
    explanation:
      "Meditation reduces stress by promoting relaxation and mindfulness, which help in coping with mental strain.",
  },
  {
    question: "What is an effective way to stop a negative thought spiral?",
    options: [
      "Distract yourself with a healthy activity",
      "Engage with the thoughts further",
      "Suppress them completely",
      "Blame yourself for them",
    ],
    answer: 0,
    hint: "Think about redirecting your attention.",
    explanation:
      "Distracting yourself with a healthy activity, such as exercising or journaling, breaks the cycle of negative thoughts.",
  },
  {
    question:
      "Which of the following is a key element of emotional regulation?",
    options: [
      "Avoiding your emotions",
      "Identifying triggers",
      "Reacting impulsively",
      "Ignoring feedback from others",
    ],
    answer: 1,
    hint: "It involves understanding the source of your emotions.",
    explanation:
      "Identifying triggers helps you understand and regulate your emotions more effectively.",
  },
  {
    question: "What is an effective way to practice gratitude?",
    options: [
      "Taking things for granted",
      "Writing a daily gratitude journal",
      "Comparing yourself to others",
      "Dwelling on what you lack",
    ],
    answer: 1,
    hint: "Think about appreciating what you have.",
    explanation:
      "Writing a daily gratitude journal fosters positivity and helps you focus on the good aspects of your life.",
  },
  {
    question: "What is the 4-7-8 breathing technique used for?",
    options: [
      "Boosting energy",
      "Improving focus",
      "Relaxation and stress reduction",
      "Enhancing digestion",
    ],
    answer: 2,
    hint: "It helps calm the nervous system.",
    explanation:
      "The 4-7-8 technique involves breathing in for 4 seconds, holding for 7 seconds, and exhaling for 8 seconds to promote relaxation and stress relief.",
  },
  {
    question: "What should you focus on during a mindful breathing exercise?",
    options: [
      "Past events",
      "Future goals",
      "The sensation of your breath",
      "Random thoughts",
    ],
    answer: 2,
    hint: "It’s about being present.",
    explanation:
      "Focusing on the sensation of your breath, such as its rhythm and flow, helps anchor you in the present moment.",
  },
  {
    question: "Which of these is a common grounding exercise?",
    options: [
      "5-4-3-2-1 technique",
      "Repeating affirmations",
      "Daydreaming",
      "Counting backward by 1",
    ],
    answer: 0,
    hint: "It involves engaging your senses.",
    explanation:
      "The 5-4-3-2-1 technique uses the five senses to ground you in the present and reduce anxiety.",
  },
  {
    question: "Which posture is most suitable for mindfulness meditation?",
    options: [
      "Slouching in a chair",
      "Lying down flat",
      "Sitting upright with a straight back",
      "Standing with arms raised",
    ],
    answer: 2,
    hint: "It should be comfortable yet alert.",
    explanation:
      "Sitting upright with a straight back promotes alertness and allows you to focus on your mindfulness practice.",
  },
  {
    question: "What is body scan meditation?",
    options: [
      "A medical procedure",
      "A visualization exercise",
      "Focusing attention on each part of the body",
      "A cardio workout",
    ],
    answer: 2,
    hint: "It’s about bringing awareness to your body.",
    explanation:
      "Body scan meditation involves mentally scanning each part of the body to release tension and increase mindfulness.",
  },
  {
    question: "What is a mindful walking practice?",
    options: [
      "Walking quickly to burn calories",
      "Walking slowly while focusing on your steps",
      "Walking while multitasking",
      "Walking while listening to loud music",
    ],
    answer: 1,
    hint: "Focus on your steps and surroundings.",
    explanation:
      "Mindful walking involves walking slowly and deliberately while focusing on your breath, steps, and environment.",
  },
  {
    question:
      "What is the benefit of practicing progressive muscle relaxation?",
    options: [
      "Increased heart rate",
      "Enhanced muscle strength",
      "Reduced stress and tension",
      "Improved multitasking skills",
    ],
    answer: 2,
    hint: "It helps release physical tension.",
    explanation:
      "Progressive muscle relaxation involves tensing and relaxing muscle groups to reduce stress and promote relaxation.",
  },
  {
    question: "Which sense is commonly used in mindful eating?",
    options: ["Only taste", "All five senses", "Only smell", "Only sight"],
    answer: 1,
    hint: "It’s about the full experience of eating.",
    explanation:
      "Mindful eating engages all five senses to fully experience the flavors, textures, and aromas of food, promoting awareness and enjoyment.",
  },
  {
    question: "What is box breathing?",
    options: [
      "Breathing in a circular pattern",
      "A breathing technique with equal counts for inhaling, holding, exhaling, and pausing",
      "Breathing without pauses",
      "Hyperventilating",
    ],
    answer: 1,
    hint: "It’s about balance and rhythm.",
    explanation:
      "Box breathing involves inhaling, holding, exhaling, and pausing for equal counts to calm the mind and body.",
  },
  {
    question: "How can mindfulness help manage chronic pain?",
    options: [
      "By ignoring the pain",
      "By focusing entirely on the pain",
      "By bringing awareness and acceptance to the pain",
      "By suppressing emotional responses",
    ],
    answer: 2,
    hint: "Acceptance is key.",
    explanation:
      "Mindfulness helps manage chronic pain by encouraging awareness and acceptance, reducing its emotional impact.",
  },
  {
    question: "What is a mindful journaling exercise?",
    options: [
      "Writing about random thoughts",
      "Reflecting on past mistakes",
      "Recording thoughts, feelings, and experiences with awareness",
      "Focusing only on to-do lists",
    ],
    answer: 2,
    hint: "It’s about reflection and awareness.",
    explanation:
      "Mindful journaling involves recording thoughts, feelings, and experiences with intention and awareness, fostering clarity and emotional processing.",
  },
  {
    question: "How long should you meditate daily to see benefits?",
    options: ["1-2 minutes", "10-20 minutes", "1 hour", "4 hours"],
    answer: 1,
    hint: "Consistency is more important than duration.",
    explanation:
      "Meditating for 10-20 minutes daily can yield significant mental health benefits with regular practice.",
  },
  {
    question: "What is mindful visualization?",
    options: [
      "Imagining worst-case scenarios",
      "Creating mental images of calm and peaceful scenes",
      "Reliving past stressful events",
      "Suppressing all mental images",
    ],
    answer: 1,
    hint: "Think about positive and calming imagery.",
    explanation:
      "Mindful visualization involves creating mental images of peaceful or calming scenes to promote relaxation and emotional well-being.",
  },
  {
    question: "Which of these exercises promotes gratitude?",
    options: [
      "Criticizing yourself",
      "Focusing on daily struggles",
      "Writing a gratitude list",
      "Dwelling on missed opportunities",
    ],
    answer: 2,
    hint: "Think about appreciating the positives.",
    explanation:
      "Writing a gratitude list helps shift focus to positive aspects of life, fostering mindfulness and happiness.",
  },
  {
    question: "What is a key benefit of practicing deep belly breathing?",
    options: [
      "Increased adrenaline",
      "Reduced stress",
      "Improved multitasking",
      "Enhanced anger",
    ],
    answer: 1,
    hint: "Think about relaxation and calmness.",
    explanation:
      "Deep belly breathing activates the parasympathetic nervous system, reducing stress and promoting relaxation.",
  },
  {
    question: "What does the acronym STOP in mindfulness stand for?",
    options: [
      "Stop, Think, Organize, Proceed",
      "Stop, Take a breath, Observe, Proceed",
      "Stop, Talk, Open up, Pause",
      "Stop, Time, Options, Pause",
    ],
    answer: 1,
    hint: "It’s about pausing and reflecting.",
    explanation:
      "STOP stands for Stop, Take a breath, Observe, and Proceed, a mindfulness technique to interrupt automatic reactions.",
  },
  {
    question: "How does focusing on your breath help during meditation?",
    options: [
      "It distracts from meditation",
      "It keeps you grounded and present",
      "It creates anxiety",
      "It helps you fall asleep",
    ],
    answer: 1,
    hint: "Think about mindfulness and presence.",
    explanation:
      "Focusing on your breath anchors your attention to the present moment, reducing distractions and promoting mindfulness.",
  },
  {
    question:
      "Which of the following is a healthy coping mechanism for dealing with depression?",
    options: [
      "Isolating yourself",
      "Talking to a trusted friend",
      "Ignoring your feelings",
      "Overworking yourself",
    ],
    answer: 1,
    hint: "It’s about seeking support.",
    explanation:
      "Talking to a trusted friend helps in expressing feelings and reduces the burden of isolation.",
  },
  {
    question: "Which activity can help improve mood when feeling low?",
    options: [
      "Sleeping excessively",
      "Engaging in a hobby you enjoy",
      "Avoiding social interactions",
      "Dwelling on negative thoughts",
    ],
    answer: 1,
    hint: "It’s something you love doing.",
    explanation:
      "Engaging in a hobby can provide a sense of achievement and distract from negative thoughts.",
  },
  {
    question:
      "Which physical activity is commonly recommended to help combat depression?",
    options: [
      "Meditating for hours",
      "Daily exercise like walking or yoga",
      "Sleeping all day",
      "Eating junk food",
    ],
    answer: 1,
    hint: "It’s good for your body and mind.",
    explanation:
      "Daily exercise boosts endorphins, which improve mood and reduce symptoms of depression.",
  },
  {
    question: "What is the benefit of practicing gratitude when feeling down?",
    options: [
      "It creates unrealistic expectations",
      "It increases negative emotions",
      "It helps shift focus to positive aspects of life",
      "It ignores your feelings",
    ],
    answer: 2,
    hint: "It’s about appreciating the good things.",
    explanation:
      "Practicing gratitude helps shift focus from negative thoughts to positive aspects of life, improving overall mood.",
  },
  {
    question: "What is one small, actionable step to tackle depression?",
    options: [
      "Avoid responsibilities",
      "Set and achieve small daily goals",
      "Stop caring about hygiene",
      "Stay in bed all day",
    ],
    answer: 1,
    hint: "It’s about building momentum.",
    explanation:
      "Setting and achieving small daily goals helps build a sense of accomplishment and structure.",
  },
  {
    question: "Which of these foods can help improve mood during depression?",
    options: [
      "Sugary snacks",
      "Omega-3-rich foods like salmon",
      "Fast food",
      "Processed snacks",
    ],
    answer: 1,
    hint: "Think about brain health.",
    explanation:
      "Omega-3-rich foods like salmon can help improve brain function and mood.",
  },
  {
    question: "How can journaling help with depression?",
    options: [
      "It worsens negative feelings",
      "It helps organize thoughts and emotions",
      "It replaces professional therapy",
      "It makes you focus only on the past",
    ],
    answer: 1,
    hint: "It’s about self-reflection.",
    explanation:
      "Journaling allows for self-expression, helping to organize thoughts and reduce mental clutter.",
  },
  {
    question:
      "What is the benefit of seeking professional help for depression?",
    options: [
      "It’s a sign of weakness",
      "It’s unnecessary",
      "It provides guidance and tailored support",
      "It solves everything instantly",
    ],
    answer: 2,
    hint: "Think about expert advice.",
    explanation:
      "Seeking professional help provides guidance and support tailored to individual needs, which is essential for managing depression.",
  },
  {
    question: "What is a helpful strategy when experiencing negative thoughts?",
    options: [
      "Believing them completely",
      "Challenging and reframing them",
      "Ignoring them entirely",
      "Sharing them without filter",
    ],
    answer: 1,
    hint: "It’s about changing perspective.",
    explanation:
      "Challenging and reframing negative thoughts helps in reducing their impact on emotions and behaviors.",
  },
  {
    question: "What can practicing mindfulness meditation do for depression?",
    options: [
      "Increase feelings of sadness",
      "Distract you from emotions",
      "Help reduce stress and negative thoughts",
      "Prevent emotions from surfacing",
    ],
    answer: 2,
    hint: "It’s about awareness and acceptance.",
    explanation:
      "Mindfulness meditation helps reduce stress and negative thoughts by promoting awareness and acceptance of the present moment.",
  },
  {
    question:
      "What is an effective way to build a support system for mental health?",
    options: [
      "Isolating yourself",
      "Connecting with supportive friends or groups",
      "Relying on self-help books only",
      "Avoiding all relationships",
    ],
    answer: 1,
    hint: "It’s about connection.",
    explanation:
      "Building a support system with friends or groups provides emotional support and encouragement.",
  },
  {
    question:
      "Why is maintaining a consistent sleep schedule important for mental health?",
    options: [
      "It causes insomnia",
      "It worsens mood",
      "It regulates emotions and reduces stress",
      "It has no effect on mental health",
    ],
    answer: 2,
    hint: "Think about the importance of rest.",
    explanation:
      "A consistent sleep schedule helps regulate emotions and reduces stress, improving mental health.",
  },
  {
    question: "Which practice can help prevent feelings of hopelessness?",
    options: [
      "Avoiding responsibilities",
      "Focusing on personal strengths",
      "Ignoring positive feedback",
      "Dwelling on past mistakes",
    ],
    answer: 1,
    hint: "It’s about self-empowerment.",
    explanation:
      "Focusing on personal strengths builds confidence and prevents feelings of hopelessness.",
  },
  {
    question: "What is one way to challenge feelings of loneliness?",
    options: [
      "Avoid social activities",
      "Engage in community activities or groups",
      "Stay isolated",
      "Ignore feelings of loneliness",
    ],
    answer: 1,
    hint: "It’s about social connection.",
    explanation:
      "Engaging in community activities or groups helps build connections and reduce feelings of loneliness.",
  },
  {
    question: "Which type of therapy is commonly used to treat depression?",
    options: [
      "Cognitive Behavioral Therapy (CBT)",
      "Hypnosis",
      "Unstructured talking",
      "Ignoring therapy altogether",
    ],
    answer: 0,
    hint: "It focuses on thoughts and behaviors.",
    explanation:
      "CBT is a structured therapy that focuses on challenging and changing unhelpful thoughts and behaviors.",
  },
  {
    question:
      "What is the benefit of maintaining a balanced diet for mental health?",
    options: [
      "It has no impact on mood",
      "It helps stabilize energy levels and mood",
      "It replaces medication",
      "It makes you feel hungry all the time",
    ],
    answer: 1,
    hint: "Think about nutrition and its effect on mood.",
    explanation:
      "A balanced diet provides nutrients that stabilize energy levels and improve mood.",
  },
  {
    question: "How can limiting screen time help with mental health?",
    options: [
      "It worsens loneliness",
      "It reduces stress from overexposure to social media",
      "It has no effect on mental health",
      "It isolates you from others",
    ],
    answer: 1,
    hint: "Think about social media’s impact.",
    explanation:
      "Limiting screen time reduces stress and the negative effects of overexposure to social media.",
  },
  {
    question: "Which activity can boost serotonin levels naturally?",
    options: [
      "Staying indoors",
      "Sunlight exposure and exercise",
      "Consuming only junk food",
      "Sleeping irregularly",
    ],
    answer: 1,
    hint: "It’s about natural energy boosters.",
    explanation:
      "Sunlight exposure and exercise boost serotonin levels, improving mood and energy.",
  },
  {
    question: "What is one way to make progress during depressive episodes?",
    options: [
      "Focusing on one small task at a time",
      "Taking on overwhelming projects",
      "Avoiding any activity",
      "Overthinking outcomes",
    ],
    answer: 0,
    hint: "Think about manageable steps.",
    explanation:
      "Focusing on one small task at a time helps build momentum and reduces feelings of being overwhelmed.",
  },
  {
    question: "What is one way to practice self-compassion?",
    options: [
      "Criticizing yourself harshly",
      "Accepting your imperfections",
      "Avoiding positive affirmations",
      "Ignoring your emotions",
    ],
    answer: 1,
    hint: "It’s about kindness toward yourself.",
    explanation:
      "Practicing self-compassion involves accepting imperfections and treating yourself with kindness and understanding.",
  },
  {
    question: "What is a common physical symptom of stress?",
    options: [
      "Increased heart rate",
      "Feeling overly calm",
      "Lowered blood pressure",
      "Deep breathing",
    ],
    answer: 0,
    hint: "Think about how stress affects your body.",
    explanation:
      "Increased heart rate is a common physical symptom of stress as the body enters fight-or-flight mode.",
  },
  {
    question: "Which of the following is a helpful way to manage anxiety?",
    options: [
      "Avoiding the problem",
      "Breathing exercises",
      "Ignoring your feelings",
      "Overthinking the worst case scenario",
    ],
    answer: 1,
    hint: "Think about relaxation techniques.",
    explanation:
      "Breathing exercises help calm the body and mind, making it easier to manage anxiety.",
  },
  {
    question: "What type of activity is often helpful for reducing stress?",
    options: [
      "Social isolation",
      "Exercise or physical activity",
      "Staying up all night",
      "Avoiding sleep",
    ],
    answer: 1,
    hint: "It’s about getting moving.",
    explanation:
      "Exercise helps to release endorphins, which reduce stress and improve mood.",
  },
  {
    question: "How does deep breathing help reduce anxiety?",
    options: [
      "It distracts you from the problem",
      "It helps the body relax and calm the mind",
      "It increases stress levels",
      "It makes you feel dizzy",
    ],
    answer: 1,
    hint: "It’s about calming the body.",
    explanation:
      "Deep breathing activates the body’s relaxation response, which reduces anxiety and physical tension.",
  },
  {
    question: "Which of these activities can help reduce bad mood?",
    options: [
      "Engaging in a hobby you enjoy",
      "Blaming others",
      "Avoiding responsibility",
      "Being overly critical of yourself",
    ],
    answer: 0,
    hint: "It’s about positive distractions.",
    explanation:
      "Engaging in a hobby you enjoy provides a healthy distraction and boosts your mood.",
  },
  {
    question: "What is a helpful mindset shift when feeling anxious?",
    options: [
      "Ignoring all thoughts",
      "Focusing on the present moment",
      "Worrying about the future",
      "Replaying past mistakes",
    ],
    answer: 1,
    hint: "Think about mindfulness.",
    explanation:
      "Focusing on the present moment helps break the cycle of overthinking and reduces anxiety.",
  },
  {
    question:
      "What is the benefit of practicing mindfulness in managing stress?",
    options: [
      "It distracts you from the problem",
      "It reduces your stress by focusing on the present",
      "It avoids emotional awareness",
      "It makes stress worse",
    ],
    answer: 1,
    hint: "It’s about being present.",
    explanation:
      "Mindfulness helps manage stress by bringing awareness to the present, preventing excessive worrying.",
  },
  {
    question: "How can a good night’s sleep affect your mood?",
    options: [
      "It worsens anxiety",
      "It improves focus and reduces stress",
      "It causes more stress",
      "It leads to irritability",
    ],
    answer: 1,
    hint: "Think about the restorative power of sleep.",
    explanation:
      "A good night’s sleep helps the brain process emotions and reduces stress, improving mood the next day.",
  },
  {
    question:
      "Which of the following is a technique to cope with negative thoughts?",
    options: [
      "Ignore them completely",
      "Challenge and reframe them",
      "Accept them as facts",
      "Avoid thinking about them",
    ],
    answer: 1,
    hint: "Think about changing your thinking.",
    explanation:
      "Challenging and reframing negative thoughts helps reduce their power and impact on emotions.",
  },
  {
    question: "What is a common reaction to overwhelming stress?",
    options: [
      "Calmness",
      "Avoidance and procrastination",
      "Increased productivity",
      "Clear focus",
    ],
    answer: 1,
    hint: "Think about how stress makes you feel.",
    explanation:
      "When stressed, people often procrastinate or avoid tasks due to feeling overwhelmed.",
  },
  {
    question: "How can writing down your feelings help with stress?",
    options: [
      "It causes more stress",
      "It provides emotional release and clarity",
      "It increases anxiety",
      "It worsens negative emotions",
    ],
    answer: 1,
    hint: "Think about expressing yourself.",
    explanation:
      "Writing down your feelings helps to release pent-up emotions and gain clarity, reducing stress.",
  },
  {
    question:
      "Which of these strategies helps break the cycle of anxious thoughts?",
    options: [
      "Reassurance from others",
      "Avoiding the situation",
      "Ruminating on the issue",
      "Engaging in grounding exercises",
    ],
    answer: 3,
    hint: "Think about bringing your focus to the present.",
    explanation:
      "Grounding exercises, like focusing on your breath or surroundings, help break the cycle of anxious thoughts.",
  },
  {
    question: "What should you do when you feel overwhelmed with stress?",
    options: [
      "Ignore the feeling and keep going",
      "Take a break and relax for a moment",
      "Push through without rest",
      "Overload yourself with work",
    ],
    answer: 1,
    hint: "It’s about taking a step back.",
    explanation:
      "Taking a short break to relax helps reset your mind and body, preventing burnout.",
  },
  {
    question: "Which of these foods can help reduce anxiety and stress?",
    options: [
      "Caffeine-heavy drinks",
      "Healthy snacks like nuts and fruits",
      "Fast food",
      "Sugary snacks",
    ],
    answer: 1,
    hint: "Think about nutrient-rich foods.",
    explanation:
      "Healthy snacks like nuts and fruits provide nutrients that help stabilize mood and reduce anxiety.",
  },
  {
    question: "How can listening to music help with stress?",
    options: [
      "It can increase anxiety",
      "It can improve mood and reduce tension",
      "It makes you more stressed",
      "It causes distraction only",
    ],
    answer: 1,
    hint: "Think about the calming effects of music.",
    explanation:
      "Listening to calming music can lower heart rate, reduce anxiety, and improve mood.",
  },
  {
    question:
      "What is a good strategy for managing negative thoughts that increase stress?",
    options: [
      "Dwell on them",
      "Reframe them with positive affirmations",
      "Ignore them completely",
      "Let them spiral",
    ],
    answer: 1,
    hint: "It’s about changing the narrative.",
    explanation:
      "Reframing negative thoughts with positive affirmations can break the cycle of stress and anxiety.",
  },
  {
    question: "What does practicing gratitude do for mental well-being?",
    options: [
      "Increases stress",
      "Shifts focus to positive aspects of life",
      "Has no effect on stress",
      "Makes problems seem bigger",
    ],
    answer: 1,
    hint: "It’s about shifting perspective.",
    explanation:
      "Practicing gratitude shifts your focus from what’s wrong to what’s going well, helping to reduce stress.",
  },
  {
    question: "How does regular social interaction help with stress?",
    options: [
      "It makes stress worse",
      "It provides emotional support and reduces feelings of isolation",
      "It leads to more stress",
      "It has no impact on stress",
    ],
    answer: 1,
    hint: "Think about connecting with others.",
    explanation:
      "Regular social interaction provides emotional support, helping to reduce stress and improve mood.",
  },
  {
    question:
      "Which of the following can help create a sense of control when you feel anxious?",
    options: [
      "Planning small, manageable tasks",
      "Ignoring everything",
      "Letting anxiety take over",
      "Avoiding the situation completely",
    ],
    answer: 0,
    hint: "It’s about taking small steps.",
    explanation:
      "Planning and completing small tasks gives a sense of control and reduces anxiety by preventing overwhelm.",
  },

  {
    question:
      "Which of these activities is commonly recommended to reduce stress?",
    options: [
      "Watching TV",
      "Yoga and meditation",
      "Drinking coffee",
      "Ignoring the issue",
    ],
    answer: 1,
    hint: "Think about mindful practices.",
    explanation:
      "Yoga and meditation are proven techniques for reducing stress and improving mental health.",
  },
  {
    question: "What does progressive muscle relaxation help you do?",
    options: [
      "Increase tension",
      "Relax your muscles and reduce anxiety",
      "Focus on negative thoughts",
      "Make you more anxious",
    ],
    answer: 1,
    hint: "It’s about releasing tension.",
    explanation:
      "Progressive muscle relaxation helps reduce anxiety by slowly relaxing each muscle group in the body.",
  },
  {
    question:
      "Which of these is an effective strategy for managing a stressful situation?",
    options: [
      "Taking deep breaths",
      "Ignoring the situation",
      "Getting angry",
      "Procrastinating",
    ],
    answer: 0,
    hint: "Think about calming techniques.",
    explanation:
      "Deep breathing helps lower stress levels and clears the mind in stressful situations.",
  },
  {
    question: "What is the best way to manage intrusive negative thoughts?",
    options: [
      "Let them take over",
      "Ignore them completely",
      "Practice mindfulness and reframe them",
      "Dwell on them for hours",
    ],
    answer: 2,
    hint: "Focus on staying in the present.",
    explanation:
      "Mindfulness helps you acknowledge negative thoughts without allowing them to control your emotions.",
  },
  {
    question: "How can regular physical exercise impact your mood?",
    options: [
      "Increases stress",
      "Improves sleep and reduces stress",
      "Has no effect on mental health",
      "Makes you more irritable",
    ],
    answer: 1,
    hint: "Think about endorphins.",
    explanation:
      "Exercise releases endorphins that naturally improve mood and reduce anxiety and stress.",
  },
  {
    question: "What is a healthy way to deal with feelings of anger?",
    options: [
      "Yelling and losing control",
      "Recognizing the feeling and taking a break",
      "Ignoring it completely",
      "Holding onto it",
    ],
    answer: 1,
    hint: "Think about taking a step back.",
    explanation:
      "Recognizing anger and taking a break helps to regain control and prevent outbursts.",
  },
  {
    question: "What can you do to help calm your mind before bed?",
    options: [
      "Drink caffeinated drinks",
      "Engage in a relaxing activity like reading",
      "Use your phone for long periods",
      "Sleep late",
    ],
    answer: 1,
    hint: "Think about relaxing activities.",
    explanation:
      "Reading a book, meditating, or listening to calming music helps to relax the mind before sleep.",
  },
  {
    question: "Which of these could help you cope with overwhelming anxiety?",
    options: [
      "Taking small, manageable steps",
      "Ignoring the anxiety",
      "Avoiding all responsibilities",
      "Holding in your feelings",
    ],
    answer: 0,
    hint: "Break it down into smaller tasks.",
    explanation:
      "Taking small, manageable steps helps to reduce overwhelming feelings and gives a sense of control.",
  },
  {
    question:
      "When you feel anxious about a situation, what can help you regain focus?",
    options: [
      "Focusing on negative possibilities",
      "Talking to someone you trust",
      "Letting the anxiety control you",
      "Thinking of the worst outcome",
    ],
    answer: 1,
    hint: "Think about support and sharing your feelings.",
    explanation:
      "Talking to a trusted person helps to gain perspective and manage anxiety effectively.",
  },
  {
    question: "What can mindfulness meditation do for you?",
    options: [
      "Make your problems worse",
      "Help you stay focused and calm",
      "Make you feel more stressed",
      "Create more anxiety",
    ],
    answer: 1,
    hint: "Focus on the present moment.",
    explanation:
      "Mindfulness meditation helps you stay present, reducing stress and promoting a calm mind.",
  },
  {
    question: "Which of the following can help you maintain emotional balance?",
    options: [
      "Ignoring your feelings",
      "Acknowledging and expressing your feelings",
      "Avoiding everything",
      "Staying overly busy",
    ],
    answer: 1,
    hint: "It’s about emotional awareness.",
    explanation:
      "Acknowledging and expressing your feelings allows you to process them, preventing emotional overload.",
  },
  {
    question: "How can you build resilience against stress?",
    options: [
      "Avoiding challenges",
      "Accepting help from others and practicing self-care",
      "Ignoring your emotions",
      "Shutting out negative experiences",
    ],
    answer: 1,
    hint: "Think about support and self-care.",
    explanation:
      "Resilience is built through self-care, asking for help, and learning to adapt to challenges.",
  },
  {
    question: "How does limiting screen time before bed help with stress?",
    options: [
      "Makes you more stressed",
      "Improves sleep quality and reduces stress",
      "Increases anxiety",
      "Makes you feel more alert",
    ],
    answer: 1,
    hint: "Think about how screen exposure affects sleep.",
    explanation:
      "Limiting screen time before bed helps you relax and prepares your body for sleep, which reduces stress.",
  },
  {
    question: "What is an effective strategy for managing stress at work?",
    options: [
      "Ignoring your workload",
      "Taking regular breaks to recharge",
      "Letting stress pile up",
      "Avoiding communication with others",
    ],
    answer: 1,
    hint: "Think about pacing yourself.",
    explanation:
      "Taking regular breaks helps to manage stress levels, improving focus and reducing burnout.",
  },
  {
    question: "When feeling overwhelmed, how can you help your body relax?",
    options: [
      "By tensing your muscles",
      "By practicing deep breathing",
      "By keeping still and stiff",
      "By avoiding movement",
    ],
    answer: 1,
    hint: "Focus on relaxation techniques.",
    explanation:
      "Deep breathing helps activate the body’s relaxation response, reducing tension and calming the mind.",
  },
  {
    question: "What role does self-compassion play in managing stress?",
    options: [
      "It increases anxiety",
      "It encourages negative thinking",
      "It helps reduce stress by being kind to yourself",
      "It makes stress worse",
    ],
    answer: 2,
    hint: "Think about treating yourself with kindness.",
    explanation:
      "Being kind to yourself and practicing self-compassion reduces stress and improves emotional resilience.",
  },
  {
    question: "How does practicing gratitude affect mental well-being?",
    options: [
      "It worsens negative emotions",
      "It helps shift focus from stress to positive aspects of life",
      "It has no impact on mental health",
      "It increases stress",
    ],
    answer: 1,
    hint: "Think about positive mindset shifts.",
    explanation:
      "Gratitude helps improve mood and reduces stress by focusing on what’s going well in life.",
  },
  {
    question: "When experiencing a panic attack, what should you do?",
    options: [
      "Ignore the symptoms",
      "Breathe slowly and focus on your surroundings",
      "Try to hide from the situation",
      "Allow the panic attack to run its course without help",
    ],
    answer: 1,
    hint: "Think about grounding techniques.",
    explanation:
      "Breathing slowly and focusing on your surroundings helps to ground you and reduce the intensity of a panic attack.",
  },
  {
    question:
      "What is an effective way to manage stress when feeling overwhelmed by responsibilities?",
    options: [
      "Taking on more tasks",
      "Breaking tasks into smaller steps",
      "Procrastinating",
      "Avoiding responsibilities",
    ],
    answer: 1,
    hint: "Focus on breaking tasks down.",
    explanation:
      "Breaking tasks into smaller, more manageable steps helps reduce the feeling of being overwhelmed by responsibilities.",
  },
  {
    question: "What is a common symptom of depression?",
    options: [
      "Feeling happy and energetic",
      "Lack of interest in daily activities",
      "Increased appetite",
      "Constantly feeling excited",
    ],
    answer: 1,
    hint: "Think about loss of interest and low energy.",
    explanation:
      "A common symptom of depression is a lack of interest or pleasure in activities that were once enjoyable.",
  },
  {
    question:
      "Which of the following can help improve mental health during tough times?",
    options: [
      "Ignoring the problem",
      "Talking to a therapist or counselor",
      "Avoiding people",
      "Drinking alcohol",
    ],
    answer: 1,
    hint: "Consider professional support.",
    explanation:
      "Talking to a therapist or counselor can help process emotions and develop coping strategies during difficult times.",
  },
  {
    question: "How does a healthy sleep routine impact mental health?",
    options: [
      "It has no impact on mental health",
      "It can improve mood and reduce anxiety",
      "It worsens anxiety",
      "It increases stress",
    ],
    answer: 1,
    hint: "Think about how rest affects mood and stress levels.",
    explanation:
      "A healthy sleep routine helps regulate mood, improve cognitive function, and reduce anxiety and stress.",
  },
  {
    question: "What is a grounding technique to manage anxiety?",
    options: [
      "Breathing deeply and focusing on your surroundings",
      "Watching TV",
      "Ignoring the anxiety",
      "Talking to someone who causes stress",
    ],
    answer: 0,
    hint: "Focus on the present moment.",
    explanation:
      "Grounding techniques like deep breathing and focusing on the present can help manage anxiety and bring a sense of calm.",
  },
  {
    question:
      "When feeling down, what is one effective strategy to improve mood?",
    options: [
      "Reaching out to a friend or loved one",
      "Isolating yourself",
      "Staying in bed all day",
      "Avoiding self-care",
    ],
    answer: 0,
    hint: "Consider the benefits of social connection.",
    explanation:
      "Reaching out to friends or family can provide emotional support, which is important for improving mood during tough times.",
  },
  {
    question:
      "Which of the following practices is beneficial for mental clarity?",
    options: [
      "Multitasking constantly",
      "Taking regular breaks",
      "Avoiding any downtime",
      "Not getting enough rest",
    ],
    answer: 1,
    hint: "Think about the balance between work and rest.",
    explanation:
      "Taking regular breaks throughout the day helps clear the mind and improve mental clarity, especially when working or studying.",
  },
  {
    question: "Which type of activity can help reduce symptoms of depression?",
    options: [
      "Watching sad movies all day",
      "Regular physical exercise",
      "Staying in isolation",
      "Ignoring feelings",
    ],
    answer: 1,
    hint: "Think about endorphins and movement.",
    explanation:
      "Physical exercise releases endorphins, which are natural mood boosters that can help reduce symptoms of depression.",
  },
  {
    question: "What is a good practice to build emotional resilience?",
    options: [
      "Avoiding all emotional challenges",
      "Maintaining a strong support network",
      "Bottling up your feelings",
      "Avoiding stressful situations",
    ],
    answer: 1,
    hint: "Think about the importance of relationships.",
    explanation:
      "Maintaining a strong support network of friends, family, and professionals helps build emotional resilience over time.",
  },
  {
    question: "How can journaling help with mental health?",
    options: [
      "It has no effect on mental health",
      "It allows for emotional expression and reflection",
      "It makes the situation worse",
      "It encourages negative thinking",
    ],
    answer: 1,
    hint: "Think about expressing thoughts on paper.",
    explanation:
      "Journaling helps people process and express their emotions, leading to better emotional clarity and reduced mental tension.",
  },
  {
    question:
      "Which of the following is a sign that someone might be struggling with mental health issues?",
    options: [
      "Consistent sadness or irritability",
      "Increased energy levels",
      "Talking constantly about positive events",
      "A sudden burst of creativity",
    ],
    answer: 0,
    hint: "Look for prolonged negative emotions.",
    explanation:
      "Persistent sadness or irritability can be a sign of underlying mental health issues, such as depression or anxiety.",
  },
  {
    question: "What is one way to help manage stress at work?",
    options: [
      "Taking on more tasks than you can handle",
      "Delegating tasks and prioritizing responsibilities",
      "Ignoring your responsibilities",
      "Staying at work late every night",
    ],
    answer: 1,
    hint: "Think about balance and task management.",
    explanation:
      "Delegating tasks and prioritizing responsibilities helps to manage work stress, preventing burnout and overwork.",
  },
  {
    question: "Which of these is a sign of burnout?",
    options: [
      "Feeling motivated and energized",
      "Constantly feeling tired and detached",
      "Consistently achieving your goals",
      "Being in a good mood most of the time",
    ],
    answer: 1,
    hint: "Think about exhaustion and disengagement.",
    explanation:
      "Burnout often involves feelings of exhaustion, detachment, and lack of motivation, especially after prolonged stress.",
  },
  {
    question: "Which of the following is an important part of self-care?",
    options: [
      "Ignoring your emotions",
      "Being too busy to take a break",
      "Taking time to relax and recharge",
      "Not getting enough sleep",
    ],
    answer: 2,
    hint: "Think about personal recharge time.",
    explanation:
      "Taking time to relax, recharge, and engage in activities that promote well-being is essential for mental health self-care.",
  },
  {
    question:
      "Which of these can help you better understand and manage your feelings?",
    options: [
      "Mindfulness meditation",
      "Staying distracted all the time",
      "Avoiding all emotions",
      "Ignoring your mental health concerns",
    ],
    answer: 0,
    hint: "Focus on present moment awareness.",
    explanation:
      "Mindfulness meditation helps you stay in the present and observe your emotions without judgment, leading to better emotional regulation.",
  },
  {
    question:
      "What should you do when you feel overwhelmed by a stressful situation?",
    options: [
      "Avoid the situation",
      "Take deep breaths and break the situation into smaller tasks",
      "Let the stress control you",
      "Ignore the stress and keep pushing forward",
    ],
    answer: 1,
    hint: "Focus on small steps and breath control.",
    explanation:
      "Taking a moment to breathe deeply and breaking tasks into smaller steps can help reduce the overwhelming feeling of stress.",
  },
  {
    question: "What is a good way to boost your self-esteem?",
    options: [
      "Focus on your achievements and strengths",
      "Ignore your personal accomplishments",
      "Constantly compare yourself to others",
      "Dwell on your mistakes",
    ],
    answer: 0,
    hint: "Think about positive self-reflection.",
    explanation:
      "Focusing on your achievements and strengths helps improve self-esteem and fosters a more positive self-image.",
  },
  {
    question: "How can positive self-talk help with managing anxiety?",
    options: [
      "It can make the anxiety worse",
      "It allows you to challenge and change negative thought patterns",
      "It doesn’t have any effect on anxiety",
      "It encourages more anxious thoughts",
    ],
    answer: 1,
    hint: "Think about replacing negativity with encouragement.",
    explanation:
      "Positive self-talk helps challenge negative thoughts and provides a more supportive mindset for managing anxiety.",
  },

  {
    question:
      "What is one effective strategy for managing anxiety in public speaking situations?",
    options: [
      "Avoid speaking altogether",
      "Practice deep breathing and visualization",
      "Ignore the anxiety and keep talking",
      "Focus only on the negative outcomes",
    ],
    answer: 1,
    hint: "Focus on calming techniques.",
    explanation:
      "Deep breathing and visualization can help calm nerves and reduce anxiety during public speaking.",
  },
  {
    question:
      "Which of the following activities is helpful for reducing stress?",
    options: [
      "Binge-watching TV shows for hours",
      "Engaging in physical exercise or a walk outdoors",
      "Staying on your phone all day",
      "Avoiding social interaction",
    ],
    answer: 1,
    hint: "Think about physical movement and connection with nature.",
    explanation:
      "Engaging in physical activity or spending time outdoors can help reduce stress and improve mood.",
  },
  {
    question:
      "What can help you recognize when you’re getting too overwhelmed with tasks?",
    options: [
      "Avoiding responsibilities",
      "Recognizing physical signs of stress (e.g., tightness in the chest, headache)",
      "Pushing through without a break",
      "Ignoring your emotional state",
    ],
    answer: 1,
    hint: "Pay attention to your body’s signals.",
    explanation:
      "Recognizing physical signs of stress can help you take a step back and reassess how to manage your tasks more effectively.",
  },
  {
    question:
      "When feeling overwhelmed by negative thoughts, what is a helpful strategy?",
    options: [
      "Ignoring the thoughts and pushing through",
      "Challenging the negative thoughts with more rational thinking",
      "Avoiding self-reflection",
      "Suppressing the thoughts without addressing them",
    ],
    answer: 1,
    hint: "Think about challenging unhelpful thinking patterns.",
    explanation:
      "Challenging negative thoughts with more rational thinking can help shift your mindset and reduce their power over you.",
  },
  {
    question: "What does practicing mindfulness help with?",
    options: [
      "Living in the past",
      "Paying attention to the present moment without judgment",
      "Ignoring current feelings",
      "Avoiding your emotions",
    ],
    answer: 1,
    hint: "Focus on being present and aware.",
    explanation:
      "Mindfulness involves paying attention to the present moment, which can reduce anxiety and increase emotional regulation.",
  },
  {
    question: "How does having a routine contribute to mental well-being?",
    options: [
      "It restricts your freedom",
      "It helps reduce uncertainty and anxiety by creating structure",
      "It has no impact on mental health",
      "It increases stress by limiting spontaneity",
    ],
    answer: 1,
    hint: "Think about structure and predictability.",
    explanation:
      "A daily routine provides structure and predictability, which can reduce feelings of anxiety and stress.",
  },
  {
    question: "What is one thing you can do when you feel emotionally drained?",
    options: [
      "Keep working non-stop",
      "Give yourself permission to rest and recharge",
      "Ignore your feelings",
      "Push yourself even harder to finish tasks",
    ],
    answer: 1,
    hint: "Think about self-care and rest.",
    explanation:
      "Resting and allowing yourself to recharge is essential for emotional recovery and well-being.",
  },
  {
    question:
      "How can socializing with friends or loved ones improve mental health?",
    options: [
      "It makes you feel isolated",
      "It provides emotional support, reduces loneliness, and boosts mood",
      "It increases stress",
      "It distracts you from important tasks",
    ],
    answer: 1,
    hint: "Think about connection and emotional support.",
    explanation:
      "Spending time with friends and family offers emotional support and connection, which can improve mood and reduce feelings of loneliness.",
  },
  {
    question:
      "When feeling sad, what is one thing that might help improve your mood?",
    options: [
      "Engaging in creative activities like drawing, writing, or music",
      "Ignoring your emotions and pushing through",
      "Focusing only on your problems",
      "Avoiding self-care",
    ],
    answer: 0,
    hint: "Think about expressing yourself in a creative way.",
    explanation:
      "Creative activities can help process emotions and bring a sense of accomplishment and joy, boosting mood during sad times.",
  },
  {
    question: "Which of the following is a way to practice self-compassion?",
    options: [
      "Being harsh on yourself for mistakes",
      "Acknowledging your feelings without judgment and treating yourself kindly",
      "Ignoring your emotions",
      "Pretending to be perfect at all times",
    ],
    answer: 1,
    hint: "Think about being kind to yourself.",
    explanation:
      "Self-compassion involves acknowledging your emotions without self-criticism and treating yourself with kindness during difficult moments.",
  },
  {
    question:
      "What can happen if you ignore the symptoms of mental health issues?",
    options: [
      "They may improve over time without any intervention",
      "They can worsen and affect overall well-being",
      "They will go away on their own eventually",
      "They will have no impact on your life",
    ],
    answer: 1,
    hint: "Consider the long-term effects of not addressing mental health concerns.",
    explanation:
      "Ignoring mental health symptoms can lead to worsening conditions, which may affect overall well-being and quality of life.",
  },
  {
    question:
      "Which of the following is important to do when you feel depressed?",
    options: [
      "Keep your feelings to yourself and stay isolated",
      "Reach out for support from a therapist, loved ones, or a support group",
      "Ignore your emotions and keep busy",
      "Pretend everything is okay when it’s not",
    ],
    answer: 1,
    hint: "Think about seeking support and not isolating yourself.",
    explanation:
      "Reaching out to others for support is essential when feeling depressed, as it can help you feel heard and supported.",
  },
  {
    question: "How can practicing gratitude benefit mental health?",
    options: [
      "It makes you ignore the negative aspects of life",
      "It improves mood by focusing on the positive",
      "It can make things worse by making you feel guilty",
      "It doesn’t impact mental health",
    ],
    answer: 1,
    hint: "Think about focusing on the positive aspects of life.",
    explanation:
      "Practicing gratitude helps shift focus to the positive aspects of life, which can improve mood and emotional well-being.",
  },
  {
    question: "What is a key aspect of healthy emotional regulation?",
    options: [
      "Suppressing all emotions",
      "Recognizing and accepting emotions without being overwhelmed by them",
      "Ignoring emotions",
      "Dismissing negative feelings",
    ],
    answer: 1,
    hint: "Think about acceptance and balance.",
    explanation:
      "Healthy emotional regulation involves acknowledging emotions and processing them without being overwhelmed or avoiding them.",
  },
  {
    question: "What can regular physical activity do for your mental health?",
    options: [
      "Make you more stressed",
      "Increase endorphin levels, boost mood, and reduce anxiety and depression",
      "Make you more tired without benefit",
      "Have no impact on mental health",
    ],
    answer: 1,
    hint: "Think about the benefits of movement on mental health.",
    explanation:
      "Physical activity boosts endorphins, which are natural mood enhancers that help reduce symptoms of anxiety and depression.",
  },
  {
    question: "How can mindfulness help in managing negative emotions?",
    options: [
      "It distracts you from your emotions",
      "It helps you understand and accept your emotions without judgment",
      "It makes emotions worse",
      "It avoids emotional issues altogether",
    ],
    answer: 1,
    hint: "Think about observing emotions without reacting to them.",
    explanation:
      "Mindfulness helps you observe and accept your emotions without judgment, which can reduce their intensity and impact on your mental well-being.",
  },
  {
    question:
      "When dealing with anxiety, what can grounding exercises help with?",
    options: [
      "Making you feel more anxious",
      "Helping you stay connected to the present moment and reduce overwhelming feelings",
      "Distracting you from the situation",
      "Making you forget about your anxiety",
    ],
    answer: 1,
    hint: "Focus on calming your mind and body.",
    explanation:
      "Grounding exercises, like deep breathing or focusing on your senses, help you stay connected to the present and reduce the intensity of anxiety.",
  },
  {
    question: "What is one thing you can do when you are feeling angry?",
    options: [
      "Keep everything bottled up inside",
      "Engage in physical activity like walking or stretching to release pent-up energy",
      "Ignore the anger and pretend it doesn’t exist",
      "Yell at others to release your anger",
    ],
    answer: 1,
    hint: "Think about healthy ways to release energy.",
    explanation:
      "Physical activity, like walking or stretching, helps release pent-up anger in a healthy and non-destructive way.",
  },
];

function getRandomQuestions(questions, numQuestions = 5) {
    const randomQuestions = [];
    const questionsCopy = [...questions]; // Make a copy of the questions array to avoid modifying the original array
  
    for (let i = 0; i < numQuestions; i++) {
      // Select a random index from the questions array
      const randomIndex = Math.floor(Math.random() * questionsCopy.length);
      
      // Add the selected question to the randomQuestions array
      randomQuestions.push(questionsCopy[randomIndex]);
      
      // Remove the selected question from the copy to avoid selecting it again
      questionsCopy.splice(randomIndex, 1);
    }
  
    return randomQuestions;
  }
  
  // Example usage:
  export const randomQuestions = getRandomQuestions(questions, 5);
  for(let i=0; i<randomQuestions.length; i++){
    console.log("Random Questions",i, randomQuestions[i]);
  }

  
