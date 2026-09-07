import {
  CodeXml,
  SquareUser,
  Mail,
  FileText,
  Link as LinkIcon
} from 'lucide-react';

export const getLinkIcon = (kind: string) => {
  const normalizedKind = kind.toLowerCase();

  switch (normalizedKind) {
    case 'github':
      return <CodeXml size={18} />;
    case 'linkedin':
      return <SquareUser size={18} />;
    case 'email':
    case 'mail':
      return <Mail size={18} />;
    case 'resume':
    case 'cv':
      return <FileText size={18} />;
    default:
      return <LinkIcon size={18} />;
  }
};
