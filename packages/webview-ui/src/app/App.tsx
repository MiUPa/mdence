import { useCallback, useEffect, useState, useRef } from 'react';
import { Editor } from './editor';
import {
  addMessageHandler,
  requestInit,
  replaceDocumentText,
  writeAsset,
} from '../messaging';
import type { HostToUIMessage, MDenceSettings, ThemeOverrides } from '../types';

export function App() {
  const [content, setContent] = useState<string | null>(null);
  const [settings, setSettings] = useState<MDenceSettings | null>(null);
  const [assetBaseUri, setAssetBaseUri] = useState<string | undefined>(undefined);
  const [documentDirUri, setDocumentDirUri] = useState<string | undefined>(undefined);
  const [themeOverrides, setThemeOverrides] = useState<ThemeOverrides | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const pendingAssetCallback = useRef<((relPath: string) => void) | null>(null);
  // Track the last content we asked the host to persist to avoid duplicate sends.
  const lastRequestedContent = useRef<string>('');

  useEffect(() => {
    console.log('MDence App: Setting up message handler');
    const removeHandler = addMessageHandler((message: HostToUIMessage) => {
      console.log('MDence App: Handling message:', message.type);
      switch (message.type) {
        case 'DOC_INIT':
          console.log('MDence App: Received DOC_INIT with', message.text?.length, 'chars');
          lastRequestedContent.current = message.text;
          setContent(message.text);
          setSettings(message.settings);
          setAssetBaseUri(message.assetBaseUri);
          setDocumentDirUri(message.documentDirUri);
          setThemeOverrides(message.themeOverrides);
          break;

        case 'DOC_CHANGED':
          lastRequestedContent.current = message.text;
          setContent(message.text);
          break;

        case 'SETTINGS_CHANGED':
          setSettings(message.settings);
          setThemeOverrides(message.themeOverrides);
          break;

        case 'ASSET_WRITTEN':
          if (pendingAssetCallback.current) {
            pendingAssetCallback.current(message.relPath);
            pendingAssetCallback.current = null;
          }
          break;

        case 'ERROR':
          setError(message.message);
          setTimeout(() => setError(null), 5000);
          break;
      }
    });

    // Request initial content
    requestInit();

    return removeHandler;
  }, []);

  // Apply theme overrides as CSS variables
  useEffect(() => {
    if (!themeOverrides) return;

    const root = document.documentElement;
    for (const [property, value] of Object.entries(themeOverrides)) {
      root.style.setProperty(property, value);
    }
  }, [themeOverrides]);

  const handleChange = useCallback((markdown: string) => {
    if (markdown !== lastRequestedContent.current) {
      lastRequestedContent.current = markdown;
      replaceDocumentText(markdown, 'typing');
    }
  }, []);

  const handleImagePaste = useCallback(
    (dataUri: string, callback: (relPath: string) => void) => {
      pendingAssetCallback.current = callback;
      writeAsset(dataUri);
    },
    []
  );

  if (content === null) {
    return (
      <div className="loading">
        <div className="loading-spinner" />
        <span>Loading document...</span>
      </div>
    );
  }

  return (
    <div className="app">
      {error && (
        <div className="error-banner" role="alert">
          {error}
        </div>
      )}
      <Editor
        initialContent={content}
        onChange={handleChange}
        assetBaseUri={assetBaseUri}
        documentDirUri={documentDirUri}
        imagePathResolution={settings?.imagePathResolution ?? 'document'}
      />
    </div>
  );
}
