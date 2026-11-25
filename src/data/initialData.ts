import { User, Task, Submission, Course, PointTransaction } from '../types';

export const initialStudentUser: User = {
  id: 'usr_student_01',
  name: 'Alex Rivera',
  email: 'student@university.edu',
  role: 'student',
  points: 110,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  university: 'Stanford Academic Institute',
  bio: 'Computer Science & Biotechnology undergrad passionate about AI research & design.'
};

export const initialAdminUser: User = {
  id: 'usr_admin_01',
  name: 'Dr. Sarah Jenkins',
  email: 'admin@university.edu',
  role: 'admin',
  points: 0,
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  university: 'Stanford Academic Institute',
  bio: 'Director of Institutional Research & Curriculum Design.'
};

export const initialTasks: Task[] = [
  {
    id: 'task_01',
    title: 'Poster Making for College Fest',
    description: 'Design an eye-catching and creative event poster for the upcoming Annual Cultural College Fest. Include event highlights, schedule, venue, and social media handles using modern design standards.',
    category: 'Design',
    points: 350,
    authorId: 'usr_admin_01',
    authorName: 'Dr. Sarah Jenkins',
    maxSubmissions: 5,
    currentSubmissions: 5,
    status: 'active',
    createdAt: '2026-07-01T10:00:00Z',
    deadline: '2026-08-30',
    attachments: [
      { name: 'CollegeFest_Branding_Assets.pdf', size: '5.2 MB', type: 'application/pdf' }
    ]
  },
  {
    id: 'task_02',
    title: 'Code debugging challenge',
    description: 'Identify and resolve logical errors, race conditions, and performance bottlenecks in the provided Data Processing Pipeline repository. Submit unit test logs and a short explanation of corrected runtime complexity.',
    category: 'Engineering',
    points: 600,
    authorId: 'usr_admin_01',
    authorName: 'Prof. Marcus Vance',
    maxSubmissions: 10,
    currentSubmissions: 3,
    status: 'active',
    createdAt: '2026-07-10T14:30:00Z',
    deadline: '2026-09-15',
    attachments: [
      { name: 'data_pipeline_v2.py', size: '142 KB', type: 'text/x-python' }
    ]
  },
  {
    id: 'task_03',
    title: 'Writing a summary of a technical topic',
    description: 'Prepare a comprehensive 2-page technical summary explaining Quantum Computing encryption vs Classical RSA cryptography. Cover key mechanisms, practical threats, and post-quantum mitigation strategies.',
    category: 'Writing',
    points: 450,
    authorId: 'usr_admin_01',
    authorName: 'Dr. Sarah Jenkins',
    maxSubmissions: 10,
    currentSubmissions: 4,
    status: 'active',
    createdAt: '2023-10-20T09:15:00Z',
    deadline: '2023-11-15',
    attachments: [
      { name: 'Quantum_Cryptography_Brief.pdf', size: '2.1 MB', type: 'application/pdf' }
    ]
  },
  {
    id: 'task_06',
    title: 'Math Logic Puzzles',
    description: 'Solve 10 formal proof puzzles involving set theory and graph isomorphism. Show step-by-step mathematical reasoning.',
    category: 'Mathematics',
    points: 500,
    authorId: 'usr_admin_01',
    authorName: 'Dr. Sarah Jenkins',
    maxSubmissions: 'No limit',
    currentSubmissions: 18,
    status: 'active',
    createdAt: '2026-07-15T16:20:00Z',
    deadline: '2026-12-31'
  }
];

