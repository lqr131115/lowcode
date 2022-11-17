import { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ReloadOutlined,
  HomeOutlined,
  RollbackOutlined
} from '@ant-design/icons';

import styles from './style.module.scss';
import AreaList from './component/AreaList';
import { useAppSelector, useAppDispatch } from '../../store'
import { changeSchema } from '../../store/reducer/homeManagement'
import { parseJsonByString } from '../../../common/utils'
import * as C from '../../../common/constant'
import type { ItemType } from 'antd/lib/menu/hooks/useItems';



const { Header, Sider, Content } = Layout;

const HomeManagement = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { schema } = useAppSelector((state) => (state.homeManagement))
  const dispatch = useAppDispatch()
  const handleSaveBtnClick = () => {
    window.localStorage[C.SCHEMA] = JSON.stringify(schema)
  }

  const handleResetBtnClick = () => {
    const schema = parseJsonByString(window.localStorage[C.SCHEMA], {})
    dispatch(changeSchema(schema))
  }

  const handleMenuItemClick = ({ key }: any) => {
    switch (key) {
      case '/':
        window.location.href = key
        break;
      default:
        break;
    }
  }

  const items: ItemType[] = [
    { label: '首页', key: 'home', icon: <HomeOutlined /> },
    { label: '返回', key: '/', icon: <RollbackOutlined /> }
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={handleMenuItemClick} items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {
            collapsed
              ? <MenuUnfoldOutlined className={styles.trigger} onClick={() => setCollapsed(!collapsed)} />
              : <MenuFoldOutlined className={styles.trigger} onClick={() => setCollapsed(!collapsed)} />
          }
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 1060,
          }}
        >
          <AreaList />
          <div className={styles.buttons}>
            <Button type="primary" style={{ "marginRight": 20 }} onClick={handleSaveBtnClick} className={styles.save}>保存区块配置</Button>
            <Button type="primary"
              icon={<ReloadOutlined />}
              onClick={handleResetBtnClick} className={styles.save}>重置区块配置</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomeManagement;