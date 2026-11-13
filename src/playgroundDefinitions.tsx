import {
  CircleDot,
  CircleX,
  Grid2X2,
  Info,
  MessageSquare,
  Mic,
  Monitor,
  MonitorUp,
  MoreHorizontal,
  ScreenShare,
  Settings,
  Users,
  Video,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { messageBubble, selfBubble } from '@/componentsPlayground/chatBubbleDefaults.css';
import type { ComponentEditorGroup, ComponentOverrides } from '@/componentsPlayground/types';

export type ColorScheme = 'light' | 'dark';
export type ViewportPreset = 'desktop' | 'mobile';
export type PlaygroundMode = 'components' | 'app';
type ComponentGridSpan = 1 | 2 | 4;

export type SessionComponentId =
  | 'participant-view'
  | 'audio'
  | 'video'
  | 'participants'
  | 'chat'
  | 'share-viewer-view'
  | 'share'
  | 'share-presenter-view'
  | 'more'
  | 'recording'
  | 'session-info'
  | 'end-session'
  | 'settings';

export interface SessionComponentDefinition {
  id: SessionComponentId;
  name: string;
  icon: ReactNode;
  gridSpan: ComponentGridSpan;
  defaultStyles: Record<ColorScheme, SessionComponentDefaultStyles>;
  editorGroups: readonly ComponentEditorGroup[];
  useResolvedStyles?: boolean;
  editorDefaults?: ComponentOverrides;
  fixedCodeProps?: readonly string[];
}

interface SessionComponentDefaultStyles {
  width: number;
  height: number;
  backgroundColor: string;
  color: string;
}

const sharedEditorGroups = [
  {
    fields: [
      { key: 'width', label: 'Width', control: 'number', min: 1 },
      { key: 'height', label: 'Height', control: 'number', min: 1 },
    ],
  },
  {
    fields: [
      { key: 'backgroundColor', label: 'Background color', control: 'color' },
      { key: 'color', label: 'Text color', control: 'color' },
    ],
  },
] as const satisfies readonly ComponentEditorGroup[];

const tileViewEditorDefaults = {
  pageSize: 4,
  tileAspectRatio: '16:9',
  paginationDirection: 'horizontal',
  hidePagination: false,
  isMultiShareRender: false,
} satisfies ComponentOverrides;

const tileViewEditorGroups = [
  ...sharedEditorGroups,
  {
    fields: [
      { key: 'pageSize', label: 'Page size', control: 'number', min: 1, prop: 'pageSize' },
      {
        key: 'tileAspectRatio',
        label: 'Tile ratio',
        control: 'toggle',
        prop: 'tileAspectRatio',
        options: [
          { value: '16:9', label: '16:9', ariaLabel: 'Use 16:9 tile ratio', propValue: 16 / 9, codeValue: '16 / 9' },
          { value: '4:3', label: '4:3', ariaLabel: 'Use 4:3 tile ratio', propValue: 4 / 3, codeValue: '4 / 3' },
          { value: '1:1', label: '1:1', ariaLabel: 'Use 1:1 tile ratio', propValue: 1 },
        ],
      },
    ],
  },
  {
    fields: [
      {
        key: 'paginationDirection',
        label: 'Pagination direction',
        control: 'toggle',
        prop: 'paginationDirection',
        options: [
          { value: 'horizontal', label: 'Horizontal', ariaLabel: 'Use horizontal pagination' },
          { value: 'vertical', label: 'Vertical', ariaLabel: 'Use vertical pagination' },
        ],
      },
      { key: 'hidePagination', label: 'Hide pagination', control: 'checkbox', prop: 'hidePagination' },
    ],
  },
] as const satisfies readonly ComponentEditorGroup[];

const shareViewerEditorGroups = [
  ...tileViewEditorGroups,
  {
    fields: [
      { key: 'isMultiShareRender', label: 'Multi-share render', control: 'checkbox', prop: 'isMultiShareRender' },
    ],
  },
] as const satisfies readonly ComponentEditorGroup[];

const chatEditorGroups = [
  ...sharedEditorGroups,
  ...(['incoming', 'outgoing'] as const).map(
    (direction): ComponentEditorGroup => ({
      title: direction === 'incoming' ? 'Incoming message bubble' : 'Outgoing message bubble',
      styleTarget: {
        prop: 'messageBubbleStyles',
        path: direction,
        typeName: 'ChatMessageBubbleStyles',
        defaultClassName: direction === 'incoming' ? messageBubble : `${messageBubble} ${selfBubble}`,
      },
      fields: [
        {
          key: `${direction}BubbleBackground`,
          label: 'Background',
          control: 'color',
          styleProperty: 'backgroundColor',
        },
        { key: `${direction}BubbleColor`, label: 'Text color', control: 'color', styleProperty: 'color' },
        {
          key: `${direction}BubbleRadius`,
          label: 'Corner radius',
          control: 'number',
          min: 0,
          step: 'any',
          styleProperty: 'borderRadius',
        },
      ],
    }),
  ),
] satisfies readonly ComponentEditorGroup[];

export const sessionComponentDefinitions: SessionComponentDefinition[] = [
  {
    id: 'participant-view',
    useResolvedStyles: true,
    name: 'Participant View',
    icon: <Grid2X2 size={18} />,
    gridSpan: 4,
    defaultStyles: {
      light: { width: 430, height: 250, backgroundColor: '#0a0a0a', color: '#ffffff' },
      dark: { width: 430, height: 250, backgroundColor: '#0a0a0a', color: '#ffffff' },
    },
    editorGroups: tileViewEditorGroups,
    editorDefaults: tileViewEditorDefaults,
  },
  {
    id: 'share-viewer-view',
    useResolvedStyles: true,
    name: 'Share Viewer View',
    icon: <Monitor size={18} />,
    gridSpan: 2,
    defaultStyles: {
      light: { width: 430, height: 250, backgroundColor: '#0a0a0a', color: '#ffffff' },
      dark: { width: 430, height: 250, backgroundColor: '#0a0a0a', color: '#ffffff' },
    },
    editorGroups: shareViewerEditorGroups,
    editorDefaults: tileViewEditorDefaults,
  },
  {
    id: 'share-presenter-view',
    useResolvedStyles: true,
    name: 'Share Presenter View',
    icon: <ScreenShare size={18} />,
    gridSpan: 2,
    defaultStyles: {
      light: { width: 430, height: 250, backgroundColor: '#0a0a0a', color: '#ffffff' },
      dark: { width: 430, height: 250, backgroundColor: '#0a0a0a', color: '#ffffff' },
    },
    editorGroups: sharedEditorGroups,
  },
  {
    id: 'audio',
    name: 'Audio',
    icon: <Mic size={18} />,
    gridSpan: 1,
    defaultStyles: {
      light: { width: 69, height: 50, backgroundColor: '#ffffff', color: '#dc315a' },
      dark: { width: 69, height: 50, backgroundColor: '#1f232c', color: '#fb7185' },
    },
    editorGroups: sharedEditorGroups,
  },
  {
    id: 'video',
    name: 'Video',
    icon: <Video size={18} />,
    gridSpan: 1,
    defaultStyles: {
      light: { width: 149, height: 52, backgroundColor: '#ffffff', color: '#151922' },
      dark: { width: 149, height: 52, backgroundColor: '#1f232c', color: '#f8fafc' },
    },
    editorGroups: sharedEditorGroups,
  },
  {
    id: 'share',
    name: 'Share',
    icon: <MonitorUp size={18} />,
    gridSpan: 1,
    defaultStyles: {
      light: { width: 44, height: 40, backgroundColor: '#ffffff', color: '#151922' },
      dark: { width: 44, height: 40, backgroundColor: '#1f232c', color: '#f8fafc' },
    },
    editorGroups: sharedEditorGroups,
  },
  {
    id: 'participants',
    name: 'Participants',
    icon: <Users size={18} />,
    gridSpan: 1,
    defaultStyles: {
      light: { width: 186, height: 52, backgroundColor: '#ffffff', color: '#151922' },
      dark: { width: 186, height: 52, backgroundColor: '#1f232c', color: '#f8fafc' },
    },
    editorGroups: sharedEditorGroups,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: <Settings size={18} />,
    gridSpan: 1,
    defaultStyles: {
      light: { width: 540, height: 460, backgroundColor: '#ffffff', color: '#151922' },
      dark: { width: 540, height: 460, backgroundColor: '#1f232c', color: '#f8fafc' },
    },
    editorGroups: sharedEditorGroups,
  },
  {
    id: 'recording',
    name: 'Recording',
    icon: <CircleDot size={18} />,
    gridSpan: 1,
    defaultStyles: {
      light: { width: 69, height: 52, backgroundColor: '#ffffff', color: '#151922' },
      dark: { width: 69, height: 52, backgroundColor: '#1f232c', color: '#f8fafc' },
    },
    editorGroups: sharedEditorGroups,
  },
  {
    id: 'session-info',
    name: 'Session Info',
    icon: <Info size={18} />,
    gridSpan: 1,
    defaultStyles: {
      light: { width: 360, height: 52, backgroundColor: '#ffffff', color: '#151922' },
      dark: { width: 360, height: 52, backgroundColor: '#1f232c', color: '#f8fafc' },
    },
    editorGroups: sharedEditorGroups,
  },
  {
    id: 'chat',
    name: 'Chat',
    icon: <MessageSquare size={18} />,
    gridSpan: 1,
    defaultStyles: {
      light: { width: 144, height: 92, backgroundColor: '#f7f8fb', color: '#151922' },
      dark: { width: 144, height: 92, backgroundColor: '#1f232c', color: '#f8fafc' },
    },
    editorGroups: chatEditorGroups,
  },
  {
    id: 'more',
    name: 'More',
    icon: <MoreHorizontal size={18} />,
    gridSpan: 1,
    defaultStyles: {
      light: { width: 136, height: 92, backgroundColor: '#f7f8fb', color: '#151922' },
      dark: { width: 136, height: 92, backgroundColor: '#1f232c', color: '#f8fafc' },
    },
    editorGroups: sharedEditorGroups,
  },
  {
    id: 'end-session',
    name: 'Leave/End',
    icon: <CircleX size={18} />,
    gridSpan: 1,
    defaultStyles: {
      light: { width: 113, height: 52, backgroundColor: 'rgba(255, 107, 107, 0.14)', color: '#dc315a' },
      dark: { width: 113, height: 52, backgroundColor: 'rgba(255, 107, 107, 0.14)', color: '#fb7185' },
    },
    editorGroups: sharedEditorGroups,
  },
];

export const defaultSelectedComponentIds = sessionComponentDefinitions.map((definition) => definition.id);

export function getSessionComponentDefinition(id: SessionComponentId) {
  const definition = sessionComponentDefinitions.find((item) => item.id === id);

  if (!definition) {
    throw new Error(`Unknown session component: ${id}`);
  }

  return definition;
}
