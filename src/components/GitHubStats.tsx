import { useEffect, useState } from 'react';
import { Star, GitFork } from 'lucide-react';

import {
  getGitHubStats,
  type GitHubRepoStats,
} from '../services/github';

interface GitHubStatsProps {
  githubUrl: string;
}

const numberFormatter = new Intl.NumberFormat('fr-FR');

export function GitHubStats({
  githubUrl,
}: GitHubStatsProps) {
  const [stats, setStats] = useState<GitHubRepoStats | null>(
    null
  );

  useEffect(() => {
    let active = true;

    setStats(null);

    getGitHubStats(githubUrl)
      .then((data) => {
        if (active) {
          setStats(data);
        }
      })
      .catch((error) => {
        if (active) {
          console.warn(
            `Failed to fetch GitHub stats for ${githubUrl}`,
            error
          );
          setStats(null);
        }
      });

    return () => {
      active = false;
    };
  }, [githubUrl]);

  // Do nothing if stats not available 
  if (!stats) {
    return null;
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '0.85rem',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        aria-label={`${stats.stars} GitHub stars`}
        title={`${stats.stars} stars`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
        }}
      >
        {numberFormatter.format(stats.stars)}
        <Star size={15} aria-hidden="true" />
      </span>

      <span
        aria-label={`${stats.forks} GitHub forks`}
        title={`${stats.forks} forks`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
        }}
      >
        {numberFormatter.format(stats.forks)}
        <GitFork size={15} aria-hidden="true" />
      </span>
    </div>
  );
}
