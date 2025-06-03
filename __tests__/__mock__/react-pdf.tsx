module.exports = {
    Document: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Page: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    View: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Text: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Image: () => <div>Image</div>,
    StyleSheet: {
      create: () => ({}),
    },
  };
  