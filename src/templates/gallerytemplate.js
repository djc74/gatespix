import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import Carousel from "@brainhubeu/react-carousel"
import "@brainhubeu/react-carousel/lib/style.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
// import ArrowLeft from "../images/arrow-left.svg"
// import ArrowRight from "../images/arrow-right.svg"

const ArrowLeft = () => (
  <svg
    width="24"
    height="40"
    viewBox="0 0 24 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.8284 33.1716C24.3905 34.7337 24.3905 37.2663 22.8284 38.8284C21.2663 40.3905 18.7337 40.3905 17.1716 38.8284L1.17157 22.8284C-0.390524 21.2663 -0.390524 18.7337 1.17157 17.1716L17.1716 1.17157C18.7337 -0.390524 21.2663 -0.390524 22.8284 1.17157C24.3905 2.73367 24.3905 5.26633 22.8284 6.82843L9.65685 20L22.8284 33.1716Z"
      fill="#FEFEFE"
    />
  </svg>
)

const EventGalleryListingItem = styled.li`
  list-style: none;
  /* max-width: 320px; */
  width: 300px;
  margin: 0 auto 2rem;
`

const EventImage = styled(Img)`
  max-height: 500px;
  min-width: 500px;
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
      <Carousel
        arrowLeft={<ArrowLeft />}
        arrowRight={<ArrowRight />}
        addArrowClickHandler
        infinite
      >
        {data.allContentfulImage.edges.map((edge, i) => (
          <div key={i}>
            <EventImage fluid={edge.node.image.fluid} alt={edge.node.caption} />
            <EventImageCaption>{edge.node.image.description}</EventImageCaption>
          </div>
        ))}
      </Carousel>
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
