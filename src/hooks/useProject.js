import { useContext } from 'react';
import { ProjectContext } from '@contexts/ProjectContext';

export function useProject() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProject must be used with an ProjectProvider');
  }

  return context;
}
