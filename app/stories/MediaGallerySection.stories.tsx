import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MediaGallerySection from '../assets/ts/components/MediaGallerySection/MediaGallerySection';
import data from '../assets/ts/data/media-gallery-section';

export default {
  title: 'Organisms/MediaGallerySection',
  component: MediaGallerySection,
  argTypes: {
    id: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof MediaGallerySection>;

const Template: ComponentStory<typeof MediaGallerySection> = (args) => <MediaGallerySection {...args} />;

export const Default = Template.bind({});
Default.args = data;