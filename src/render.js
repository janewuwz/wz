import {realRender} from './compileEle'
import * as _ from 'lodash'
import diff from './diff'

// export function

export function render (component, Node) {
  let node = Node
  let resu
  if (typeof Node === 'function') {
    node = new Node()
    node.ComponentWillMount()
    resu = node.render()
    realRender(window.tree)
    node.ComponentDidMount()
  } else {
    // update
    node.ComponentWillUpdate()
    window.prevTree = _.cloneDeep(window.tree)
    window.tree = {}
    window.temp = []
    resu = node.render()
    diff(window.tree, window.prevTree)
    node.ComponentDidUpdate()
    node.ComponentWillUnMount()
  }
  if (resu && typeof resu === 'Node') {
    component.appendChild(resu)
  }
  // component.appendChild(resu)
}
