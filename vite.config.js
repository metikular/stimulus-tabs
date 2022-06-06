import path from 'path'

export default ({ mode }) => {
  if (mode === 'netlify') return {}

  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.js'),
        name: 'stimulus-tabs'
      },
      rollupOptions: {
        external: ['stimulus-use', '@hotwired/stimulus'],
        output: {
          globals: {
            'stimulus-use': 'useTransition',
            '@hotwired/stimulus': 'Stimulus'
          }
        }
      }
    }
  }
}
