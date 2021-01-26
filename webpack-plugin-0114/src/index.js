import(/* webpackChunkName: "lazy", webpackPrefetch: true */ './lazy.js').then(name => {
  console.log(name);
});

const say = (name) => {
  console.log(`===> ${name}`)
}

say('hello, world !!!')

export default say