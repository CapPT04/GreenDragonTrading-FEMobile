/**
 * ModuleContext - Quản lý modules trong Dashboard
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Module {
  id: string;
  name: string;
  image: any;
}

interface ModuleContextType {
  modules: Module[];
  addModule: (module: Module) => void;
  removeModule: (moduleId: string) => void;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<Module[]>([]);

  const addModule = (module: Module) => {
    setModules(prev => {
      // Check if module already exists
      if (prev.find(m => m.id === module.id)) {
        return prev;
      }
      return [...prev, module];
    });
  };

  const removeModule = (moduleId: string) => {
    setModules(prev => prev.filter(m => m.id !== moduleId));
  };

  return (
    <ModuleContext.Provider value={{ modules, addModule, removeModule }}>
      {children}
    </ModuleContext.Provider>
  );
};

export const useModules = () => {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModules must be used within a ModuleProvider');
  }
  return context;
};
