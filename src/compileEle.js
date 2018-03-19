// import diff from './diff'
import domObj from './domObj'
import uuid from 'node-uuid'
import generateTree from './domTree'

export function parseDomTree (tree, diffTarget) {
  if (diffTarget !== undefined && document.getElementById(diffTarget.id)) {
    const targetDom = document.getElementById(diffTarget.id)
    targetDom.firstChild.textContent = diffTarget.content
    return
  }
  Object.keys(tree).forEach((item, index) => {
    const value = tree[item]
    const ele = document.createElement(value.type)
    ele.id = item
    value.eventType && ele.addEventListener(value.eventType, value.event)
    ele.textContent = value.content
    if (value.eventHandler) {
      ele.addEventListener(value.eventType, value.eventHandler)
    }
    const ParentDom = document.getElementById(value.parent)
    ParentDom.appendChild(ele)
    if (value.child.length > 0) {
      value.child.forEach((sub, count) => {
        parseDomTree(sub)
      })
    }
  })
}

let currentState
let prevState
let states = []

export function diff (newState, click1) {
  // console.log(newTree)
  states.push(newState)

  const diffTarget = {
    id: '1',
    content: newState}
  const oldTree = generateTree(diffTarget, click1, 'click')
  // if (prevState[0].cur === prevState[1].cur) {
  //   return
  // }
  // walkTree(oldTree, target)
  // const targetObj = init[0]
  // targetObj.eventType = 'click'
  // targetObj.eventHandler = clickEvent
  // if ((JSON.stringify(newTree) === JSON.stringify(oldTree)) && document.getElementById('root').childElementCount > 0) {
  //   return
  // }
  // if (init[0]) {
  //   parseDomTree(null, init[0], clickEvent)
  //   return
  // }
  parseDomTree(oldTree, diffTarget)
}

const init = []

function walkTree (tree, target) {
  Object.keys(tree).forEach((item, index) => {
    if (item === target) {
      init.push(tree[item])
    } else {
      tree[item].child.forEach((v, k) => {
        walkTree(v, target)
      })
    }
  })
}