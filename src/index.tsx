import React from 'react'
import { render } from 'react-dom'
import Button from './components/Button'

const App = () => {
  return (
    <>
      <Button>123</Button>
    </>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

render(<App/>, root)

/**
 * button
 * form
 * input
 * textare
 * checkbox
 * radio
 * select
 * timepicker
 */
