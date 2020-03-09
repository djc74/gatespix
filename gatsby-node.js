const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allContentfulImage {
        edges {
          node {
            slug
            collection
          }
        }
      }
    }
  `).then(result => {
    result.data.allContentfulImage.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve("src/templates/gallerytemplate.js"),
        context: {
          slug: node.slug,
          collection: node.collection,
        },
      })
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@brainhubeu\/react-carousel/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
