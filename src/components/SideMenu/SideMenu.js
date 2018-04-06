import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';

export default function SideMenu({selectedKeys, openKeys, items, onOpenChange}) {
  return (
    <Menu
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      theme="dark"
      mode="inline"
      style={{ padding: '16px 0', width: '100%' }}
    >
      {items.map(getMenuItem)}
    </Menu>
  )
}

SideMenu.propTypes = {
  selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  openKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOpenChange: PropTypes.func,
  items: do {
    const ItemShape = {
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      url: PropTypes.string,
      target: PropTypes.string
    };
    ItemShape.children = PropTypes.arrayOf(PropTypes.shape(ItemShape));

    PropTypes.arrayOf(PropTypes.shape(ItemShape)).isRequired;
  }
};

function getMenuItem({key, text, icon, url, target, children}) {
  const itemNode = getItemNode({text, icon, url, target});

  if (children) {
    return (
      <Menu.SubMenu key={key} title={itemNode}>
        {children.map(getMenuItem)}
      </Menu.SubMenu>
    );
  }
  return <Menu.Item key={key}>{itemNode}</Menu.Item>;
}

function getItemNode({text, icon, url, target}) {
  const node = (
    <Fragment>
      {icon ? getIcon(icon) : null}
      <span>{text}</span>
    </Fragment>
  );

  if (typeof url !== 'string') {
    return node;
  }

  // Is it a http link
  return /^https?:\/\//.test(url)
    ? <a href={url} target={target}>{node}</a>
    : <Link to={url} target={target}>{node}</Link>;
}

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
function getIcon(icon) {
  if (typeof icon !== 'string') {
    return icon;
  }

  if (icon.startsWith('http')) {
    return <img src={icon} alt="icon"/>;
  }

  return <Icon type={icon}/>;
}
