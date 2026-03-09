import * as vscode from 'vscode';

export type CodeTheme = 'auto' | 'dark' | 'light' | 'github-dark' | 'github-light' | 'monokai';
export type ImagePathResolution = 'document' | 'workspace';

export interface MDenceSettings {
  assetsFolder: string;
  imagePathResolution: ImagePathResolution;
  formatWrap: number;
  calloutsStyle: 'admonition' | 'emoji';
  togglesSyntax: 'details' | 'list';
  mathEnabled: boolean;
  mermaidEnabled: boolean;
  codeTheme: CodeTheme;
  headingColor: string;
  h1Color: string;
  h2Color: string;
  h3Color: string;
  h4Color: string;
  h5Color: string;
  h1Indent: string;
  h2Indent: string;
  h3Indent: string;
  h4Indent: string;
  h5Indent: string;
  boldColor: string;
  italicColor: string;
}

export type ThemeOverrides = Record<string, string>;

// Theme color presets for syntax highlighting
const THEME_PRESETS: Record<string, ThemeOverrides> = {
  dark: {
    '--mdence-token-comment': '#6a9955',
    '--mdence-token-punctuation': '#d4d4d4',
    '--mdence-token-property': '#9cdcfe',
    '--mdence-token-selector': '#ce9178',
    '--mdence-token-operator': '#d4d4d4',
    '--mdence-token-keyword': '#569cd6',
    '--mdence-token-variable': '#4ec9b0',
    '--mdence-token-function': '#dcdcaa',
  },
  light: {
    '--mdence-token-comment': '#008000',
    '--mdence-token-punctuation': '#000000',
    '--mdence-token-property': '#001080',
    '--mdence-token-selector': '#a31515',
    '--mdence-token-operator': '#000000',
    '--mdence-token-keyword': '#0000ff',
    '--mdence-token-variable': '#267f99',
    '--mdence-token-function': '#795e26',
  },
  'github-dark': {
    '--mdence-token-comment': '#8b949e',
    '--mdence-token-punctuation': '#c9d1d9',
    '--mdence-token-property': '#79c0ff',
    '--mdence-token-selector': '#a5d6ff',
    '--mdence-token-operator': '#c9d1d9',
    '--mdence-token-keyword': '#ff7b72',
    '--mdence-token-variable': '#7ee787',
    '--mdence-token-function': '#d2a8ff',
  },
  'github-light': {
    '--mdence-token-comment': '#6e7781',
    '--mdence-token-punctuation': '#24292f',
    '--mdence-token-property': '#0550ae',
    '--mdence-token-selector': '#0a3069',
    '--mdence-token-operator': '#24292f',
    '--mdence-token-keyword': '#cf222e',
    '--mdence-token-variable': '#116329',
    '--mdence-token-function': '#8250df',
  },
  monokai: {
    '--mdence-token-comment': '#88846f',
    '--mdence-token-punctuation': '#f8f8f2',
    '--mdence-token-property': '#66d9ef',
    '--mdence-token-selector': '#e6db74',
    '--mdence-token-operator': '#f92672',
    '--mdence-token-keyword': '#f92672',
    '--mdence-token-variable': '#a6e22e',
    '--mdence-token-function': '#a6e22e',
  },
};

export function getSettings(): MDenceSettings {
  const config = vscode.workspace.getConfiguration('mdence');
  return {
    assetsFolder: config.get<string>('assets.folder', 'assets'),
    imagePathResolution: config.get<ImagePathResolution>('assets.imagePathResolution', 'document'),
    formatWrap: config.get<number>('format.wrap', 0),
    calloutsStyle: config.get<'admonition' | 'emoji'>('callouts.style', 'admonition'),
    togglesSyntax: config.get<'details' | 'list'>('toggles.syntax', 'details'),
    mathEnabled: config.get<boolean>('math.enabled', false),
    mermaidEnabled: config.get<boolean>('mermaid.enabled', false),
    codeTheme: config.get<CodeTheme>('theme.codeTheme', 'auto'),
    headingColor: config.get<string>('theme.headingColor', ''),
    h1Color: config.get<string>('theme.h1Color', ''),
    h2Color: config.get<string>('theme.h2Color', ''),
    h3Color: config.get<string>('theme.h3Color', ''),
    h4Color: config.get<string>('theme.h4Color', ''),
    h5Color: config.get<string>('theme.h5Color', ''),
    h1Indent: config.get<string>('theme.h1Indent', ''),
    h2Indent: config.get<string>('theme.h2Indent', ''),
    h3Indent: config.get<string>('theme.h3Indent', ''),
    h4Indent: config.get<string>('theme.h4Indent', ''),
    h5Indent: config.get<string>('theme.h5Indent', ''),
    boldColor: config.get<string>('theme.boldColor', ''),
    italicColor: config.get<string>('theme.italicColor', ''),
  };
}

/**
 * Get the effective theme based on settings and VS Code's active color theme
 */
function getEffectiveTheme(codeTheme: CodeTheme): 'dark' | 'light' | 'github-dark' | 'github-light' | 'monokai' {
  if (codeTheme === 'auto') {
    // Detect VS Code theme type
    const colorThemeKind = vscode.window.activeColorTheme.kind;
    // ColorThemeKind: 1 = Light, 2 = Dark, 3 = HighContrast, 4 = HighContrastLight
    if (colorThemeKind === vscode.ColorThemeKind.Light || colorThemeKind === vscode.ColorThemeKind.HighContrastLight) {
      return 'light';
    }
    return 'dark';
  }
  return codeTheme;
}

/**
 * Generate theme CSS variable overrides based on settings
 */
export function getThemeOverrides(settings: MDenceSettings): ThemeOverrides {
  const effectiveTheme = getEffectiveTheme(settings.codeTheme);
  const overrides: ThemeOverrides = { ...(THEME_PRESETS[effectiveTheme] || THEME_PRESETS.dark) };

  // General heading color (kept for backwards compatibility)
  overrides['--mdence-heading-color'] = settings.headingColor || 'inherit';

  // Per-level heading colors - specific color takes precedence, then general headingColor, then inherit
  overrides['--mdence-h1-color'] = settings.h1Color || settings.headingColor || 'inherit';
  overrides['--mdence-h2-color'] = settings.h2Color || settings.headingColor || 'inherit';
  overrides['--mdence-h3-color'] = settings.h3Color || settings.headingColor || 'inherit';
  overrides['--mdence-h4-color'] = settings.h4Color || settings.headingColor || 'inherit';
  overrides['--mdence-h5-color'] = settings.h5Color || settings.headingColor || 'inherit';

  // Per-level heading indentation - use '0' as default to reset when cleared
  overrides['--mdence-h1-indent'] = settings.h1Indent || '0';
  overrides['--mdence-h2-indent'] = settings.h2Indent || '0';
  overrides['--mdence-h3-indent'] = settings.h3Indent || '0';
  overrides['--mdence-h4-indent'] = settings.h4Indent || '0';
  overrides['--mdence-h5-indent'] = settings.h5Indent || '0';

  // Other typography colors
  overrides['--mdence-bold-color'] = settings.boldColor || 'inherit';
  overrides['--mdence-italic-color'] = settings.italicColor || 'inherit';

  return overrides;
}
