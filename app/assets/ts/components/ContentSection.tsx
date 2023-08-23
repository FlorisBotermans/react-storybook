import React, { FC } from 'react';
import Content from '../blocks/Content';
import ContentSectionContainer from './Containers/ContentSectionContainer';
// import ReactDOMServer from 'react-dom/server';
// import Video from '../blocks/Video';

type ContentSectionViewModel = {
  id?: string;
  content: string;
};

const ContentSection: FC<ContentSectionViewModel> = ({ id, content = '' }) => {
  // const regex = /<video src=['|"](.*)['|"]><\/video>/;
  // const replacer = (match, param) => ReactDOMServer.renderToString(<Video url={param} />);
  // const contentWithVideoComponents = content.replace(regex, replacer);

  return (
    <ContentSectionContainer id={id}>
      <Content text={content} />
    </ContentSectionContainer>
  );
};

export type TContentSectionProps = ContentSectionViewModel;
export default ContentSection;
