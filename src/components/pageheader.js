import React from "react"
import styled from "styled-components"

const PageTitle = styled.h1`
  border-bottom: 2px solid #cccccc;
  color: #fefefe;
  font-size: 9vw;
  margin: 0;
  padding-bottom: 2rem;
  @media (min-width: 600px) {
    font-size: 2.4rem;
  }
`

const PageHeader = props => <PageTitle>{props.pagetitle}</PageTitle>

export default PageHeader
