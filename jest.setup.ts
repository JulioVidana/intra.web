import '@testing-library/jest-dom'
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
jest.mock('@react-pdf/renderer', () => require('./__tests__/__mock__/react-pdf.tsx'));
