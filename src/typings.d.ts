declare global {
  interface Window {
    ng: {
      material?: {
        snackBar: {
          open: (message: string, action?: string, config?: any) => void;
        };
      };
    };
  }
}

export {}; // Isso torna o arquivo um módulo TypeScript
