import { ZoomUIToolkitApp } from '@zoom/videosdk-ui-toolkit';
import { isMobilePlatform } from '@/hooks/isMobilePlatform';
import { ColorSchemeControl } from '@/ColorSchemeControl';
import {
  appChrome,
  appPreview,
  appPreviewMobile,
  appStage,
  appSurface,
  appTitle,
  appToolbar,
  meetingToolbar,
} from '@/AppPlayground.css';
import type { ColorScheme } from '@/playgroundDefinitions';

const toolbarProps = { className: meetingToolbar };

interface AppPlaygroundProps {
  colorScheme: ColorScheme;
  onColorSchemeChange: (colorScheme: ColorScheme) => void;
}

export function AppPlayground({ colorScheme, onColorSchemeChange }: AppPlaygroundProps) {
  // On mobile, render the toolkit at full viewport height with no dev chrome
  // (title and color-scheme control are hidden). The toolkit itself is 100svh.
  if (isMobilePlatform()) {
    return (
      <section className={appPreviewMobile} data-testid='app-playground' aria-label='App preview'>
        <ZoomUIToolkitApp className={appSurface} toolbarProps={toolbarProps} />
      </section>
    );
  }

  return (
    <main className={appStage} data-testid='app-playground'>
      <header className={appChrome}>
        <h1 className={appTitle}>Video SDK UI Toolkit Official Sample</h1>

        <div className={appToolbar}>
          <ColorSchemeControl colorScheme={colorScheme} onColorSchemeChange={onColorSchemeChange} />
        </div>
      </header>

      <section className={appPreview} aria-label='App preview'>
        <ZoomUIToolkitApp className={appSurface} toolbarProps={toolbarProps} />
      </section>
    </main>
  );
}
