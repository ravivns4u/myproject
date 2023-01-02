import type { NextPage } from 'next';
import Privacypolicy from '../components/Privacypolicy/Privacypolicy';

export async function getStaticProps() {
  return { props: { isDark: true } };
}

export default function PrivacypolicyPage() {
  return <Privacypolicy />;
}



