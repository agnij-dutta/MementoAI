'use client'

import { useState, useEffect } from "react"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { 
  GitBranch, 
  Star, 
  Eye, 
  Calendar, 
  LogOut, 
  RefreshCw,
  Search,
  Filter,
  Code,
  Database,
  Clock,
  Users
} from "lucide-react"

interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  stargazers_count: number
  watchers_count: number
  language: string | null
  updated_at: string
  html_url: string
  private: boolean
  fork: boolean
  default_branch: string
  topics: string[]
}

interface DashboardClientProps {
  session: Session
}

export default function DashboardClient({ session }: DashboardClientProps) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [languageFilter, setLanguageFilter] = useState("all")
  const [sortBy, setSortBy] = useState("updated")

  const fetchRepositories = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/github/repositories")
      if (response.ok) {
        const repos = await response.json()
        setRepositories(repos)
      } else {
        console.error("Failed to fetch repositories")
      }
    } catch (error) {
      console.error("Error fetching repositories:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  const filteredAndSortedRepos = repositories
    .filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      const matchesLanguage = languageFilter === "all" || repo.language === languageFilter
      return matchesSearch && matchesLanguage
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count
        case "name":
          return a.name.localeCompare(b.name)
        case "updated":
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      }
    })

  const uniqueLanguages = Array.from(new Set(repositories.map(repo => repo.language).filter(Boolean)))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-500",
      Python: "bg-green-500",
      Java: "bg-red-500",
      Go: "bg-cyan-500",
      Rust: "bg-orange-500",
      "C++": "bg-purple-500",
      React: "bg-blue-400",
      Vue: "bg-green-400",
      HTML: "bg-orange-400",
      CSS: "bg-blue-300",
      PHP: "bg-indigo-500",
      Ruby: "bg-red-400",
      Swift: "bg-orange-600",
      Kotlin: "bg-purple-400",
    }
    return language ? colors[language] || "bg-gray-500" : "bg-gray-400"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your repositories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">MementoAI</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your coding memory layer</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={session.user?.image || ''}
                  alt={session.user?.name || ''}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {session.user?.name}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Languages</option>
                {uniqueLanguages.map(lang => (
                  <option key={lang} value={lang || ''}>{lang}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="updated">Recently Updated</option>
                <option value="stars">Most Stars</option>
                <option value="name">Name</option>
              </select>
              
              <button
                onClick={fetchRepositories}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Repository Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{repositories.length}</p>
                <p className="text-gray-600 dark:text-gray-400">Total Repos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{uniqueLanguages.length}</p>
                <p className="text-gray-600 dark:text-gray-400">Languages</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Total Stars</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {repositories.filter(repo => !repo.fork).length}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Original Repos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedRepos.map((repo) => (
            <div key={repo.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                </div>
                {repo.private && (
                  <span className="ml-2 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    Private
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                {repo.language && (
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)} mr-2`}></div>
                    {repo.language}
                  </div>
                )}
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  {repo.stargazers_count}
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {repo.watchers_count}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDate(repo.updated_at)}
                </div>
                
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                  <GitBranch className="h-3 w-3 mr-1" />
                  Index Repo
                </button>
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1">
                  {repo.topics.slice(0, 3).map(topic => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
                      +{repo.topics.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAndSortedRepos.length === 0 && !loading && (
          <div className="text-center py-12">
            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No repositories found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm || languageFilter !== "all" 
                ? "Try adjusting your search or filter criteria." 
                : "It looks like you don't have any repositories yet."}
            </p>
          </div>
        )}
      </main>
    </div>
  )
} 