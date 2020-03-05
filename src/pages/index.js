import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const GalleryGrid = styled.section`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-auto-rows: 300px;
  grid-auto-flow: dense;
`

const GalleryListingItem = styled.div`
  background: #fefefe;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
  list-style: none;
  transition: 1s all;
  grid-column: ${props => props.gridColumn || "span 1"};
  grid-row: ${props => props.gridRow || "span 1"};
  :hover {
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.4);
    transform: scale(1.01);
  }
`

const GalleryGridLink = styled(Link)`
  color: #333333;
  text-decoration: none;
`

const GalleryImage = styled(Img)`
  object-fit: cover;
  height: 100%;
`

const GalleryList = ({ node }) => {
  const aspectRatio = node.image.fluid.aspectRatio
  console.log(aspectRatio)
  let aspectColumns
  let aspectRows
  if (aspectRatio < 0.7) {
    aspectRows = "span 2"
    console.log("tall")
  } else if (aspectRatio > 2) {
    aspectColumns = "span 2"
    console.log("extrawide")
  }
  return (
    <GalleryListingItem gridColumn={aspectColumns} gridRow={aspectRows}>
      <GalleryGridLink to={`/${node.slug}`}>
        <GalleryImage fluid={node.image.fluid} alt={node.image.caption} />
      </GalleryGridLink>
    </GalleryListingItem>
  )
}

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Gallery" keywords={[`Emma`, `Gates`]} />
      <GalleryGrid>
        {data.allContentfulImage.group.map((groupevent, i) => (
          <GalleryList node={groupevent.edges[0].node} key={i} />
        ))}
      </GalleryGrid>
    </Layout>
  )
}

export default IndexPage

export const galleryQuery = graphql`
  query GalleryQuery {
    allContentfulImage {
      group(field: collection) {
        edges {
          node {
            image {
              description
              fluid {
                ...GatsbyContentfulFluid_withWebp
              }
            }
            slug
            collection
          }
        }
      }
    }
  }
`
