import './utils/serverSide/shims';
import './window';
import './polyfills';
import './utils/pageTransitions';
import ReactDOM from 'react-dom';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TopNavigation from './components/TopNavigation';
import { importComponent } from './utils/importComponent';
import canUseDOM from './utils/serverSide/canUseDOM';
import Navigation from './components/Navigation';

const preloadComponentsForSSR = () => {
  if (canUseDOM) return;

  Object.keys(globalThis.Components).forEach(name => {
    if (!globalThis.Components[name].load) return;

    globalThis.Components[name].load();
  });
};

// Expose all components for React.NET (SSR)
globalThis.React = React;
globalThis.ReactDOM = ReactDOM;
globalThis.ReactDOMServer = ReactDOMServer;

globalThis.Components = {
  // Include in the main.js for performance
  Navigation,
  TopNavigation,
  // Lazyload only when used
  Header: importComponent('Header'),
  Tabs: importComponent('Tabs'),
  AccordionSection: importComponent('AccordionSection'),
  // AnchorSection: importComponent('AnchorSection'),
  // AnchorMenu: importComponent('AnchorMenu'),
  // ContactSection: importComponent('ContactSection'),
  ContentSection: importComponent('ContentSection'),
  // SubHomeSection: importComponent('SubHomeSection'),
  // CTASection: importComponent('CTASection'),
  SearchSection: importComponent('SearchSection'),
  // KenmerkenSection: importComponent('KenmerkenSection'),
  OverviewSection: importComponent('OverviewSection'),
  // SchoolSection: importComponent('SchoolSection'),
  BlockGridSection: importComponent('BlockGridSection'),
  // TimelineSection: importComponent('TimelineSection'),
  OctoSection: importComponent('OctoSection'),
  OctoTemplateSection: importComponent('OctoTemplateSection'),
  MediaSection: importComponent('MediaSection'),
  CallToActionButtonSection: importComponent('CallToActionButtonSection'),
  // ExpositionsSection: importComponent('ExpositionsSection'),
  CookieNotification: importComponent('CookieNotification'),
  FormSection: importComponent('FormSection'),
  CalendarSection: importComponent('CalendarSection'),
  MediaGallerySection: importComponent('MediaGallerySection'),
  EditableOverview: importComponent('EditableOverview'),
  Card: importComponent('Card')
};

preloadComponentsForSSR();
