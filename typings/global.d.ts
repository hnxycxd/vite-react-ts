type StringMap = Record<string, string>;

declare module 'assets/*';

interface IRouteItem {
  key: string;
  name: string;
  path?: string;
  exact?: boolean;
  component?: ReturnType<typeof lazy>;
  children?: IRouteItem[];
}
