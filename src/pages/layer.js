/**
 * @Project react-webpack4
 * @Author Sirpale
 * @Description
 * @Date Created in 2018\6\9 0009 by 22:41
 */
import React, {Component} from 'react';
import {
  Card,
  Button,
  Layout,
  notification,
  Menu,
  Icon,
  Row,
  Col,
  Affix,
  Breadcrumb,
  Dropdown,
  Pagination,
  Steps,
  AutoComplete,
  Cascader,
  Checkbox,
  Input,
  InputNumber,
  Mention,
  Rate,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Transfer
} from 'antd';
const {Header, Content, Footer, Sider}  = Layout;
const { toString, toContentState } = Mention;

import './css/layer.scss';
import Home from "./Home";


const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};


const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
    </Menu.Item>
  </Menu>
);

const Step = Steps.Step;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;


const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const targetKeys = mockData
  .filter(item => +item.key % 3 > 1)
  .map(item => item.key);


export default class Layer extends Component {

  state = {
    value: undefined,
    disabled: false,
    dataSource : [],
    targetKeys,
    selectedKeys: []
  };

  _handleSearch(value) {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value
      ]
    })
  }





  render() {


    return (
      <div>
        <Card title="按钮" extra={<a href="#">More</a>} style={{}}>
          <Button onClick={ Home._Click } size="small" type="primary">Click</Button>
          <Button size="small">Tap</Button>
          <Button size="small" type="dashed">Dashed</Button>
          <Button size="small" type="danger">Danger</Button>
        </Card>
        <Card title="图标">
          <Icon type="link" />
          <Icon type="shrink" />
        </Card>
        <Card title="栅格">
          <Row>
            <Col span={12}>col-12</Col>
            <Col span={12}>col-12</Col>
          </Row>
          <Row>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
          </Row>
          <Row>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
          </Row>
        </Card>


        <Card title="固钉">
          <Affix offsetTop={10} onChange={affixed => console.log(affixed)}>
            <Button>120px to affix top</Button>
          </Affix>
        </Card>

        <Card title="下拉菜单">
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="javascript:void(0);">
              Hover me <Icon type="down" />
            </a>
          </Dropdown>
        </Card>

        <Card title="分页">
          <Pagination defaultCurrent={3} total={100} />
        </Card>

        <Card title="步骤条">
          <Steps current={1}>
            <Step title="Finished" description="This is a description." />
            <Step title="In Progress" description="This is a description." />
            <Step title="Waiting" description="This is a description." />
          </Steps>
        </Card>

        <Card title="面包屑">
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
        </Card>

        <Card title="自动完成">
          <AutoComplete
            dataSource={this.state.dataSource}
            style={{ width: 200 }}
            onSelect={value => console.log('select', value)}
            onSearch={value => this._handleSearch(value)}
            placeholder="input here"
          />

        </Card>

        <Card title="级联选择">
          <Cascader options={options} onChange={value => console.log(value)} placeholder="Please select" />
        </Card>

        <Card title="多选框">
          <Checkbox onChange={value => console.log(value)}>Checkbox</Checkbox>
        </Card>

        <Card title="输入框">
          <Input placeholder="Basic usage" />
          <InputNumber min={1} max={10} defaultValue={3} onChange={value => console.log(value)} />
        </Card>

        <Card title="提及">
          <Mention
            style={{ width: '100%' }}
            onChange={contentState => console.log(toString(contentState))}
            defaultValue={toContentState('@afc163')}
            suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
            onSelect={sug => console.log(sug)}
          />
        </Card>


        <Card title="评分">
          <Rate />
        </Card>

        <Card title="单选">
          <Radio>Radio</Radio>
        </Card>

        <Card title="选择框">
          <Select defaultValue="lucy" style={{ width: "100%" }} onChange={value => console.log(value)}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Select defaultValue="lucy" style={{ width: "100%" }} disabled>
            <Option value="lucy">Lucy</Option>
          </Select>
        </Card>

        <Card title="开关">
          <Slider defaultValue={30} disabled={this.state.disabled} />
          <Slider range defaultValue={[20, 50]} disabled={this.state.disabled} />
          Disabled: <Switch size="small" checked={this.state.disabled} onChange={disabled => this.setState({disabled})} />
        </Card>

        <Card title="树形选择">
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
            value={this.state.value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={value => this.setState({value})}
          >
            <TreeNode value="parent 1" title="parent 1" key="0-1">
              <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                <TreeNode value="leaf1" title="my leaf" key="random" />
                <TreeNode value="leaf2" title="your leaf" key="random1" />
              </TreeNode>
              <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
              </TreeNode>
            </TreeNode>
          </TreeSelect>
        </Card>

        <Card title="穿梭框">
          <Transfer
            dataSource={mockData}
            titles={['Source', 'Target']}
            targetKeys={this.state.targetKeys}
            selectedKeys={this.state.selectedKeys}
            onChange={keys => this.setState({ targetKeys: keys })}
            onSelectChange={(keys1, keys2) => this.setState({ selectedKeys: [...keys1, ...keys2] })}
            onScroll={this.handleScroll}
            render={item => item.title}
          />

        </Card>


        <Card title="提示信息">
          <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
          <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
          <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
          <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
        </Card>

      </div>
    )
  }
}