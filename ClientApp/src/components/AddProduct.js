import React from "react"
import { addCartItem } from "../actions/actionCreator.js"
import { connect } from "react-redux"

const AddProduct = ({ ProductId }) => (
  <button
    onClick={addCartItem(ProductId)}
  >
    
  </button>
)


export default connect(AddProduct)