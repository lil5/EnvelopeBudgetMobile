import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDefaultCurrency } from '../redux/actions'
import PropTypes from 'prop-types'
import SelectCurrency from '../components/SelectCurrency'
import Footer from '../components/Footer'
import * as NB from 'native-base'
import Expo from 'expo'

class Settings extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
      }).isRequired,
      staticContext: PropTypes.object,
    }).isRequired,
  }

  constructor (props) {
    super(props)

    this.state = {}
  }

  static propTypes = {
    // redux store
    defaultCurrency: PropTypes.string.isRequired,
    // redux actions
    updateDefaultCurrency: PropTypes.func.isRequired,
  }

  render () {
    const { history } = this.context.router
    const { defaultCurrency, updateDefaultCurrency } = this.props

    return (
      <NB.Container>
        <NB.Header>
          <NB.Body>
            <NB.Title>Settings</NB.Title>
          </NB.Body>
        </NB.Header>
        <NB.Content padder>
          <NB.Form style={{ flex: 1 }}>
            <NB.Separator bordered style={{ paddingLeft: 0 }}>
              <NB.Text>{'defaults'.toUpperCase()}</NB.Text>
            </NB.Separator>
            <SelectCurrency
              defaultValue={defaultCurrency}
              onChangeText={value => updateDefaultCurrency(value)}
            />
          </NB.Form>
        </NB.Content>

        <NB.Separator style={{ alignSelf: 'center', flex: 0, paddingLeft: 0 }}><NB.Text>
          {Expo.Constants.manifest.version}
        </NB.Text></NB.Separator>
        <Footer history={history} />
      </NB.Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    defaultCurrency: state.remember.defaultCurrency,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateDefaultCurrency: (j) => {
      dispatch(updateDefaultCurrency(j))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
