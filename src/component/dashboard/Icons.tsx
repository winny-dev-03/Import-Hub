import React from 'react';

export interface IconProps {
  className?: string;
}

export const GridIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1.2" />
    <rect x="14" y="3" width="7" height="7" rx="1.2" />
    <rect x="3" y="14" width="7" height="7" rx="1.2" />
    <rect x="14" y="14" width="7" height="7" rx="1.2" />
  </svg>
);

export const BoxIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
    <path d="M21 8v10.5a1 1 0 0 1-.55.9L12.45 23a1 1 0 0 1-.9 0L3 19.4a1 1 0 0 1-.55-.9V8" />
    <path d="m3 8 9-4.5L21 8l-9 4.5L3 8Z" />
    <path d="M12 12.5V23" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
    <path d="M20.6 11.1 12.9 3.4a1.5 1.5 0 0 0-1.06-.44H4.5A1.5 1.5 0 0 0 3 4.5v7.34c0 .4.16.78.44 1.06l7.7 7.7a1.5 1.5 0 0 0 2.12 0l7.34-7.34a1.5 1.5 0 0 0 0-2.16Z" />
    <circle cx="8.5" cy="8.5" r="1.5" />
  </svg>
);

export const MessageIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>
);

export const BagIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
    <path d="M6 7h12l1.2 13.2a1 1 0 0 1-1 1.1H5.8a1 1 0 0 1-1-1.1L6 7Z" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 13a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V19a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 17.09a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 13a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 6.98a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 2.66c.13 0 .26.02.38.06A1.65 1.65 0 0 0 10.4 1.2 1.65 1.65 0 0 0 10 3v.09c.02.6.36 1.13.87 1.42.5.29 1.12.29 1.63 0 .51-.29.85-.82.87-1.42V3a2 2 0 0 1 4 0v.09c.02.6.36 1.13.87 1.42" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
  </svg>
);

export const InboxIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const ConstructionIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
    <rect x="3" y="9" width="18" height="10" rx="1.2" />
    <path d="M7 9V6a5 5 0 0 1 10 0v3" />
    <line x1="9" y1="13" x2="9" y2="15" />
    <line x1="15" y1="13" x2="15" y2="15" />
  </svg>
);