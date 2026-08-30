import { useState } from "react";
import "./App.css";

const menuItems = [
  { id: "dashboard", icon: "⌂", label: "Dashboard" },
  { id: "resume", icon: "▤", label: "Resume Analyzer" },
  { id: "jobs", icon: "◎", label: "Job Matching" },
  { id: "skills", icon: "◇", label: "Skill Analysis" },
  { id: "interviews", icon: "◉", label: "Mock Interviews" },
  { id: "roadmap", icon: "↗", label: "Career Roadmap" },
  { id: "applications", icon: "✓", label: "Applications" },
];

const stats = [
  {
    title: "Resume Score",
    value: "78",
    suffix: "/100",
    change: "+8%",
    icon: "▤",
  },
  {
    title: "Job Matches",
    value: "24",
    suffix: "",
    change: "+12 this week",
    icon: "◎",
  },
  {
    title: "Skills Ready",
    value: "68",
    suffix: "%",
    change: "+6%",
    icon: "◇",
  },
  {
    title: "Interview Score",
    value: "82",
    suffix: "%",
    change: "+14%",
    icon: "◉",
  },
];

const jobs = [
  {
    company: "TechNova",
    role: "Java Full Stack Developer",
    location: "Pune • Hybrid",
    salary: "₹6–10 LPA",
    match: 94,
    type: "Full-time",
  },
  {
    company: "CloudCore",
    role: "Junior Software Engineer",
    location: "Bangalore • Remote",
    salary: "₹5–8 LPA",
    match: 89,
    type: "Full-time",
  },
  {
    company: "FinEdge",
    role: "Backend Developer",
    location: "Mumbai • On-site",
    salary: "₹6–9 LPA",
    match: 86,
    type: "Full-time",
  },
];

