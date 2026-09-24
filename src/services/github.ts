export interface GitHubRepoStats {
  stars: number;
  forks: number;
}

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const cache = new Map<
  string,
  { data: GitHubRepoStats; expiresAt: number }
>();

const pendingRequests = new Map<
  string,
  Promise<GitHubRepoStats>
>();

// Formats github URL to "owner/repo".
function getRepoPath(githubUrl: string): string | null {
  try {
    const url = new URL(githubUrl);

    if (
      url.hostname !== 'github.com' &&
      url.hostname !== 'www.github.com'
    ) {
      return null;
    }

    const parts = url.pathname.split('/').filter(Boolean);

    if (parts.length !== 2) {
      return null;
    }

    const [owner, repoName] = parts;
    const repo = repoName.replace(/\.git$/i, '');

    if (!owner || !repo) {
      return null;
    }

    return `${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  } catch {
    return null;
  }
}

export async function getGitHubStats(
  githubUrl: string
): Promise<GitHubRepoStats | null> {
  const repoPath = getRepoPath(githubUrl);

  if (!repoPath) {
    return null;
  }

  const cached = cache.get(repoPath);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  // Prevents too many simultaneous requests
  const pending = pendingRequests.get(repoPath);

  if (pending) {
    return pending;
  }

  const request = fetch(
    `https://api.github.com/repos/${repoPath}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    }
  )
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(
          `GitHub API error: ${response.status}`
        );
      }

      const repo = await response.json();

      if (
        typeof repo.stargazers_count !== 'number' ||
        typeof repo.forks_count !== 'number'
      ) {
        throw new Error('Invalid GitHub API response');
      }

      const stats: GitHubRepoStats = {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      };

      cache.set(repoPath, {
        data: stats,
        expiresAt: Date.now() + CACHE_DURATION,
      });

      return stats;
    })
    .finally(() => {
      pendingRequests.delete(repoPath);
    });

  pendingRequests.set(repoPath, request);

  return request;
}
