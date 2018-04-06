import {getNavigatorItems, getLocationKey, getOpenKeys, isMainNavItem} from '../services'
import {switchActionReducer} from '../common/util';

const UPDATE = 'global/navigator/update';
const CHANGE_OPEN_KEYS = 'global/navigator/changeOpenKeys';
const TOGGLE_COLLAPSE = 'global/navigator/toggleCollapse';

// 导航更新情况：1. 切换页面 2. 打开或刷新页面
export function updateNavigator(location) {
  return {
    type: UPDATE,
    payload: {
      items: getNavigatorItems(),
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
  (state, {payload}) => {
    return {
      ...state,
      ...payload
    }
  },
  [UPDATE, CHANGE_OPEN_KEYS, TOGGLE_COLLAPSE],
  {items: [], openItemKeys: [], selectedItemKeys: [], collapsed: false}
);
