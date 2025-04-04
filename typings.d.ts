declare module 'package.json' {
  const value: {
    name: string;
    version: string;
    description: string;
    author: {
      name: string;
      email: string;
      url: string;
    };
  };
  export = value;
}
