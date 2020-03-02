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
