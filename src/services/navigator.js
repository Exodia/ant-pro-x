const navigatorItems = [
  {
    text: 'dashboard',
    icon: 'dashboard',
    children: [
      {
        text: '分析页',
        url: '/dashboard/analysis',
      },
      {
        text: '监控页',
        url: '/dashboard/monitor',
      },
      {
        text: '工作台',
        url: '/dashboard/workplace'
      }
    ]
  },
  {
    text: '表单页',
    icon: 'form',
    children: [
      {
        text: '基础表单',
        url: '/form/basic-form',
      },
      {
        text: '分步表单',
        url: '/form/step-form',
      },
      {
        text: '高级表单',
        url: '/form/advanced-form',
      }
    ]
  },
  {
    text: '列表页',
    icon: 'table',
    children: [
      {
        text: '查询表格',
        url: '/list/table-list',
      },
      {
        text: '标准列表',
        url: '/list/basic-list',
      },
      {
        text: '卡片列表',
        url: '/list/card-list',
      },
      {
        text: '搜索列表',
        children: [
          {
            text: '搜索列表（文章）',
            url: '/search/articles',
          },
          {
            text: '搜索列表（项目）',
            url: '/search/projects',
          },
          {
            text: '搜索列表（应用）',
            url: '/search/applications',
          }
        ]
      }
    ],
  },
  {
    text: '详情页',
    icon: 'profile',
    children: [
      {
        text: '基础详情页',
        url: '/profilebasic',
      }
      ,
      {
        text: '高级详情页',
        url: '/profile/advanced',
      }
    ]
  },
  {
    text: '结果页',
    icon: 'check-circle-o',
    children: [
      {
        text: '成功',
        url: '/result/success',
      },
      {
        text: '失败',
        url: '/result/fail',
      }
    ],
  },
  {
    text: '异常页',
    icon: 'warning',
    children: [
      {
        text: '403',
        url: '/exception/403',
      },
      {
        text: '404',
        url: '/exception/404',
      }, {
        text: '500',
        url: '/exception/500',
      },
      {
        text: '触发异常',
        url: '/exception/trigger'
      }
    ]
  },
  {
    text: '账户',
    icon: 'user',
    children: [
      {
        text: '登录',
        url: '/user/login',
      }, {
        text: '注册',
        url: '/user/register',
      }, {
        text: '注册结果',
        url: '/user/register-result',
      }
    ]
  }
].map(fillKeyAndSearch);

const mainNavItemKeys = navigatorItems.map(({key}) => key);

// fill url search and key
function fillKeyAndSearch(item) {
  const {search, hash} = window.location;

  const filledItem = {
    ...item,
    key: item.url ? item.url : item.text,
    url: item.url ? item.url + search + hash : undefined
  };
  if (item.children) {
    filledItem.children = filledItem.children.map(fillKeyAndSearch);
  }

  return filledItem;
}

export const isMainNavItem = key => mainNavItemKeys.includes(key);

export const getNavigatorItems = () => navigatorItems;

export const getOpenKeys = ({pathname, search, hash}) => {
  const toMatchedUrl = pathname + search + hash;
  return matchUrlKeys(navigatorItems, toMatchedUrl);
};

export const getLocationKey = location => getOpenKeys(location).pop();

function matchUrlKeys(items, toMatchedUrl) {
  for (const {key, url, children} of items) {
    if (url && url === toMatchedUrl) {
      return [key];
    }

    if (children) {
      const subKey = matchUrlKeys(children, toMatchedUrl);
      if (subKey.length) {
        return [key, ...subKey];
      }
    }
  }

  return [];
}
