import React, {Fragment, PureComponent} from 'react';
import {Row, Col, Form, Icon, Button} from 'antd';

@Form.create()
export default class FilterPanel extends PureComponent {

  static defaultProps = {
    filters: [
      /*{
        id: '',
        label: '规则编号',
        field: ''
      }*/
    ],
    collapsedIndex: 2,
    onReset() {},
    onSubmit(values) {}
  };

  state = {
    collapsed: true
  };

  submit = e => {
    e.preventDefault();

    const {form} = this.props;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.props.onSubmit(values);
    });
  };

  reset = () => {
    const {form} = this.props;
    form.resetFields();
    this.props.onReset({});
  };

  getFormItem = ({id, label, field}) => (
    <Col md={8} sm={24} key={id}>
      <Form.Item label={label}>
        {this.props.form.getFieldDecorator(id)(field)}
      </Form.Item>
    </Col>
  );

  toggleExpand = () => this.setState({collapsed: !this.state.collapsed});

  renderExtra() {
    if (this.state.collapsed) {
      return null;
    }

    const {filters, collapsedIndex} = this.props;

    return (
      <Fragment>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          {filters.slice(collapsedIndex + 1).map(this.getFormItem)}
        </Row>
        <div style={{overflow: 'hidden', textAlign: 'right'}}>
          {this.renderOperation()}
        </div>
      </Fragment>
    )
  }

  renderOperation() {
    const toggle = do {
      if (this.props.filters.length <= this.props.collapsedIndex) {
        // eslint-disable-next-line
        null;
      }

      // eslint-disable-next-line
      <a style={{marginLeft: 8}} onClick={this.toggleExpand}>
        {
          this.state.collapsed
            ? <Fragment>展开<Icon type="down"/></Fragment>
            : <Fragment>收起<Icon type="up"/></Fragment>
        }
      </a>
    };

    return (
      <Fragment>
        <Button type="primary" htmlType="submit">查询</Button>
        <Button style={{marginLeft: 8}} onClick={this.reset}>重置</Button>
        {toggle}
      </Fragment>
    )
  }

  render() {
    const {filters, collapsedIndex} = this.props;
    const boundary = filters[collapsedIndex];

    return (
      <Form onSubmit={this.submit} layout="inline" className={this.props.className}>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          {filters.slice(0, collapsedIndex).map(this.getFormItem)}
          {
            this.state.collapsed
              ? <Col md={8} sm={24}>{this.renderOperation()}</Col>
              : (boundary ? this.getFormItem(boundary) : null)
          }
        </Row>
        {this.renderExtra()}
      </Form>
    );
  }
}

