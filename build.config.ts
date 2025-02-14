import { defineBuildConfig } from 'unbuild'
import pkg from './package.json' with { type: 'json' }

export default defineBuildConfig([
  {
    entries: ['src/index'],
    clean: true,
    declaration: true,
    failOnWarn: false,
    rollup: {
      emitCJS: true,
    },
  },
  {
    entries: ['src/worklet'],
    clean: false,
    rollup: {
      output: {
        entryFileNames: '[name].js',
      },
      inlineDependencies: true,
      esbuild: {
        minify: true,
      },
    },
    hooks: {
      'build:before': ctx => {
        ctx.options.externals = ctx.options.externals
          .filter(id => !(typeof id === 'string' && id in pkg.dependencies))
      },
    },
  },
])
