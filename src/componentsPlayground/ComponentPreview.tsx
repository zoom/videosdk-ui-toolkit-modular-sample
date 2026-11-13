import type { CSSProperties } from 'react';
import {
  AudioButton,
  ChatButton,
  LeaveButton,
  MoreButton,
  ParticipantButton,
  ParticipantView,
  RecordButton,
  SessionInfoButton,
  SettingsButton,
  ShareButton,
  SharePresenterView,
  ShareViewerView,
  VideoButton,
} from '@zoom/videosdk-ui-toolkit';
import { getComponentEditorProps } from '@/componentsPlayground/editorValues';
import { getPreviewStyles } from '@/componentsPlayground/styleValues';
import type { ComponentOverrides, ComponentStyleValues } from '@/componentsPlayground/types';
import type { SessionComponentDefinition } from '@/playgroundDefinitions';

interface ComponentPreviewProps {
  definition: SessionComponentDefinition;
  styleValues: ComponentStyleValues;
  overrides: ComponentOverrides | undefined;
  isMobile: boolean;
}

export function ComponentPreview({ definition, styleValues, overrides, isMobile }: ComponentPreviewProps) {
  const styles = getPreviewStyles(definition.useResolvedStyles ? styleValues : overrides);
  const editorProps = Object.fromEntries(
    Object.entries(getComponentEditorProps(definition, overrides, true)).map(([name, prop]) => [name, prop.value]),
  );
  editorProps.style = { ...styles, ...(editorProps.style as CSSProperties | undefined) };

  switch (definition.id) {
    case 'participant-view':
      return <ParticipantView {...editorProps} />;
    case 'share-viewer-view':
      return <ShareViewerView {...editorProps} />;
    case 'share-presenter-view':
      return <SharePresenterView {...editorProps} />;
    case 'audio':
      return (
        <AudioButton
          {...editorProps}
          isMobile={isMobile}
          menuGroups={[
            {
              id: 'nested-menu',
              label: 'Nested menu',
              items: [
                {
                  id: 'audio-debug',
                  label: 'Debug',
                  items: [
                    {
                      id: 'log-audio-state',
                      label: 'Log audio state',
                    },
                  ],
                },
              ],
            },
          ]}
        />
      );
    case 'video':
      return <VideoButton {...editorProps} isMobile={isMobile} />;
    case 'participants':
      return <ParticipantButton {...editorProps} isMobile={isMobile} />;
    case 'recording':
      return <RecordButton {...editorProps} isMobile={isMobile} />;
    case 'share':
      return <ShareButton {...editorProps} />;
    case 'end-session':
      return <LeaveButton {...editorProps} isMobile={isMobile} />;
    case 'session-info':
      return <SessionInfoButton {...editorProps} isMobile={isMobile} />;
    case 'settings':
      return <SettingsButton {...editorProps} isMobile={isMobile} />;
    case 'chat':
      return <ChatButton {...editorProps} isMobile={isMobile} />;
    case 'more':
      return (
        <MoreButton
          {...editorProps}
          isMobile={isMobile}
          buttons={[
            <SettingsButton key='settings' isMobile={isMobile} />,
            <ChatButton key='chat' isMobile={isMobile} />,
          ]}
        />
      );
  }
}
