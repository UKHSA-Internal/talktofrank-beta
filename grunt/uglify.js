module.exports = {
  options: {
    mangle: true,
    output: {
      comments: false
    }
  },
  client: {
    files: [{
      expand: true,
      cwd: 'dist/static/ui/js',
      src: ['**/*.js', '!**/*.min.js'],
      dest: 'dist/static/ui/js'
    }]
  }
}
