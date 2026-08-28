import type {
  Section,
  Experience,
  Project,
  Link,
  Media,
  Tech,
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.eliasld.com';

export const getMediaUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error [${response.status}]: ${response.statusText}`);
  }
  return response.json();
}

export const api = {
  getSections: () => fetchAPI<Section[]>('/api/v1/public/sections'),
  getExperiences: () => fetchAPI<Experience[]>('/api/v1/public/experiences'),
  getProjects: () => fetchAPI<Project[]>('/api/v1/public/projects'),
  getLinks: () => fetchAPI<Link[]>('/api/v1/public/links'),
  getMedia: () => fetchAPI<Media[]>('/api/v1/public/media'),
  getTech: () => fetchAPI<Tech[]>('/api/v1/public/tech'),
};
