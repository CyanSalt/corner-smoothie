import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    dts: { build: true },
  },
  {
    entry: ['src/worklet.ts'],
    dts: { build: true },
    platform: 'browser',
    deps: {
      alwaysBundle: [/.*/],
    },
  },
])
