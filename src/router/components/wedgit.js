import asyncComponent from '../../asyncComponent'
const Home = asyncComponent(() => import('../../views/wedgit/home'))

export default {
  Home
}
