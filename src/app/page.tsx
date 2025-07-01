import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Github, Brain, Database, Zap, Clock, Code, Sparkles, Users, TrendingUp, ArrowRight, Star, Check } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Scene } from "@/components/ui/hero-section"
import { FeaturesSectionWithHoverEffects } from "@/components/blocks/feature-section-with-hover-effects"
import { Gauge } from "@/components/ui/gauge"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Footerdemo } from "@/components/ui/footer-section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function Home() {
  const session = await auth()

  // If user is authenticated, redirect to dashboard
  if (session?.user) {
    redirect("/dashboard")
  }

  const navItems = [
    { name: "Home", url: "/", icon: "Sparkles" },
    { name: "Features", url: "#features", icon: "Zap" },
    { name: "How it Works", url: "#how-it-works", icon: "Brain" },
    { name: "Get Started", url: "/auth/signin", icon: "Github" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/2 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Navigation */}
      <NavBar items={navItems} className="z-50" />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* 3D Background Animation - positioned with higher z-index and opacity */}
        <div className="absolute inset-0 z-0 opacity-70 dark:opacity-50">
          <Scene />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border-0">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Supercharge Your Coding Workflow
            </Badge>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-100 dark:to-blue-100 bg-clip-text text-transparent leading-tight">
            Never Build The Same
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Thing Twice
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            MementoAI remembers every integration, every pattern, every solution you've ever coded. 
            Turn your GitHub history into an intelligent coding assistant that works with any AI agent.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <div className="relative group">
              <GlowingEffect 
                disabled={false} 
                className="rounded-xl" 
                blur={20} 
                spread={40}
                proximity={100}
              />
              <Button
                asChild
                size="lg"
                className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-xl font-semibold text-lg shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300 transform group-hover:scale-105"
              >
                <Link href="/auth/signin">
                  <Github className="w-6 h-6 mr-3" />
                  Start Building Smarter
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 text-slate-500 dark:text-slate-400">
              <Check className="w-5 h-5 text-green-500" />
              <span>Free Forever</span>
              <Check className="w-5 h-5 text-green-500" />
              <span>No Credit Card</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="mb-2">
                <Gauge value={94} size={80} className="mx-auto" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Time Saved</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">94%</p>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <Gauge value={85} size={80} primary="success" className="mx-auto" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Code Reuse</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">85%</p>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <Gauge value={98} size={80} primary="info" className="mx-auto" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Satisfaction</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">98%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              The Problem Every Developer Knows
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              You've solved these problems before. Why are you Googling them again?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-red-50 dark:bg-red-950/20 p-8 rounded-2xl border border-red-100 dark:border-red-900/30">
              <Clock className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-3">
                Wasted Hours
              </h3>
              <p className="text-red-700 dark:text-red-300">
                Spending hours recreating database connections, auth flows, and API integrations you've built countless times before.
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/20 p-8 rounded-2xl border border-orange-100 dark:border-orange-900/30">
              <Code className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">
                Context Switching
              </h3>
              <p className="text-orange-700 dark:text-orange-300">
                Jumping between old projects, documentation, and Stack Overflow to remember how you solved similar problems.
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-8 rounded-2xl border border-yellow-100 dark:border-yellow-900/30">
              <TrendingUp className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                Inconsistent Quality
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                AI agents give generic solutions because they don't know your proven patterns and preferred implementations.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full">
              <span className="text-slate-700 dark:text-slate-300 font-medium mr-3">
                What if your code could remember for you?
              </span>
              <ArrowRight className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Your Personal Coding Memory
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              MementoAI analyzes your GitHub repositories and creates an intelligent knowledge base of your coding patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="text-center lg:text-left">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                <Github className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Connect Your Repos
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Link your GitHub account and let MementoAI scan your repositories. We analyze code patterns, dependencies, and implementation strategies.
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <Check className="w-4 h-4 text-green-500" />
                <span>Private repo support</span>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                AI Analysis
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Our AI understands your coding style, preferred frameworks, database patterns, and architecture decisions across all your projects.
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <Check className="w-4 h-4 text-green-500" />
                <span>Deep pattern recognition</span>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Smart Prompts
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Generate perfect context for Cursor, Windsurf, or any AI agent. Get solutions based on your proven implementations, not generic examples.
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <Check className="w-4 h-4 text-green-500" />
                <span>MCP protocol ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Built for Modern Developers
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to build faster, smarter, and more consistently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
            <div className="flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 lg:border-l dark:border-neutral-800 lg:border-b dark:border-neutral-800">
              <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
              <div className="mb-4 relative z-10 px-10 text-purple-600 dark:text-purple-400">
                <Database className="w-8 h-8" />
              </div>
              <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-purple-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                  Repository Intelligence
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                Deep analysis of your codebase patterns, dependencies, and architectural decisions across all projects.
              </p>
            </div>

            <div className="flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 lg:border-b dark:border-neutral-800">
              <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
              <div className="mb-4 relative z-10 px-10 text-blue-600 dark:text-blue-400">
                <Brain className="w-8 h-8" />
              </div>
              <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                  Context Generation
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                Generate intelligent summaries and context for database connections, auth flows, and API integrations.
              </p>
            </div>

            <div className="flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 lg:border-b dark:border-neutral-800">
              <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
              <div className="mb-4 relative z-10 px-10 text-green-600 dark:text-green-400">
                <Zap className="w-8 h-8" />
              </div>
              <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-green-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                  AI Agent Ready
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                Perfect integration with Cursor, Windsurf, and other AI coding agents via MCP protocol.
              </p>
            </div>

            <div className="flex flex-col py-10 relative group/feature dark:border-neutral-800">
              <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
              <div className="mb-4 relative z-10 px-10 text-indigo-600 dark:text-indigo-400">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-indigo-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                  Team Collaboration
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                Share knowledge across your team and build on each other's proven solutions and patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to Code Smarter?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
            Join thousands of developers who've already transformed their workflow with MementoAI.
          </p>
          
          <div className="relative group inline-block">
            <GlowingEffect 
              disabled={false} 
              className="rounded-2xl" 
              blur={30} 
              spread={50}
              proximity={150}
            />
            <Button
              asChild
              size="lg"
              className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-12 py-8 rounded-2xl font-bold text-xl shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-300 transform group-hover:scale-105"
            >
              <Link href="/auth/signin">
                <Github className="w-8 h-8 mr-4" />
                Start Your Free Journey
                <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
            No credit card required • Set up in under 2 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footerdemo />
    </div>
  )
}
