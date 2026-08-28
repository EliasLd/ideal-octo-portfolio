export interface Experience {
  id: string;
  job_title: string;
  company: string;
  start_date: string;
  end_date?: string;
  description: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Link {
  id: string;
  label: string;
  url: string;
  kind: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  title: string;
  image_path: string;
  impression: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_path: string;
  github_url: string;
  website_url: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  key: string;
  title: string;
  content: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Tech {
  id: string;
  name: string;
  image_path: string;
  impression: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
