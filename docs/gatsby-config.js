module.exports = {
  plugins: [
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
          // order matters
          'gatsby-remark-table-of-contents',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
  ],
};
