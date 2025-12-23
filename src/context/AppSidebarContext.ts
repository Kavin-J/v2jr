import * as React from 'react';

const AppSidebarContext = React.createContext<{
  onPageItemClick: (id: string, hasNestedNavigation: boolean) => void;
  mini: boolean;
  fullyExpanded: boolean;
  fullyCollapsed: boolean;
  hasDrawerTransitions: boolean;
} | null>(null);

export type AppSidebarContextType = {
  onPageItemClick: (id: string, hasNestedNavigation: boolean) => void;
  mini: boolean;
  fullyExpanded: boolean;
  fullyCollapsed: boolean;
  hasDrawerTransitions: boolean;
}
export default AppSidebarContext;

