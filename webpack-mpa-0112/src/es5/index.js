import hello from './hello.js'
// import(/* webpackChunkName: 'async-index' */ '../assets/style/index.css')
import style from '../assets/style/index.css'
import(/* webpackChunkName: 'async-world' */ './world.js').then(val => {
  console.log('===> val', val)
})

console.log(`${hello} a`)

const element = `
  <div class="${style.blue}">
    <p>CSS Modules</p>
  </div>
  <div class="${style.yellow}">
    <p>CSS Modules</p>
  </div>
`
document.getElementById('app').innerHTML = element

const iconele = `
  <div class="${style.icon}">
    <div class="${style.icon1}"></div>
    <div class="${style.icon2}"></div>
    <div class="${style.icon3}"></div>
    <div class="${style.icon4}"></div>
    <div class="${style.icon5}"></div>
    <div class="${style.icon6}"></div>
    <div class="${style.icon7}"></div>
    <div class="${style.icon8}"></div>
  </div>
`
document.getElementById('icon').innerHTML = iconele

console.log(`${hello} b`)
// console.log(`${hello} bb`, bb)

console.log(`${hello} c`)
console.log(`${hello} cc`)
