import '../styles/globals.css'
import React  from 'react'
import { createWrapper } from 'next-redux-wrapper'
import { initStore } from "../store/rootStore"
import App from 'next/app'

const wrapper = createWrapper(initStore)

export default  wrapper.withRedux(class MyApp extends App{

  static async getInitialProps({Component, ctx}: any) {
      return {
        pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx): {})
      }
  }

  render(){

    const { Component, pageProps } = this.props

  return(
     
          <Component {...pageProps} />
  )
  
}}
)

