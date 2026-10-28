export const defaultEvents = [
  { id: 'ev-1', date: '12', month: 'JUN', title: 'Code & Chai', meta: 'Department · 10:00 AM', color: 'orange' },
  { id: 'ev-2', date: '18', month: 'JUN', title: 'UI/UX design sprint', meta: 'Design club · Lab 2', color: 'violet' },
  { id: 'ev-3', date: '26', month: 'JUN', title: 'Industry connect', meta: 'Association · Seminar hall', color: 'blue' },
]

export const defaultFaculty = [
  { id: 'fac-1', name: 'Dr. Muhammed Niyas', role: 'Head of Department', tag: 'PhD · Computer Science', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=480&q=85' },
  { id: 'fac-2', name: 'Ms. Fathima Shirin', role: 'Assistant Professor', tag: 'MCA · Data & AI', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=480&q=85' },
  { id: 'fac-3', name: 'Mr. Ameen K.', role: 'Assistant Professor', tag: 'MTech · Web Technologies', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=480&q=85' },
  { id: 'fac-4', name: 'Ms. Anju Thomas', role: 'Guest Lecturer', tag: 'MSc · Cyber Security', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=480&q=85' },
]

export const defaultSubjects = [
  // Sem 1
  { id: 'sub-1', code: 'MFC', title: 'Mathematical Foundations of Computing', tone: 'blue', semester: 'Sem 1' },
  { id: 'sub-2', code: 'DM', title: 'Discrete Mathematics', tone: 'violet', semester: 'Sem 1' },
  { id: 'sub-3', code: 'AEC II', title: 'Arabic / Malayalam', tone: 'orange', semester: 'Sem 1' },
  { id: 'sub-4', code: 'AEC I', title: 'Ability Enhancement Course', tone: 'green', semester: 'Sem 1' },
  // Sem 2
  { id: 'sub-5', code: 'DS', title: 'Data Structures using C', tone: 'cyan', semester: 'Sem 2' },
  { id: 'sub-6', code: 'COA', title: 'Computer Organization & Architecture', tone: 'indigo', semester: 'Sem 2' },
  { id: 'sub-7', code: 'SEC I', title: 'Web Development Fundamentals', tone: 'pink', semester: 'Sem 2' },
  // Sem 3
  { id: 'sub-8', code: 'OOP', title: 'Object Oriented Programming using Java', tone: 'blue', semester: 'Sem 3' },
  { id: 'sub-9', code: 'DBMS', title: 'Database Management Systems', tone: 'green', semester: 'Sem 3' },
  { id: 'sub-10', code: 'OS', title: 'Operating Systems & Linux Shell', tone: 'orange', semester: 'Sem 3' },
  // Sem 4
  { id: 'sub-11', code: 'CN', title: 'Computer Networks & Protocols', tone: 'cyan', semester: 'Sem 4' },
  { id: 'sub-12', code: 'PY', title: 'Python Programming & Data Analytics', tone: 'violet', semester: 'Sem 4' },
  { id: 'sub-13', code: 'SE', title: 'Software Engineering Principles', tone: 'pink', semester: 'Sem 4' },
  // Sem 5
  { id: 'sub-14', code: 'AI', title: 'Artificial Intelligence & Neural Networks', tone: 'blue', semester: 'Sem 5' },
  { id: 'sub-15', code: 'CLOUD', title: 'Cloud Computing & Virtualization', tone: 'cyan', semester: 'Sem 5' },
  // Sem 6
  { id: 'sub-16', code: 'CYBER', title: 'Cyber Security & Cryptography', tone: 'green', semester: 'Sem 6' },
  { id: 'sub-17', code: 'MOB', title: 'Mobile Application Development', tone: 'orange', semester: 'Sem 6' },
  // Sem 7
  { id: 'sub-18', code: 'ML', title: 'Applied Machine Learning & NLP', tone: 'violet', semester: 'Sem 7' },
  // Sem 8
  { id: 'sub-19', code: 'PROJ', title: 'Capstone Industry Project', tone: 'cyan', semester: 'Sem 8' },
]

export const defaultAssociations = [
  {
    id: 'assoc-2026-2027',
    fromYear: '2026',
    toYear: '2027',
    name: 'Second BCA Association',
    secretaryName: 'Aisha Rahman',
    secretaryRole: 'Secretary · 2026—27',
    secretaryPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=560&q=85',
    quote: 'We make room for everyone.',
    description: 'Our association is a shared table: a place for first ideas, half-finished thoughts and the confidence to put them into the world.',
    active: true,
  },
  {
    id: 'assoc-2025-2026',
    fromYear: '2025',
    toYear: '2026',
    name: 'Founding Association',
    secretaryName: 'Farhan Ali',
    secretaryRole: 'Secretary · 2025—26',
    secretaryPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=560&q=85',
    quote: 'Start where you are, use what you have.',
    description: 'The inaugural student association that established the core community initiatives and technical clubs at PSMO College.',
    active: false,
  },
]

export const defaultReports = [
  { id: 'rep-1', title: 'Inauguration & induction 2026', type: 'EVENT REPORT', date: '08.06.2026', isMagazine: false },
  { id: 'rep-2', title: 'TechTide · A week of making', type: 'EVENT REPORT', date: '24.05.2026', isMagazine: false },
  { id: 'rep-3', title: 'The Loop — issue 02', type: 'ANNUAL MAGAZINE', date: '15.04.2026', isMagazine: true },
]

export const defaultClubInfo = {
  name: 'The BCA Club',
  estYear: '2026',
  tagline: 'Build the unexpected.',
  punchline: 'Bring a question. Leave with a prototype.',
  description: 'The club is where curiosity gets messy — side projects, new skills, late-night ideas and the joy of building together.',
}

export const defaultClubEvents = [
  { id: 'ce-1', number: '01', title: 'Code & Chai', date: '12 Jun · 10:00 AM', copy: 'A casual morning of tiny tools, big questions and better coffee.', color: 'orange' },
  { id: 'ce-2', number: '02', title: 'Design sprint', date: '18 Jun · Lab 2', copy: 'A two-hour sprint to turn an everyday annoyance into an interface.', color: 'violet' },
  { id: 'ce-3', number: '03', title: 'Open source hour', date: '02 Jul · 2:00 PM', copy: 'Learn how to make your first meaningful contribution.', color: 'blue' },
]

export const defaultGallery = [
  { id: 'gal-1', image: 'college-photo.jpg', type: 'Campus', title: 'A place to begin' },
  { id: 'gal-2', image: 'college-garden.jpg', type: 'Campus', title: 'Green between classes' },
  { id: 'gal-3', image: 'college-logo.png', type: 'Identity', title: 'Our mark, our story' },
  { id: 'gal-4', image: 'college-photo.jpg', type: 'Events', title: 'The main block' },
  { id: 'gal-5', image: 'college-garden.jpg', type: 'Campus', title: 'Slow afternoons' },
  { id: 'gal-6', image: 'college-photo.jpg', type: 'Events', title: 'Together, in progress' },
]

export const defaultPapers = [
  // Sem 1 MFC
  { id: 'pap-1', subject: 'MFC', semester: 'Sem 1', year: '2025' },
  { id: 'pap-2', subject: 'MFC', semester: 'Sem 1', year: '2024' },
  // Sem 1 DM
  { id: 'pap-3', subject: 'DM', semester: 'Sem 1', year: '2025' },
  { id: 'pap-4', subject: 'DM', semester: 'Sem 1', year: '2024' },
  // Sem 1 AEC II
  { id: 'pap-5', subject: 'AEC II', semester: 'Sem 1', year: '2025' },
  // Sem 1 AEC I
  { id: 'pap-6', subject: 'AEC I', semester: 'Sem 1', year: '2025' },
  // Sem 2 DS
  { id: 'pap-7', subject: 'DS', semester: 'Sem 2', year: '2025' },
  { id: 'pap-8', subject: 'DS', semester: 'Sem 2', year: '2024' },
  // Sem 2 COA
  { id: 'pap-9', subject: 'COA', semester: 'Sem 2', year: '2025' },
  // Sem 2 SEC I
  { id: 'pap-10', subject: 'SEC I', semester: 'Sem 2', year: '2025' },
  // Sem 3 OOP
  { id: 'pap-11', subject: 'OOP', semester: 'Sem 3', year: '2025' },
  // Sem 3 DBMS
  { id: 'pap-12', subject: 'DBMS', semester: 'Sem 3', year: '2025' },
  { id: 'pap-13', subject: 'DBMS', semester: 'Sem 3', year: '2024' },
  // Sem 3 OS
  { id: 'pap-14', subject: 'OS', semester: 'Sem 3', year: '2025' },
]

export const defaultSyllabus = [
  // Sem 1
  {
    id: 'syl-1',
    subjectCode: 'MFC',
    subjectTitle: 'Mathematical Foundations of Computing',
    semester: 'Sem 1',
    credits: '4 Credits · 60 Hours',
    regulation: 'PSMO Autonomous / Calicut University 2026',
    modules: [
      { unit: 'Unit 1: Set Theory & Relations', desc: 'Sets, subsets, equivalence classes, functions, and matrix representation of relations.' },
      { unit: 'Unit 2: Logic & Propositional Calculus', desc: 'Well-formed formulas, tautologies, normal forms, predicate calculus and inference.' },
      { unit: 'Unit 3: Graph Theory Basics', desc: 'Paths, cycles, Eulerian & Hamiltonian graphs, trees, and spanning algorithms.' },
      { unit: 'Unit 4: Linear Algebra in Computing', desc: 'Matrices, determinants, rank, eigenvalues, and system of linear equations.' },
      { unit: 'Open Ended Module: Computational Graph Models', desc: 'Self-directed exploratory study on graph algorithms, network topology, and real-world combinatorial models.', isOpenEnded: true },
    ],
  },
  {
    id: 'syl-2',
    subjectCode: 'DM',
    subjectTitle: 'Discrete Mathematics',
    semester: 'Sem 1',
    credits: '4 Credits · 60 Hours',
    regulation: 'PSMO Autonomous / Calicut University 2026',
    modules: [
      { unit: 'Unit 1: Mathematical Induction & Recurrence', desc: 'Induction proofs, recurrence relations, and generating functions.' },
      { unit: 'Unit 2: Algebraic Structures', desc: 'Semigroups, monoids, groups, subgroups, and homomorphisms.' },
      { unit: 'Unit 3: Boolean Algebra & Lattices', desc: 'Partially ordered sets, lattices as algebraic systems, and Karnaugh maps.' },
      { unit: 'Unit 4: Combinatorics', desc: 'Permutations, combinations, pigeonhole principle, and inclusion-exclusion.' },
    ],
  },
  {
    id: 'syl-3',
    subjectCode: 'AEC II',
    subjectTitle: 'Functional Language Proficiency (Arabic / Malayalam)',
    semester: 'Sem 1',
    credits: '3 Credits · 45 Hours',
    regulation: 'PSMO Autonomous 2026',
    modules: [
      { unit: 'Unit 1: Applied Communication', desc: 'Technical reading, vocabulary acquisition, and formal written discourse.' },
      { unit: 'Unit 2: Professional Correspondence', desc: 'Academic drafting, documentation standards, and communicative translation.' },
      { unit: 'Unit 3: Digital Media Texts', desc: 'Analysis of digital articles, technical journalism, and contextual dialogues.' },
    ],
  },
  {
    id: 'syl-4',
    subjectCode: 'AEC I',
    subjectTitle: 'Ability Enhancement Course: Environmental Science & Ethics',
    semester: 'Sem 1',
    credits: '3 Credits · 45 Hours',
    regulation: 'PSMO Autonomous 2026',
    modules: [
      { unit: 'Unit 1: Ecology & Ecosystems', desc: 'Natural resource management, biodiversity conservation, and environmental legislation.' },
      { unit: 'Unit 2: Green Computing Principles', desc: 'E-waste disposal, sustainable data centres, and digital energy efficiency.' },
      { unit: 'Unit 3: Ethics in IT & Society', desc: 'Professional codes of conduct, data stewardship, and societal responsibility.' },
    ],
  },
  // Sem 2
  {
    id: 'syl-5',
    subjectCode: 'DS',
    subjectTitle: 'Data Structures using C',
    semester: 'Sem 2',
    credits: '4 Credits · 60 Hours',
    regulation: 'PSMO Autonomous / Calicut University 2026',
    modules: [
      { unit: 'Unit 1: Linear Data Structures', desc: 'Arrays, singly/doubly linked lists, stack operations, and circular queues.' },
      { unit: 'Unit 2: Non-Linear Structures', desc: 'Binary search trees, AVL trees, traversal algorithms, and heaps.' },
      { unit: 'Unit 3: Graph Algorithms', desc: 'Adjacency representation, BFS, DFS, Dijkstra shortest path, and Prim algorithms.' },
      { unit: 'Unit 4: Sorting & Hashing', desc: 'Quick sort, merge sort, hash tables, and collision handling techniques.' },
    ],
  },
  {
    id: 'syl-6',
    subjectCode: 'COA',
    subjectTitle: 'Computer Organization & Architecture',
    semester: 'Sem 2',
    credits: '4 Credits · 60 Hours',
    regulation: 'PSMO Autonomous / Calicut University 2026',
    modules: [
      { unit: 'Unit 1: Digital Logic & Register Transfer', desc: 'Gates, multiplexers, decoders, bus transfers, and micro-operations.' },
      { unit: 'Unit 2: Central Processing Unit', desc: 'General register organization, stack organization, instruction formats, and addressing modes.' },
      { unit: 'Unit 3: Memory Organization', desc: 'Memory hierarchy, main memory, auxiliary memory, cache memory mapping, and virtual memory.' },
      { unit: 'Unit 4: I/O Organization & Pipelining', desc: 'Peripheral devices, asynchronous data transfer, DMA, and arithmetic pipelining.' },
    ],
  },
  {
    id: 'syl-7',
    subjectCode: 'SEC I',
    subjectTitle: 'Skill Enhancement: Web Development Fundamentals',
    semester: 'Sem 2',
    credits: '3 Credits · 45 Hours',
    regulation: 'PSMO Autonomous 2026',
    modules: [
      { unit: 'Unit 1: Semantic HTML5 & CSS3', desc: 'Responsive grid, Flexbox layouts, accessible forms, and CSS custom properties.' },
      { unit: 'Unit 2: Modern JavaScript (ES6+)', desc: 'DOM manipulation, asynchronous fetch APIs, promises, and event delegation.' },
      { unit: 'Unit 3: Component Frameworks', desc: 'Single-page architecture, state management, and modern bundlers (Vite).' },
    ],
  },
  // Sem 3
  {
    id: 'syl-8',
    subjectCode: 'OOP',
    subjectTitle: 'Object Oriented Programming using Java',
    semester: 'Sem 3',
    credits: '4 Credits · 60 Hours',
    regulation: 'PSMO Autonomous 2026',
    modules: [
      { unit: 'Unit 1: Java Foundations & Classes', desc: 'Data types, control structures, class design, constructors, and encapsulation.' },
      { unit: 'Unit 2: Inheritance & Polymorphism', desc: 'Superclasses, method overriding, abstract classes, interfaces, and packages.' },
      { unit: 'Unit 3: Exception Handling & Multithreading', desc: 'Try-catch blocks, custom exceptions, thread lifecycle, and synchronization.' },
      { unit: 'Unit 4: Java Collections & Streams', desc: 'ArrayList, HashMap, iterators, lambda expressions, and file I/O operations.' },
    ],
  },
  {
    id: 'syl-9',
    subjectCode: 'DBMS',
    subjectTitle: 'Database Management Systems',
    semester: 'Sem 3',
    credits: '4 Credits · 60 Hours',
    regulation: 'PSMO Autonomous / Calicut University 2026',
    modules: [
      { unit: 'Unit 1: Relational Model & Normalization', desc: 'ER diagrams, functional dependencies, 1NF, 2NF, 3NF, and BCNF.' },
      { unit: 'Unit 2: Structured Query Language (SQL)', desc: 'DDL, DML, joins, subqueries, triggers, views, and index optimization.' },
      { unit: 'Unit 3: Transactions & Concurrency', desc: 'ACID guarantees, serializability, two-phase locking, and deadlock resolution.' },
      { unit: 'Unit 4: NoSQL Databases', desc: 'Document stores, key-value databases, and MongoDB indexing.' },
    ],
  },
  {
    id: 'syl-10',
    subjectCode: 'OS',
    subjectTitle: 'Operating Systems & Linux Shell',
    semester: 'Sem 3',
    credits: '4 Credits · 60 Hours',
    regulation: 'PSMO Autonomous 2026',
    modules: [
      { unit: 'Unit 1: Processes & CPU Scheduling', desc: 'Process states, PCB, threads, FCFS, SJF, Round Robin, and priority scheduling.' },
      { unit: 'Unit 2: Synchronization & Deadlocks', desc: 'Critical section problem, semaphores, monitors, deadlock prevention, and Banker algorithm.' },
      { unit: 'Unit 3: Memory Management & Paging', desc: 'Contiguous allocation, paging, segmentation, virtual memory, and page replacement.' },
      { unit: 'Unit 4: File Systems & Shell Scripting', desc: 'File directory structure, disk scheduling (SSTF, SCAN), and Bash automation scripts.' },
    ],
  },
]

export const defaultQuizQuestions = [
  // Sem 1 MFC
  { id: 'q-1', subject: 'MFC', semester: 'Sem 1', text: 'Which statement best describes a proposition in mathematical logic?', options: ['A declarative sentence that is either true or false', 'An open algebraic formula', 'A variable assignment command', 'A computer algorithm loop'], answer: 'A declarative sentence that is either true or false' },
  { id: 'q-2', subject: 'MFC', semester: 'Sem 1', text: 'What is the determinant of an identity matrix of order n?', options: ['0', '1', 'n', 'Undefined'], answer: '1' },
  // Sem 1 DM
  { id: 'q-3', subject: 'DM', semester: 'Sem 1', text: 'What is the cardinality of the power set of a set with 3 elements?', options: ['6', '8', '9', '3'], answer: '8' },
  { id: 'q-4', subject: 'DM', semester: 'Sem 1', text: 'Which property asserts that if aRb and bRa then a = b?', options: ['Reflexive', 'Symmetric', 'Antisymmetric', 'Transitive'], answer: 'Antisymmetric' },
  // Sem 1 AEC II
  { id: 'q-5', subject: 'AEC II', semester: 'Sem 1', text: 'What is the primary objective of technical language study in AEC II?', options: ['Professional communication & formal documentation', 'Database index tuning', 'Assembly programming', 'Digital circuit analysis'], answer: 'Professional communication & formal documentation' },
  // Sem 1 AEC I
  { id: 'q-6', subject: 'AEC I', semester: 'Sem 1', text: 'In green computing principles, which practice minimizes electronic footprint?', options: ['Sustainable e-waste lifecycle & energy-efficient data centres', 'Overclocking CPU clock frequencies', 'Continuous background batch rendering', 'Unrestricted paper printing'], answer: 'Sustainable e-waste lifecycle & energy-efficient data centres' },
  // Sem 2 DS
  { id: 'q-7', subject: 'DS', semester: 'Sem 2', text: 'Which data structure strictly operates under the LIFO (Last In First Out) principle?', options: ['Queue', 'Stack', 'Tree', 'Graph'], answer: 'Stack' },
  { id: 'q-8', subject: 'DS', semester: 'Sem 2', text: 'What is the average time complexity of searching a sorted array using Binary Search?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], answer: 'O(log n)' },
  // Sem 2 COA
  { id: 'q-9', subject: 'COA', semester: 'Sem 2', text: 'Which processor register holds the memory address of the next instruction to fetch?', options: ['Instruction Register (IR)', 'Program Counter (PC)', 'Memory Buffer Register (MBR)', 'Accumulator (AC)'], answer: 'Program Counter (PC)' },
  // Sem 2 SEC I
  { id: 'q-10', subject: 'SEC I', semester: 'Sem 2', text: 'What does CSS Flexbox primarily optimize within modern user interfaces?', options: ['One-dimensional directional layout distribution', 'Server database query planning', 'Hardware graphics rendering pipeline', 'TCP network packet streaming'], answer: 'One-dimensional directional layout distribution' },
  // Sem 3 OOP
  { id: 'q-11', subject: 'OOP', semester: 'Sem 3', text: 'Which Java OOP concept enables a subclass to provide a specialized implementation of an inherited method?', options: ['Method Overriding', 'Encapsulation', 'Data Abstraction', 'Code Compilation'], answer: 'Method Overriding' },
  // Sem 3 DBMS
  { id: 'q-12', subject: 'DBMS', semester: 'Sem 3', text: 'Which SQL command is used to retrieve only unique and non-duplicate tuples?', options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'ISOLATE'], answer: 'DISTINCT' },
  // Sem 3 OS
  { id: 'q-13', subject: 'OS', semester: 'Sem 3', text: 'Which CPU scheduling algorithm gives each process a small fixed unit of CPU time (time quantum)?', options: ['Round Robin (RR)', 'First-Come First-Served (FCFS)', 'Shortest Job First (SJF)', 'Priority Scheduling'], answer: 'Round Robin (RR)' },
]

export const defaultStudents = [
  { id: 'stu-1', rollNo: 'BC01', name: 'Aarav P.', admissionNo: 'ADM-2614', registerNo: 'PSM-26104', email: 'aarav@psmo.edu.in', batch: '2025–2029', semester: 'Sem 1' },
  { id: 'stu-2', rollNo: 'BC02', name: 'Fathima N.', admissionNo: 'ADM-2615', registerNo: 'PSM-26105', email: 'fathima@psmo.edu.in', batch: '2025–2029', semester: 'Sem 1' },
  { id: 'stu-3', rollNo: 'BC03', name: 'Mohammed R.', admissionNo: 'ADM-2616', registerNo: 'PSM-26106', email: 'mohammed@psmo.edu.in', batch: '2025–2029', semester: 'Sem 1' },
  { id: 'stu-4', rollNo: 'BC04', name: 'Devika S.', admissionNo: 'ADM-2617', registerNo: 'PSM-26107', email: 'devika@psmo.edu.in', batch: '2025–2029', semester: 'Sem 1' },
]

export const defaultBatches = ['2025–2029', '2026–2030']

export const defaultFinance = [
  { id: 'fin-1', title: 'TechFest 2026 Sponsorship', category: 'Income', amount: '₹45,000', date: '10.06.2026', status: 'Completed' },
  { id: 'fin-2', title: 'Robotics Workshop Kit Purchase', category: 'Expense', amount: '₹18,500', date: '04.06.2026', status: 'Approved' },
  { id: 'fin-3', title: 'Annual Magazine Printing Grant', category: 'Grant', amount: '₹30,000', date: '28.05.2026', status: 'Received' },
  { id: 'fin-4', title: 'Association Induction Stage & AV', category: 'Expense', amount: '₹12,400', date: '15.05.2026', status: 'Completed' },
]
