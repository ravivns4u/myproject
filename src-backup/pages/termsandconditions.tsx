import type { NextPage } from 'next';
import Termsandconditions from '../components/Termsandconditions/Termsandconditions';

export async function getStaticProps() {
  return { props: { isDark: true } };
}

export default function TermsandconditionsPage() {
  return <Termsandconditions />;
}



