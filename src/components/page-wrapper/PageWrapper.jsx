import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Navigation from './Navigation';
import styles from './styles/pageWrapper.module.css';

const PageWrapper = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Navigation />
      </Header>
      <Content className={styles.layoutWrapper}>{children}</Content>
    </Layout>
  );
};

export default PageWrapper;
