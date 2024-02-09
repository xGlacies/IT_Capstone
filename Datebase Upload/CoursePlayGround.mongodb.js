/* global use, db */
// MongoDB Playground

use('Kennesaw_State_University');

/* global use, db */
// MongoDB Playground

// Insert all provided Courses into the Course collection.
db.TestCourses.insertMany([
    {
        "Prefix": "IT",
        "Course_Number": "4843",
        "Course_Name": "Ethical Hacking for Effective Defense",
        "Credit_Hours": "3",
        "Prerequisite": "IT 4323",
        "Description": "This course focuses on detection of network and system vulnerabilities by taking an attacker-like approach to system, network, and data access. Topics include network attacks and defenses, Operating System and application vulnerabilities, social engineering attacks, and malware. Ethical, legal implications of network attacks are also discussed.",
        "Course_Schedule": {
            "Fall_Odd": "Insert",
            "Summer_Odd": "Insert",
            "Spring_Odd": "Insert",
            "Fall_Even": "Insert",
            "Summer_Even": "Insert",
            "Spring_Even": "Insert"
        },
        "Memo": "None",
        "Track": "Cyber Operations Security",
        "Degree": "BSIT",
        "Syllabus_Link": "Insert Link",
        "Course_Learning_Outcomes": [
            "Explain what an ethical hacker can and cannot do legally",
            "Describe security threats and vulnerabilities",
            "Use hacking tools to locate and fix security leaks",
            "Identify operating systems vulnerabilities",
            "Explain cryptosystems and describe attacks on cryptosystems",
            "Analyze network security vulnerabilities and technical controls"
        ],
        "Offering_History": {
            "Spring_2024": "Insert",
            "Fall_2023": "Insert",
            "Summer_2023": "Insert",
            "Spring_2023": "Insert",
            "Fall_2022": "Insert",
            "Summer_2022": "Insert",
            "Spring_2022": "Insert",
            "Fall_2021": "Insert",
            "Summer_2021": "Insert",
            "Spring_2021": "Insert"
        },
        "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course_nopop.php?catoid=68&coid=107036",
        "OwlExpress_Link": "Insert OwlExpress Link",
        "Curriculog_Link": "Insert Curriculog Link",
        "Coordinator_Name": "Insert Coord Name",
        "Co_Coordinator_Name": "Insert Co-Coord Name",
        "Email": "Insert Email",
        "D2L_Master_Link": "Insert D2L Link",
        "Latest_ALG_Round": "None",
        "Latest_Developer": "None",
        "Note": "None",
        "OER_Links": {
            "Website": "None",
            "OpenALG": "None"
        }
    },
    {
        "Prefix": "IT",
        "Course_Number": "4863",
        "Course_Name": "Web and Mobile Application Security",
        "Credit_Hours": "3",
        "Prerequisite": "IT 3203",
        "Description": "This course introduces web and mobile application security issues, hands-on practices to explore security vulnerabilities, and best practices to defend against vulnerabilities in web and mobile.",
        "Course_Schedule": {
            "Fall_Odd": "Insert",
            "Summer_Odd": "Insert",
            "Spring_Odd": "Insert",
            "Fall_Even": "Insert",
            "Summer_Even": "Insert",
            "Spring_Even": "Insert"
        },
        "Memo": "None",
        "Track": "Cyber Operations Security",
        "Degree": "BSIT",
        "Syllabus_Link": "Insert Link",
        "Course_Learning_Outcomes": [
            "Describe common web and mobile security vulnerabilities",
            "Exploit web and mobile vulnerabilities with hands-on tools",
            "Defend against common web and mobile vulnerabilities"
        ],
        "Offering_History": {
            "Spring_2024": "Insert",
            "Fall_2023": "Insert",
            "Summer_2023": "Insert",
            "Spring_2023": "Insert",
            "Fall_2022": "Insert",
            "Summer_2022": "Insert",
            "Spring_2022": "Insert",
            "Fall_2021": "Insert",
            "Summer_2021": "Insert",
            "Spring_2021": "Insert"
        },
        "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course_nopop.php?catoid=68&coid=108252",
        "OwlExpress_Link": "Insert OwlExpress Link",
        "Curriculog_Link": "Insert Curriculog Link",
        "Coordinator_Name": "Insert Coord Name",
        "Co_Coordinator_Name": "Insert Co-Coord Name",
        "Email": "Insert Email",
        "D2L_Master_Link": "Insert D2L Link",
        "Latest_ALG_Round": "None",
        "Latest_Developer": "None",
        "Note": "None",
        "OER_Links": {
            "Website": "None",
            "OpenALG": "None"
        }
    },
    {
        "Prefix": "IT",
        "Course_Number": "4883",
        "Course_Name": "Infrastructure Defense",
        "Credit_Hours": "3",
        "Prerequisite": "IT 4323",
        "Description": "This course provides an overview of the infrastructure assessment and penetration testing process and the processes and techniques for improving the defensibility of that infrastructure.",
        "Course_Schedule": {
            "Fall_Odd": "Insert",
            "Summer_Odd": "Insert",
            "Spring_Odd": "Insert",
            "Fall_Even": "Insert",
            "Summer_Even": "Insert",
            "Spring_Even": "Insert"
        },
        "Memo": "None",
        "Track": "Cyber Operations Security",
        "Degree": "BSIT",
        "Syllabus_Link": "Insert Link",
        "Course_Learning_Outcomes": [
            "Define the overall process of infrastructure assessment",
            "Describe the goals of a penetration test",
            "Identify and explain the processes and techniques for mitigating risks identified in an infrastructure assessment",
            "Explain the goals and content for communicating the results of a penetration test and remediation plan to a managerial audience"
        ],
        "Offering_History": {
            "Spring_2024": "Insert",
            "Fall_2023": "Insert",
            "Summer_2023": "Insert",
            "Spring_2023": "Insert",
            "Fall_2022": "Insert",
            "Summer_2022": "Insert",
            "Spring_2022": "Insert",
            "Fall_2021": "Insert",
            "Summer_2021": "Insert",
            "Spring_2021": "Insert"
        },
        "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course_nopop.php?catoid=68&coid=107148",
        "OwlExpress_Link": "Insert OwlExpress Link",
        "Curriculog_Link": "Insert Curriculog Link",
        "Coordinator_Name": "Insert Coord Name",
        "Co_Coordinator_Name": "Insert Co-Coord Name",
        "Email": "Insert Email",
        "D2L_Master_Link": "Insert D2L Link",
        "Latest_ALG_Round": "None",
        "Latest_Developer": "None",
        "Note": "None",
        "OER_Links": {
            "Website": "None",
            "OpenALG": "None"
        }
    },
    {
        "Prefix": "CSE",
        "Course_Number": "3801",
        "Course_Name": "Professional Practices and Ethics",
        "Credit_Hours": "2",
        "Prerequisite": "(CSE 1322 and CSE 1322L) or IT 3123 (may take concurrently)",
        "Description": "This course covers the historical, social and economic consideration of the discipline. It includes studies of professional conduct, risks, and liabilities, and intellectual property relative to the software engineering and computing professions. Software engineering/computing case studies will be used.",
        "Course_Schedule": {
            "Fall_Odd": "Insert",
            "Summer_Odd": "Insert",
            "Spring_Odd": "Insert",
            "Fall_Even": "Insert",
            "Summer_Even": "Insert",
            "Spring_Even": "Insert"
        },
        "Memo": "None",
        "Track": "Required Core Courses",
        "Degree": "BSIT",
        "Syllabus_Link": "Insert Link",
        "Course_Learning_Outcomes": [
            "Identify ethical responsibilities and considerations, apply ethics, incuding professional codes of ethics in scenarios and case studies",
            "Identify and use resources for keeping current in the profession",
            "Discuss legal and ethical issues relevant to freedom of speech, intellectual property, privacy, and security"
        ],
        "Offering_History": {
            "Spring_2024": "Insert",
            "Fall_2023": "Insert",
            "Summer_2023": "Insert",
            "Spring_2023": "Insert",
            "Fall_2022": "Insert",
            "Summer_2022": "Insert",
            "Spring_2022": "Insert",
            "Fall_2021": "Insert",
            "Summer_2021": "Insert",
            "Spring_2021": "Insert"
        },
        "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course_nopop.php?catoid=68&coid=106992",
        "OwlExpress_Link": "Insert OwlExpress Link",
        "Curriculog_Link": "Insert Curriculog Link",
        "Coordinator_Name": "Insert Coord Name",
        "Co_Coordinator_Name": "Insert Co-Coord Name",
        "Email": "Insert Email",
        "D2L_Master_Link": "Insert D2L Link",
        "Latest_ALG_Round": "None",
        "Latest_Developer": "None",
        "Note": "None",
        "OER_Links": {
            "Website": "None",
            "OpenALG": "None"
        }
    },
    {
        "Prefix": "IT",
        "Course_Number": "4723",
        "Course_Name": "IT Policy and Laws",
        "Credit_Hours": "3",
        "Prerequisite": "IT 3123 and IT 3223",
        "Description": "This course covers current policies and law, and ethical, legal, and social issues in IT through lectures, discussion, research, and case studies. Topics include copyright, patents, trademarks, trade secrets, computer ethics, computer crime, computer abuse, cultural impact, web issues, information warfare and current legislation.",
        "Course_Schedule": {
            "Fall_Odd": "Insert",
            "Summer_Odd": "Insert",
            "Spring_Odd": "Insert",
            "Fall_Even": "Insert",
            "Summer_Even": "Insert",
            "Spring_Even": "Insert"
        },
        "Memo": "None",
        "Track": "Required Core Courses",
        "Degree": "BSIT",
        "Syllabus_Link": "Insert Link",
        "Course_Learning_Outcomes": [
            "Discuss law & its development in US history. Analyze, synthesize and develop policies, including responsibility, accountability and liability for an IT organization",
            "Explain ethics and social responsibility of IT and develop ethical standards and practices for IT",
            "Discuss and understand the American legal system, contract law, and product liabilty – including warranties, audit practices, financials, operations and security, e-commerce law and e-contracts",
            "Outline internet law, intellectual property law, privacy and cybercrimes",
            "Discuss Torts and liabilities",
            "Describe the protections provided by the Anti cybersquating Consumer Protection Act (ACPA). Discuss e-contract and e-licensing"
        ],
        "Offering_History": {
            "Spring_2024": "Insert",
            "Fall_2023": "Insert",
            "Summer_2023": "Insert",
            "Spring_2023": "Insert",
            "Fall_2022": "Insert",
            "Summer_2022": "Insert",
            "Spring_2022": "Insert",
            "Fall_2021": "Insert",
            "Summer_2021": "Insert",
            "Spring_2021": "Insert"
        },
        "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course_nopop.php?catoid=68&coid=107147",
        "OwlExpress_Link": "Insert OwlExpress Link",
        "Curriculog_Link": "Insert Curriculog Link",
        "Coordinator_Name": "Insert Coord Name",
        "Co_Coordinator_Name": "Insert Co-Coord Name",
        "Email": "Insert Email",
        "D2L_Master_Link": "Insert D2L Link",
        "Latest_ALG_Round": "None",
        "Latest_Developer": "None",
        "Note": "None",
        "OER_Links": {
            "Website": "None",
            "OpenALG": "None"
        }
    },
    
    {
        "Prefix": "IT",
        "Course_Number": "4823",
        "Course_Name": "Information Security Administration & Privacy",
        "Credit_Hours": "3",
        "Prerequisite": "(CSE 2300 or MATH 2345) and (IT 3123 or CS 3503)",
        "Description": "The student develops knowledge of the principles of information assurance at the policy, procedural, and technical levels to prepare the student for a role as a business decision-maker. Real-world examples from the text and current events will be used to demonstrate the applicability of the techniques of information assurance.",
        "Course_Schedule": {
            "Fall_Odd": "Insert",
            "Summer_Odd": "Insert",
            "Spring_Odd": "Insert",
            "Fall_Even": "Insert",
            "Summer_Even": "Insert",
            "Spring_Even": "Insert"
        },
        "Memo": "None",
        "Track": "Required Core Courses",
        "Degree": "BSIT",
        "Syllabus_Link": "Insert Link",
        "Course_Learning_Outcomes": [
            "Describe the importance of information security and how it affects our changing world",
            "Describe the threats to and vulnerabilities of personal, organizational, and national security information systems",
            "Demonstrate a working knowledge of principles and practices in information security, including application of encryption",
            "Design, execute, and evaluate personal or organizational security policies, procedures and practices",
            "Analyze critically situations of computer use, identifying the security issues, consequences and viewpoints"
        ],
        "Offering_History": {
            "Spring_2024": "Insert",
            "Fall_2023": "Insert",
            "Summer_2023": "Insert",
            "Spring_2023": "Insert",
            "Fall_2022": "Insert",
            "Summer_2022": "Insert",
            "Spring_2022": "Insert",
            "Fall_2021": "Insert",
            "Summer_2021": "Insert",
            "Spring_2021": "Insert"
        },
        "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course_nopop.php?catoid=68&coid=107037",
        "OwlExpress_Link": "Insert OwlExpress Link",
        "Curriculog_Link": "Insert Curriculog Link",
        "Coordinator_Name": "Insert Coord Name",
        "Co_Coordinator_Name": "Insert Co-Coord Name",
        "Email": "Insert Email",
        "D2L_Master_Link": "Insert D2L Link",
        "Latest_ALG_Round": "None",
        "Latest_Developer": "None",
        "Note": "None",
        "OER_Links": {
            "Website": "None",
            "OpenALG": "None"
        }
    },
    {
        "Prefix": "IT",
        "Course_Number": "3423",
        "Course_Name": "Operating Systems Concepts & Administration",
        "Credit_Hours": "3",
        "Prerequisite": "IT 3123 or CS 3503",
        "Description": "This course is an introduction to basic operating system principles. Topics include memory management, peripheral device management, file system management and process management. Different types of operating systems and their administrations are studied. Projects are carried out with simulations.",
        "Course_Schedule": {
            "Fall_Odd": "Insert",
            "Summer_Odd": "Insert",
            "Spring_Odd": "Insert",
            "Fall_Even": "Insert",
            "Summer_Even": "Insert",
            "Spring_Even": "Insert"
        },
        "Memo": "None",
        "Track": "Required Core Courses",
        "Degree": "BSIT",
        "Syllabus_Link": "Insert Link",
        "Course_Learning_Outcomes": [
            "Identify and analyze user needs and take them into account in OS selection, evaluation, and administration of computer-based systems",
            "Effectively integrate OS and IT-based solutions into business practice and the user environment"
        ],
        "Offering_History": {
            "Spring_2024": "Insert",
            "Fall_2023": "Insert",
            "Summer_2023": "Insert",
            "Spring_2023": "Insert",
            "Fall_2022": "Insert",
            "Summer_2022": "Insert",
            "Spring_2022": "Insert",
            "Fall_2021": "Insert",
            "Summer_2021": "Insert",
            "Spring_2021": "Insert"
        },
        "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course_nopop.php?catoid=68&coid=107138",
        "OwlExpress_Link": "Insert OwlExpress Link",
        "Curriculog_Link": "Insert Curriculog Link",
        "Coordinator_Name": "Insert Coord Name",
        "Co_Coordinator_Name": "Insert Co-Coord Name",
        "Email": "Insert Email",
        "D2L_Master_Link": "Insert D2L Link",
        "Latest_ALG_Round": "None",
        "Latest_Developer": "None",
        "Note": "None",
        "OER_Links": {
            "Website": "None",
            "OpenALG": "None"
        }
    },
    {
        "Prefix": "IT",
        "Course_Number": "3883",
        "Course_Name": "Advanced Application Development",
        "Credit_Hours": "3",
        "Prerequisite": "((IT 1114 and IT 1114L with ‘C’ or better) or (CSE 1321 and CSE 1321L with C or better)) and (CSE 3153 or CS 3410 with ‘C’ or better)",
        "Description": "This course will allow students to learn a second programming language and application development. Topics include review of language fundamentals, features of the programming language and development environment, and software development processes. This course will include course projects for hands-on experience with processes and tools.",
        "Course_Schedule": {
            "Fall_Odd": "Insert",
            "Summer_Odd": "Insert",
            "Spring_Odd": "Insert",
            "Fall_Even": "Insert",
            "Summer_Even": "Insert",
            "Spring_Even": "Insert"
        },
        "Memo": "None",
        "Track": "Required Core Courses",
        "Degree": "BSIT",
        "Syllabus_Link": "Insert Link",
        "Course_Learning_Outcomes": [
            "Analyze the real-world problems and design algorithmic/programming solutions",
            "Use conditional expressions, functions, and control structures",
            "Analyze, write, test and debug program code"
        ],
        "Offering_History": {
            "Spring_2024": "Insert",
            "Fall_2023": "Insert",
            "Summer_2023": "Insert",
            "Spring_2023": "Insert",
            "Fall_2022": "Insert",
            "Summer_2022": "Insert",
            "Spring_2022": "Insert",
            "Fall_2021": "Insert",
            "Summer_2021": "Insert",
            "Spring_2021": "Insert"
        },
        "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course_nopop.php?catoid=68&coid=107005",
        "OwlExpress_Link": "Insert OwlExpress Link",
        "Curriculog_Link": "Insert Curriculog Link",
        "Coordinator_Name": "Insert Coord Name",
        "Co_Coordinator_Name": "Insert Co-Coord Name",
        "Email": "Insert Email",
        "D2L_Master_Link": "Insert D2L Link",
        "Latest_ALG_Round": "None",
        "Latest_Developer": "None",
        "Note": "None",
        "OER_Links": {
            "Website": "None",
            "OpenALG": "None"
        }
    },
    {
        "Prefix": "CSE",
        "Course_Number": "3153",
        "Course_Name": "Database Systems",
        "Credit_Hours": "3",
        "Prerequisite": "(CSE 1322 and CSE 1322L) or IT 1113 or (IT 1114 and IT 1114L)",
        "Description": "The topics in this course span from a review of the traditional file processing systems to database management systems. Topics include files systems and file processing logic, planning, and major phases of database development: analysis, design and implementation. Labs use an SQL based database product such as Oracle.",
        "Course_Schedule": {
            "Fall_Odd": "Insert",
            "Summer_Odd": "Insert",
            "Spring_Odd": "Insert",
            "Fall_Even": "Insert",
            "Summer_Even": "Insert",
            "Spring_Even": "Insert"
        },
        "Memo": "None",
        "Track": "Required Core Courses",
        "Degree": "BSIT",
        "Syllabus_Link": "Insert Link",
        "Course_Learning_Outcomes": [
            "Describe basic database terminology",
            "Analyze an enterprise using E/R diagrams and develop the conceptual model through normalization",
            "Describe basic parts of the relational database model, the object-oriented model and file organizations",
            "Create, modify and query databases using the SQL language",
            "Describe the client-server model for databases and how relational databases can be used on the internet",
            "Create an application using a database"
        ],
        "Offering_History": {
            "Spring_2024": "Insert",
            "Fall_2023": "Insert",
            "Summer_2023": "Insert",
            "Spring_2023": "Insert",
            "Fall_2022": "Insert",
            "Summer_2022": "Insert",
            "Spring_2022": "Insert",
            "Fall_2021": "Insert",
            "Summer_2021": "Insert",
            "Spring_2021": "Insert"
        },
        "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course_nopop.php?catoid=68&coid=107297",
        "OwlExpress_Link": "Insert OwlExpress Link",
        "Curriculog_Link": "Insert Curriculog Link",
        "Coordinator_Name": "Insert Coord Name",
        "Co_Coordinator_Name": "Insert Co-Coord Name",
        "Email": "Insert Email",
        "D2L_Master_Link": "Insert D2L Link",
        "Latest_ALG_Round": "None",
        "Latest_Developer": "None",
        "Note": "None",
        "OER_Links": {
            "Website": "None",
            "OpenALG": "None"
        }
    },
    {
        "Prefix": "IT",
        "Course_Number": "3003",
        "Course_Name": "Professional Development & Entrepreneurship",
        "Credit_Hours": "3",
        "Prerequisite": "IT 3123 (may take concurrently)",
        "Description": "This course covers two major topics: professional development and entrepreneurship. The course will prepare students for internship positions and careers after graduation. The course will cover such things as creating a professional development plan, the STAR interviewing method, professional presentations, team dynamics, 10 principles of entrepreneurship, and innovation and entrepreneurship.",
        "Course_Schedule": {
            "Fall_Odd": "Insert",
            "Summer_Odd": "Insert",
            "Spring_Odd": "Insert",
            "Fall_Even": "Insert",
            "Summer_Even": "Insert",
            "Spring_Even": "Insert"
        },
        "Memo": "None",
        "Track": "Required Core Courses",
        "Degree": "BSIT",
        "Syllabus_Link": "Insert Link",
        "Course_Learning_Outcomes": [
            "Develop a comprehensive professional development plan",
            "Describe the STAR interviewing method",
            "Describe basics of group/team dynamics and how it affects working on IT teams",
            "Compare and contrast various types of team dynamics",
            "List 10 principles of entrepreneurship",
            "Describe how innovation and entrepreneurship intersect"
        ],
        "Offering_History": {
            "Spring_2024": "Insert",
            "Fall_2023": "Insert",
            "Summer_2023": "Insert",
            "Spring_2023": "Insert",
            "Fall_2022": "Insert",
            "Summer_2022": "Insert",
            "Spring_2022": "Insert",
            "Fall_2021": "Insert",
            "Summer_2021": "Insert",
            "Spring_2021": "Insert"
        },
        "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course_nopop.php?catoid=68&coid=108253",
        "OwlExpress_Link": "Insert OwlExpress Link",
        "Curriculog_Link": "Insert Curriculog Link",
        "Coordinator_Name": "Insert Coord Name",
        "Co_Coordinator_Name": "Insert Co-Coord Name",
        "Email": "Insert Email",
        "D2L_Master_Link": "Insert D2L Link",
        "Latest_ALG_Round": "None",
        "Latest_Developer": "None",
        "Note": "None",
        "OER_Links": {
            "Website": "None",
            "OpenALG": "None"
        }
    },
    {
        "Prefix": "IT",
        "Course_Number": "1114L",
        "Course_Name": "Programming Principles Lab",
        "Credit_Hours": "1",
        "Prerequisite": "IT 1114 (may take concurrently)",
        "Description": "This course provides lab activities to accompany IT 1114. Upon completion of this course, the student will design, code, debug, document and apply the basic concepts of structured programming. This will include basic syntax and semantics for sequence, conditional, and iteration control structures, (design & use of functions) as well as single dimensional arrays. The student will be able to solve problems by designing and modularizing their solutions with proper use of functions and usage of objects.",
        "Course_Schedule": {
            "Fall_Odd": "Insert",
            "Summer_Odd": "Insert",
            "Spring_Odd": "Insert",
            "Fall_Even": "Insert",
            "Summer_Even": "Insert",
            "Spring_Even": "Insert"
        },
        "Memo": "None",
        "Track": "Required Core Courses",
        "Degree": "BSIT",
        "Syllabus_Link": "Insert Link",
        "Course_Learning_Outcomes": [
            "Use primitive data types and arithmetic expressions in programs",
            "Apply basic programming structures in program solutions, including logical expressions, selection, and repetition",
            "Solve programming problems which include array handling, searching, and sorting",
            "Design and modularize solutions with proper use of functions and objects",
            "Follow specified style guidelines in writing programs and understand how the guidelines enhance readability and promote correctness in programs"
        ],
        "Offering_History": {
            "Spring_2024": "Insert",
            "Fall_2023": "Insert",
            "Summer_2023": "Insert",
            "Spring_2023": "Insert",
            "Fall_2022": "Insert",
            "Summer_2022": "Insert",
            "Spring_2022": "Insert",
            "Fall_2021": "Insert",
            "Summer_2021": "Insert",
            "Spring_2021": "Insert"
        },
        "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course_nopop.php?catoid=68&coid=108522",
        "OwlExpress_Link": "Insert OwlExpress Link",
        "Curriculog_Link": "Insert Curriculog Link",
        "Coordinator_Name": "Insert Coord Name",
        "Co_Coordinator_Name": "Insert Co-Coord Name",
        "Email": "Insert Email",
        "D2L_Master_Link": "Insert D2L Link",
        "Latest_ALG_Round": "None",
        "Latest_Developer": "None",
        "Note": "None",
        "OER_Links": {
            "Website": "None",
            "OpenALG": "None"
        }
    },
    {
        "Prefix": "IT",
        "Course_Number": "4843",
        "Course_Name": "Ethical Hacking for Effective Defense",
        "Credit_Hours": "3",
        "Prerequisite": "IT 4323",
        "Description": "This course focuses on detection of network and system vulnerabilities by taking an attacker-like approach to system, network, and data access. Topics include network attacks and defenses, Operating System and application vulnerabilities, social engineering attacks, and malware. Ethical, legal implications of network attacks are also discussed.",
        "Course_Schedule": {
            "Fall_Odd": "Insert",
            "Summer_Odd": "Insert",
            "Spring_Odd": "Insert",
            "Fall_Even": "Insert",
            "Summer_Even": "Insert",
            "Spring_Even": "Insert"
        },
        "Memo": "None",
        "Track": "Cyber Operations Security",
        "Degree": "BSIT",
        "Syllabus_Link": "Insert Link",
        "Course_Learning_Outcomes": [
            "Explain what an ethical hacker can and cannot do legally",
            "Describe security threats and vulnerabilities",
            "Use hacking tools to locate and fix security leaks",
            "Identify operating systems vulnerabilities",
            "Explain cryptosystems and describe attacks on cryptosystems",
            "Analyze network security vulnerabilities and technical controls"
        ],
        "Offering_History": {
            "Spring_2024": "Insert",
            "Fall_2023": "Insert",
            "Summer_2023": "Insert",
            "Spring_2023": "Insert",
            "Fall_2022": "Insert",
            "Summer_2022": "Insert",
            "Spring_2022": "Insert",
            "Fall_2021": "Insert",
            "Summer_2021": "Insert",
            "Spring_2021": "Insert"
        },
        "Course_Catalog_Link": "https://catalog.kennesaw.edu/preview_course_nopop.php?catoid=68&coid=107036",
        "OwlExpress_Link": "Insert OwlExpress Link",
        "Curriculog_Link": "Insert Curriculog Link",
        "Coordinator_Name": "Insert Coord Name",
        "Co_Coordinator_Name": "Insert Co-Coord Name",
        "Email": "Insert Email",
        "D2L_Master_Link": "Insert D2L Link",
        "Latest_ALG_Round": "None",
        "Latest_Developer": "None",
        "Note": "None",
        "OER_Links": {
            "Website": "None",
            "OpenALG": "None"
        }
    }
    
    
    
    
        
    

        
]);
