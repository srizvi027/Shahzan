'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Code2, Palette, Bot, Zap, Mail, Github, Linkedin, ExternalLink, Sparkles, X, Calendar, Users, TrendingUp, ShoppingCart, BarChart3, Settings } from 'lucide-react';
import Image from 'next/image';

// Define the Project interface
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  results: string[];
  demoUrl: string;
  githubUrl: string;
  duration: string;
  client: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'E-commerce Development',
    budget: '$5,000 - $10,000',
    message: '',
    botcheck: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Enhanced project data structure
  const projects = [
    {
      id: 1,
      title: 'The Loop Kitchen',
      category: 'E-commerce',
      description: 'Sustainable meal delivery platform with zero single-use plastics and reusable container system',
      fullDescription: 'A revolutionary e-commerce platform for The Loop Kitchen, an Australian sustainable meal delivery service. This WordPress-based solution features a complete ordering system with reusable container tracking, subscription management, and eco-friendly delivery scheduling. The platform successfully reduced plastic waste while increasing customer engagement through innovative sustainability features.',
      image: '/projects/ecommerce-ai.jpg',
      technologies: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'MySQL', 'Payment Gateway'],
      features: ['Reusable Container Tracking', 'Subscription Management', 'Eco-friendly Delivery System', 'Weekly Menu Updates', 'Sustainability Calculator', 'Customer Newsletter Integration'],
      results: ['Zero single-use plastic packaging achieved', '300+ weekly meal deliveries', '95% container return rate', 'Featured as sustainability success story'],
      demoUrl: 'https://theloopkitchen.com.au/',
      githubUrl: '#',
      duration: '2 months',
      client: 'The Loop Kitchen',
      icon: ShoppingCart
    },
    {
      id: 2,
      title: 'Barnyard Records',
      category: 'Web Application',
      description: 'Music education platform connecting producers with professional artist mentors for 1-on-1 sessions',
      fullDescription: 'A comprehensive full-stack platform for Barnyard Records that connects music producers with professional artists for mentorship sessions. Built with advanced booking system, payment processing, video conferencing integration, and instructor management. The platform serves hundreds of music producers across multiple electronic music genres including dubstep, riddim, and house music.',
      image: '/projects/dashboard.jpg',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'WebRTC', 'AWS'],
      features: ['Instructor Booking System', 'Video Conference Integration', 'Payment Processing', 'Producer Testimonials', 'Multi-genre Support', 'Automated Scheduling'],
      results: ['500+ successful mentorship sessions', '100+ verified instructors onboarded', '4.9/5 average session rating', '50% month-over-month growth in bookings'],
      demoUrl: 'https://www.barnyardrecs.com/',
      githubUrl: '#',
      duration: '4 months',
      client: 'Barnyard Records LLC',
      icon: BarChart3
    },
    {
      id: 3,
      title: 'World Architect Game',
      category: 'WordPress',
      description: 'Gaming website with pre-launch campaign, giveaways, and community building features',
      fullDescription: 'A custom WordPress website for World Architect, an upcoming mythic god game. The site features an engaging pre-launch campaign with email capture, $1,000 cash prize giveaway system, early access management, and social media integration. Built to handle high traffic during viral marketing campaigns and convert visitors into early adopters.',
      image: '/projects/wordpress.jpg',
      technologies: ['WordPress', 'Custom PHP', 'JavaScript', 'MySQL', 'MailChimp API', 'Social Media APIs'],
      features: ['Giveaway Management System', 'Email Campaign Integration', 'Early Access Registration', 'Community Features', 'Game Feature Showcase', 'Mobile Responsive Design'],
      results: ['2,500+ email signups achieved', 'Viral social media engagement', 'Featured on indie game blogs', '85% conversion rate for email capture'],
      demoUrl: 'https://worldarchitectgame.com/',
      githubUrl: '#',
      duration: '2 months',
      client: 'Rose Motion Studios LLC',
      icon: Settings
    },
    {
      id: 4,
      title: 'Letter Art Custom Store',
      category: 'E-commerce',
      description: 'Custom Shopify store for personalized letter art photography with advanced customization tools',
      fullDescription: 'A sophisticated Shopify e-commerce platform for Letter Art, featuring custom letter art creation tools, personalized product configurations, and automated order processing. The store includes a unique letter art generator, subscription popup system, and streamlined checkout process. Successfully processes hundreds of custom orders monthly for this growing art business.',
      image: '/projects/crm.jpg',
      technologies: ['Shopify', 'Liquid', 'JavaScript', 'CSS3', 'Shopify APIs', 'Payment Processing'],
      features: ['Custom Letter Art Generator', 'Personalization Tools', 'Subscription Popup System', 'Product Configuration', 'Order Automation', 'Customer Gallery'],
      results: ['300+ monthly custom orders processed', '45% increase in average order value', '20% email conversion rate from popup', 'Featured as Shopify success story'],
      demoUrl: 'https://letterart.com/',
      githubUrl: '#',
      duration: '3 months',
      client: 'Letter Art LLC',
      icon: Users
    }
  ];

  const projectCategories = ['all', 'E-commerce', 'Web Application', 'WordPress'];
  
  const filteredProjects = projectFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === projectFilter);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '3d9e1db1-58d6-4afd-bf1e-7e9d17615413',
          subject: 'New Portfolio Contact Message',
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          project_type: formData.projectType,
          budget_range: formData.budget,
          message: formData.message,
          botcheck: formData.botcheck
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully.' });
        setFormData({
          name: '',
          email: '',
          projectType: 'E-commerce Development',
          budget: '$5,000 - $10,000',
          message: '',
          botcheck: ''
        });
      } else {
        setSubmitStatus({ type: 'error', message: result.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Unable to send the message right now. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-cyan-500/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold font-display"
            >
              <span className="text-white">SH</span>
              <span className="text-cyan-400">.</span>
            </button>
            
            <div className="hidden md:flex gap-8">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm uppercase tracking-wider transition-colors ${
                    activeSection === item.toLowerCase()
                      ? 'text-cyan-400 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center bg-black text-white"
        style={{ paddingTop: '80px' }}
      >
        <div className="text-center px-6 max-w-5xl mx-auto">
          {/* Simple visible content */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-cyan-400">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-sm text-white">Available for Projects</span>
            </div>
          </div>

          <h1 className="mb-8">
            <div className="font-display text-6xl font-black mb-4 text-white">
              SYED SHAHZAN
            </div>
            <div className="font-display text-6xl font-black text-cyan-400">
              HUSSAIN
            </div>
          </h1>

          <div className="mb-12">
            <p className="font-display text-3xl text-cyan-400 mb-6">
              SOFTWARE ENGINEER
            </p>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Architecting the future with Full-Stack Development, AI Innovation, and E-commerce Excellence
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105"
            >
              Hire Me
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-slate-900/60 backdrop-blur-sm border border-cyan-400/30 rounded-full font-semibold text-white hover:bg-slate-900/80 hover:border-cyan-400/50 transition-all"
            >
              View Work
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a href="https://github.com/srizvi027/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/syed-shahzan-hussain-rizvi/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:shahzan@prowingz.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cyan-400 animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
                <span className="text-cyan-400">About</span> <span className="text-white">Me</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mb-8" />
              
              <div className="text-gray-300 space-y-6 text-lg leading-relaxed">
                <p>
                  I&apos;m a passionate Software Engineer at <span className="text-cyan-400 font-semibold">Prowingz</span>, 
                  specializing in building high-performance web applications that drive business growth.
                </p>
                <p>
                  With expertise spanning full-stack development, custom e-commerce solutions, and cutting-edge 
                  AI integrations, I transform complex requirements into elegant, scalable software solutions.
                </p>
                <p>
                  My approach combines technical precision with creative problem-solving, ensuring every project 
                  exceeds expectations.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 backdrop-blur-sm border border-cyan-400/30 p-6 rounded-xl hover:border-cyan-400/50 transition-all">
                  <div className="font-display text-3xl font-bold text-cyan-400">50+</div>
                  <div className="text-sm text-gray-400 mt-2">Projects Completed</div>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-sm border border-cyan-400/30 p-6 rounded-xl hover:border-cyan-400/50 transition-all">
                  <div className="font-display text-3xl font-bold text-cyan-400">4+</div>
                  <div className="text-sm text-gray-400 mt-2">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="space-y-8 flex flex-col items-center md:items-stretch">
              <div className="flex justify-center w-full">
                <div className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-full border-4 border-cyan-400 bg-slate-900 shadow-[0_0_35px_rgba(34,211,238,0.25)]">
                  <Image
                    src="/shahzan.jpg"
                    alt="Syed Shahzan Hussain"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="w-full bg-slate-900/40 backdrop-blur-sm border border-cyan-400/20 p-8 rounded-2xl">
                <div className="space-y-6">
                  {[
                    { icon: Code2, title: 'Full-Stack Mastery', desc: 'End-to-end development with modern frameworks' },
                    { icon: Palette, title: 'E-commerce Expert', desc: 'Custom Shopify & WordPress solutions' },
                    { icon: Bot, title: 'AI Integration', desc: 'Intelligent automation and AI-powered features' },
                    { icon: Zap, title: 'Performance Focused', desc: 'Optimized, lightning-fast applications' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="p-3 bg-cyan-500/20 rounded-lg">
                        <item.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-gradient-to-b from-black via-slate-950 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Tech</span> <span className="text-cyan-400">Stack</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Leveraging cutting-edge technologies to build robust, scalable solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Frontend', skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'] },
              { title: 'Backend', skills: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB'] },
              { title: 'E-commerce', skills: ['Shopify', 'WordPress', 'WooCommerce', 'Custom Themes', 'APIs'] },
              { title: 'AI & Automation', skills: ['OpenAI', 'Machine Learning', 'Automation', 'LangChain'] }
            ].map((category, i) => (
              <div key={i} className="bg-slate-900/40 backdrop-blur-sm border border-cyan-400/20 p-8 rounded-2xl hover:border-cyan-400/40 transition-all">
                <h3 className="font-display text-2xl font-bold text-white mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-400/20 hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-all cursor-default"
                    >
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
      <section id="projects" className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Featured</span> <span className="text-cyan-400">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Showcasing innovation through code - Real projects with measurable results
            </p>
            
            {/* Project Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setProjectFilter(category)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    projectFilter === category
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800 hover:text-white border border-gray-700'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => {
              const IconComponent = project.icon;
              return (
                <div 
                  key={project.id}
                  className="bg-slate-900/40 backdrop-blur-sm border border-cyan-400/20 rounded-2xl overflow-hidden hover:bg-slate-900/60 hover:border-cyan-400/40 hover:-translate-y-2 transition-all group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-cyan-400" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs border border-cyan-400/30">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                    </div>

                    <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>

                    {/* Key Results Preview */}
                    <div className="mb-6">
                      <p className="text-sm text-cyan-400 mb-2 font-semibold">Key Results:</p>
                      <p className="text-gray-300 text-sm">{project.results[0]}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-800/50 text-cyan-400 rounded-full text-xs border border-gray-700">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-gray-800/50 text-gray-400 rounded-full text-xs border border-gray-700">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                      <span className="text-cyan-400 font-semibold">View Details →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-400/20 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="font-display text-3xl font-bold text-white mb-4">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-gray-400 mb-6">
                Let's discuss how I can help bring your vision to life with cutting-edge technology and proven results.
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-gradient-to-b from-black via-slate-950 to-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Professional</span> <span className="text-cyan-400">Journey</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto" />
          </div>

          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-400/20 p-10 rounded-2xl">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/30">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                  <h3 className="font-display text-3xl font-bold text-white">Software Engineer</h3>
                  <span className="text-cyan-400 text-sm">2021 - Present</span>
                </div>
                
                <p className="font-display text-xl text-cyan-400 mb-6">Prowingz</p>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Leading full-stack development initiatives for diverse client projects, specializing in 
                  e-commerce solutions, custom web applications, and AI-powered automation systems.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: 'Full-Stack Development', desc: 'Building scalable applications' },
                    { title: 'E-commerce Solutions', desc: 'Custom Shopify & WordPress' },
                    { title: 'AI Integration', desc: 'Intelligent automation' },
                    { title: 'Team Leadership', desc: 'Mentoring developers' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2" />
                      <div>
                        <p className="text-white font-semibold mb-1">{item.title}</p>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black via-slate-950 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Client</span> <span className="text-cyan-400">Testimonials</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              What clients say about working with me
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                position: 'CEO, Fashion Forward Inc.',
                company: 'E-commerce',
                testimonial: 'Shahzan transformed our online store with his AI-powered recommendations. Our conversion rates increased by 35% and customer satisfaction went through the roof. His technical expertise and business acumen are unmatched.',
                rating: 5,
                project: 'AI E-commerce Platform'
              },
              {
                name: 'Michael Chen',
                position: 'CTO, TechCorp Analytics',
                company: 'SaaS',
                testimonial: 'The dashboard application Shahzan built handles our 10,000+ daily users flawlessly. The real-time analytics and beautiful visualizations have become essential to our business operations.',
                rating: 5,
                project: 'SaaS Dashboard'
              },
              {
                name: 'Emma Rodriguez',
                position: 'Marketing Director',
                company: 'Digital Agency',
                testimonial: 'The WordPress automation suite saved us 70% of our content creation time. Shahzan\'s solution is not just technically sound but incredibly user-friendly. Our team adopted it instantly.',
                rating: 5,
                project: 'WordPress Automation'
              },
              {
                name: 'David Park',
                position: 'Sales Manager, SalesForce Pro',
                company: 'CRM',
                testimonial: 'Our custom CRM increased sales productivity by 45%. Shahzan understood our workflow perfectly and delivered a solution that our entire team loves using daily.',
                rating: 5,
                project: 'Custom CRM'
              },
              {
                name: 'Lisa Thompson',
                position: 'Founder, StartupXYZ',
                company: 'Startup',
                testimonial: 'Shahzan delivered our MVP in just 6 weeks. His full-stack expertise and attention to detail helped us secure our Series A funding. He\'s now our go-to developer.',
                rating: 5,
                project: 'MVP Development'
              },
              {
                name: 'Alex Kumar',
                position: 'IT Director, GlobalCorp',
                company: 'Enterprise',
                testimonial: 'Working with Shahzan was seamless. He handled complex requirements with ease and delivered ahead of schedule. The system runs perfectly and has improved our efficiency dramatically.',
                rating: 5,
                project: 'Enterprise Solution'
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-900/40 backdrop-blur-sm border border-cyan-400/20 p-8 rounded-2xl hover:border-cyan-400/40 transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Sparkles key={starIndex} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.testimonial}"
                </blockquote>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.position}</p>
                      <p className="text-cyan-400 text-sm">{testimonial.project}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs border border-cyan-400/30">
                        {testimonial.company}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projects Completed', icon: Code2 },
              { number: '99%', label: 'Client Satisfaction', icon: Sparkles },
              { number: '24/7', label: 'Support Available', icon: Bot },
              { number: '5★', label: 'Average Rating', icon: TrendingUp }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="font-display text-4xl font-bold text-white mb-2">{stat.number}</div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Let&apos;s Build</span>{' '}
              <span className="text-cyan-400" style={{ textShadow: '0 0 60px rgba(6, 182, 212, 0.6), 0 0 30px rgba(6, 182, 212, 0.4)' }}>
                Together
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8" />
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Ready to transform your vision into reality? Whether it&apos;s a cutting-edge web application, 
              a custom e-commerce solution, or an AI-powered platform, let&apos;s create something extraordinary.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-400/20 p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-bold text-white mb-6">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="checkbox"
                  name="botcheck"
                  checked={formData.botcheck === 'true'}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, botcheck: e.target.checked ? 'true' : '' }))
                  }
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name*</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email*</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all"
                      placeholder="shahzan@prowingz.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all"
                  >
                    <option>E-commerce Development</option>
                    <option>Web Application</option>
                    <option>WordPress Development</option>
                    <option>AI/ML Integration</option>
                    <option>Custom CRM/ERP</option>
                    <option>Mobile App</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all"
                  >
                    <option>$5,000 - $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>$25,000 - $50,000</option>
                    <option>$50,000+</option>
                    <option>Let's discuss</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Details*</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all resize-none"
                    placeholder="Tell me about your project requirements, goals, and timeline..."
                  ></textarea>
                </div>

                {submitStatus && (
                  <div
                    className={`rounded-lg border px-4 py-3 text-sm ${
                      submitStatus.type === 'success'
                        ? 'border-green-500/40 bg-green-500/10 text-green-300'
                        : 'border-red-500/40 bg-red-500/10 text-red-300'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-[1.02] inline-flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Mail className="w-5 h-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info & Quick Actions */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-400/20 p-8 rounded-2xl">
                <h3 className="font-display text-2xl font-bold text-white mb-6">Quick Contact</h3>
                
                <div className="space-y-4">
                  <a
                    href="mailto:shahzan@prowingz.com"
                    className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-all group"
                  >
                    <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-all">
                      <Mail className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email Me</p>
                      <p className="text-gray-400 text-sm">shahzan@prowingz.com</p>
                    </div>
                  </a>
                  
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-all group"
                  >
                    <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all">
                      <Bot className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">WhatsApp</p>
                      <p className="text-gray-400 text-sm">Quick response guaranteed</p>
                    </div>
                  </a>
                  
                  <a
                    href="#"
                    className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-all group"
                  >
                    <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all">
                      <Calendar className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Schedule Call</p>
                      <p className="text-gray-400 text-sm">Book a free consultation</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-400/20 p-8 rounded-2xl">
                <h3 className="font-display text-xl font-bold text-white mb-4">Connect with me</h3>
                <div className="flex gap-4">
                  <a href="https://github.com/srizvi027/" target="_blank" rel="noopener noreferrer" className="p-4 bg-cyan-500/10 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20 transition-all">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/syed-shahzan-hussain-rizvi/" target="_blank" rel="noopener noreferrer" className="p-4 bg-cyan-500/10 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20 transition-all">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="mailto:shahzan@prowingz.com" className="p-4 bg-cyan-500/10 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20 transition-all">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-400/20 p-6 rounded-2xl text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm mb-3">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Available for new projects
                </div>
                <p className="text-gray-300 text-sm">
                  Typical response time: <span className="text-cyan-400 font-semibold">Within 24 hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-400/30 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b border-cyan-400/20 p-6 flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold text-white">{selectedProject.title}</h2>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Project Image */}
                <div className="space-y-6">
                  <div className="relative h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                    <selectedProject.icon className="w-20 h-20 text-cyan-400" />
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Duration</p>
                      <p className="text-white font-semibold">{selectedProject.duration}</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Client</p>
                      <p className="text-white font-semibold">{selectedProject.client}</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg col-span-2">
                      <p className="text-gray-400 text-sm mb-1">Category</p>
                      <p className="text-cyan-400 font-semibold">{selectedProject.category}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all inline-flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-slate-800/50 border border-cyan-400/30 rounded-lg font-semibold text-white hover:bg-slate-800/70 transition-all inline-flex items-center justify-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-4">Project Overview</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.fullDescription}</p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string) => (
                        <span key={tech} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-400/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold text-white mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedProject.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="font-semibold text-white mb-3">Results & Impact</h4>
                    <div className="space-y-3">
                      {selectedProject.results.map((result: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-400/20 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-cyan-400/20 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Syed Shahzan Hussain. Crafted with precision.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/923318059058"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
        >
          <div className="relative">
            <Image
              src="/whatsapp.png"
              alt="WhatsApp"
              width={32}
              height={32}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          </div>
        </a>
        
        {/* Floating notification */}
        <div className="absolute -top-12 right-0 bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 border border-cyan-400/30">
          <div className="absolute bottom-[-6px] right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900"></div>
          Quick response guaranteed!
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gridMove {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 50px 50px;
          }
        }
      `}</style>
    </div>
  );
}