export const initialCourses: Course[] = [
  {
    id: 'crs_01',
    title: 'DSA',
    category: 'Computer Science',
    badgeTag: '',
    pointsCost: 500,
    description: 'Master essential data structures and algorithms used by top-tier tech companies. Includes graph theory, dynamic programming, and Big-O optimization.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    isPurchased: false,
    progress: 0,
    modules: [
      {
        id: 'mod_1',
        title: 'Module 1: Time & Space Complexity Analysis',
        lessons: [
          { id: 'les_1', title: '1.1 Introduction to Big-O Notation', duration: '12 min', type: 'video', completed: false, contentUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les_2', title: '1.2 Space Complexity & Memory Allocation', duration: '18 min', type: 'reading', completed: false, textBody: 'Memory layout in modern operating systems involves stack vs heap allocation...' }
        ]
      },
      {
        id: 'mod_2',
        title: 'Module 2: Advanced Trees & Graphs',
        lessons: [
          { id: 'les_3', title: '2.1 Binary Search Trees & AVL Balancing', duration: '25 min', type: 'video', completed: false },
          { id: 'les_4', title: '2.2 Dijkstra & A* Pathfinding Algorithms', duration: '30 min', type: 'quiz', completed: false }
        ]
      }
    ]
  },
  {
    id: 'crs_02',
    title: 'Python Programming',
    category: 'Computer Science',
    badgeTag: '',
    pointsCost: 100,
    description: 'A comprehensive, module-by-module guide to modern Python 3 development, covering core concepts, data structures, object-oriented design, async workflows, and backend service integration.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    isPurchased: true,
    progress: 0,
    modules: [
      {
        id: 'mod_py1',
        title: 'Module 1: Language Syntax, Variables & Control Flow',
        lessons: [
          {
            id: 'les_py1_1',
            title: '1.1 Python Execution Model & Variable Assignments',
            duration: '15 min',
            type: 'reading',
            completed: false,
            textBody: `# Python Execution & Variable Binding

Python is an interpreted, dynamically typed language where variables act as reference labels pointing to objects stored in memory.

### Core Data Types
- Integers (int): Arbitrary-precision whole numbers (e.g., x = 42).
- Floats (float): Double-precision floating-point numbers (e.g., pi = 3.14159).
- Strings (str): Immutable sequences of Unicode characters (e.g., msg = "Hello World").
- Booleans (bool): Logical truth values (True or False).

\`\`\`python
# Dynamic Variable Assignment
user_count = 150
growth_rate = 0.05
is_active = True

# Type casting and string interpolation
summary = f"Total Users: {user_count} | Active: {is_active} | Growth: {growth_rate * 100}%"
print(summary)
\`\`\`

### Type Inspection
Use the built-in type() and id() functions to inspect object types and reference identity in memory.`
          },
          {
            id: 'les_py1_2',
            title: '1.2 Conditional Logic & Branching Structures',
            duration: '18 min',
            type: 'reading',
            completed: false,
            textBody: `# Conditional Logic & Control Flow

Program flow is controlled using if, elif, and else statements evaluated against truthy or falsy boolean expressions.

### Truthiness Evaluation
In Python, the following values evaluate to False in conditional contexts:
- None
- False
- Zero values: 0, 0.0
- Empty collections: "", [], (), {}, set()

\`\`\`python
status_code = 200

if status_code == 200:
    response = "Request succeeded"
elif status_code == 404:
    response = "Resource not found"
elif status_code in (500, 502, 503):
    response = "Server error encountered"
else:
    response = "Unhandled status code"

# Ternary Conditional Assignment
access = "Granted" if status_code == 200 else "Denied"
print(f"Status: {response} -> Access {access}")
\`\`\``
          },
          {
            id: 'les_py1_3',
            title: '1.3 Iteration Mechanisms & Loop Control',
            duration: '20 min',
            type: 'reading',
            completed: false,
            textBody: `# Iteration Mechanisms in Python

Python provides for loops for iterating over sequence objects and while loops for condition-based repetition.

### The range() Sequence Generator
The range(start, stop, step) function generates arithmetic progressions efficiently without allocating memory for full lists.

\`\`\`python
# Iterating over sequence with index tracking using enumerate()
metrics = [88.5, 92.0, 79.4, 95.1]

for index, score in enumerate(metrics, start=1):
    if score < 80.0:
        print(f"Sample #{index} requires review (Score: {score})")
        continue
    print(f"Sample #{index} verified: {score}")

# Loop else clause (executes if loop completes without encountering 'break')
target = 95.1
for score in metrics:
    if score == target:
        print(f"Target score {target} located.")
        break
else:
    print("Target score not found in sequence.")
\`\`\``
          }
        ]
      },
      {
        id: 'mod_py2',
        title: 'Module 2: Built-In Data Structures & Collections',
        lessons: [
          {
            id: 'les_py2_1',
            title: '2.1 Sequences: Lists, Tuples & Slicing Operations',
            duration: '22 min',
            type: 'reading',
            completed: false,
            textBody: `# Sequence Collections: Lists & Tuples

Lists are mutable sequences, while tuples are immutable fixed-length collections designed for structured data integrity.

### Slice Notation Syntax
Sequence slicing uses sequence[start:stop:step]. Negative indices count backwards from the end of the collection.

\`\`\`python
# List mutation and slicing
data = [10, 20, 30, 40, 50, 60, 70]

first_three = data[:3]        # [10, 20, 30]
sub_sequence = data[2:5]      # [30, 40, 50]
reversed_data = data[::-1]    # [70, 60, 50, 40, 30, 20, 10]

# Tuple Unpacking
coordinates = (37.7749, -122.4194)
latitude, longitude = coordinates
print(f"Lat: {latitude}, Lon: {longitude}")
\`\`\``
          },
          {
            id: 'les_py2_2',
            title: '2.2 Hash Maps & Sets: Dictionaries & Set Theory',
            duration: '25 min',
            type: 'reading',
            completed: false,
            textBody: `# Dictionaries & Set Operations

Dictionaries store key-value pairs with O(1) average lookup time using internal hash tables. Sets store unique unordered hashable elements.

### Dictionary Methods & Set Algebra
\`\`\`python
# Dictionary manipulation with get() fallback
user_profile = {
    "username": "alex_dev",
    "role": "Engineer",
    "permissions": {"read", "write"}
}

# Safe lookup
department = user_profile.get("department", "Engineering")

# Set Algebra
required_permissions = {"read", "write", "execute"}
current_permissions = user_profile["permissions"]

missing_perms = required_permissions - current_permissions
print(f"Missing permissions: {missing_perms}")
\`\`\``
          },
          {
            id: 'les_py2_3',
            title: '2.3 Comprehension Expressions for Data Transformation',
            duration: '20 min',
            type: 'reading',
            completed: false,
            textBody: `# Comprehension Syntax

Comprehensions provide a concise functional paradigm for transforming and filtering iterable data structures.

### List, Dict & Set Comprehensions
\`\`\`python
raw_readings = [12, -5, 24, 0, 18, -2, 31]

# List Comprehension with filtering
positive_readings = [val * 1.8 + 32 for val in raw_readings if val > 0]

# Dictionary Comprehension
reading_status = {val: "Pass" if val >= 15 else "Fail" for val in raw_readings}

print("Converted Positives:", positive_readings)
print("Status Map:", reading_status)
\`\`\``
          }
        ]
      },
      {
        id: 'mod_py3',
        title: 'Module 3: Functions, Scope & Modular Architecture',
        lessons: [
          {
            id: 'les_py3_1',
            title: '3.1 Function Definitions & Variable Arguments (*args, **kwargs)',
            duration: '22 min',
            type: 'reading',
            completed: false,
            textBody: `# Function Mechanics & Dynamic Arguments

Functions encapsulate reusable logic blocks. Python supports positional arguments, keyword arguments, default parameters, and variable-length argument tuples/dictionaries.

### Variable-Length Parameter Code
\`\`\`python
def build_event_log(event_type, *tags, timestamp=None, **metadata):
    log_entry = {
        "event": event_type,
        "tags": list(tags),
        "timestamp": timestamp or "2026-07-24T00:00:00Z",
        "details": metadata
    }
    return log_entry

log = build_event_log(
    "AUTH_SUCCESS", 
    "security", "audit", 
    user_id="usr_9021", 
    ip_address="192.168.1.50"
)
print(log)
\`\`\``
          },
          {
            id: 'les_py3_2',
            title: '3.2 Variable Scope Rules & Functional Tools',
            duration: '24 min',
            type: 'reading',
            completed: false,
            textBody: `# Scope Resolution (LEGB) & Functional Processing

Scope is resolved in order: Local, Enclosing, Global, Built-in.

### Anonymous Functions & High-Order Functions
\`\`\`python
from functools import reduce

data = [10, 15, 20, 25, 30]

# Lambda with filter and map
filtered_doubled = list(map(lambda x: x * 2, filter(lambda x: x > 15, data)))

# Aggregation using reduce
total_sum = reduce(lambda acc, curr: acc + curr, data, 0)

print("Processed Sequence:", filtered_doubled)  # [40, 50, 60]
print("Reduced Sum:", total_sum)                # 100
\`\`\``
          },
          {
            id: 'les_py3_3',
            title: '3.3 Modules, Packages & Namespace Management',
            duration: '18 min',
            type: 'reading',
            completed: false,
            textBody: `# Module Structure & Import Mechanics

Modules are .py source files containing executable code and definitions. Packages are directories containing an __init__.py initialization file.

### Entry Point Guards
\`\`\`python
# Entry point execution guard pattern
def main():
    print("Executing standalone module process...")

if __name__ == "__main__":
    main()
\`\`\``
          }
        ]
      },
      {
        id: 'mod_py4',
        title: 'Module 4: Object-Oriented Programming & Class Design',
        lessons: [
          {
            id: 'les_py4_1',
            title: '4.1 Class Instantiation, Instance Attributes & Methods',
            duration: '25 min',
            type: 'reading',
            completed: false,
            textBody: `# Classes & Object Instantiation

Classes define custom reference types encapsulating state (attributes) and behavior (methods).

\`\`\`python
class BankAccount:
    # Class attribute shared across instances
    bank_name = "Apex National"

    def __init__(self, account_holder: str, initial_balance: float = 0.0):
        self.account_holder = account_holder
        self._balance = initial_balance  # Internal attribute convention

    def deposit(self, amount: float) -> float:
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self._balance += amount
        return self._balance

    def get_balance(self) -> float:
        return self._balance

acc = BankAccount("Elena Rostova", 500.0)
acc.deposit(250.0)
print(f"Holder: {acc.account_holder} | Balance: \${acc.get_balance()}")
\`\`\``
          },
          {
            id: 'les_py4_2',
            title: '4.2 Inheritance Hierarchies & Method Overriding',
            duration: '28 min',
            type: 'reading',
            completed: false,
            textBody: `# Class Inheritance & Super Delegation

Derived classes inherit attributes and behavior from base classes, overriding methods to implement polymorphic specialization.

\`\`\`python
class SavingsAccount(BankAccount):
    def __init__(self, account_holder: str, initial_balance: float, interest_rate: float):
        super().__init__(account_holder, initial_balance)
        self.interest_rate = interest_rate

    def apply_interest(self) -> float:
        interest = self._balance * self.interest_rate
        self.deposit(interest)
        return self._balance

sa = SavingsAccount("Elena Rostova", 1000.0, 0.05)
sa.apply_interest()
print(f"Updated Savings Balance: \${sa.get_balance()}")
\`\`\``
          },
          {
            id: 'les_py4_3',
            title: '4.3 Magic Dunder Methods & Managed Properties',
            duration: '26 min',
            type: 'reading',
            completed: false,
            textBody: `# Double Underscore (Dunder) Methods & @property

Dunder methods enable custom operator overloading, string representation, and container behaviors.

\`\`\`python
class DataVector:
    def __init__(self, x: float, y: float):
        self._x = x
        self._y = y

    @property
    def magnitude(self) -> float:
        return (self._x**2 + self._y**2) ** 0.5

    def __repr__(self) -> str:
        return f"DataVector(x={self._x}, y={self._y})"

    def __add__(self, other: 'DataVector') -> 'DataVector':
        return DataVector(self._x + other._x, self._y + other._y)

v1 = DataVector(3, 4)
v2 = DataVector(1, 2)
v3 = v1 + v2
print(v3)                     # DataVector(x=4, y=6)
print("Magnitude:", v1.magnitude) # 5.0
\`\`\``
          }
        ]
      },
      {
        id: 'mod_py5',
        title: 'Module 5: Exception Handling & File I/O Operations',
        lessons: [
          {
            id: 'les_py5_1',
            title: '5.1 Robust Exception Handling Patterns',
            duration: '20 min',
            type: 'reading',
            completed: false,
            textBody: `# Exception Handling Structure

Errors are handled using try, except, else, and finally blocks to maintain continuous execution stability.

\`\`\`python
def safe_parse_metric(value_str: str) -> float:
    try:
        numeric_val = float(value_str)
    except ValueError as err:
        print(f"Parsing warning: Failed to convert '{value_str}' -> {err}")
        return 0.0
    else:
        print("Parsing successful.")
        return numeric_val
    finally:
        print("Metric processing attempt finalized.")

result = safe_parse_metric("124.75")
\`\`\``
          },
          {
            id: 'les_py5_2',
            title: '5.2 Persistent Storage & Context Managers',
            duration: '22 min',
            type: 'reading',
            completed: false,
            textBody: `# Context Managers & File Stream Handling

The with statement guarantees deterministic resource acquisition and release (such as closing file descriptors).

\`\`\`python
import json

data_payload = {
    "system_status": "OPERATIONAL",
    "nodes": ["node-a", "node-b", "node-c"],
    "uptime_seconds": 86400
}

# Writing JSON configuration
with open("system_config.json", "w", encoding="utf-8") as file:
    json.dump(data_payload, file, indent=2)

# Reading JSON configuration
with open("system_config.json", "r", encoding="utf-8") as file:
    loaded_config = json.load(file)

print("Loaded Nodes:", loaded_config["nodes"])
\`\`\``
          }
        ]
      },
      {
        id: 'mod_py6',
        title: 'Module 6: Iterators, Generators & Decorator Patterns',
        lessons: [
          {
            id: 'les_py6_1',
            title: '6.1 Memory-Efficient Data Streams with Generators',
            duration: '24 min',
            type: 'reading',
            completed: false,
            textBody: `# Generator Functions & Yield Execution

Generators produce items on-demand using yield instead of building memory-intensive lists in RAM.

\`\`\`python
def fibonacci_stream(limit: int):
    a, b = 0, 1
    count = 0
    while count < limit:
        yield a
        a, b = b, a + b
        count += 1

# Lazy iteration over sequence
for num in fibonacci_stream(8):
    print(num, end=" ")  # 0 1 1 2 3 5 8 13
\`\`\``
          },
          {
            id: 'les_py6_2',
            title: '6.2 Custom Decorators & Function Wrapping',
            duration: '26 min',
            type: 'reading',
            completed: false,
            textBody: `# Decorators & Function Wrapping

Decorators wrap functions to dynamically augment execution behavior without modifying underlying source code.

\`\`\`python
import time
from functools import wraps

def execution_timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start_time
        print(f"[{func.__name__}] Execution completed in {duration:.6f}s")
        return result
    return wrapper

@execution_timer
def process_data_batch(items):
    return [x**2 for x in items]

process_data_batch(range(10000))
\`\`\``
          }
        ]
      },
      {
        id: 'mod_py7',
        title: 'Module 7: Asynchronous Programming & Concurrency',
        lessons: [
          {
            id: 'les_py7_1',
            title: '7.1 Async/Await Coroutines & Event Loops',
            duration: '28 min',
            type: 'reading',
            completed: false,
            textBody: `# Asynchronous Programming with Asyncio

The asyncio framework enables non-blocking single-threaded cooperative multitasking for high-concurrency I/O operations.

\`\`\`python
import asyncio

async def fetch_remote_resource(resource_id: int, delay: float):
    print(f"Task #{resource_id}: Initiating request...")
    await asyncio.sleep(delay)  # Non-blocking pause
    print(f"Task #{resource_id}: Request complete.")
    return {"id": resource_id, "status": 200}

async def main():
    # Concurrently executing multiple async coroutines
    results = await asyncio.gather(
        fetch_remote_resource(101, 1.0),
        fetch_remote_resource(102, 0.5),
        fetch_remote_resource(103, 1.2)
    )
    print("All requests gathered:", len(results))
\`\`\``
          }
        ]
      },
      {
        id: 'mod_py8',
        title: 'Module 8: Web Services, APIs & Serialization',
        lessons: [
          {
            id: 'les_py8_1',
            title: '8.1 HTTP Client Operations & RESTful Integration',
            duration: '25 min',
            type: 'reading',
            completed: false,
            textBody: `# Consuming Web Services & Processing REST APIs

Python provides built-in libraries like urllib.request and json to interact with RESTful web services.

\`\`\`python
import json
from urllib.request import urlopen, Request

def fetch_json_api(endpoint_url: str):
    req = Request(
        endpoint_url, 
        headers={"User-Agent": "Python-Academic-App/1.0"}
    )
    try:
        with urlopen(req) as response:
            raw_data = response.read().decode("utf-8")
            parsed_json = json.loads(raw_data)
            return parsed_json
    except Exception as err:
        print(f"API Fetch Error: {err}")
        return None

print("HTTP request helper ready for deployment.")
\`\`\``
          }
        ]
      }
    ]
  },
  {
    id: 'crs_03',
    title: 'Full Stack Development',
    category: 'Computer Science',
    badgeTag: '',
    pointsCost: 700,
    description: 'The ultimate bootcamp covering Frontend (React, Next.js), Backend (Node.js, Express, MongoDB), and Cloud deployment with Docker.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    isPurchased: false,
    progress: 0,
    modules: [
      {
        id: 'mod_fs1',
        title: 'Module 1: Modern React & TypeScript Architecture',
        lessons: [
          { id: 'les_fs1', title: '1.1 Component State & Hook Optimization', duration: '20 min', type: 'video', completed: false },
          { id: 'les_fs2', title: '1.2 Tailwind CSS Design System Setup', duration: '15 min', type: 'video', completed: false }
        ]
      },
      {
        id: 'mod_fs2',
        title: 'Module 2: RESTful API & MongoDB Schema Design',
        lessons: [
          { id: 'les_fs3', title: '2.1 Express Routing & Middleware Security', duration: '25 min', type: 'reading', completed: false },
          { id: 'les_fs4', title: '2.2 Mongoose ORM & Aggregation Pipelines', duration: '30 min', type: 'quiz', completed: false }
        ]
      }
    ]
  }
];

export const initialSubmissions: Submission[] = [
  {
    id: 'sub_01',
    taskId: 'task_02',
    taskTitle: 'Code debugging challenge',
    category: 'Engineering',
    studentId: 'usr_student_01',
    studentName: 'Alex Rivera',
    studentEmail: 'email@university.edu',
    submittedAt: 'Oct 12, 2023 02:45 PM',
    status: 'Graded',
    pointsEarned: 60,
    maxPoints: 600,
    responseText: 'Completed all debugging test cases including memory leak fixes, race condition handlers, and unit test benchmarks.',
    projectUrl: 'https://github.com/alexrivera/data-pipeline-debug',
    feedback: 'Exceptional submission! Code clean and well optimized.',
    gradedAt: 'Oct 13, 2023'
  },
  {
    id: 'sub_02',
    taskId: 'task_01',
    taskTitle: 'Poster Making for College Fest',
    category: 'Design',
    studentId: 'usr_student_01',
    studentName: 'Alex Rivera',
    studentEmail: 'email@university.edu',
    submittedAt: 'Oct 14, 2023 11:20 AM',
    status: 'Under Review',
    pointsEarned: 0,
    maxPoints: 350,
    responseText: 'Designed high-resolution vector poster graphics with custom typography and color schemes for College Fest.',
    projectUrl: 'https://figma.com/file/college-fest-poster-design',
    fileAttachments: [
      { name: 'Fest_Poster_Design_v1.pdf', size: '4.2 MB' }
    ]
  },
  {
    id: 'sub_03',
    taskId: 'task_03',
    taskTitle: 'Writing a summary of a technical topic',
    category: 'Writing',
    studentId: 'usr_student_01',
    studentName: 'Alex Rivera',
    studentEmail: 'email@university.edu',
    submittedAt: 'Oct 15, 2023 09:15 AM',
    status: 'Under Review',
    pointsEarned: 0,
    maxPoints: 450,
    responseText: 'Drafting summary on Quantum Cryptography mechanisms vs classical RSA encryption.'
  },
  {
    id: 'sub_04',
    taskId: 'task_06',
    taskTitle: 'Math Logic Puzzles',
    category: 'Mathematics',
    studentId: 'usr_student_01',
    studentName: 'Alex Rivera',
    studentEmail: 'email@university.edu',
    submittedAt: 'Oct 10, 2023 04:10 PM',
    status: 'Graded',
    pointsEarned: 50,
    maxPoints: 500,
    responseText: 'Solved 10 formal set theory and graph isomorphism proof puzzles with step-by-step mathematical reasoning.',
    feedback: 'Flawless proof construction and rigorous logic.',
    gradedAt: 'Oct 11, 2023'
  },
  // Admin-facing submissions from other students:
  {
    id: 'sub_admin_01',
    taskId: 'task_01',
    taskTitle: 'Poster Making for College Fest',
    category: 'Design',
    studentId: 'usr_student_01',
    studentName: 'Alex Rivera',
    studentEmail: 'alex.rivera@university.edu',
    submittedAt: 'Oct 24, 2023 09:45 AM',
    status: 'Under Review',
    pointsEarned: 0,
    maxPoints: 350,
    responseText: 'Submitted full poster layout with vector artwork and schedule breakdowns.',
    fileAttachments: [{ name: 'Rivera_CollegeFestPoster.pdf', size: '3.8 MB' }]
  },
  {
    id: 'sub_admin_02',
    taskId: 'task_03',
    taskTitle: 'Writing a summary of a technical topic',
    category: 'Writing',
    studentId: 'usr_student_02',
    studentName: 'Chloe Wang',
    studentEmail: 'chloe.w@university.edu',
    submittedAt: 'Oct 24, 2023 08:12 AM',
    status: 'Graded',
    pointsEarned: 450,
    maxPoints: 450,
    responseText: 'Submitted 2-page research summary on post-quantum lattice cryptography.',
    feedback: 'Comprehensive breakdown and excellent clarity.'
  },
  {
    id: 'sub_admin_03',
    taskId: 'task_02',
    taskTitle: 'Code debugging challenge',
    category: 'Engineering',
    studentId: 'usr_student_03',
    studentName: 'Jordan Smith',
    studentEmail: 'jordan.s@university.edu',
    submittedAt: 'Oct 23, 2023 04:30 PM',
    status: 'Under Review',
    pointsEarned: 0,
    maxPoints: 600,
    responseText: 'Fixed 8 critical concurrency bottlenecks in data processing pipeline script.'
  }
];

export const initialPointTransactions: PointTransaction[] = [
  {
    id: 'tx_01',
    userId: 'usr_student_01',
    amount: 450,
    type: 'earned',
    description: 'Completed Introduction to Python',
    timestamp: '2023-10-13T14:00:00Z'
  },
  {
    id: 'tx_02',
    userId: 'usr_student_01',
    amount: 600,
    type: 'earned',
    description: 'Completed Advanced Calculus II',
    timestamp: '2023-10-11T16:30:00Z'
  },
  {
    id: 'tx_03',
    userId: 'usr_student_01',
    amount: 100,
    type: 'spent',
    description: 'Unlocked Python Programming Course',
    timestamp: '2023-10-15T11:00:00Z'
  }
];
