import React from 'react'


import {SectionsContainer, Section} from './components'

export default class H5Report extends React.Component {

  render(){
    return(
      <SectionsContainer>
        <Section>
          <h1>paga1</h1>
        </Section>
        <Section>
          <h1>paga2</h1>
        </Section>
      </SectionsContainer>
    )
  }
}