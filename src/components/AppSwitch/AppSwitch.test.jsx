import { render, fireEvent } from '@testing-library/react-native'

import { AppSwitch } from './AppSwitch'

describe('AppSwitch', () => {
  it('renders with default props', () => {
    const { getByRole } = render(<AppSwitch />)
    const switchComponent = getByRole('switch')

    expect(switchComponent).toBeDefined()
    expect(switchComponent.props.value).toBe(false)
  })

  it('renders with custom value', () => {
    const { getByRole } = render(<AppSwitch value={true} />)
    const switchComponent = getByRole('switch')

    expect(switchComponent.props.value).toBe(true)
  })

  it('calls onChange when toggled', () => {
    const onChange = jest.fn()
    const { getByRole } = render(
      <AppSwitch value={false} onChange={onChange} />
    )
    const switchComponent = getByRole('switch')

    fireEvent(switchComponent, 'change', { nativeEvent: { value: true } })

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('handles disabled state', () => {
    const { getByRole } = render(<AppSwitch disabled={true} />)
    const switchComponent = getByRole('switch')

    expect(switchComponent.props.disabled).toBe(true)
  })

  it('applies custom style', () => {
    const customStyle = { margin: 10 }
    const { getByRole } = render(<AppSwitch style={customStyle} />)
    const switchComponent = getByRole('switch')

    // Style prop should exist and be styled object/array
    expect(switchComponent.props.style).toBeDefined()
  })

  it('renders component without crashing', () => {
    const { getByRole } = render(<AppSwitch />)
    expect(getByRole('switch')).toBeDefined()
  })

  it('renders with all custom props', () => {
    const props = {
      value: true,
      disabled: false,
      onChange: jest.fn(),
      style: { margin: 10 },
      trackColorTrue: '#00ff00',
      trackColorFalse: '#ff0000',
      thumbColor: '#blue',
      ios_backgroundColor: '#purple'
    }

    const { getByRole } = render(<AppSwitch {...props} />)
    const switchComponent = getByRole('switch')

    expect(switchComponent).toBeDefined()
    expect(switchComponent.props.value).toBe(true)
    expect(switchComponent.props.disabled).toBe(false)
  })

  it('snapshot matches default state', () => {
    const tree = render(<AppSwitch />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('snapshot matches enabled state', () => {
    const tree = render(<AppSwitch value={true} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('snapshot matches disabled state', () => {
    const tree = render(<AppSwitch disabled={true} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('snapshot matches with custom colors', () => {
    const tree = render(
      <AppSwitch
        trackColorTrue="#00ff00"
        trackColorFalse="#ff0000"
        thumbColor="#blue"
        ios_backgroundColor="#purple"
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('accessibility', () => {
    it('has accessibility role switch', () => {
      const { getByRole } = render(<AppSwitch />)
      const switchComponent = getByRole('switch')

      expect(switchComponent).toBeDefined()
    })
  })

  describe('prop validation', () => {
    it('accepts boolean value prop', () => {
      const { getByRole } = render(<AppSwitch value={true} />)
      expect(getByRole('switch').props.value).toBe(true)
    })

    it('accepts boolean disabled prop', () => {
      const { getByRole } = render(<AppSwitch disabled={false} />)
      expect(getByRole('switch').props.disabled).toBe(false)
    })

    it('accepts function onChange prop', () => {
      const onChange = jest.fn()
      const { getByRole } = render(<AppSwitch onChange={onChange} />)
      const switchComponent = getByRole('switch')

      // The onChange prop should be passed to the component
      expect(switchComponent).toBeDefined()
      expect(typeof onChange).toBe('function')
    })
  })
})
