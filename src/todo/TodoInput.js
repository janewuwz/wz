import {Component, makeElement} from '../wz'
import './style.css'

export default class TodoInput extends Component {
  constructor() {
    super()
    console.log('todoinput')
  }
  handleKeyPress = (e) => {
    const key = e.key;
    const value = e.target.value;
    if (value.trim() === '') {
      return
    }
    if (key === 'Enter') {
      e.target.value = '';
      this.props.onTodoItemAdded(value);
    }
  }
  render () {
    /**
     * <input type="text" class="input" onKeyPress={this.handleKeyPress} />
     */
    const {count} = this.state
    return makeElement('input', {type: 'text', onkeypress: this.handleKeyPress, className: 'input', placeholder: 'What need to do?'}, '')
  }
}
