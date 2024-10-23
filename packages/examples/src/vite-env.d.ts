/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

/// <reference types="vite/client" />

declare const __WASM_SIZE__: number;

declare module '*?raw' {
    const content: string;
    export default content;
}

declare module '*?worker&url' {
    const content: string;
    export default content;
}
