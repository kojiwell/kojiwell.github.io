import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Heading from '@theme/Heading';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const {colorMode} = useColorMode();
  const isDarkMode = colorMode === 'dark';
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary"
            to="/docs/notes">
            Notes
          </Link>
            &nbsp;
          <Link
            className="button button--secondary"
            to="/blog">
            Blog
          </Link>
          &nbsp;
        </div>
        <div className={styles.intro}>
          <p>
          Hi, I'm Koji Tanaka (@kojiwell). I use open source software to live a peaceful life, and I love the culture around it. I guess I also want to be part of it. I build high-performance computing systems, sometimes breaking them down and rebuilding them from scratch. I also help users get the most out of those systems.
          When I'm not working or sleeping, you'll probably find me with my family or friends, reading, running, or freediving. And when I'm not doing any of those, I'm usually here, writing bits and pieces. This is where I collect the things I've learned along the way as a system guy.
          </p>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
