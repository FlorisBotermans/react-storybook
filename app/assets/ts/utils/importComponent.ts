import React from 'react';
import loadable, { LoadableComponent } from '@loadable/component';

export const importComponent = (name: string): LoadableComponent<React.ReactNode> => loadable(
  async () => {
    try {
      return await import(/* webpackChunkName: "component.[request]" */ `../components/${name}`);
    } catch (ex) {
      console.error(`Error while importing ${name} component`, ex);
      throw ex;
    }
  }
);