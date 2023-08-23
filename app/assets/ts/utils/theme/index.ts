import { Theme } from './typings';

export const getThemeClass = (theme: Theme): string => theme in Theme ? `theme theme--accent${theme}` : '';