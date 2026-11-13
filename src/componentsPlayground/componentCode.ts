import { getSessionComponentDefinition, type SessionComponentId, type ViewportPreset } from '@/playgroundDefinitions';
import { formatStyleValue, getPreviewStyles } from '@/componentsPlayground/styleValues';
import { getComponentEditorProps } from '@/componentsPlayground/editorValues';
import type { ComponentOverrides, CopyableSessionComponentId } from '@/componentsPlayground/types';

interface ComponentCopyConfig {
  importName: string;
  exportName: string;
  styleVariableName: string;
  includeMobileProp?: boolean;
  extraImports?: readonly string[];
  getExtraProps?: (viewportPreset: ViewportPreset) => string[];
}

const componentCopyConfigById: Record<CopyableSessionComponentId, ComponentCopyConfig> = {
  'participant-view': {
    importName: 'ParticipantView',
    exportName: 'CustomParticipantView',
    styleVariableName: 'participantViewStyles',
  },
  'share-viewer-view': {
    importName: 'ShareViewerView',
    exportName: 'CustomShareViewerView',
    styleVariableName: 'shareViewStyles',
  },
  'share-presenter-view': {
    importName: 'SharePresenterView',
    exportName: 'CustomSharePresenterView',
    styleVariableName: 'sharePresenterViewStyles',
  },
  audio: {
    importName: 'AudioButton',
    exportName: 'CustomAudioButton',
    styleVariableName: 'audioButtonStyles',
    includeMobileProp: true,
  },
  video: {
    importName: 'VideoButton',
    exportName: 'CustomVideoButton',
    styleVariableName: 'videoButtonStyles',
    includeMobileProp: true,
  },
  recording: {
    importName: 'RecordButton',
    exportName: 'CustomRecordButton',
    styleVariableName: 'recordButtonStyles',
    includeMobileProp: true,
  },
  participants: {
    importName: 'ParticipantButton',
    exportName: 'CustomParticipantButton',
    styleVariableName: 'participantButtonStyles',
    includeMobileProp: true,
  },
  share: {
    importName: 'ShareButton',
    exportName: 'CustomShareButton',
    styleVariableName: 'shareButtonStyles',
  },
  chat: {
    importName: 'ChatButton',
    exportName: 'CustomChatButton',
    styleVariableName: 'chatButtonStyles',
    includeMobileProp: true,
  },
  more: {
    importName: 'MoreButton',
    exportName: 'CustomMoreButton',
    styleVariableName: 'moreButtonStyles',
    includeMobileProp: true,
    extraImports: ['SettingsButton', 'ChatButton'],
    getExtraProps: (viewportPreset) => {
      const mobileProp = viewportPreset === 'mobile' ? ' isMobile' : '';
      return [`buttons={[<SettingsButton key='settings'${mobileProp} />, <ChatButton key='chat'${mobileProp} />]}`];
    },
  },
  'end-session': {
    importName: 'LeaveButton',
    exportName: 'CustomEndSessionButton',
    styleVariableName: 'endSessionButtonStyles',
    includeMobileProp: true,
  },
};

export function isCopyableSessionComponentId(id: SessionComponentId): id is CopyableSessionComponentId {
  return id in componentCopyConfigById;
}

function getStyleDeclaration(config: ComponentCopyConfig, styles: Record<string, string | number>) {
  const styleEntries = Object.entries(styles);

  if (styleEntries.length === 0) {
    return null;
  }

  return [
    `const ${config.styleVariableName}: CSSProperties = {`,
    ...styleEntries.map(([property, value]) => `  ${property}: ${formatStyleValue(value)},`),
    '};',
  ].join('\n');
}

function getSimpleComponentMarkup(config: ComponentCopyConfig, props: string[]) {
  if (props.length === 0) {
    return `  return <${config.importName} />;`;
  }

  return `  return <${config.importName} ${props.join(' ')} />;`;
}

export function getComponentCode(
  id: CopyableSessionComponentId,
  overrides: ComponentOverrides | undefined,
  viewportPreset: ViewportPreset,
) {
  const config = componentCopyConfigById[id];
  const definition = getSessionComponentDefinition(id);
  const editorProps = getComponentEditorProps(definition, overrides);
  const styleDeclaration = getStyleDeclaration(config, {
    ...getPreviewStyles(overrides),
    ...(editorProps.style?.value as Record<string, string | number> | undefined),
  } as Record<string, string | number>);
  delete editorProps.style;
  const declarations: string[] = [];
  const typeImports = new Set<string>();
  const props: string[] = [];
  const imports: string[] = [];

  if (styleDeclaration) {
    imports.push("import type { CSSProperties } from 'react';");
    props.push(`style={${config.styleVariableName}}`);
  }

  const importNames = [config.importName, ...(config.extraImports ?? [])].join(', ');
  imports.push(`import { ${importNames} } from '@zoom/videosdk-ui-toolkit';`);

  if (config.includeMobileProp && viewportPreset === 'mobile') {
    props.push('isMobile');
  }

  for (const [name, { value, codeValue, typeName }] of Object.entries(editorProps)) {
    if (typeName) {
      typeImports.add(typeName);
      declarations.push(`const ${name}: ${typeName} = ${JSON.stringify(value, null, 2)};`);
      props.push(`${name}={${name}}`);
    } else if (codeValue !== undefined) {
      props.push(`${name}={${codeValue}}`);
    } else if (value === true) {
      props.push(name);
    } else if (typeof value === 'string') {
      // Use an expression when JSX attribute quoting would change the value.
      props.push(/[&'"<>\n\r]/.test(value) ? `${name}={${JSON.stringify(value)}}` : `${name}='${value}'`);
    } else {
      props.push(`${name}={${JSON.stringify(value)}}`);
    }
  }

  if (typeImports.delete('CSSProperties') && !styleDeclaration) {
    imports.unshift("import type { CSSProperties } from 'react';");
  }
  if (typeImports.size > 0) {
    imports.push(`import type { ${[...typeImports].join(', ')} } from '@zoom/videosdk-ui-toolkit';`);
  }
  props.push(...(definition.fixedCodeProps ?? []), ...(config.getExtraProps?.(viewportPreset) ?? []));

  const markup = getSimpleComponentMarkup(config, props);
  const sections = [
    imports.join('\n'),
    styleDeclaration,
    ...declarations,
    [`export function ${config.exportName}() {`, markup, '}'].join('\n'),
  ].filter(Boolean);

  return `${sections.join('\n\n')}\n`;
}
