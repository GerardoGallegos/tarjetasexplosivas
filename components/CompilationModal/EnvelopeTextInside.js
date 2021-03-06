import React from 'react'
import styled, { keyframes } from 'styled-components'
import api from '../../client-util/api'

const Panel = styled.div`
  width: 100%;
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
`

const Input = styled.input`
  font-size: 24px;
  border: 2px solid #00529e;
  padding: .2em 0.5em;
  border-radius: 6px;
`

const Button = styled.button`
  border: 0;
  color: #FFF;
  background: #e42c00;
  font-size: 20px;
  padding: 0.6em;
  margin-top: 1em;
  border-radius: 5px;
  cursor: pointer;
`

const Text = styled.div`
  padding: .3em 0.3em;
  margin-bottom: 1em;
`

const Box = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1em auto;
`

const Image = styled.img`
  width: 80%;
  margin: 0 auto;
`

const Remaining = styled.div`
 font-size: 15px;
 padding: .3em 0;
`

class EnvelopeTextInsideComponent extends React.Component {
  state = {
    value: 'Te amo',
    remaining: 29,
    fetching: false
  }

  update = ({ target }) => {
    const text = target.value
    const remaining = 35 - text.length

    if (remaining >= 0) {
      this.setState({ value: text, remaining })
    }
  }

  onConfirm = async () => {
    if (!this.state.fetching) {
      this.setState({ fetching: true })

      const res = await api.Photo.saveTextEnvelopeDB(this.props.work._id, this.state.value)

      this.setState({ fetching: false })

      // TODO this.props.setWork(res.work)
      this.props.confirmAndCompile(res.work)
    }
  }

  render () {
    return (
      <Panel>
        <Box>
          <Image src='https://d39p6dv27gzlaf.cloudfront.net/static/img/EnvelopeInsideText.png' />
          <Text>Escoge el mensaje para el interior del sobre. Entre 6 y 35 caracteres "Ejemplo: <strong>'Te amo preciosa Charlotte'</strong>"</Text>
          <Input onChange={this.update} value={this.state.value} />
          <Remaining>{ this.state.remaining } Restantes (Solo texto NO simbolos ni iconos)</Remaining>
          <Button onClick={this.onConfirm}>Confirmar y Compilar</Button>
        </Box>
      </Panel>
    )
  }
}

export default EnvelopeTextInsideComponent
