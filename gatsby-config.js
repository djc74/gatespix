const dotenv = require("dotenv")

if (process.env.ENVIRONMENT !== "production") {
  dotenv.config()
}

const { spaceId, accessToken } = process.env

module.exports = {
  siteMetadata: {
    title: `Emma Gates`,
    description: `Emma Gates Photography`,
    author: `Big Tent`,
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `j6l9bpgpjy0q`,
        accessToken: `iYCc22hCEYk-vbrm5NtFj0EXiOBiourSKOeCk5gnrgw`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Emma Gates`,
        short_name: `Emma Gates`,
        start_url: `/`,
        background_color: `#fefefe`,
        theme_color: `#fefefe`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`,
        include_favicon: true,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
