import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from "../components/seo"
import Img from "gatsby-image"

export default class CategoryPageTemplate extends React.Component {
  render() {
    const category = this.props.data.contentfulCategory;

    return (
        <Layout>
            <SEO title={category.name} />
            <Img fixed={category.image.fixed}/> 
            <h1>{category.name}</h1>
        </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($slug: String!) { 
    contentfulCategory(slug: { eq: $slug }) {
      name
      slug
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