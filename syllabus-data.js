/* CAMPUS ONE — OFFICIAL 1ST-YEAR SYLLABUS DATA
   Source: M.D. University, Rohtak, Scheme of Examination & Syllabus,
   B.Tech 1st Year, H-Scheme (NEP-2020), effective from 2025-26.
   The supplied document lists CSE and allied Computer Science branches for
   the CSE-family Mathematics/Physics variants. CAMPUS ONE labels the second
   selector as “CSE + AI/ML” to match the current A2 section label.
*/

const CAMPUS_ONE_SYLLABUS = {
  source: {
    university: "M.D. University, Rohtak",
    scheme: "H-Scheme (Under NEP-2020)",
    effective: "Academic Session 2025-26",
    note: "First-year syllabus is common for B.Tech programmes, with branch-specific variants for selected courses."
  },
  branches: [
    { id: "cse", label: "B.Tech CSE", note: "CSE-family first-year syllabus." },
    { id: "cse-aiml", label: "B.Tech CSE + AI/ML", note: "CAMPUS ONE A2 label; use the CSE-family syllabus where the supplied document lists CSE/allied Computer Science branches." }
  ],
  semesters: {
    "1": {
      label: "Semester I",
      courses: [
        {
          code: "25BSC-MATH-103H", title: "Mathematics-I (Calculus and Linear Algebra)", category: "Basic Science Course", credits: 4, scheme: "L 3 · T 1 · P 0", marks: "30 classwork + 70 examination = 100", exam: "03 Hours", pages: "19–20",
          aliases: ["mathematics i", "maths i", "math i", "mathematics 1", "maths 1", "math 1", "calculus", "linear algebra"],
          objectives: ["Understand and apply mathematical tools from calculus and linear algebra for engineering problems.", "Build foundations in mean value theorems, Taylor/Maclaurin series, curvature and special functions.", "Understand matrix algebra, systems of linear equations, vector spaces, basis and dimension.", "Understand eigenvalues, eigenvectors and inner product spaces."],
          units: [
            ["Unit I — Calculus", "Indeterminate forms and L'Hospital's rule; maxima and minima; Rolle's, Lagrange's and Cauchy's mean value theorems; Taylor and Maclaurin theorems/series; curvature; evolutes and involutes; Beta and Gamma functions; applications of definite integrals to surface area and volume of solids of revolution."],
            ["Unit II — Matrices", "Matrices and vectors; matrix multiplication; determinants; elementary transformations; inverse and rank; normal and echelon forms; linear systems; linear independence; Cramer's rule; Gauss elimination and Gauss-Jordan elimination."],
            ["Unit III — Vector Spaces I", "Vector spaces and subspaces; linear span; linear dependence; basis and dimension; linear transformations; range and kernel; rank and nullity; inverse transformations; Rank-Nullity Theorem; matrix associated with a linear map; composition of linear maps."],
            ["Unit IV — Vector Spaces II", "Eigenvalues and eigenvectors; symmetric, skew-symmetric and orthogonal matrices; eigen bases; diagonalization; inner product spaces; orthogonal sets and complements; orthonormal sets; Gram-Schmidt orthogonalization."]
          ],
          outcomes: ["Define core calculus and linear algebra terminology.", "Understand major theorems and methods including Gauss elimination, Rank-Nullity and Gram-Schmidt.", "Apply calculus to evolutes, maxima/minima, volume and surface area.", "Analyze systems of linear equations.", "Evaluate eigenvalues/eigenvectors and vector-space basis/dimension."],
          references: ["Reena Garg, AICTE’s Prescribed Textbook: Mathematics-I (Calculus and Linear Algebra), Khanna Book Publishing Co.", "G.B. Thomas and R.L. Finney, Calculus and Analytic Geometry.", "Erwin Kreyszig, Advanced Engineering Mathematics."]
        },
        {
          code: "25BSC-PHY-103H", title: "Semiconductor Physics", category: "Basic Science Course", credits: 4, scheme: "L 3 · T 1 · P 0", marks: "30 classwork + 70 examination = 100", exam: "03 Hours", pages: "37–39",
          aliases: ["physics", "physics 1", "semiconductor", "semiconductor physics", "quantum physics", "lasers"],
          objectives: ["Understand limitations of classical mechanics and fundamentals of quantum mechanics.", "Understand energy bands in solids and different electronic materials.", "Learn the physics and applications of semiconducting devices.", "Develop basic understanding of lasers and optical fibres."],
          units: [
            ["Unit I — Introduction to Quantum Mechanics", "Limitations of classical mechanics; black-body radiation and Planck's law; photoelectric effect; Compton effect; wave-particle duality; de Broglie hypothesis; uncertainty principle; time-dependent and time-independent Schrödinger equations; physical significance of wave function; particle in a 1-D box."],
            ["Unit II — Electronic Materials", "Free electron theory; Drude model; Kronig-Penney model; energy bands and E-k diagram; direct and indirect band gaps; metals, semiconductors and insulators; density of states; occupation probability; Fermi level; effective mass; phonons."],
            ["Unit III — Semiconductors", "Intrinsic and extrinsic semiconductors; Fermi level dependence on carrier concentration and temperature; diffusion and drift; p-n junction; qualitative heterojunctions; Ohmic and Schottky metal-semiconductor junctions; photoconductivity and photovoltaic effect; photoconductive cell, photodiode, solar cell and LED."],
            ["Unit IV — Lasers", "Einstein theory of matter-radiation interaction; absorption, spontaneous/stimulated emission; A and B coefficients; population inversion; pumping; two-, three- and four-level systems; laser characteristics; He-Ne, Ruby and semiconductor lasers; applications."]
          ],
          outcomes: ["Analyse classical versus quantum mechanical phenomena.", "Understand energy bands and electronic materials.", "Understand semiconductors, carrier transport and optoelectronic devices.", "Understand laser emission systems and applications."],
          references: ["J. Singh, Semiconductor Optoelectronics: Physics and Technology.", "S. M. Sze, Semiconductor Devices: Physics and Technology.", "A. Yariv and P. Yeh, Photonics: Optical Electronics in Modern Communications."]
        },
        {
          code: "25ESC-CSE101H", title: "Programming for Problem Solving", category: "Engineering Science Course", credits: 3, scheme: "L 3 · T 0 · P 0", marks: "25 classwork + 50 examination = 75", exam: "03 Hours", pages: "67–69",
          aliases: ["pps", "programming", "programming for problem solving", "c programming", "c language", "problem solving"],
          objectives: ["Build basic knowledge of computers and programming.", "Develop problem-solving skills using algorithms, flowcharts and pseudocode.", "Design simple solutions using C language and modern tools."],
          units: [
            ["Unit I — The Computer", "Functional units and block diagram; data and information; computer classification, characteristics, advantages, limitations and applications; CPU and memory; primary/secondary memory; memory hierarchy; memory units; software and operating systems; binary, octal, decimal and hexadecimal number systems and conversions; ASCII, BCD, EBCDIC, Excess-3 and Gray code."],
            ["Unit II — Problem-solving Techniques", "Logical and numerical problem-solving; algorithms; flowcharts; pseudocode; programming languages; language translators; interpreter, assembler and compiler; compiling/executing; syntax and logical errors; files in the C program lifecycle; C compilation process."],
            ["Unit III — Fundamentals of C", "History and need for C; character set; escape sequences; format specifiers; tokens, keywords, variables, constants, identifiers, special symbols and header files; data types; type casting; operators and expressions; decision-making; quadratic roots; loops; arrays; strings; string functions; linear search; binary search; bubble sort."],
            ["Unit IV — Advanced C", "Functions; call by value/reference; console I/O; preprocessor; storage classes; recursion; factorial, Fibonacci and Ackermann examples; structures and unions; pointers; generic and self-referential pointers; linked lists; file handling; dynamic memory allocation; basic time and space complexity."]
          ],
          outcomes: ["Describe computer components, memory hierarchy and number systems.", "Apply algorithms, flowcharts and pseudocode to logical/numerical problems.", "Develop C programs using control statements, arrays, strings, functions and recursion.", "Implement pointers, structures, unions, file handling and dynamic memory management."],
          references: ["Dr. Kamaldeep, Programming for Problem-solving with C.", "Yashavant Kanetkar, Let Us C.", "Brian W. Kernighan and Dennis M. Ritchie, The C Programming Language."]
        },
        {
          code: "25LC-CSE101H-CSE103H", title: "Programming for Problem Solving Lab", category: "Engineering Science Course · Practical", credits: 1, scheme: "L 0 · T 0 · P 2", marks: "05 internal + 20 external = 25", exam: "02 Hours", pages: "69–72",
          aliases: ["pps lab", "programming lab", "c lab", "problem solving lab"],
          objectives: ["Apply basic programming skills to solve computational problems using C.", "Strengthen programming, computer-system and memory-management skills."],
          units: [
            ["Practical Experiments", "Computer components; simple algorithms; programming environment; operators; loops and conditionals; roots of a quadratic equation; iterative series problems; 1D and multi-dimensional arrays; matrix and string operations; functions and recursion; pointers and structures; file operations; dynamic memory allocation."],
            ["Virtual Lab Options", "Expression Evaluation; Basic Control Flow; Advanced Control Flow; Numerical Approximation; Functions; Pointers; Arrays; Structures; Recursion; Problem Solving Lab."]
          ],
          outcomes: ["Identify computer components and basic C syntax.", "Use operators, loops, arrays, strings and functions.", "Develop modular solutions with pointers, structures, file handling and dynamic memory.", "Construct iterative, conditional and recursive solutions."],
          references: []
        },
        {
          code: "25HSMC-ENG-101H", title: "English", category: "Humanities and Social Sciences", credits: 2, scheme: "L 2 · T 0 · P 0", marks: "15 internal + 35 external = 50", exam: "03 Hours", pages: "72–74",
          aliases: ["english", "communication", "english syllabus"],
          objectives: ["Communicate effectively in spoken and written English in real-life situations.", "Develop confidence in English for global interactions.", "Apply learning to real-world scenarios and problem-solving.", "Understand the content and meaning of prescribed texts."],
          units: [
            ["Unit I — Basic Writing Skills", "Subject-verb agreement; noun-pronoun agreement; governance of nouns through prepositions; basic verb patterns."],
            ["Unit II — Vocabulary and Grammar", "One-word substitution; common idioms; tenses; active and passive voice."],
            ["Unit III — Oral Communication", "Phonetics basics; vowels; consonants; phonemes; syllables; transcription and pronunciation."],
            ["Unit IV — Reading and Writing", "Literary texts: “The Secret of Work” by Swami Vivekanand and “Patriotism beyond Politics and Religion” by Abdul Kalam Azad; official letters concerning students’ academic and social life."]
          ],
          outcomes: ["Build practical sentence construction skills.", "Use accurate English, vocabulary and language skills.", "Apply appropriate pronunciation and phonetics.", "Understand and respond to prescribed reading/writing tasks."],
          references: ["AICTE’s Prescribed Textbook: English (with Lab Manual), Kulbhushan Kumar, 2023.", "Effective Communication Skills, Kul Bhushan Kumar, 2022."]
        },
        {
          code: "25LC-ENG-101H", title: "Language Lab", category: "Humanities and Social Sciences · Practical", credits: 1, scheme: "L 0 · T 0 · P 2", marks: "05 internal + 20 external = 25", exam: "02 Hours", pages: "74–76",
          aliases: ["language lab", "english lab", "communication lab"],
          objectives: ["Develop desired English language skills for engineering and technology students.", "Enhance linguistic and communicative competence for professional life."],
          units: [
            ["Practical Content", "Listening comprehension; recognition of phonemes in the International Phonetic Alphabet; self-introduction and introducing another person; everyday conversations and dialogues; workplace communication; telephonic communication; special-occasion speeches; formal presentations on prescribed literary texts."],
            ["End-Semester Practical", "Listening passage and questions; phoneme identification; self/other introduction; role-play and telephonic conversation; speeches or presentations on prescribed literary texts."]
          ],
          outcomes: ["Gain basic proficiency in English with emphasis on listening, comprehension and speaking at social and professional platforms."],
          references: ["Bhatnagar, Nitin and Mamta Bhatnagar, Communicative English for Engineers and Professionals.", "Michael Swan, Practical English Usage."]
        },
        {
          code: "25ESC-ME-101H", title: "Engineering Graphics and Design", category: "Engineering Science Course · Practical", credits: 2, scheme: "L 0 · T 0 · P 4", marks: "15 internal + 35 external = 50", exam: "03 Hours", pages: "80–83",
          aliases: ["egd", "engineering graphics", "graphics", "cad", "engineering drawing"],
          objectives: ["Understand engineering drawing, curves, scales and geometric construction.", "Understand orthographic projection and isometric projection.", "Understand development of surfaces.", "Understand engineering graphics standards and solid modelling."],
          units: [
            ["Unit I — Introduction to Engineering Drawing", "Principles and significance of engineering graphics; drawing instruments; lettering; conic sections; cycloid, epicycloid, hypocycloid and involute; representative fraction, plain/diagonal scales, scale of chords and vernier scales."],
            ["Unit II — Projection of Points & Lines", "Principles and methods of projection; planes of projection; four quadrants; first/third angle projection; orthographic projection; projection of points and lines in different positions; traces."],
            ["Unit III — Projection of Planes & Solids", "Types and projection of planes; planes perpendicular/inclined to reference planes; types and projections of solids with axes in different orientations."],
            ["Unit IV — Sections, Development & Isometric Projection", "Sectional planes and true shape; development of lateral surfaces of cubes, prisms, cylinders, pyramids and cones; isometric axes/scale/projection/view; conversion between isometric and orthographic projections."],
            ["Module 5 — Computer Graphics", "CAD interface and tools; drawing area and coordinate system; zoom and selection; isometric views of lines, planes and solids; introduction to Building Information Modelling (BIM)."]
          ],
          outcomes: ["Prepare and interpret engineering drawings.", "Use orthographic and isometric projection concepts.", "Understand CAD-based engineering graphics and solid modelling."],
          references: ["Shah, M.B. & Rana B.C., Engineering Drawing.", "Bhatt N.D., Panchal V.M. & Ingle P.R., Engineering Drawing.", "AICTE’s Prescribed Textbook: Engineering Graphics & Design."]
        },
        {
          code: "25ESC-ME-103H", title: "Basics of Mechanical Engineering", category: "Engineering Science Course", credits: 3, scheme: "L 3 · T 0 · P 0", marks: "25 internal + 50 theory = 75", exam: "03 Hours", pages: "90–93",
          aliases: ["bme", "basic mechanical engineering", "mechanical engineering", "mechanical"],
          objectives: ["Learn manufacturing processes.", "Understand basic refrigeration and air-conditioning processes.", "Understand hydraulic turbines, pumps, stress and strain.", "Learn power transmission methods."],
          units: [
            ["Unit I — Machine Tools & Thermodynamics", "Lathe, shaper, planer, milling, drilling and slotter; metal cutting; thermodynamics, states, work, heat, temperature, Zeroth/1st/2nd/3rd laws; internal energy, enthalpy and entropy."],
            ["Unit II — Refrigeration & Hydraulic Machines", "Refrigeration and air-conditioning; machine rating; coefficient of performance; vapour-compression cycle; psychrometric charts; human comfort; Pelton, Francis and Kaplan turbines; water pumps."],
            ["Unit III — Power Transmission & Strength", "Belt, rope, chain and gear drives; clutches; stresses and strains; Poisson’s ratio; stress-strain diagrams; Hooke’s law; elastic constants; mechanical properties of metals."],
            ["Unit IV — Manufacturing Systems", "Manufacturing systems; numerical control (NC); advantages and classifications of NC; comparison of NC and CNC."]
          ],
          outcomes: ["Understand manufacturing processes.", "Understand thermodynamics, refrigeration and air-conditioning systems.", "Understand hydraulic turbines/pumps and stress-strain concepts.", "Understand power-transmission devices and methods."],
          references: ["R.K. Rajput, Elements of Mechanical Engineering.", "P.K. Nag, Engineering Thermodynamics.", "Arora & Domkundwar, Refrigeration & Airconditioning."]
        },
        {
          code: "25LC-ME-102H", title: "Design Thinking and Idea Lab", category: "Engineering Science Course · Practical", credits: 1, scheme: "L 0 · T 0 · P 2", marks: "05 internal + 20 external = 25", exam: "03 Hours", pages: "76–80",
          aliases: ["design thinking", "idea lab", "design thinking lab", "innovation lab"],
          objectives: ["Learn creative thinking and the innovation cycle of Design Thinking.", "Learn IDEA Lab tools and inventory.", "Learn mechanical and electronic fabrication processes.", "Build useful standalone systems/projects with enclosures."],
          units: [
            ["Module — Learning, Memory & Emotions", "Learning process and Kolb’s Learning Styles; memory and retention; emotions, expression and empathy."],
            ["Module — Design Thinking", "Definition, need and objective of Design Thinking; brainstorming; Empathize, Define, Ideate, Prototype and Test; creative problem solving; engineering product design."],
            ["Module — Prototyping & Manufacturing", "Rapid prototyping; FDM, SLA and SLS; FDM machines; process parameters and G-code; materials such as PLA, ABS and PETG; 3D-print defects."],
            ["Module — Tools & Fabrication", "Hand tools and power tools; subtractive prototyping; CNC routing, turning, milling, drilling and grinding; laser cutting/engraving; welding; lathe; soldering."],
            ["Module — Mini Project", "Discussion and implementation of a mini project. At least 11 experiments are to be performed."]
          ],
          outcomes: ["Understand measuring tools and mechanical machines.", "Understand additive and subtractive manufacturing.", "Empathize, define problems, ideate and prototype solutions.", "Test and present proposed solutions.", "Use IDEA Lab tools and inventory."],
          references: ["AICTE’s Prescribed Textbook: Workshop / Manufacturing Practices (with Lab Manual).", "3D Printing & Design, Dr. Sabrie Soloman."]
        },
        {
          code: "25HSMC-UHV-101H", title: "Universal Human Values", category: "Humanities and Social Sciences", credits: 3, scheme: "L 3 · T 0 · P 0", marks: "25 classwork + 50 examination = 75", exam: "03 Hours", pages: "113–120",
          aliases: ["uhv", "universal human values", "human values", "professional ethics"],
          objectives: ["Appreciate the complementarity of values and skills for sustained happiness and prosperity.", "Develop a holistic perspective towards life, profession, happiness and prosperity.", "Understand implications for ethical human conduct, relationships and interaction with nature."],
          units: [
            ["Module 1 — Introduction to Value Education", "Right understanding, relationship and physical facility; understanding value education; self-exploration; continuous happiness and prosperity; current scenario; methods to fulfil basic human aspirations."],
            ["Module 2 — Harmony in the Human Being", "Human being as co-existence of Self and Body; needs of Self and Body; body as an instrument of Self; harmony in the Self; harmony of Self with Body; self-regulation and health."],
            ["Module 3 — Harmony in Family and Society", "Family as the basic unit; trust as foundational value; respect as right evaluation; other feelings and justice in human-to-human relationship; harmony in society; vision for Universal Human Order."],
            ["Module 4 — Harmony in Nature/Existence", "Harmony in nature; interconnectedness, self-regulation and mutual fulfilment among four orders of nature; existence as co-existence at all levels; holistic perception of harmony in existence."],
            ["Module 5 — Holistic Understanding & Professional Ethics", "Natural acceptance of human values; definitiveness of ethical human conduct; humanistic education/constitution/order; competence in professional ethics; holistic technologies, production systems and management models; transition towards value-based life and profession."]
          ],
          outcomes: ["Become more aware of self, surroundings, family, society and nature.", "Develop responsibility and sustainable problem-solving with human relationships in mind.", "Strengthen critical ability and commitment to human values, relationships and society."],
          references: ["A Foundation Course in Human Values and Professional Ethics, R.R. Gaur, R. Asthana, G.P. Bagaria.", "Professional Ethics and Human Values, Premvir Kapoor."]
        }
      ]
    },
    "2": {
      label: "Semester II",
      courses: [
        {
          code: "25BSC-MATH-104H", title: "Mathematics-II (Probability and Statistics)", category: "Basic Science Course", credits: 4, scheme: "L 3 · T 1 · P 0", marks: "30 classwork + 70 examination = 100", exam: "03 Hours", pages: "26–28",
          aliases: ["mathematics ii", "maths ii", "math ii", "mathematics 2", "maths 2", "math 2", "probability", "statistics", "probability and statistics"],
          objectives: ["Understand probability and statistics concepts for engineering problems.", "Learn conditional probability, random variables and discrete distributions.", "Understand continuous and bivariate distributions and applications.", "Use central tendency, moments, correlation, regression and hypothesis testing."],
          units: [
            ["Unit I — Random Variables & Discrete Distributions", "Probability spaces; conditional probability; Bayes’ rule; discrete random variables; independence; expectation; sums of independent random variables; moments; variance; Chebyshev inequality; Binomial and multinomial distributions; Poisson approximation; Bernoulli trials."],
            ["Unit II — Continuous & Bivariate Distributions", "Continuous random variables; distribution functions and densities; Normal, Exponential and Gamma densities; bivariate distributions; conditional densities; distributions of sums and quotients."],
            ["Unit III — Basic Statistics", "Measures of central tendency; moments, skewness and kurtosis; Binomial, Poisson and Normal distributions; correlation coefficient and rank correlation; regression; least-squares curve fitting for straight lines, second-degree parabolas and general curves."],
            ["Unit IV — Applied Statistics", "Large-sample tests for proportions, means and standard deviations; small-sample tests for means; ratio of variances; Chi-square test for goodness of fit and independence of attributes."]
          ],
          outcomes: ["Define probability/statistics terminology.", "Understand random variables, distributions, moments and significance tests.", "Solve probability and distribution problems.", "Analyse correlation, regression and least-squares curve fitting.", "Formulate and test statistical hypotheses."],
          references: ["Erwin Kreyszig, Advanced Engineering Mathematics.", "S. Ross, A First Course in Probability.", "N.P. Bali and Manish Goyal, A Textbook of Engineering Mathematics."]
        },
        {
          code: "25ESC-CSE101H", title: "Programming for Problem Solving", category: "Engineering Science Course", credits: 3, scheme: "L 3 · T 0 · P 0", marks: "25 classwork + 50 examination = 75", exam: "03 Hours", pages: "67–69", aliases: ["pps", "programming", "c programming", "programming for problem solving"],
          objectives: ["Build basic knowledge of computers and programming.", "Develop problem-solving skills using C."],
          units: [
            ["Unit I — The Computer", "Functional units, data/information, computer classification, CPU, memory hierarchy, software, operating systems and number systems."],
            ["Unit II — Problem-solving Techniques", "Algorithms, flowcharts, pseudocode, programming languages, translators, compiler/interpreter/assembler, errors and C compilation lifecycle."],
            ["Unit III — Fundamentals of C", "C basics, tokens, data types, operators, decisions, loops, arrays, strings, searching and bubble sort."],
            ["Unit IV — Advanced C", "Functions, recursion, structures, unions, pointers, linked lists, files, dynamic memory and basic complexity." ]
          ],
          outcomes: ["Apply structured problem-solving techniques.", "Develop C programs using core and advanced constructs."], references: []
        },
        {
          code: "25HSMC-ENG-101H", title: "English", category: "Humanities and Social Sciences", credits: 2, scheme: "L 2 · T 0 · P 0", marks: "15 internal + 35 external = 50", exam: "03 Hours", pages: "72–74", aliases: ["english"],
          objectives: ["Develop spoken and written English skills and confidence."],
          units: [["Units I–IV", "Basic writing skills and common errors; vocabulary and grammatical cohesion; oral communication and phonetics; reading/writing practices including prescribed literary texts and official letters."]], outcomes: ["Improve practical English communication skills."], references: []
        },
        {
          code: "25LC-ENG-101H", title: "Language Lab", category: "Humanities and Social Sciences · Practical", credits: 1, scheme: "L 0 · T 0 · P 2", marks: "05 internal + 20 external = 25", exam: "02 Hours", pages: "74–76", aliases: ["language lab", "english lab"],
          objectives: ["Develop listening, comprehension and speaking skills."], units: [["Practical Content", "Listening comprehension, phonemes, introductions, everyday/workplace conversation, telephonic communication, speeches and formal presentations."]], outcomes: ["Gain basic English proficiency for social and professional platforms."], references: []
        },
        {
          code: "25LC-ME-102H", title: "Design Thinking and Idea Lab", category: "Engineering Science Course · Practical", credits: 1, scheme: "L 0 · T 0 · P 2", marks: "05 internal + 20 external = 25", exam: "03 Hours", pages: "76–80", aliases: ["design thinking", "idea lab"],
          objectives: ["Learn Design Thinking and prototyping skills."], units: [["Practical Content", "Learning/memory/emotions; Design Thinking; prototyping; additive/subtractive manufacturing; tools; fabrication; mini project." ]], outcomes: ["Ideate, prototype, test and present engineering solutions."], references: []
        },
        {
          code: "25ESC-ME-101H", title: "Engineering Graphics and Design", category: "Engineering Science Course · Practical", credits: 2, scheme: "L 0 · T 0 · P 4", marks: "15 internal + 35 external = 50", exam: "03 Hours", pages: "80–83", aliases: ["egd", "engineering graphics", "cad"],
          objectives: ["Understand engineering drawing, projection and CAD."], units: [["Modules I–V", "Engineering drawing; projections of points/lines; projections of planes/solids; sections, development and isometric projection; computer graphics, CAD and BIM." ]], outcomes: ["Understand and apply engineering graphics concepts."], references: []
        },
        {
          code: "25ESC-ME-103H", title: "Basics of Mechanical Engineering", category: "Engineering Science Course", credits: 3, scheme: "L 3 · T 0 · P 0", marks: "25 internal + 50 theory = 75", exam: "03 Hours", pages: "90–93", aliases: ["bme", "basic mechanical engineering"],
          objectives: ["Learn manufacturing, refrigeration, hydraulic and power-transmission fundamentals."], units: [["Units I–IV", "Machine tools and thermodynamics; refrigeration/air-conditioning and hydraulic turbines/pumps; power transmission and stresses/strains; manufacturing systems and NC/CNC." ]], outcomes: ["Understand core mechanical engineering fundamentals."], references: []
        },
        {
          code: "25LC-CSE101H-CSE103H", title: "Programming for Problem Solving Lab", category: "Engineering Science Course · Practical", credits: 1, scheme: "L 0 · T 0 · P 2", marks: "05 internal + 20 external = 25", exam: "02 Hours", pages: "69–72", aliases: ["pps lab", "programming lab", "c lab"],
          objectives: ["Apply C programming skills through practical experiments."], units: [["Experiments", "Algorithms; programming environment; operators; loops; quadratic roots; arrays; matrices; strings; functions; recursion; pointers; structures; files; dynamic memory." ]], outcomes: ["Implement and analyse C programs through hands-on work."], references: []
        },
        {
          code: "25HSMC-UHV-101H", title: "Universal Human Values", category: "Humanities and Social Sciences", credits: 3, scheme: "L 3 · T 0 · P 0", marks: "25 classwork + 50 examination = 75", exam: "03 Hours", pages: "113–120", aliases: ["uhv", "universal human values", "professional ethics"],
          objectives: ["Develop a holistic perspective towards life, profession and human values."], units: [["Modules I–V", "Introduction to value education; harmony in the human being; harmony in family and society; harmony in nature/existence; holistic understanding and professional ethics." ]], outcomes: ["Develop awareness, responsibility, critical ability and value-based conduct."], references: []
        }
      ]
    }
  }
};
