import type { NextPage } from 'next';
import Home from '../components/Home/Home';

// export async function getStaticProps() {
//   return { props: { isDark: false } };
// }


export default function IndexPage(props:any) {
  return <Home />;
}
