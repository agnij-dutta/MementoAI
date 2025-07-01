import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { Octokit } from "@octokit/rest"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: "Unauthorized - No access token" },
        { status: 401 }
      )
    }

    // Initialize Octokit with the user's access token
    const octokit = new Octokit({
      auth: session.accessToken,
    })

    // Fetch user's repositories with pagination
    const repositories = await octokit.paginate(octokit.rest.repos.listForAuthenticatedUser, {
      visibility: 'all',
      affiliation: 'owner,collaborator',
      sort: 'updated',
      per_page: 100,
    })

    // Transform and filter the repository data to include only needed fields
    const transformedRepos = repositories.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      language: repo.language,
      updated_at: repo.updated_at,
      html_url: repo.html_url,
      private: repo.private,
      fork: repo.fork,
      default_branch: repo.default_branch,
      topics: repo.topics || [],
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
      },
      clone_url: repo.clone_url,
      git_url: repo.git_url,
      ssh_url: repo.ssh_url,
      size: repo.size,
      open_issues_count: repo.open_issues_count,
      created_at: repo.created_at,
    }))

    return NextResponse.json(transformedRepos)
  } catch (error) {
    console.error("Error fetching repositories:", error)
    
    if (error instanceof Error) {
      // Handle specific GitHub API errors
      if (error.message.includes('401')) {
        return NextResponse.json(
          { error: "Unauthorized - Invalid or expired token" },
          { status: 401 }
        )
      }
      if (error.message.includes('403')) {
        return NextResponse.json(
          { error: "Forbidden - API rate limit exceeded or insufficient permissions" },
          { status: 403 }
        )
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    )
  }
} 