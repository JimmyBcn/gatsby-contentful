import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from "../components/seo"
import Img from "gatsby-image"

// Documentation:
// https://www.gatsbyjs.org/tutorial/part-seven/
// https://www.youtube.com/watch?v=IaNU4R3ck_k
// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-contentful/src/templates/category.js

// This is the template layout used when building Category pages
export default class CategoryPageTemplate extends React.Component {
  render() {
    // All queries defined at PageQuery are available here as this.props.data
    const category = this.props.data.contentfulCategory;

    return (
        <Layout>
            <SEO title={category.name} />
            <h1>{category.name}</h1>
            <Img fixed={category.image.fixed}/> 
        </Layout>
    )
  }
}

// This is the GraphQL object that will contain all the queries used to retrieve the needed data for the page
// We can use the context information set at gatsby-node.js, just referencing it using the $ (e.g: $id) 
export const pageQuery = graphql`
  query($id: String!) { 
    contentfulCategory(id: { eq: $id }) {
      name
      image {
        fixed {
          src
          width
          height
          srcSet
        }
      }
    }
  }`