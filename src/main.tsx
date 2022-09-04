import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ErrorBoundary from './components/common/errorBoundries'

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
)