const skills = [
  { name: "Java", level: 86 },
  { name: "Spring Boot", level: 72 },
  { name: "SQL", level: 78 },
  { name: "React", level: 64 },
  { name: "Git & GitHub", level: 58 },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewQuestion, setInterviewQuestion] = useState(1);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "Java Full Stack Developer",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        setUser(data);

        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: "",
          location: "",
          role: "Java Full Stack Developer",
        });

        setLoggedIn(true);
        setMessage("");
      } else {
        setMessage(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "Cannot connect to server. Make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setLoggedIn(false);
    setEmail("");
    setPassword("");
    setActivePage("dashboard");
  };

  const handleNavigation = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setResumeFile(file);
      setResumeUploaded(true);
    }
  };

  if (!loggedIn) {
    return (
      <div className="login-screen">
        <div className="login-decoration decoration-one"></div>
        <div className="login-decoration decoration-two"></div>

        <div className="login-container">
          <div className="login-brand">
            <div className="brand-mark">H</div>
            <span>HireSense</span>
          </div>

          <div className="login-card">
            <div className="login-header">
              <span className="eyebrow">WELCOME BACK</span>
              <h1>Build your career<br />with confidence.</h1>
              <p>
                Your intelligent career companion for resumes,
                jobs and interviews.
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="field">
                <label>Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <div className="field-label-row">
                  <label>Password</label>
                  <button type="button" className="forgot">
                    Forgot password?
                  </button>
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                className="primary-button login-button"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
                <span>→</span>
              </button>
            </form>

            {message && (
              <div className="error-message">
                {message}
              </div>
            )}

            <div className="login-footer">
              <span>Secure authentication</span>
              <span>•</span>
              <span>JWT protected</span>
            </div>
          </div>

          <p className="copyright">
            © 2026 HireSense. Your career, intelligently guided.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>

        <div className="sidebar-brand">
          <div className="brand-mark">H</div>
          <div>
            <strong>HireSense</strong>
            <small>Career Intelligence</small>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="section-label">WORKSPACE</span>

          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => handleNavigation(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>

              {item.id === "jobs" && (
                <span className="nav-badge">24</span>
              )}
            </button>
          ))}
        </div>

        <div className="sidebar-section">
          <span className="section-label">ACCOUNT</span>

          <button
            className={`nav-item ${
              activePage === "assistant" ? "active" : ""
            }`}
            onClick={() => handleNavigation("assistant")}
          >
            <span className="nav-icon">✦</span>
            <span>AI Assistant</span>
          </button>

          <button
            className={`nav-item ${
              activePage === "profile" ? "active" : ""
            }`}
            onClick={() => handleNavigation("profile")}
          >
            <span className="nav-icon">○</span>
            <span>Profile</span>
          </button>
        </div>

        <div className="sidebar-bottom">

          <div className="upgrade-card">
            <div className="upgrade-icon">✦</div>
            <strong>Unlock your potential</strong>
            <p>
              Get deeper insights and personalized career guidance.
            </p>
            <button>Explore AI tools →</button>
          </div>

          <button
            className="logout-sidebar"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>
      </aside>

      {/* MAIN */}
      <main className="main-content">

        {/* TOPBAR */}
        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <div className="breadcrumb">
            <span>HireSense</span>
            <span>/</span>
            <strong>
              {getPageTitle(activePage)}
            </strong>
          </div>

          <div className="topbar-actions">

            <button className="icon-button notification-button">
              ♢
              <span className="notification-dot"></span>
            </button>

            <div
              className="top-profile"
              onClick={() => setActivePage("profile")}
            >
              <div className="avatar">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="top-profile-info">
                <strong>{user?.name || "User"}</strong>
                <span>Candidate</span>
              </div>

              <span className="chevron">⌄</span>
            </div>

          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="page-content">

          {activePage === "dashboard" && (
            <Dashboard
              user={user}
              onNavigate={handleNavigation}
            />
          )}

          {activePage === "resume" && (
            <ResumeAnalyzer
              resumeFile={resumeFile}
              resumeUploaded={resumeUploaded}
              handleResumeUpload={handleResumeUpload}
            />
          )}

          {activePage === "jobs" && (
            <JobMatching />
          )}

          {activePage === "skills" && (
            <SkillAnalysis />
          )}

          {activePage === "interviews" && (
            <MockInterviews
              interviewStarted={interviewStarted}
              setInterviewStarted={setInterviewStarted}
              interviewQuestion={interviewQuestion}
              setInterviewQuestion={setInterviewQuestion}
            />
          )}

          {activePage === "roadmap" && (
            <CareerRoadmap />
          )}

          {activePage === "applications" && (
            <Applications />
          )}

          {activePage === "profile" && (
            <Profile
              profile={profile}
              setProfile={setProfile}
            />
          )}

          {activePage === "assistant" && (
            <AIAssistant />
          )}

        </div>
      </main>
    </div>
  );
}


/* =====================================================
   DASHBOARD
===================================================== */

