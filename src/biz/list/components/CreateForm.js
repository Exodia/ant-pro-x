import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Modal} from 'antd';

@Form.create()
export default class CreateForm extends PureComponent {

  static protoTypes = {
    visible: PropTypes.bool,
    onCreate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  onOk = () => {
    const {onCreate, form} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        form.resetFields();
        onCreate(fieldsValue);
      }
    });
  };

  render() {
    const {onCancel, visible, form} = this.props;

    return (
      <Modal
        title="新建规则"
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
      >
        <Form.Item labelCol={{span: 5}} wrapperCol={{span: 15}} label="描述">
          {
            form.getFieldDecorator(
              'description',
              {rules: [{required: true, message: 'Please input some description...'}]}
            )(<Input placeholder="请输入"/>)
          }
        </Form.Item>
      </Modal>
    );
  }
}

