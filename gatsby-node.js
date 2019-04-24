// This file has been modified from the one at https://github.com/contentful-userland/gatsby-contentful-starter/blob/master/gatsby-node.js
// gatsby-node.js contains the API that our application is using to have access to NodeJs features

const Promise = require("bluebird")
const path = require("path")

exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type)
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const categoryPage1 = path.resolve(
      "./src/templates/category-page-template-1.js"
		)
		
		const categoryPage2 = path.resolve(
      "./src/templates/category-page-template-2.js"
    )

    resolve(
			// This query must retrieve all the needed data to decide the path, component and context information for creating the page
      graphql(`
        {
          allContentfulCategory {
            edges {
              node {
								id
								node_locale
								productId
								categoryPageTemplate {
									templateId
								}
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const categories = result.data.allContentfulCategory.edges

        categories.forEach((category, index) => {
					const locale = category.node.node_locale;
					const productId = category.node.productId;
					const template = category.node.categoryPageTemplate.templateId === 1 ? categoryPage1 : categoryPage2;

          createPage({
            path: locale + "/" + productId, // the url path
            component: template, // the template
            context: {
              id: category.node.id, // this context information will be available at the template
            },
          })
        })
      })
    )
  })
}