function Dashboard({ user, onNavigate }) {
  return (
    <>
      <div className="welcome-row">
        <div>
          <span className="eyebrow">YOUR CAREER COMMAND CENTER</span>
          <h1>
            Good evening, {user?.name?.split(" ")[0] || "there"}.
          </h1>
          <p>
            Here's your career progress and what you can improve today.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => onNavigate("resume")}
        >
          Analyze Resume
          <span>→</span>
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <div className="stat-top">
              <div className="stat-icon">{stat.icon}</div>
              <span className="stat-change">
                ↑ {stat.change}
              </span>
            </div>

            <div className="stat-value">
              {stat.value}
              <small>{stat.suffix}</small>
            </div>

            <div className="stat-title">
              {stat.title}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">

        <div className="panel career-score-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">CAREER READINESS</span>
              <h2>Your career score</h2>
            </div>
            <button className="text-button">View details →</button>
          </div>

          <div className="score-area">
            <div className="score-circle">
              <div>
                <strong>76</strong>
                <span>/100</span>
              </div>
            </div>

            <div className="score-details">
              <div className="score-status">
                <span className="status-dot"></span>
                Strong foundation
              </div>

              <p>
                You're ahead of 68% of candidates in your
                experience range.
              </p>

              <div className="mini-progress">
                <div
                  className="mini-progress-fill"
                  style={{ width: "76%" }}
                ></div>
              </div>

              <small>
                24 points until interview-ready
              </small>
            </div>
          </div>
        </div>

        <div className="panel quick-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">QUICK ACTIONS</span>
              <h2>Keep moving forward</h2>
            </div>
          </div>

          <div className="quick-actions">

            <button onClick={() => onNavigate("resume")}>
              <span className="quick-icon">▤</span>
              <div>
                <strong>Improve Resume</strong>
                <small>3 improvements found</small>
              </div>
              <span>→</span>
            </button>

            <button onClick={() => onNavigate("jobs")}>
              <span className="quick-icon">◎</span>
              <div>
                <strong>Explore Jobs</strong>
                <small>24 new matches</small>
              </div>
              <span>→</span>
            </button>

            <button onClick={() => onNavigate("interviews")}>
              <span className="quick-icon">◉</span>
              <div>
                <strong>Practice Interview</strong>
                <small>Recommended for you</small>
              </div>
              <span>→</span>
            </button>

          </div>
        </div>

      </div>

      <div className="dashboard-grid lower-grid">

        <div className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">TOP MATCHES</span>
              <h2>Jobs for you</h2>
            </div>

            <button
              className="text-button"
              onClick={() => onNavigate("jobs")}
            >
              See all →
            </button>
          </div>

          <div className="job-list">
            {jobs.map((job) => (
              <JobRow job={job} key={job.company} />
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">SKILL HEALTH</span>
              <h2>Your strongest skills</h2>
            </div>

            <button
              className="text-button"
              onClick={() => onNavigate("skills")}
            >
              Full analysis →
            </button>
          </div>

          <div className="skill-list">
            {skills.slice(0, 4).map((skill) => (
              <div className="skill-row" key={skill.name}>
                <div className="skill-name">
                  <span>{skill.name}</span>
                  <strong>{skill.level}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}


/* =====================================================
   RESUME ANALYZER
===================================================== */

function ResumeAnalyzer({
  resumeFile,
  resumeUploaded,
  handleResumeUpload,
}) {
  return (
    <>
      <PageHeader
        eyebrow="RESUME INTELLIGENCE"
        title="Resume Analyzer"
        description="Turn your resume into an interview-winning profile."
      />

      {!resumeUploaded ? (
        <div className="resume-upload-layout">

          <div className="panel upload-panel">
            <div className="upload-icon">↑</div>

            <h2>Upload your resume</h2>

            <p>
              Drop your resume here or browse your computer.
              We support PDF and DOCX files.
            </p>

            <label className="upload-button">
              Choose Resume
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                hidden
              />
            </label>

            <span className="upload-note">
              Maximum file size: 10 MB
            </span>
          </div>

          <div className="panel analyzer-info">
            <span className="eyebrow">WHAT YOU'LL GET</span>
            <h2>More than a resume score.</h2>

            <InfoItem
              icon="01"
              title="ATS Compatibility"
              text="See how well your resume performs against applicant tracking systems."
            />

            <InfoItem
              icon="02"
              title="Content Quality"
              text="Identify weak bullet points, missing achievements and vague language."
            />

            <InfoItem
              icon="03"
              title="Skill Coverage"
              text="Discover the skills recruiters expect for your target role."
            />

            <InfoItem
              icon="04"
              title="Action Plan"
              text="Get prioritized improvements instead of generic suggestions."
            />
          </div>

        </div>
      ) : (
        <div className="resume-results">

          <div className="resume-summary panel">

            <div className="resume-file">
              <div className="file-icon">PDF</div>

              <div>
                <strong>{resumeFile?.name}</strong>
                <small>Successfully uploaded</small>
              </div>
            </div>

            <button className="secondary-button">
              Replace Resume
            </button>

          </div>

          <div className="resume-score-grid">

            <div className="panel big-score-card">
              <span className="eyebrow">OVERALL ATS SCORE</span>

              <div className="big-score">78</div>

              <div className="score-label">
                Good — with room to improve
              </div>

              <div className="score-bar">
                <div style={{ width: "78%" }}></div>
              </div>

              <p>
                Your resume is competitive, but a few targeted
                improvements could significantly increase your chances.
              </p>
            </div>

            <div className="panel">
              <span className="eyebrow">RESUME BREAKDOWN</span>

              <ResumeMetric title="ATS Compatibility" value="84%" />
              <ResumeMetric title="Content Quality" value="76%" />
              <ResumeMetric title="Keyword Match" value="72%" />
              <ResumeMetric title="Formatting" value="91%" />
            </div>

          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">AI RECOMMENDATIONS</span>
                <h2>Improve your resume</h2>
              </div>
            </div>

            <div className="recommendation-grid">
              <Recommendation
                type="High impact"
                title="Add measurable achievements"
                text="Your experience section has several responsibilities but very few measurable outcomes."
              />

              <Recommendation
                type="Medium impact"
                title="Strengthen your summary"
                text="Mention your strongest technologies and the type of role you are targeting."
              />

              <Recommendation
                type="Medium impact"
                title="Improve keyword coverage"
                text="Consider adding Spring Boot, REST APIs and Docker where they genuinely match your experience."
              />
            </div>
          </div>

        </div>
      )}
    </>
  );
}


/* =====================================================
   JOB MATCHING
===================================================== */

function JobMatching() {
  return (
    <>
      <PageHeader
        eyebrow="OPPORTUNITY ENGINE"
        title="Job Matching"
        description="Discover opportunities ranked by how well they fit you."
      />

      <div className="job-toolbar">
        <div className="search-box">
          <span>⌕</span>
          <input placeholder="Search roles, companies or skills..." />
        </div>

        <select>
          <option>Best Match</option>
          <option>Highest Salary</option>
          <option>Newest</option>
        </select>

        <button className="secondary-button">
          Filters
        </button>
      </div>

      <div className="jobs-layout">

        <div className="panel job-results">

          <div className="results-header">
            <strong>24 opportunities</strong>
            <span>Updated today</span>
          </div>

          {jobs.map((job) => (
            <JobCard job={job} key={job.company} />
          ))}

          <JobCard
            job={{
              company: "DevMatrix",
              role: "Software Engineer — Java",
              location: "Hyderabad • Hybrid",
              salary: "₹5–7 LPA",
              match: 83,
              type: "Full-time",
            }}
          />

        </div>

        <div className="panel job-insight">

          <span className="eyebrow">MATCH INTELLIGENCE</span>
          <h2>Why these jobs?</h2>

          <div className="match-circle">
            <strong>94%</strong>
            <span>best match</span>
          </div>

          <p>
            Your Java experience, SQL knowledge and backend
            profile strongly align with these roles.
          </p>

          <div className="match-tags">
            <span>Java ✓</span>
            <span>Spring ✓</span>
            <span>SQL ✓</span>
            <span>REST ✓</span>
          </div>

        </div>

      </div>
    </>
  );
}


/* =====================================================
   SKILL ANALYSIS
===================================================== */

function SkillAnalysis() {
  return (
    <>
      <PageHeader
        eyebrow="SKILL INTELLIGENCE"
        title="Skill Analysis"
        description="Understand what you know, what employers want and what to learn next."
      />

      <div className="skill-dashboard">

        <div className="panel skill-overview">

          <span className="eyebrow">YOUR SKILL PROFILE</span>

          <div className="skill-score-row">
            <div>
              <strong>68%</strong>
              <span>Job readiness</span>
            </div>

            <div className="skill-status">
              <span></span>
              On track
            </div>
          </div>

          <p>
            You're building a strong foundation. Focus next on
            Spring Boot, React and deployment skills.
          </p>

        </div>

        <div className="panel">
          <span className="eyebrow">TECHNICAL SKILLS</span>

          <div className="skill-list large">
            {skills.map((skill) => (
              <div className="skill-row" key={skill.name}>
                <div className="skill-name">
                  <span>{skill.name}</span>
                  <strong>{skill.level}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>

                <small>
                  {skill.level >= 80
                    ? "Strong"
                    : skill.level >= 65
                    ? "Intermediate"
                    : "Needs practice"}
                </small>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="panel skill-gaps">

        <div className="panel-heading">
          <div>
            <span className="eyebrow">CAREER GAP ANALYSIS</span>
            <h2>Skills that can unlock your next role</h2>
          </div>
        </div>

        <div className="gap-grid">

          <GapCard
            level="Priority"
            title="Spring Security"
            score="42%"
            description="Frequently requested for Java backend roles."
          />

          <GapCard
            level="Recommended"
            title="Docker"
            score="31%"
            description="Adds deployment and production-readiness credibility."
          />

          <GapCard
            level="Recommended"
            title="React"
            score="64%"
            description="Improve frontend confidence for full-stack positions."
          />

        </div>

      </div>
    </>
  );
}


/* =====================================================
   MOCK INTERVIEWS
===================================================== */

function MockInterviews({
  interviewStarted,
  setInterviewStarted,
  interviewQuestion,
  setInterviewQuestion,
}) {
  const questions = [
    "Tell me about yourself and your technical background.",
    "Explain the difference between HashMap and Hashtable in Java.",
    "What is dependency injection in Spring Boot?",
    "How would you design a scalable REST API?",
    "Tell me about a challenging project you worked on.",
  ];

  if (!interviewStarted) {
    return (
      <>
        <PageHeader
          eyebrow="INTERVIEW LAB"
          title="Mock Interviews"
          description="Practice realistic interviews and improve before the real one."
        />

        <div className="interview-hero panel">

          <div className="interview-hero-content">
            <span className="eyebrow">AI-POWERED PRACTICE</span>

            <h2>
              Your next interview<br />
              starts here.
            </h2>

            <p>
              Practice technical, behavioral and HR questions
              tailored to your target role.
            </p>

            <button
              className="primary-button"
              onClick={() => setInterviewStarted(true)}
            >
              Start Mock Interview →
            </button>
          </div>

          <div className="interview-visual">
            <div className="visual-ring">
              <div>
                <strong>82</strong>
                <span>Current score</span>
              </div>
            </div>
          </div>

        </div>

        <div className="interview-types">

          <InterviewType
            icon="⌘"
            title="Technical"
            text="Java, Spring Boot, SQL, DSA and system fundamentals."
          />

          <InterviewType
            icon="◉"
            title="Behavioral"
            text="Leadership, teamwork, conflict and problem solving."
          />

          <InterviewType
            icon="✦"
            title="HR Round"
            text="Introduction, strengths, weaknesses and career goals."
          />

        </div>
      </>
    );
  }

  const currentQuestion = questions[interviewQuestion - 1];

  return (
    <>
      <PageHeader
        eyebrow="LIVE PRACTICE"
        title="Mock Interview"
        description="Answer naturally. We'll evaluate your response."
      />

      <div className="interview-session panel">

        <div className="interview-progress-header">
          <span>
            Question {interviewQuestion} of {questions.length}
          </span>

          <span>
            Technical Interview
          </span>
        </div>

        <div className="interview-progress">
          <div
            style={{
              width: `${
                (interviewQuestion / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>

        <div className="question-area">

          <span className="eyebrow">INTERVIEWER</span>

          <h2>{currentQuestion}</h2>

          <textarea
            placeholder="Type your answer here..."
            rows="8"
          ></textarea>

          <div className="question-actions">

            <button
              className="secondary-button"
              onClick={() =>
                setInterviewStarted(false)
              }
            >
              Exit Interview
            </button>

            <button
              className="primary-button"
              onClick={() => {
                if (interviewQuestion < questions.length) {
                  setInterviewQuestion(
                    interviewQuestion + 1
                  );
                } else {
                  setInterviewStarted(false);
                  setInterviewQuestion(1);
                }
              }}
            >
              {interviewQuestion === questions.length
                ? "Finish Interview"
                : "Next Question →"}
            </button>

          </div>

        </div>

      </div>
    </>
  );
}


/* =====================================================
   CAREER ROADMAP
===================================================== */

function CareerRoadmap() {
  const steps = [
    {
      number: "01",
      title: "Strengthen Core Java",
      text: "Master OOP, collections, exceptions and modern Java.",
      status: "Completed",
    },
    {
      number: "02",
      title: "Build Spring Boot Expertise",
      text: "REST APIs, Spring Security, JPA and production patterns.",
      status: "In progress",
    },
    {
      number: "03",
      title: "Become Full Stack Ready",
      text: "React, API integration and frontend architecture.",
      status: "Next",
    },
    {
      number: "04",
      title: "Production & Deployment",
      text: "Docker, cloud basics, CI/CD and monitoring.",
      status: "Upcoming",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="CAREER NAVIGATOR"
        title="Career Roadmap"
        description="A personalized path from where you are to where you want to be."
      />

      <div className="roadmap-header panel">

        <div>
          <span className="eyebrow">TARGET ROLE</span>
          <h2>Java Full Stack Developer</h2>
          <p>
            Estimated readiness: 3–5 months with consistent practice.
          </p>
        </div>

        <div className="roadmap-progress">
          <strong>62%</strong>
          <span>complete</span>
        </div>

      </div>

      <div className="roadmap">

        {steps.map((step, index) => (
          <div className="roadmap-step" key={step.number}>

            <div className="roadmap-number">
              {step.number}
            </div>

            <div className="roadmap-line"></div>

            <div className="roadmap-content">

              <div className="roadmap-step-top">
                <span className={`roadmap-status ${step.status.toLowerCase().replace(" ", "-")}`}>
                  {step.status}
                </span>
              </div>

              <h2>{step.title}</h2>

              <p>{step.text}</p>

              <button className="text-button">
                View learning plan →
              </button>

            </div>

          </div>
        ))}

      </div>
    </>
  );
}


/* =====================================================
   APPLICATIONS
===================================================== */

function Applications() {
  const applications = [
    {
      company: "TechNova",
      role: "Java Developer",
      status: "Interview",
      date: "Aug 28, 2026",
    },
    {
      company: "CloudCore",
      role: "Software Engineer",
      status: "Applied",
      date: "Aug 24, 2026",
    },
    {
      company: "FinEdge",
      role: "Backend Developer",
      status: "Shortlisted",
      date: "Aug 19, 2026",
    },
    {
      company: "DevMatrix",
      role: "Full Stack Developer",
      status: "Rejected",
      date: "Aug 12, 2026",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="APPLICATION TRACKER"
        title="Applications"
        description="Keep every opportunity organized in one place."
      />

      <div className="application-stats">
        <MiniStat title="Total Applied" value="18" />
        <MiniStat title="Interviews" value="4" />
        <MiniStat title="Shortlisted" value="6" />
        <MiniStat title="Response Rate" value="44%" />
      </div>

      <div className="panel applications-panel">

        <div className="panel-heading">
          <div>
            <span className="eyebrow">YOUR PIPELINE</span>
            <h2>Recent applications</h2>
          </div>

          <button className="primary-button">
            + Add application
          </button>
        </div>

        <div className="application-table">

          <div className="table-header">
            <span>Company</span>
            <span>Role</span>
            <span>Status</span>
            <span>Date</span>
          </div>

          {applications.map((application) => (
            <div className="table-row" key={application.company}>

              <strong>{application.company}</strong>

              <span>{application.role}</span>

              <span>
                <StatusBadge status={application.status} />
              </span>

              <span>{application.date}</span>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}


/* =====================================================
   PROFILE
===================================================== */

function Profile({ profile, setProfile }) {
  return (
    <>
      <PageHeader
        eyebrow="YOUR IDENTITY"
        title="Profile"
        description="Keep your career profile updated for better recommendations."
      />

      <div className="profile-layout">

        <div className="panel profile-card">

          <div className="profile-avatar-large">
            {profile.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h2>{profile.name || "Your Name"}</h2>
          <p>{profile.role}</p>

          <span className="profile-complete">
            Profile 72% complete
          </span>

        </div>

        <div className="panel profile-form">

          <span className="eyebrow">PERSONAL INFORMATION</span>

          <div className="form-grid">

            <div className="field">
              <label>Full name</label>
              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                value={profile.email}
                readOnly
              />
            </div>

            <div className="field">
              <label>Phone</label>
              <input
                placeholder="+91 XXXXX XXXXX"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    phone: e.target.value,
                  })
                }
              />
            </div>

            <div className="field">
              <label>Location</label>
              <input
                placeholder="City, India"
                value={profile.location}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    location: e.target.value,
                  })
                }
              />
            </div>

            <div className="field full">
              <label>Target role</label>
              <input
                value={profile.role}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    role: e.target.value,
                  })
                }
              />
            </div>

          </div>

          <button className="primary-button">
            Save changes
          </button>

        </div>

      </div>
    </>
  );
}


/* =====================================================
   AI ASSISTANT
===================================================== */

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hi! I'm your HireSense career assistant. Ask me about your resume, interviews, skills or career direction.",
    },
  ]);

  const sendMessage = () => {
    if (!question.trim()) return;

    setMessages([
      ...messages,
      {
        type: "user",
        text: question,
      },
      {
        type: "ai",
        text: "Great question. Once the AI service is connected, I'll analyze your profile and provide a personalized recommendation here.",
      },
    ]);

    setQuestion("");
  };

  return (
    <>
      <PageHeader
        eyebrow="CAREER COPILOT"
        title="AI Career Assistant"
        description="Your always-on career advisor."
      />

      <div className="assistant-panel panel">

        <div className="assistant-header">
          <div className="assistant-avatar">✦</div>

          <div>
            <strong>HireSense AI</strong>
            <span>Career intelligence assistant</span>
          </div>

          <div className="ai-online">
            <span></span>
            Online
          </div>
        </div>

        <div className="chat-area">

          {messages.map((message, index) => (
            <div
              className={`chat-message ${message.type}`}
              key={index}
            >
              {message.text}
            </div>
          ))}

        </div>

        <div className="assistant-input">

          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Ask anything about your career..."
          />

          <button onClick={sendMessage}>
            →
          </button>

        </div>

      </div>
    </>
  );
}


/* =====================================================
   COMPONENTS
===================================================== */

function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

function JobRow({ job }) {
  return (
    <div className="job-row">

      <div className="company-logo">
        {job.company.charAt(0)}
      </div>

      <div className="job-main">
        <strong>{job.role}</strong>
        <span>
          {job.company} • {job.location}
        </span>
      </div>

      <div className="match-score">
        <strong>{job.match}%</strong>
        <span>match</span>
      </div>

    </div>
  );
}

function JobCard({ job }) {
  return (
    <div className="job-card">

      <div className="job-card-top">

        <div className="company-logo large">
          {job.company.charAt(0)}
        </div>

        <div>
          <h3>{job.role}</h3>
          <span>{job.company}</span>
        </div>

        <div className="job-match">
          <strong>{job.match}%</strong>
          <span>Match</span>
        </div>

      </div>

      <div className="job-meta">
        <span>⌖ {job.location}</span>
        <span>₹ {job.salary}</span>
        <span>{job.type}</span>
      </div>

      <div className="job-card-actions">
        <button className="secondary-button">
          View details
        </button>

        <button className="primary-button">
          Apply now →
        </button>
      </div>

    </div>
  );
}

function InfoItem({ icon, title, text }) {
  return (
    <div className="info-item">
      <span>{icon}</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function ResumeMetric({ title, value }) {
  return (
    <div className="resume-metric">
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>

      <div className="metric-bar">
        <div style={{ width: value }}></div>
      </div>
    </div>
  );
}

function Recommendation({ type, title, text }) {
  return (
    <div className="recommendation">
      <span>{type}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <button className="text-button">
        Fix this →
      </button>
    </div>
  );
}

function GapCard({ level, title, score, description }) {
  return (
    <div className="gap-card">
      <span>{level}</span>
      <h3>{title}</h3>
      <strong>{score}</strong>
      <p>{description}</p>
      <button className="text-button">
        Start learning →
      </button>
    </div>
  );
}

function InterviewType({ icon, title, text }) {
  return (
    <div className="panel interview-type">
      <div className="interview-type-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <button className="text-button">
        Practice →
      </button>
    </div>
  );
}

function MiniStat({ title, value }) {
  return (
    <div className="mini-stat panel">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${status.toLowerCase()}`}>
      {status}
    </span>
  );
}

function getPageTitle(page) {
  const titles = {
    dashboard: "Dashboard",
    resume: "Resume Analyzer",
    jobs: "Job Matching",
    skills: "Skill Analysis",
    interviews: "Mock Interviews",
    roadmap: "Career Roadmap",
    applications: "Applications",
    profile: "Profile",
    assistant: "AI Assistant",
  };

  return titles[page] || "Dashboard";
}

export default App;