import { useEffect, useRef, useState, type HTMLInputTypeAttribute } from 'react';
import { Check, LoaderCircle, LogIn } from 'lucide-react';
import { Select, useZoomUIToolkit } from '@zoom/videosdk-ui-toolkit';
import { config } from '@/config';
import { requestSessionToken } from '@/auth';
import { ColorSchemeControl } from '@/ColorSchemeControl';
import { PlaygroundModeControl } from '@/PlaygroundModeControl';
import {
  componentOption,
  componentOptions,
  componentPicker,
  fieldGrid,
  fieldLabel,
  formBody,
  joinButton,
  joinButtonIcon,
  joinButtonSpinner,
  joinError as joinErrorClass,
  optionCheckIndicator,
  optionIcon,
  optionName,
  optionText,
  pickerTitle,
  pickerDescription,
  prejoinCard,
  prejoinChrome,
  prejoinContent,
  prejoinPanel,
  prejoinStage,
  prejoinToolbar,
  prejoinTitle,
  selectTrigger,
  textInput,
} from '@/PreJoinScreen.css';
import { visuallyHidden } from '@/styles/shared.css';
import {
  sessionComponentDefinitions,
  type ColorScheme,
  type PlaygroundMode,
  type SessionComponentId,
} from '@/playgroundDefinitions';

type SessionRole = 0 | 1;

const roleOptions = [
  { value: '0', label: 'User' },
  { value: '1', label: 'Host' },
];

interface PreJoinScreenProps {
  isJoining: boolean;
  onJoiningChange: (isJoining: boolean) => void;
  colorScheme: ColorScheme;
  playgroundMode: PlaygroundMode;
  selectedComponentIds: SessionComponentId[];
  onColorSchemeChange: (colorScheme: ColorScheme) => void;
  onPlaygroundModeChange: (playgroundMode: PlaygroundMode) => void;
  onToggleComponent: (id: SessionComponentId) => void;
}

interface ConfigFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

function ConfigField({ label, value, onChange, placeholder, type = 'text' }: ConfigFieldProps) {
  return (
    <label className={fieldLabel}>
      <span>{label}</span>
      <input
        className={textInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
      />
    </label>
  );
}

function RoleField({ value, onChange }: { value: SessionRole; onChange: (value: SessionRole) => void }) {
  return (
    <div className={fieldLabel}>
      <span>Role</span>
      <Select
        options={roleOptions}
        value={String(value)}
        onChange={(nextValue) => onChange(Number(nextValue) as SessionRole)}
        ariaLabel='Role'
        triggerClassName={selectTrigger}
      />
    </div>
  );
}

export function PreJoinScreen({
  isJoining,
  onJoiningChange,
  colorScheme,
  playgroundMode,
  selectedComponentIds,
  onColorSchemeChange,
  onPlaygroundModeChange,
  onToggleComponent,
}: PreJoinScreenProps) {
  const [topic, setTopic] = useState(config.topic);
  const [userName, setUserName] = useState(config.userName);
  const [sessionPassword, setSessionPassword] = useState(config.sessionPassword);
  const [role, setRole] = useState(config.role);
  const { client } = useZoomUIToolkit();
  const [joinError, setJoinError] = useState('');
  const pendingRequest = useRef<AbortController | null>(null);
  const canJoin = Boolean(
    client && topic.trim() && userName.trim() && config.authEndpoint.trim() && config.webEndpoint.trim(),
  );

  useEffect(() => {
    onJoiningChange(false);
    setJoinError('');
    return () => {
      pendingRequest.current?.abort();
      pendingRequest.current = null;
    };
  }, [client, onJoiningChange]);

  async function joinSession() {
    if (!client || !canJoin || pendingRequest.current) return;
    const controller = new AbortController();
    pendingRequest.current = controller;
    onJoiningChange(true);
    setJoinError('');
    try {
      const token = await requestSessionToken(
        { endpoint: config.authEndpoint, sessionName: topic.trim(), role },
        controller.signal,
      );
      if (!controller.signal.aborted) {
        await client.join(topic.trim(), token, userName.trim(), sessionPassword);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setJoinError(
          error instanceof Error
            ? error.message
            : error && typeof error === 'object' && 'reason' in error
              ? String(error.reason)
              : 'Could not join the session. Please try again.',
        );
      }
    } finally {
      if (!controller.signal.aborted) onJoiningChange(false);
      if (pendingRequest.current === controller) pendingRequest.current = null;
    }
  }

  return (
    <main className={prejoinStage} data-testid='prejoin-screen'>
      <section className={prejoinPanel}>
        <header className={prejoinChrome}>
          <h1 className={prejoinTitle}>Video SDK UI Toolkit Official Sample</h1>

          <div className={prejoinToolbar}>
            <PlaygroundModeControl playgroundMode={playgroundMode} onPlaygroundModeChange={onPlaygroundModeChange} />
            <ColorSchemeControl colorScheme={colorScheme} onColorSchemeChange={onColorSchemeChange} />
          </div>
        </header>

        <section className={prejoinContent} data-mode={playgroundMode} aria-label='Join setup and session components'>
          <section className={prejoinCard} aria-label='Session setup'>
            <h2 className={pickerTitle}>Session setup</h2>
            <div className={formBody}>
              <fieldset className={fieldGrid} disabled={isJoining}>
                <ConfigField label='Session name' value={topic} onChange={setTopic} placeholder='Daily sync' />
                <ConfigField label='Display name' value={userName} onChange={setUserName} placeholder='Ada Lovelace' />
                <ConfigField
                  label='Password'
                  value={sessionPassword}
                  onChange={setSessionPassword}
                  placeholder='Optional'
                  type='password'
                />
                <RoleField value={role} onChange={setRole} />
              </fieldset>

              <button
                className={joinButton}
                type='button'
                onClick={() => void joinSession()}
                disabled={!canJoin || isJoining}
                aria-busy={isJoining}
                data-testid='join-button'
              >
                {isJoining ? (
                  <LoaderCircle className={joinButtonSpinner} size={18} aria-hidden='true' />
                ) : (
                  <LogIn className={joinButtonIcon} size={18} aria-hidden='true' />
                )}
                {isJoining ? 'Connecting...' : 'Join session'}
              </button>

              {joinError ? (
                <div className={joinErrorClass} data-testid='join-error' role='alert'>
                  {joinError}
                </div>
              ) : null}
            </div>
          </section>

          {playgroundMode === 'components' ? (
            <section className={prejoinCard} aria-label='Components for the session'>
              <div className={componentPicker}>
                <div>
                  <h2 className={pickerTitle}>Components</h2>
                  <p className={pickerDescription}>Select the UI components to include in your session.</p>
                </div>

                <div className={componentOptions}>
                  {sessionComponentDefinitions.map((definition) => {
                    const checked = selectedComponentIds.includes(definition.id);

                    return (
                      <label key={definition.id} className={componentOption} data-selected={checked ? 'true' : 'false'}>
                        <span className={optionIcon}>{definition.icon}</span>
                        <span className={optionText}>
                          <span className={optionName}>{definition.name}</span>
                        </span>
                        <input
                          className={visuallyHidden}
                          type='checkbox'
                          checked={checked}
                          onChange={() => onToggleComponent(definition.id)}
                        />
                        <span className={optionCheckIndicator} aria-hidden='true'>
                          <Check size={16} strokeWidth={3} />
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : null}
        </section>
      </section>
    </main>
  );
}
