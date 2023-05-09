import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import CMSider from '../CMSider/index';
import { BrowserRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

describe('CMSider', () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders CMSider component with correct props', () => {
    const onCollapse = jest.fn();

    act(() => {
      render(
        <BrowserRouter>
          <CMSider onCollapse={onCollapse} />
        </BrowserRouter>,
        container
      );
    });

    const siderElement = container.querySelector('.ant-layout-sider');
    expect(siderElement).toBeTruthy();

    const menuElement = container.querySelector('.ant-menu');
    expect(menuElement).toBeTruthy();

    const onCollapseTrigger = container.querySelector('.ant-layout-sider-trigger');
    expect(onCollapseTrigger).toBeTruthy();
    expect(onCollapse).toHaveBeenCalledTimes(0);
  });
});
