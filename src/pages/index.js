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

const GalleryGridLink = styled(Link)`
  grid-column: ${props => props.gridColumn || "span 1"};
  grid-row: ${props => props.gridRow || "span 1"};
  color: inherit;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;

  h2 {
    position: absolute;
    background-color: #fefefe;
    padding: 20px 20px;
    margin: 0;
    mix-blend-mode: screen;
    transition: all 500ms ease-in-out;
    width: 100%;
    height: 100%;
    font-weight: 700;
    font-size: 3em;
    opacity: 0.85;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: lowercase;
    letter-spacing: -0.02em;
    line-height: 0.95em;
    :hover {
      opacity: 0;
    }
  }
`

const GalleryImage = styled(Img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
    <GalleryGridLink
      to={`/${node.slug}`}
      gridColumn={aspectColumns}
      gridRow={aspectRows}
    >
      <GalleryImage fluid={node.image.fluid} alt={node.image.caption} />
      <h2>{node.collection}</h2>
    </GalleryGridLink>
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
