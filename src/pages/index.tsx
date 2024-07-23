import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
      <>
          <header className={clsx('hero tw-mt-4', styles.heroBanner)}>
              <div className="container">
                  <Heading as="h1" className="hero__title">
                      {siteConfig.title}
                  </Heading>
                  <p className="hero__subtitle">{siteConfig.tagline}</p>
                  <h2>🚧 Under Construction 🚧</h2>
                  <br/>
                  <h3>The layout and style is not final and will change in the future.</h3>
                  {/*<div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>*/}
              </div>
          </header>
      </>
  );
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`Home`}
            description="The documentation for my projects">
            <HomepageHeader/>
            <main className={"tw-w-full"}>
                <div className={"tw-mx-auto tw-w-fit tw-pt-10"}>
                    <a href="https://bisecthosting.com/Redstone?r=autowhitelist_lite" target="_blank">
                        <div>
                            <img
                                src="https://www.bisecthosting.com/partners/custom-banners/12f98343-bc4b-4629-9c91-26dfe685d92a.webp"
                                alt={"Use code Redstone for 25% on BisectHosting"}/>
                        </div>
                    </a>
                </div>
            </main>
        </Layout>
    );
}
