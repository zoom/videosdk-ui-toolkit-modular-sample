import { useCallback, useEffect, useRef, useState } from 'react';
import ZoomVideo from '@zoom/videosdk';
import { Toaster } from 'sonner';
import { ConnectionState, useZoomUIToolkit, ZoomUIToolkitProvider } from '@zoom/videosdk-ui-toolkit';
import type { SessionOptions, ZoomUIToolkitProviderProps } from '@zoom/videosdk-ui-toolkit';
import { Viewport } from '@/Viewport';
import { config } from '@/config';
import type { ColorScheme } from '@/playgroundDefinitions';

type ZoomClient = NonNullable<ZoomUIToolkitProviderProps['clientInstance']>;
type ZoomLocalAudioTrack = NonNullable<ZoomUIToolkitProviderProps['localAudioTrack']>;

const sessionOptions: SessionOptions = {
  audio: { noiseSuppression: true },
  // None and Blur lead the resolved list already — pass images only, or yours lose the dedupe to them.
  video: {
    virtualBackground: {
      virtualBackgroundImageList: [
        {
          id: 'Earth',
          name: 'Earth',
          url: 'https://source.zoom.us/uitoolkit/image/earth.jpg',
        },
        { id: 'San Francisco', name: 'San Francisco', url: 'https://source.zoom.us/uitoolkit/image/SanFrancisco.jpg' },
      ],
    },
  },
};

export function App() {
  const [client, setClient] = useState<ZoomClient | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<ZoomLocalAudioTrack | null>(null);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const { sessionState } = useZoomUIToolkit();
  const { connectionState } = sessionState;
  const hasConnectedRef = useRef(false);

  const initClient = useCallback(async () => {
    try {
      const zoomClient = ZoomVideo.createClient() as unknown as ZoomClient;
      await zoomClient.init('en-US', 'Global', {
        webEndpoint: config.webEndpoint,
        enforceMultipleVideos: true,
      });
      const audioTrack = ZoomVideo.createLocalAudioTrack() as unknown as ZoomLocalAudioTrack;
      setLocalAudioTrack(audioTrack);
      // Set client to the state to be used by the provider after initialization.
      setClient(zoomClient);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    void initClient();
  }, [initClient]);

  useEffect(() => {
    if (connectionState === ConnectionState.Connected) {
      hasConnectedRef.current = true;
    } else if (connectionState === ConnectionState.Closed && hasConnectedRef.current) {
      hasConnectedRef.current = false;
      void (async () => {
        // setClient(null) must come before destroyClient() so the UI immediately disables
        // client-dependent controls (e.g. JoinButton). destroyClient() is async — if it runs
        // first, the client reference stays valid long enough for a join() call to slip through.
        setClient(null);
        setLocalAudioTrack(null);
        await ZoomVideo.destroyClient();
        await initClient();
      })();
    }
  }, [connectionState, initClient]);

  return (
    <ZoomUIToolkitProvider
      clientInstance={client}
      sessionOptions={sessionOptions}
      theme={colorScheme}
      localAudioTrack={localAudioTrack ?? undefined}
    >
      <Viewport colorScheme={colorScheme} onColorSchemeChange={setColorScheme} />
      {/* The toolkit bundles its own toaster, so the playground needs one for its own toasts. */}
      <Toaster theme={colorScheme} richColors />
    </ZoomUIToolkitProvider>
  );
}
