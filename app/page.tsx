'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import { ChevronDown, Code2, Palette, Bot, Zap, Mail, Github, Linkedin, ExternalLink, Sparkles } from 'lucide-react';
import { codingAnimation, creativityAnimation } from '../lib/animations';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
        className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden"
        style={{ paddingTop: '80px' }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-500/10 rounded-full floating-element glow-hover"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500/10 rounded-full floating-element" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-cyan-400/10 rounded-full floating-element" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-40 w-8 h-8 bg-blue-400/10 rounded-full floating-element" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-60 left-1/3 w-6 h-6 bg-cyan-300/20 rounded-full floating-element" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-60 right-1/3 w-10 h-10 bg-blue-300/15 rounded-full floating-element" style={{ animationDelay: '2.5s' }}></div>
          
          {/* Sparkle effects */}
          <div className="absolute top-32 left-1/4 w-2 h-2 bg-cyan-400 rounded-full" style={{ animation: 'sparkle 2s ease-in-out infinite' }}></div>
          <div className="absolute bottom-32 right-1/4 w-1 h-1 bg-blue-400 rounded-full" style={{ animation: 'sparkle 2.5s ease-in-out infinite' }}></div>
          <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 bg-cyan-300 rounded-full" style={{ animation: 'sparkle 1.8s ease-in-out infinite' }}></div>
        </div>

        {/* Floating Code Animation */}
        <div className="absolute top-32 right-10 hidden lg:block">
          <Lottie
            animationData={codingAnimation}
            className="w-32 h-32 opacity-60"
            loop
          />
        </div>

        {/* Creativity Animation */}
        <div className="absolute bottom-32 left-10 hidden lg:block">
          <Lottie
            animationData={creativityAnimation}
            className="w-24 h-24 opacity-50"
            loop
          />
        </div>
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

          <div className="flex justify-center gap-4 mb-12">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-cyan-500 rounded-full font-semibold text-white"
            >
              Hire Me
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-slate-900 border border-cyan-400 rounded-full font-semibold text-white"
            >
              View Work
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a href="https://github.com/srizvi027" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
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

            <div className="flex flex-col items-center space-y-8">
              {/* Creative Floating Animation */}
              <div className="absolute top-10 left-10 hidden lg:block">
                <div className="w-24 h-24 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-ping"></div>
                  <div className="absolute inset-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-40 animate-pulse"></div>
                  <div className="absolute inset-4 bg-cyan-400 rounded-full opacity-60 animate-bounce"></div>
                </div>
              </div>

              {/* Profile Image */}
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 shadow-2xl shadow-cyan-500/20">
                  <Image
                    src="/shahzan.jpg"
                    alt="Shahzan Hussain"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-500/20 to-transparent"></div>
              </div>

              {/* Skills Icons */}
              <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-400/20 p-8 rounded-2xl w-full hover:border-cyan-400/40 transition-all duration-300">
                <div className="space-y-6">
                  {[
                    { icon: Code2, title: 'Full-Stack Mastery', desc: 'End-to-end development with modern frameworks' },
                    { icon: Palette, title: 'E-commerce Expert', desc: 'Custom Shopify & WordPress solutions' },
                    { icon: Bot, title: 'AI Integration', desc: 'Intelligent automation and AI-powered features' },
                    { icon: Zap, title: 'Performance Focused', desc: 'Optimized, lightning-fast applications' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group hover:transform hover:scale-105 transition-all duration-300">
                      <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                        <item.icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">{item.title}</h3>
                        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">{item.desc}</p>
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
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Showcasing innovation through code
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'AI-Powered E-commerce Platform',
                desc: 'Custom Shopify store with AI-driven product recommendations and automated customer support',
                tech: ['Shopify', 'React', 'OpenAI', 'Node.js']
              },
              {
                title: 'SaaS Dashboard Application',
                desc: 'Full-stack analytics dashboard with real-time data visualization and reporting',
                tech: ['Next.js', 'PostgreSQL', 'Chart.js', 'Tailwind']
              },
              {
                title: 'WordPress Automation Suite',
                desc: 'Custom WordPress plugin ecosystem for content automation and SEO optimization',
                tech: ['WordPress', 'PHP', 'Python', 'AI APIs']
              },
              {
                title: 'Custom CRM Solution',
                desc: 'Tailored CRM system with AI-powered insights and automation',
                tech: ['Vue.js', 'Express', 'MongoDB', 'AI/ML']
              }
            ].map((project, i) => (
              <div 
                key={i}
                className="bg-slate-900/40 backdrop-blur-sm border border-cyan-400/20 p-8 rounded-2xl hover:bg-slate-900/60 hover:border-cyan-400/40 hover:-translate-y-2 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-all">
                    <Code2 className="w-6 h-6 text-cyan-400" />
                  </div>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">{project.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-800/50 text-cyan-400 rounded-full text-xs border border-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto text-center w-full">
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

          <div className="flex flex-wrap gap-6 justify-center mb-12">
            <a
              href="mailto:shahzan@prowingz.com"
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105 inline-flex items-center gap-3"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </a>
            <a
              href="https://github.com/srizvi027"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-slate-900/60 backdrop-blur-sm border border-cyan-400/30 rounded-full font-semibold text-white hover:bg-slate-900/80 hover:border-cyan-400/50 transition-all inline-flex items-center gap-3"
            >
              <Github className="w-5 h-5" />
              View GitHub
            </a>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-400/20 p-8 rounded-2xl inline-block">
            <p className="text-gray-400 mb-4">Connect with me</p>
            <div className="flex gap-6 justify-center">
              <a href="https://github.com/srizvi027" target="_blank" rel="noopener noreferrer" className="p-4 bg-cyan-500/10 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20 transition-all">
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
        </div>
      </section>

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