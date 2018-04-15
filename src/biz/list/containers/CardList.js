import React, {PureComponent, Fragment} from 'react';
import {Card, Button, Icon, List} from 'antd';
import Ellipsis from 'ant-design-pro/es/Ellipsis';
import PageHeader from 'ant-design-pro/es/PageHeader';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {selectors} from 'biz/navigator/models';
import {autoDispatch} from 'common/util';

import {fetchList} from '../models';
import styles from './CardList.less';

@connect(
  ({
     navigator: {entities, selectedItemKeys},
     list: {entities: list, loading, error}
   }) => ({
    breadcrumbList: selectors.getBreadcrumbList(entities, selectedItemKeys[0]),
    list: list,
    loading: loading,
    error: error
  }),
  autoDispatch({fetchList})
)
export default class CardList extends PureComponent {

  componentDidMount() {
    this.props.fetchList({_limit: 8});
  }

  render() {
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"/> 快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"/> 产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"/> 产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt="这是一个标题" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"/>
      </div>
    );

    return (
      <Fragment>
        <PageHeader
          title="卡片列表"
          breadcrumbList={this.props.breadcrumbList}
          content={content}
          extraContent={extraContent}
          linkElement={Link}
        />
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={this.props.loading}
            grid={{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}}
            dataSource={['', ...this.props.list]}
            renderItem={item => (item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card} actions={[<a>操作一</a>, <a>操作二</a>]}>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar}/>}
                      title={<a href="#">{item.title}</a>}
                      description={(
                        <Ellipsis className={styles.item} lines={3}>{item.description}</Ellipsis>
                      )}
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus"/> 新增产品
                  </Button>
                </List.Item>
              )
            )}
          />
        </div>
      </Fragment>
    );
  }
}