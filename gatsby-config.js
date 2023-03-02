module.exports = {
  trailingSlash: 'never',
  siteMetadata: {
    title: 'Marc Nuri Tech Talks',
    siteUrl: 'https://presentations.marcnuri.com',
    description: 'Presentations for Tech Talks'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: {
          includePaths: [
            require('path').resolve(__dirname, 'node_modules')
          ]
        }
      }
    }
  ]
};
