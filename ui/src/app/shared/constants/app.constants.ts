import { App } from '@interfaces/app.interface';

export const AppPrefix = 'QuiZZy';
export const AppConstants: App = {
  prefix: AppPrefix,
  appState: `${AppPrefix}.appState`,
  authState: `${AppPrefix}.authState`
};