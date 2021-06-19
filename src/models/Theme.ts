type ThemeColor = {
  name: string;
  id: string;
  value: string;
};

export type Theme = {
  id: string;
  name: string;
  base: ThemeColor[];
  panel: ThemeColor[];
  card: ThemeColor[];
};
