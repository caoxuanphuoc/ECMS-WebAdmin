import { inject, observer } from 'mobx-react';
import React from 'react';
import { FormInstance } from 'antd/lib/form';
import { Button, Card, Col, Dropdown, Input, Menu, Modal, Row, Table } from 'antd';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import CourseStore from '../../stores/courseStore';
import AppComponentBase from '../../components/AppComponentBase';
import Stores from '../../stores/storeIdentifier';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import CreateOrUpdateCourse from './components/createOrUpdateCourse';

export interface ICourseProps {
  courseStore: CourseStore;
}

export interface ICourseState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  courseId: number;
  filter: string;
}

const { confirm } = Modal;
const { Search } = Input;

@inject(Stores.CourseStore)
@observer
class Course extends AppComponentBase<ICourseProps, ICourseState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    courseId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.courseStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      keyword: this.state.filter,
    });
  }

  handleTableChange = (pagination: any) => {
    this.setState(
      {
        skipCount: (pagination.current - 1) * this.state.maxResultCount,
      },
      async () => await this.getAll()
    );
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id === 0) {
      await this.props.courseStore.createCourse();
    } else {
      await this.props.courseStore.get(entityDto);
    }

    this.setState({ courseId: entityDto.id });
    this.Modal();

    setTimeout(() => {
      let x = this.formRef.current?.setFieldsValue({ ...this.props.courseStore.editCourse });
      console.log(x);
    }, 100);
  }

  delete(input: EntityDto) {
    const self = this;
    confirm({
      title: 'Do you want to delete these items?',
      onOk() {
        self.props.courseStore.delete(input);
      },
    });
  }

  handleCreate = () => {
    const form = this.formRef.current;

    form!.validateFields().then(async (values: any) => {
      if (this.state.courseId === 0) {
        await this.props.courseStore.create(values);
      } else {
        await this.props.courseStore.update({ ...values, id: this.state.courseId });
      }

      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();
    });
  };

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };

  public render() {
    const { courses } = this.props.courseStore;
    const columns = [
      {
        title: L('courseName'),
        dataIndex: 'courseName',
        key: 'courseName',
        with: 350,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('courseFee'),
        dataIndex: 'courseFee',
        key: 'courseFee',
        with: 350,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('quantity'),
        dataIndex: 'quantity',
        key: 'quantity',
        with: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Actions'),
        width: 150,
        render: (text: string, item: any) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>
                    {L('Edit')}
                  </Menu.Item>
                  <Menu.Item onClick={() => this.delete({ id: item.id })}>{L('Delete')}</Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon={<SettingOutlined />}>
                {L('Actions')}
              </Button>
            </Dropdown>
          </div>
        ),
      },
    ];

    return (
      <Card>
        <Row>
          <Col
            xs={{ span: 4, offset: 0 }}
            sm={{ span: 4, offset: 0 }}
            md={{ span: 4, offset: 0 }}
            lg={{ span: 2, offset: 0 }}
            xl={{ span: 2, offset: 0 }}
            xxl={{ span: 2, offset: 0 }}
          >
            {' '}
            <h2>{L('Courses')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 1, offset: 21 }}
            xl={{ span: 1, offset: 21 }}
            xxl={{ span: 1, offset: 21 }}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => this.createOrUpdateModalOpen({ id: 0 })}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 10, offset: 0 }}>
            <Search placeholder={this.L('Filter')} onSearch={this.handleSearch} />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            <Table
              rowKey={(record) => record.id.toString()}
              bordered
              columns={columns}
              pagination={{
                pageSize: 10,
                total: courses === undefined ? 0 : courses.totalCount,
                defaultCurrent: 1,
              }}
              loading={courses === undefined ? true : false}
              dataSource={courses === undefined ? [] : courses.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <CreateOrUpdateCourse
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            //this.formRef.current?.resetFields();
          }}
          modalType={this.state.courseId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
        />
      </Card>
    );
  }
}

export default Course;
