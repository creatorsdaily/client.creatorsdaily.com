import OptionBox from './OptionBox'

export default ({ options = [], onClick }) => {
  return options.map(x => (
    <OptionBox key={x.product.id} {...x} onClick={onClick} />
  ))
}
