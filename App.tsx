
import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Award, 
  Mail, 
  Phone, 
  Linkedin, 
  ChevronRight, 
  Database, 
  Layers,
  MapPin,
  Calendar,
  CheckCircle2,
  Tag,
  ExternalLink,
  Sparkles,
  User,
  Menu,
  X,
  Download
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  SKILLS, 
  EXPERIENCES, 
  EDUCATION, 
  CERTIFICATIONS, 
  PROJECTS 
} from './constants';

const App: React.FC = () => {
  const [projectFilter, setProjectFilter] = useState<'All' | 'Project' | 'Thesis'>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredProjects = PROJECTS.filter(proj => 
    projectFilter === 'All' ? true : proj.type === projectFilter
  );

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of the fixed header + some breathing room
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen" id="top">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={scrollToTop}
            className="font-outfit font-extrabold text-xl tracking-tight hover:opacity-80 transition-opacity z-50"
          >
            WASI<span className="text-indigo-600">.</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">About</a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Experience</a>
            <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Skills</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Projects</a>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`} 
              className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Contact Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-indigo-600 transition-colors z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-2xl font-outfit font-extrabold text-slate-900 hover:text-indigo-600 transition-colors">About</a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="text-2xl font-outfit font-extrabold text-slate-900 hover:text-indigo-600 transition-colors">Experience</a>
            <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="text-2xl font-outfit font-extrabold text-slate-900 hover:text-indigo-600 transition-colors">Skills</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="text-2xl font-outfit font-extrabold text-slate-900 hover:text-indigo-600 transition-colors">Projects</a>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`} 
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center bg-indigo-600 text-white py-5 rounded-[2rem] text-xl font-black shadow-xl shadow-indigo-200 mt-4"
            >
              Contact Me
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 bg-white overflow-hidden bg-grid">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 animate-in fade-in slide-in-from-left duration-1000">
            <span className="inline-block px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-6">
              Implementation Engineer
            </span>
            <h1 className="text-5xl md:text-7xl font-outfit font-extrabold text-slate-900 leading-[1.1] mb-6">
              Building systems that <span className="text-indigo-600 italic">drive growth.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-lg mb-8 leading-relaxed">
              I'm <span className="font-bold text-slate-900">{PERSONAL_INFO.name}</span>, a tech-ops professional with 3.5+ years of experience in AI integration and enterprise systems.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <button onClick={(e) => scrollToSection(e, 'experience')} className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all group">
                View My Work
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="/cv.pdf" 
                target="_blank"
                className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all group"
              >
                <Download className="w-5 h-5" />
                Download CV
              </a>
              <div className="flex items-center gap-2 ml-2">
                <a 
                  href={PERSONAL_INFO.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Visit LinkedIn Profile"
                  className="p-4 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block animate-in fade-in slide-in-from-right duration-1000">
            <div className="w-full aspect-square bg-slate-100 rounded-[3rem] overflow-hidden relative border border-slate-200 shadow-inner">
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop" alt="Workspace" className="w-full h-full object-cover grayscale opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-6 rounded-2xl border border-white/20 shadow-xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Currently Delivering</span>
                </div>
                <p className="font-bold text-slate-900">Enterprise CRM & HRIS Implementation @ Global MediKlaud</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced About Section */}
      <section id="about" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Summary Column */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-[0.2em] font-outfit">About Me</h2>
              </div>
              <h3 className="text-3xl md:text-4xl font-outfit font-extrabold mb-8 leading-tight">
                Empowering businesses through <br />
                <span className="text-indigo-400">technical operational excellence.</span>
              </h3>
              <p className="text-lg text-slate-400 leading-relaxed font-medium mb-8">
                {PERSONAL_INFO.summary}
              </p>
              <div className="flex items-center gap-6">
                 <div className="h-px flex-grow bg-white/10"></div>
                 <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Impact Indicators</div>
                 <div className="h-px flex-grow bg-white/10"></div>
              </div>
            </div>

            {/* Stats Grid Column */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] text-center hover:bg-white/10 transition-colors group">
                <div className="text-4xl font-outfit font-extrabold text-indigo-400 mb-2 group-hover:scale-110 transition-transform">3.5+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Years Exp</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] text-center hover:bg-white/10 transition-colors group">
                <div className="text-4xl font-outfit font-extrabold text-indigo-400 mb-2 group-hover:scale-110 transition-transform">80+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reports Built</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] text-center hover:bg-white/10 transition-colors group">
                <div className="text-4xl font-outfit font-extrabold text-indigo-400 mb-2 group-hover:scale-110 transition-transform">99.9%</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Accuracy Rate</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] text-center hover:bg-white/10 transition-colors group">
                <div className="text-4xl font-outfit font-extrabold text-indigo-400 mb-2 group-hover:scale-110 transition-transform">10+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sys Integrations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em] mb-3 font-outfit">Career Evolution</h2>
              <h3 className="text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 leading-tight">
                Professional <br />Timeline.
              </h3>
            </div>
            <p className="text-slate-500 max-w-sm">
              An overview of my roles and contributions within the technical operations landscape.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/4 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-600 via-indigo-400 to-slate-200 rounded-full hidden md:block"></div>
            
            <div className="space-y-16">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="group relative pl-12 md:pl-0">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 md:hidden"></div>
                  
                  <div className="grid md:grid-cols-4 gap-4 md:gap-16 items-start">
                    <div className="md:col-span-1 md:text-right pt-2 relative">
                      <div className="text-indigo-600 font-bold font-outfit mb-1 text-lg">{exp.period}</div>
                      <div className="flex items-center md:justify-end gap-2 text-slate-400 text-sm font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </div>
                      
                      <div className="hidden md:flex absolute -right-8.5 top-3.5 z-10 items-center justify-center translate-x-1/2">
                        <div className="w-5 h-5 rounded-full bg-white border-4 border-indigo-600 shadow-md group-hover:scale-125 transition-transform duration-300"></div>
                        <div className="absolute w-12 h-12 bg-indigo-600/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                      </div>
                    </div>

                    <div className="md:col-span-3 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:border-indigo-100 transition-all duration-500 relative">
                      <div className="md:hidden absolute -left-10 top-8 w-4 h-4 rounded-full bg-white border-4 border-indigo-600 z-10"></div>
                      
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                        <div>
                          <h4 className="text-2xl md:text-3xl font-outfit font-extrabold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                            {exp.role}
                          </h4>
                          <p className="text-indigo-600 font-bold flex items-center gap-2 text-lg">
                            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                            {exp.company}
                          </p>
                        </div>
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-500">
                          <Briefcase className="w-7 h-7 text-slate-400 group-hover:text-white transition-colors" />
                        </div>
                      </div>

                      <ul className="space-y-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex gap-4 text-slate-600 leading-relaxed group/item">
                            <div className="mt-1.5 flex-shrink-0">
                               <CheckCircle2 className="w-5 h-5 text-indigo-400 group-hover/item:text-indigo-600 transition-colors" />
                            </div>
                            <span className="text-base font-medium opacity-90">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 text-center font-outfit">Expertise</h2>
          <h3 className="text-4xl font-outfit font-extrabold text-slate-900 mb-16 text-center">Technical Arsenal</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {SKILLS.map((cat, idx) => (
              <div key={idx} className={`p-10 rounded-[3rem] border transition-all duration-300 group ${
                idx === 0 ? 'bg-indigo-600 text-white border-indigo-500 md:col-span-2' : 'bg-white text-slate-900 border-slate-200 hover:shadow-2xl'
              }`}>
                <div className="flex items-center gap-5 mb-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:-rotate-6 ${idx === 0 ? 'bg-white text-indigo-600' : 'bg-indigo-50 text-indigo-600'}`}>
                    {idx === 0 ? <Code2 /> : 
                     idx === 1 ? <Database /> : 
                     <Layers />}
                  </div>
                  <h3 className="text-2xl font-bold font-outfit tracking-tight">{cat.category}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((skill, sIdx) => (
                    <span key={sIdx} className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                      idx === 0 ? 'bg-white/10 text-white hover:bg-white hover:text-indigo-600' : 'bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white'
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 font-outfit">Deliverables</h2>
            <h3 className="text-4xl md:text-5xl font-outfit font-extrabold text-slate-900 mb-12">Showcase</h3>
            
            <div className="flex gap-2 p-2 bg-slate-100 rounded-[2rem] mb-10 shadow-inner">
              {(['All', 'Project', 'Thesis'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setProjectFilter(filter)}
                  className={`px-8 py-3 rounded-[1.5rem] text-sm font-extrabold transition-all duration-500 ${
                    projectFilter === filter 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' 
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {filteredProjects.map((proj, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col h-full p-1.5 bg-slate-100 rounded-[3rem] hover:bg-indigo-600 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-[0_35px_60px_-15px_rgba(79,70,229,0.3)]"
              >
                <div className="bg-white p-10 md:p-12 rounded-[2.8rem] flex flex-col h-full shadow-sm group-hover:shadow-none transition-all duration-500">
                  <div className="mb-8 flex justify-between items-center">
                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-[0.2em] border border-indigo-100">
                      {proj.type}
                    </span>
                    <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-indigo-600 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12">
                      <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-white" />
                    </div>
                  </div>
                  
                  <h4 className="text-2xl md:text-3xl font-outfit font-extrabold text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors leading-tight">
                    {proj.title}
                  </h4>
                  
                  <div className="space-y-4 mb-8">
                    {proj.description.map((d, i) => (
                      <p key={i} className="text-slate-500 leading-relaxed font-medium">
                        {d}
                      </p>
                    ))}
                  </div>

                  {proj.outcome && (
                    <div className="mb-8 p-6 bg-slate-50 rounded-[1.5rem] border border-dashed border-slate-200 group-hover:bg-indigo-50/50 group-hover:border-indigo-200 transition-all transform group-hover:translate-x-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-indigo-600 group-hover:animate-pulse" />
                        <span className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">Key Outcome</span>
                      </div>
                      <p className="text-slate-700 font-bold leading-relaxed italic">
                        "{proj.outcome}"
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-auto pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-4 h-4 text-indigo-600" />
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Stack Overview</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {proj.technologies?.map(t => (
                        <span 
                          key={t} 
                          className="text-[12px] font-bold text-indigo-600 bg-indigo-50/50 border border-indigo-100 px-4 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 cursor-default"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Section */}
      <section id="education" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-600 rounded-full blur-[160px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <h2 className="text-indigo-400 font-bold uppercase tracking-widest mb-10 font-outfit">Education</h2>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-sm relative group hover:bg-white/10 transition-all duration-500">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-3xl font-outfit font-extrabold mb-4">{EDUCATION.institution}</h4>
              <p className="text-xl text-slate-300 font-medium mb-6 leading-relaxed">{EDUCATION.degree}</p>
              <div className="inline-flex items-center gap-3 text-indigo-400 font-black tracking-widest text-sm bg-indigo-400/10 px-6 py-2 rounded-full uppercase">
                <Calendar className="w-4 h-4" />
                {EDUCATION.period}
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
             <h2 className="text-indigo-400 font-bold uppercase tracking-widest mb-4 font-outfit">Verified Expertise</h2>
             <div className="grid gap-4">
               {CERTIFICATIONS.map((cert, i) => (
                 <div key={i} className="flex gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all group">
                   <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                     <Award className="w-7 h-7 text-indigo-400" />
                   </div>
                   <div>
                     <h5 className="font-bold text-lg mb-1">{cert.name}</h5>
                     <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{cert.provider} • {cert.year}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Final Contact CTA */}
      <footer className="pt-32 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-indigo-600 rounded-[4rem] p-12 md:p-24 flex flex-col items-center text-center text-white relative shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)] overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-10">
               <Database className="w-64 h-64 -mr-32 -mt-32 rotate-12" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-outfit font-extrabold mb-10 max-w-3xl leading-[1.1] relative z-10 text-white">
              Let's create <span className="text-indigo-200">operational excellence</span> together.
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6 mb-16 relative z-10">
              <a 
                href={`mailto:${PERSONAL_INFO.email}`} 
                className="bg-white text-indigo-600 px-12 py-6 rounded-[2rem] font-black text-xl hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-4"
              >
                <Mail className="w-6 h-6" />
                Email Me
              </a>
              <a 
                href="/cv.pdf" 
                target="_blank"
                className="bg-white/10 border border-white/20 backdrop-blur px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-white hover:text-indigo-600 transition-all flex items-center gap-4"
              >
                <Download className="w-6 h-6" />
                Download CV
              </a>
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 border border-white/20 backdrop-blur p-6 rounded-[2rem] font-black text-xl hover:bg-white hover:text-indigo-600 transition-all flex items-center gap-4"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            
            <div className="flex flex-col md:flex-row gap-10 items-center pt-16 border-t border-white/10 w-full relative z-10">
              <div className="flex items-center gap-3 font-black text-indigo-100">
                <div className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center">
                   <Phone className="w-5 h-5" />
                </div>
                {PERSONAL_INFO.phone}
              </div>
              <div className="md:ml-auto flex gap-10 items-center">
                <button 
                  onClick={scrollToTop}
                  className="text-sm font-black tracking-widest uppercase hover:text-indigo-200 transition-colors"
                >
                  Top
                </button>
                <div className="h-4 w-px bg-white/20"></div>
                <span className="text-sm font-bold opacity-40">WASI UL ISLAM TASIN • {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
