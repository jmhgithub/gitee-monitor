import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
class Home extends React.PureComponent {
  state={
    projectName:'lpcmp',
    fileName:'index.js'
  }
  render() {
    return <Layout style={{ height: '100%' }}>
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 10px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>{this.state.projectName}</Breadcrumb.Item>
        <Breadcrumb.Item>{this.state.fileName}</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="appstore" />
                  lpcmp
                </span>
              }
            >
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="appstore" />
                  lpcmpflash
                </span>
              }
            >
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="appstore" />
                  lpimg
                </span>
              }
            >
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {this.props.children}
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' ,display:'fixed',bottom:'0' }}>Hacker_front ©2019 Created by PL</Footer>
  </Layout>
  }

    
}

export default Home;
