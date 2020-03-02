import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const GalleryGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-auto-rows: 500px;
  grid-gap: 20px;
  padding: 2rem 0;
  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`

const GalleryListingItem = styled.li`
  background: #fefefe;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
  list-style: none;
  transition: 1s all;
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
  height: 85%;
  object-fit: cover;
`

const GalleryCopyHolder = styled.div`
  padding: 1rem;
`

const GalleryTitle = styled.h3`
  font-size: 24px;
`

const GalleryList = ({ node }) => (
  <GalleryListingItem>
    <GalleryGridLink to={`/${node.slug}`}>
      <GalleryImage fluid={node.image.fluid} alt={node.image.caption} />
      <GalleryCopyHolder>
        <GalleryTitle>{node.collection}</GalleryTitle>
      </GalleryCopyHolder>
    </GalleryGridLink>
  </GalleryListingItem>
)

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Gallery" keywords={[`Emma`, `Gates`]} />
    <GalleryGrid>
      {data.allContentfulImage.group.map((groupevent, i) => (
        <GalleryList node={groupevent.edges[0].node} key={i} />
      ))}
    </GalleryGrid>
  </Layout>
)

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
