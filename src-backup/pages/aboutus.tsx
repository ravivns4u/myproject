import type { NextPage } from 'next';
import Aboutus from '../components/Aboutus/Aboutus';

export async function getStaticProps() {
  return { props: { isDark: true } };
}


export default function AboutusPage() {
  return <Aboutus />;
}



