import type { NextPage } from 'next';
import Resources from '../components/Resources/Resources';

export async function getStaticProps() {
  return { props: { isDark: true } };
}

export default function ResourcesPage() {
  return <Resources />;
}



