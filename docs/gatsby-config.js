module.exports = {
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve(
            './src/components/layouts/base-page-layout.js',
          ),
        },
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          // Order matters
          'gatsby-remark-table-of-contents',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
  ],
};
