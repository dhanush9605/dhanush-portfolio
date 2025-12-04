import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Menu, X, Github, Linkedin, Mail, Phone, Code, Gamepad2, Database, Palette, ExternalLink } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import unityRpg from "@/assets/unity-rpg.jpg";
import votingSystem from "@/assets/voting-system.jpg";
import visionImg from "@/assets/vision.jpg";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_ji79p6f";
const TEMPLATE_ID = "template_v59a5vo";
const PUBLIC_KEY = "7XPLRUUs9mTEXIH1I";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const skills = [
    { category: "Game Development", items: ["Unity Engine", "Level Design", "Game Mechanics", "Performance Optimization"] },
    // { category: "Graphics & Algorithms", items: ["Bresenham Algorithm", "Midpoint Circle", "Boundary Fill", "DDA Line Drawing"] },
    { category: "Web & Databases", items: ["SQL Database Design", "Responsive Web Design", "Frontend Development", "RESTful APIs"] },
    { category: "Design & UX", items: ["UI/UX Design", "Wireframing", "Prototyping", "User-Centered Design"] },
  ];

  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Wireframing, prototyping, and responsive design that puts users first.",
      deliverables: ["Interactive prototypes", "Responsive layouts", "Design systems"]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Modern, performant web applications with clean code and best practices.",
      deliverables: ["Responsive websites", "Database integration", "Frontend development"]
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Game Development",
      description: "Unity-based games with engaging mechanics and polished experiences.",
      deliverables: ["Level design", "Game mechanics", "Performance optimization"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Decentralized Systems",
      description: "Blockchain-inspired secure systems with robust architecture.",
      deliverables: ["System architecture", "Database design", "Security implementation"]
    },
  ];

  const projects = [
    {
      id: "unity-rpg",
      title: "Unity RPG Game Development",
      role: "Game Developer",
      timeline: "Jan 2023 – Apr 2023",
      overview: "Designed and developed a level-based RPG in Unity with comprehensive player progression, combat mechanics, and interactive environments.",
      highlights: [
        "Implemented dynamic player progression system with skill trees",
        "Created responsive combat mechanics with real-time feedback",
        "Optimized performance across multiple device platforms",
        "Designed interactive environments with puzzle elements"
      ],
      tech: ["Unity", "C#", "Game Design", "Performance Optimization"],
      image: unityRpg,
      details: "This project showcases my ability to create engaging gameplay experiences while maintaining high performance standards. The RPG features multiple interconnected levels, each with unique challenges and narrative elements. I implemented custom algorithms for pathfinding, AI behavior, and collision detection, demonstrating proficiency in both game design and computer graphics fundamentals."
    },
    {
      id: "voting-system",
      title: "Decentralized Voting System",
      role: "Full-Stack Developer",
      timeline: "Nov 2025 – ongoing",
      overview: "Built a blockchain-inspired decentralized voting platform with comprehensive SQL database architecture and intuitive user interfaces.",
      highlights: [
        "Designed normalized SQL database schemas for voter and admin data",
        "Implemented secure authentication and authorization systems",
        "Created responsive UI/UX for both voters and administrators",
        "Developed real-time vote tallying and results visualization"
      ],
      tech: ["SQL", "Web Development", "Database Design", "UI/UX", "Security"],
      image: votingSystem,
      details: "This decentralized voting system demonstrates my understanding of secure, scalable system architecture. The platform ensures vote integrity through cryptographic techniques while maintaining user privacy. The database design follows normalization principles and implements proper indexing for optimal query performance. The responsive interface makes voting accessible across all devices."
    }
  ];

  // New: EmailJS-based contact submit handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = String(formData.get('name') || "").trim();
    const email = String(formData.get('email') || "").trim();
    const subject = String(formData.get('subject') || "").trim();
    const message = String(formData.get('message') || "").trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      setStatus({ ok: false, msg: "Please fill all required fields." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ ok: false, msg: "Please enter a valid email address." });
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        subject,
        message,
      }, PUBLIC_KEY);

      setStatus({ ok: true, msg: "Message sent — thank you!" });
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({ ok: false, msg: "Failed to send message. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#home" className="text-xl font-bold font-orbitron tracking-tight">
              DHANUSH<span className="text-muted-foreground">.</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-fade-in">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-block px-4 py-2 bg-accent/50 rounded-full text-sm font-medium border border-border">
                PORTFOLIO WEBSITE
              </div>

              <div>
                <p className="text-lg text-muted-foreground mb-2">Hello, I'm 👋</p>
                <h1 className="text-5xl md:text-7xl font-bold font-orbitron mb-4">
                  DHANUSH<br />RAJESH
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  Computer Science & Design graduate • Game & Web Developer
                </p>
              </div>

              <p className="text-lg text-muted-foreground max-w-xl">
                I build level-based Unity games and secure, responsive web apps. Focused on clarity, performance, and real-world results.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Unity", "Computer Graphics", "SQL", "UI/UX"].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-card border border-border rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                  <a href="#portfolio">View Portfolio</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  {/* changed: open contact section instead of mailto */}
                  <a href="#contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Me
                  </a>
                </Button>
              </div>

              <div className="flex gap-4 pt-4">
                <a href="https://www.linkedin.com/in/dhanushrajesh6/" target="_blank" rel="noopener noreferrer" className="p-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/dhanush9605" target="_blank" rel="noopener noreferrer" className="p-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="relative rounded-2xl overflow-hidden border-2 border-border shadow-[var(--shadow-elegant)]">
                <img
                  src={portrait}
                  alt="Dhanush Rajesh - Professional Portrait"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-8 animate-fade-in">
              ABOUT ME
            </h2>

            <Card className="p-8 bg-card border-border animate-scale-in">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I am Dhanush, a Computer Science and Design graduate from Kerala with a strong foundation in software development, computer graphics, and game design. My academic work includes a Unity-based level RPG and a blockchain-inspired decentralized voting system. I'm methodical, persistent, and resourceful, focused now on job applications, portfolio web projects, and interview preparation.
              </p>

              <div className="border-t border-border pt-6 mb-6">
                <h3 className="text-xl font-semibold mb-3 font-orbitron">Education</h3>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <p className="font-semibold">Computer Science and Design (Degree)</p>
                    <p className="text-muted-foreground">Viswajyothi College of Engineering and Technology, Vazakulam</p>
                    <p className="text-sm text-muted-foreground mt-1">Graduating 2026</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 mb-6">
                <h3 className="text-xl font-semibold mb-3 font-orbitron">Currently Focusing On</h3>
                <p className="text-muted-foreground">
                  Actively pursuing job opportunities, expanding my portfolio with real projects, and sharpening technical interview skills.
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="text-xl font-semibold mb-3 font-orbitron">Beyond Code</h3>
                <p className="text-muted-foreground">
                  When I'm not coding, I enjoy creative writing with a focus on crime thrillers and exploring the fascinating world of automotive engineering.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative bg-card/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-12 text-center animate-fade-in">
            SKILLS & EXPERTISE
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {skills.map((skillGroup, idx) => (
              <Card key={skillGroup.category} className="p-6 bg-card border-border animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <h3 className="text-xl font-semibold mb-4 font-orbitron">{skillGroup.category}</h3>
                <div className="space-y-3">
                  {skillGroup.items.map((skill) => (
                    <div key={skill} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-foreground rounded-full" />
                      <span className="text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>


        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-12 text-center animate-fade-in">
            SERVICES
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {services.map((service, idx) => (
              <Card key={service.title} className="p-6 bg-card border-border hover:bg-accent/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="mb-4 text-foreground">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-3 font-orbitron">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.deliverables.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 bg-foreground rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="#contact">Request Project</a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 relative bg-card/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-12 text-center animate-fade-in">
            FEATURED PROJECTS
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, idx) => (
              <Card key={project.id} className="overflow-hidden bg-card border-border group animate-fade-in-up" style={{ animationDelay: `${idx * 0.2}s` }}>
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span>{project.role}</span>
                    <span>•</span>
                    <span>{project.timeline}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 font-orbitron">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.overview}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-accent text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Button
                    onClick={() => setSelectedProject(project.id)}
                    variant="outline"
                    className="w-full"
                  >
                    View Case Study
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-12 text-center animate-fade-in">
            JOURNEY THROUGH EXPERIENCE
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {projects.map((project, idx) => (
              <Card key={project.id} className="p-6 bg-card border-border animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0 font-bold font-orbitron">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 font-orbitron">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{project.timeline}</p>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-foreground mt-1">▹</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="inline-block p-8 bg-card border-border">
              <img
                src={visionImg}
                alt="Vision - Building Tomorrow"
                className="w-full max-w-2xl rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold font-orbitron mb-4">VISION</h3>
              <p className="text-muted-foreground max-w-2xl">
                My vision extends beyond the horizon, seeking to build future-forward innovations that bridge creativity and technology. I'm passionate about crafting solutions that are meaningful, scalable, and impactful—whether it's through immersive game experiences or secure, decentralized systems that empower users.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative bg-card/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-12 text-center animate-fade-in">
            GET IN TOUCH
          </h2>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-card border-border">
              <p className="text-center text-muted-foreground mb-8">
                Open to internship/entry-level roles and freelance projects. Let's build something amazing together.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input id="name" name="name" required className="bg-background" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input id="email" name="email" type="email" required className="bg-background" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="Job Opportunity">Job Opportunity</option>
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Collaboration">Collaboration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <Textarea id="message" name="message" rows={6} required className="bg-background" />
                </div>

                <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                  <Mail className="w-4 h-4 ml-2" />
                </Button>

                {status && (
                  <p className={`mt-4 text-center ${status.ok ? "text-green-400" : "text-red-400"}`}>
                    {status.msg}
                  </p>
                )}
              </form>

              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold mb-4 font-orbitron text-center">Connect With Me</h3>
                <div className="flex justify-center gap-4">
                  <a
                    href="mailto:dhanushrajesh2000@gmail.com"
                    className="p-3 bg-background border border-border rounded-lg hover:bg-accent transition-colors"
                    aria-label="Email Dhanush"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dhanushrajesh6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background border border-border rounded-lg hover:bg-accent transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/dhanush9605"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background border border-border rounded-lg hover:bg-accent transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="tel:+9196055613921"
                    className="p-3 bg-background border border-border rounded-lg hover:bg-accent transition-colors"
                    aria-label="Call Dhanush"
                  >
                    <Phone className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              ©2025 Dhanush Rajesh — Designed & Built by Dhanush
            </p>
            <div className="flex gap-6">
              {navItems.slice(0, 4).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card">
          {selectedProject && (
            <>
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;

                return (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-orbitron">{project.title}</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        {project.role} • {project.timeline}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 mt-6">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full rounded-lg"
                      />

                      <div>
                        <h3 className="text-lg font-semibold mb-3 font-orbitron">Overview</h3>
                        <p className="text-muted-foreground">{project.overview}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3 font-orbitron">Key Highlights</h3>
                        <ul className="space-y-2">
                          {project.highlights.map((highlight) => (
                            <li key={highlight} className="text-muted-foreground flex items-start gap-2">
                              <span className="text-foreground mt-1">▹</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3 font-orbitron">Technical Details</h3>
                        <p className="text-muted-foreground mb-4">{project.details}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-accent text-sm rounded-lg">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button variant="outline" className="flex-1" asChild>
                          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            View Code
                          </a>
                        </Button>
                        <Button className="flex-1 bg-foreground text-background hover:bg-foreground/90" asChild>
                          <a href="#contact">
                            <Mail className="w-4 h-4 mr-2" />
                            Discuss Project
                          </a>
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
