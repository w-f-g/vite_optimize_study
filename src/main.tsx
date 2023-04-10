import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@layout/App'
import '@styles/index.scss'
// IntersectionObserver Polyfills
import 'intersection-observer'

const rootNode: HTMLElement = document.getElementById('root')!

ReactDOM.createRoot(rootNode).render(
  <App />
)
