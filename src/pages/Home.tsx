import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { api, getMediaUrl } from '../services/api';
import { formatDateRange } from '../utils/date';
import { DynamicSection } from '../components/DynamicSection';
import type { Section, Experience, Project, Tech, Media, Link } from '../types/api';

export function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [techs, setTechs] = useState<Tech[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    Promise.all([
      api.getSections(),
      api.getExperiences(),
      api.getProjects(),
      api.getTech(),
      api.getMedia(),
      api.getLinks(),
    ])
      .then(([secData, expData, projData, techData, mediaData, linkData]) => {
        setSections(secData);
        setExperiences(expData);
        setProjects(projData);
        setTechs(techData);
        setMedia(mediaData);
        setLinks(linkData);
      })
      .catch((error) => console.error("Failed to fetch portfolio data:", error));
  }, []);

  return (
    <main style={{ animation: 'fadeIn 1s ease-in' }}>

      <DynamicSection
        id="introduction"
        items={sections}
        showTilde={false}
        renderItem={(section) => (
          <div key={section.id} style={{ marginBottom: '3rem' }}>
            <h2>{section.title}</h2>
            <div className="markdown-content">
              <ReactMarkdown>{section.content}</ReactMarkdown>
            </div>
          </div>
        )}
      />

      <DynamicSection
        id="experiences"
        title="My work experiences"
        items={experiences}
        renderItem={(exp) => (
          <div key={exp.id} style={{ marginBottom: '2rem' }}>
            <h3>{exp.job_title} @ {exp.company}</h3>
            <span style={{
              opacity: '0.7',
              fontSize: '0.9em',
              display: 'block',
              marginBottom: '1rem'
            }}>
              {formatDateRange(exp.start_date, exp.end_date)}
            </span>
            <div className="markdown-content">
              <ReactMarkdown>{exp.description}</ReactMarkdown>
            </div>
          </div>
        )}
      />

      <DynamicSection
        id="projects"
        title="Things I'm building"
        items={projects}
        renderItem={(project) => (
          <div key={project.id} style={{ marginBottom: '2rem' }}>
            <a href={project.github_url}>
              <h3>{project.title}</h3>
            </a>
            {project.image_path && (
              <img
                src={getMediaUrl(project.image_path)}
                alt={`${project.title} preview`}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginTop: '1rem',
                  marginBottom: '1rem'
                }}
              />
            )}
            <div className="markdown-content">
              <ReactMarkdown>{project.description}</ReactMarkdown>
            </div>
          </div>
        )}
      />

      <DynamicSection
        id="tech"
        title="Tech I like"
        items={techs}
        renderItem={(tech) => (
          <div key={tech.id} style={{ marginBottom: '2rem' }}>
            <h3>{tech.name}</h3>
            {tech.image_path && (
              <img
                src={getMediaUrl(tech.image_path)}
                alt={`${tech.name} logo`}
                style={{
                  width: 'auto',
                  height: '48px',
                  objectFit: 'contain',
                  borderRadius: '4px',
                  marginTop: '0.5rem',
                  marginBottom: '1rem'
                }}
              />
            )}
            <div className="markdown-content">
              <ReactMarkdown>{tech.impression}</ReactMarkdown>
            </div>
          </div>
        )}
      />

      <DynamicSection
        id="media"
        title="What I'm reading & watching"
        items={media}
        renderItem={(item) => (
          <div key={item.id} style={{ marginBottom: '2rem' }}>
            <h3>{item.title}</h3>
            {item.image_path && (
              <img
                src={getMediaUrl(item.image_path)}
                alt={`${item.title} cover`}
                style={{
                  width: '100%',
                  maxWidth: '250px',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginTop: '0.5rem',
                  marginBottom: '1rem'
                }}
              />
            )}
            <div className="markdown-content">
              <ReactMarkdown>{item.impression}</ReactMarkdown>
            </div>
          </div>
        )}
      />

      <DynamicSection
        id="links"
        title="Where you can find/reach me :)"
        items={links}
        containerStyle={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        renderItem={(link) => (
          <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        )}
      />

      <footer style={{ marginTop: '4rem', paddingBottom: '2rem', color: 'var(--text-muted)' }}>
        <span className="vim-tilde">~</span>
        <p>© {new Date().getFullYear()} EliasLd</p>
      </footer>
    </main>
  );
}
