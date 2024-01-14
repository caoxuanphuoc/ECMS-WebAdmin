import './index.less';

import * as React from 'react';

import { Avatar, Col, Layout, Menu } from 'antd';
import { L, isGranted } from '../../lib/abpUtility';

import AbpLogo from '../../images/abp-logo-long.png';
import { appRouters } from '../../components/Router/router.config';
import utils from '../../utils/utils';

const { Sider } = Layout;

export interface ISiderMenuProps {
  path: any;
  collapsed: boolean;
  onCollapse: any;
  history: any;
}

const SiderMenu = (props: ISiderMenuProps) => {
  const { collapsed, history, onCollapse } = props;
  const currentRoute = utils.getRoute(history.location.pathname);
  return (
    <Sider trigger={null} className={'sidebar'} width={256} collapsible collapsed={collapsed} onCollapse={onCollapse}>
      {collapsed ? (
        <Col style={{ textAlign: 'center', marginTop: 15, marginBottom: 10 }}>
          <Avatar shape="square" style={{ height: 27, width: 64 }} src={AbpLogo} />
        </Col>
      ) : (
        <Col style={{ textAlign: 'center', marginTop: 15, marginBottom: 10 }}>
          <Avatar shape="square" style={{ height: 54, width: 128 }} src={AbpLogo} />
        </Col>
      )}

      <Menu theme="dark" mode="inline" selectedKeys={[currentRoute ? currentRoute.path : '']}>
        {appRouters
          .filter((item: any) => !item.isLayout && item.showInMenu)
          .map((route: any, index: number) => {
            if (route.permission && !isGranted(route.permission)) return null;
            if (route.element) {
              return (
                <Menu.SubMenu icon={<route.icon />} title={L(route.title)} key={route.path}  >
                  {
                    route.element.filter((item: any) => !item.isLayout && item.showInMenu)
                      .map((route2: any, index: number) => {
                        return (
                          <Menu.Item key={route2.path} onClick={() => history.push(route2.path)} className={'menuitem'} >
                            <route2.icon />
                            <span>{L(route2.title)}</span>
                          </Menu.Item>
                        );
                      })
                  }
                </Menu.SubMenu>
              )
            }
            return (
              <Menu.Item key={route.path} onClick={() => history.push(route.path)}>
                <route.icon />
                <span>{L(route.title)}</span>
              </Menu.Item>
            );
          })}
      </Menu>
    </Sider>
  );
};

export default SiderMenu;
