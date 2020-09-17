import React, { useState } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Select,
    InputNumber,
    Button,
    Radio,
    Spin,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 16,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 16,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const EmployeeForm = (props) => {
    const [state, setState] = useState(
        {
            gender: 'Male',
        })

    const [form] = Form.useForm();

    const onFinish = (values) => {
        props.addEmployee(values);
    };

    const onChange = e => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value,
        }))
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="92">+92</Option>
                <Option value="051">+051</Option>
            </Select>
        </Form.Item>
    );
    return (
        <div id="main" className="container">
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    prefix: '92',
                }}
                scrollToFirstError
            >
                <h2 id='heading2' >Register Employee</h2>
                <span className="red-text">
                    {(props.errors) ? props.errors.message : ''}

                </span>
                <span className="green-text" >
                    {(props.status) ? 'Employee has been added' : ''}
                </span>
                <Form.Item
                    name="name"
                    label={
                        <span>
                            Name&nbsp;
            <Tooltip title="What your Full name">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input your nickname!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="age" label={<span>&nbsp;&nbsp;Age</span>} rules={[{ type: 'number', min: 18, max: 60 }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="gender" label={<span>&nbsp;&nbsp;Gender</span>} >
                    <Radio.Group id="gender" onChange={onChange} value={state.gender}>
                        <Radio.Button id="gender" value="Male">Male</Radio.Button>
                        <Radio.Button id="gender" value="Female">Female</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}>
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button id="registerbtn" type="primary" htmlType="submit">
                        Register
                {(props && props.loading) ? (<Spin size="large" />) : ("")} </Button>
                </Form.Item>


            </Form>

        </div>

    );
};
export default EmployeeForm;
