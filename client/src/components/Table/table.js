import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button, Space, Spin } from 'antd';
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                (dataIndex === 'age') ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                type: 'number', min: 18, max: 60,
                                required: true,
                                message: `Please Input correct ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                )
                    : (dataIndex === "email") ?
                        (
                            <Form.Item
                                name={dataIndex}
                                style={{
                                    margin: 0,
                                }}
                                rules={[
                                    {
                                        required: true,
                                        type: 'email',
                                        message: `Please Input ${title}!`,
                                    },
                                ]}
                            >
                                {inputNode}
                            </Form.Item>
                        )
                        : (dataIndex === "phone") ?
                            (
                                <Form.Item
                                    name={dataIndex}
                                    style={{
                                        margin: 0,
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        },
                                    ]}
                                >
                                    {inputNode}
                                </Form.Item>
                            )
                            : (<Form.Item
                                name={dataIndex}
                                style={{
                                    margin: 0,
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please Input ${title}!`,
                                    },
                                ]}
                            >
                                {inputNode}
                            </Form.Item>
                            )


            ) : (
                    children
                )}
        </td>
    );
};

const EmployeesTable = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState("");
    const [editingKey, setEditingKey] = useState('');
    const [rowIndex, setRowIndex] = useState('');
    const isEditing = (record) => (record) && record._id === editingKey;
    var searchInput = "";

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            phone: '',
            gender: '',
            email: '',
            ...record,
        });
        setEditingKey(record._id);
        setRowIndex(record._id);
    };

    const deleteRow = (record) => {
        const newData = [...props.data];
        const index = newData.findIndex((item) => record._id === item._id);
        console.log(index)
        if (window.confirm('Are you sure you wish to delete this row?')) {
            props.deleteTableRow(record, index);
        }
    };

    const cancel = () => {
        console.log(data)
        setEditingKey('');
    };

    useEffect(() => {
        props.fetchData();
    }, [searchText, searchedColumn])

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...props.data];
            const index = newData.findIndex((item) => {return key === item._id});
            if (index > -1) {
                const item = newData[index];
                props.editTableRow({ ...item, ...row }, index);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            alert('Validate Failed:', errInfo);
        }
    };


    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters
        }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={(node) => {
                            searchInput = node;
                        }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        style={{ width: 188, marginBottom: 8, display: "block" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
            </Button>
                        <Button
                            onClick={() => handleReset(clearFilters)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
            </Button>
                    </Space>
                </div>
            ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                    text
                )
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("")
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '20%',
            sorter: (a, b) => a.name.length - b.name.length,
            editable: true,
            ...getColumnSearchProps("name"),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            width: '15%',
            sorter: (a, b) => a.age - b.age,
            editable: true,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            width: '15%',
            editable: true,
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            width: '15%',
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%',
            editable: true,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record._id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a >Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <div>
                            <a disabled={editingKey !== ''|| props.isEditing} className="green-text" onClick={() => edit(record)}>
                                Edit
                        </a>
                            <span>{" / "}</span>
                            <a disabled={editingKey !== '' || props.isEditing} className="red-text" onClick={() => deleteRow(record)}>
                                Delete
                        </a>
                        {console.log(record._id===rowIndex && props.isEditing," 77")}
                      {(record._id===rowIndex && props.isEditing) ?<div><Spin/><h1>Editing</h1></div>:("")}
                       
                        </div>
                    );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <div>
            <h2 style={{ display: "block", fontSize: '1em' }}>Table For Employees</h2>
            <Form form={form} component={false}>
            {(props.isEditing && rowIndex ==='') ? (<p>loading Table Data...<Spin/></p>) : ""}
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    rowKey="_id"
                    dataSource={props.data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>
    );
};
export default EmployeesTable
