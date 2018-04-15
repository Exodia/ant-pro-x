import {getNavigatorItems, getLocationKey, getOpenKeys, isMainNavItem} from '../services'
import {switchActionReducer, spreadReducer} from 'common/util';

const UPDATE = 'navigator/update';
const CHANGE_OPEN_KEYS = 'navigator/changeOpenKeys';
const TOGGLE_COLLAPSE = 'navigator/toggleCollapse';

// 导航更新情况：1. 切换页面 2. 打开或刷新页面
export function updateNavigator(location) {
  return {
    type: UPDATE,
    payload: {
      entities: getNavigatorItems(),
      openItemKeys: getOpenKeys(location),
      selectedItemKeys: [getLocationKey(location)]
    }
  };
}

export function changeNavigatorOpenKeys(openKeys) {
  return {
    type: CHANGE_OPEN_KEYS,
    payload: {
      // 一级导航只允许一项展开
      openItemKeys: openKeys.filter(isMainNavItem).length > 1 ? [openKeys[openKeys.length - 1]] : openKeys
    }
  };
}

export function toggleNavigatorCollapse(collapsed) {
  return {
    type: TOGGLE_COLLAPSE,
    payload: {collapsed}
  };
}

export default switchActionReducer(
  spreadReducer,
  [UPDATE, CHANGE_OPEN_KEYS, TOGGLE_COLLAPSE],
  {entities: [], openItemKeys: [], selectedItemKeys: [], collapsed: false}
);

const breadcrumbMap = {
  '/': [{href: '/', title: '首页'}]
};

export const selectors = {
  getBreadcrumbList(items, toMatchedKey) {
    if (breadcrumbMap.hasOwnProperty(toMatchedKey)) {
      return breadcrumbMap[toMatchedKey];
    }

    if (!toMatchedKey) {
      return [];
    }

    function matcher(items) {
      for (const {url, key, text, children} of items) {
        const current = {href: url, title: text};
        if (key === toMatchedKey) {
          return [{title: text}];
        }

        if (children) {
          const subList = matcher(children);
          if (subList.length) {
            return [current, ...subList];
          }
        }
      }

      return [];
    }

    breadcrumbMap[toMatchedKey] = [...breadcrumbMap['/'], ...matcher(items)];

    return breadcrumbMap[toMatchedKey];
  }
};
