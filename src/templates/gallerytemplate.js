import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"

const EventGalleryGrid = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
`

const EventGalleryListingItem = styled.li`
  list-style: none;
  width: 70%;
  margin: 0 auto 2rem;
`

const EventImage = styled(Img)`
  /* height: 100%; */
`

const EventImageCaption = styled.p`
  color: #fefefe;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 20px;
  margin-top: 5px;
`

const GalleryTemplate = ({ data, pageContext }) => {
  const { collection } = pageContext
  return (
    <Layout>
      <SEO title="Gallery" keywords={[`Emma Gates`, `Pictures`]} />
      <PageHeader pagetitle={collection} />
      <EventGalleryGrid>
        {data.allContentfulImage.edges.map((edge, i) => (
          <EventGalleryListingItem key={i}>
            <EventImage fluid={edge.node.image.fluid} alt={edge.node.caption} />
            <EventImageCaption>{edge.node.image.description}</EventImageCaption>
          </EventGalleryListingItem>
        ))}
      </EventGalleryGrid>
    </Layout>
  )
}

export default GalleryTemplate

export const query = graphql`
  query galleryTemplateQuery($collection: String!) {
    allContentfulImage(filter: { collection: { eq: $collection } }) {
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
          caption
        }
      }
    }
  }
`
