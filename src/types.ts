// This file will hold the raw text content of the files for the interactive web workbench
// so the user can browse them with syntax highlighting, search, copy to clipboard,
// simulate terminal execution, and download each file or all files as a package.

export interface ToolkitFile {
  id: string;
  name: string;
  extension: 'bat' | 'txt';
  category: 'Script' | 'Test' | 'Documentation' | 'Report';
  description: string;
  size: string;
  content: string;
}
