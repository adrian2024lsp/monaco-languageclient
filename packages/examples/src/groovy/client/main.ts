/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
// this is required syntax highlighting
import '@codingame/monaco-vscode-groovy-default-extension';
import { MonacoEditorLanguageClientWrapper, WrapperConfig } from 'monaco-editor-wrapper';
import { groovyConfig } from '../config.js';

const code = `package test.org;
import java.io.File;
File file = new File("E:/Example.txt");
`;

const userConfig: WrapperConfig = {
    serviceConfig: {
        userServices: {
            ...getKeybindingsServiceOverride(),
        },
        debugLogging: true
    },
    editorAppConfig: {
        $type: 'extended',
        codeResources: {
            main: {
                text: code,
                fileExt: 'groovy'
            }
        },
        useDiffEditor: false,
        userConfiguration: {
            json: JSON.stringify({
                'workbench.colorTheme': 'Default Dark Modern',
                'editor.guides.bracketPairsHorizontal': 'active',
                'editor.wordBasedSuggestions': 'off'
            })
        }
    },
    languageClientConfigs: {
        groovy: {
            languageId: 'groovy',
            connection: {
                options: {
                    $type: 'WebSocketUrl',
                    url: `ws://localhost:${groovyConfig.port}${groovyConfig.path}`
                }
            }
        }
    }
};

export const runGroovyClient = () => {
    const wrapper = new MonacoEditorLanguageClientWrapper();
    const htmlElement = document.getElementById('monaco-editor-root');

    try {
        document.querySelector('#button-start')?.addEventListener('click', async () => {
            await wrapper.initAndStart(userConfig, htmlElement);
        });
        document.querySelector('#button-dispose')?.addEventListener('click', async () => {
            await wrapper.dispose();
        });
    } catch (e) {
        console.error(e);
    }
};
