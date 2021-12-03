import {
  gql
} from "@apollo/client"

const itemFields = gql`fragment ItemFields on Book {
  id
  name
  url
}`

export {itemFields as default}