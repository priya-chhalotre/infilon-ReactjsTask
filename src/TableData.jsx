import React, {useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import { Modal} from 'antd';
import 'antd/dist/antd.css';
import '../src/TableData.scss';

const TableData = () => {
    const [product, setProduct] = useState("");
    const [editingStudent, setEditingStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            const response = await fetch(
                `https://reqres.in/api/users?page=1`
            );
            setProduct(await response.json());
            console.log(product, 'product')
        };
        getProduct();
    }, [product]);

    //Modal box
    const onEditStudent = (res) => {
        setIsEditing(true);
        setEditingStudent({ ...res });
        console.log(res)
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingStudent(null);
    };
    const onDeleteStudent = (res) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this student record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setProduct((pre) => {
                    return pre.filter((student) => student.id !== res.id);
                });
            },
        });
    };
   
    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {product && product.data.length ?
                        <>
                            {
                                product.data.map(res => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{res.id}</td>
                                                <td>{res.email}</td>
                                                <td>{res.first_name}</td>
                                                <td>{res.last_name}</td>
                                                <td>{res.avatar}</td>
                                                <td>
                                                    <button className="edit-btn" onClick={() => onEditStudent(res)}>Edit</button>
                                                    <button className="del-btn" onClick={() => onDeleteStudent(res)}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </>
                        : ''}
                </tbody>
            </Table>
            <Modal title="Edit Table data" visible={isEditing}
                okText="Save"
                onCancel={() => {
                    resetEditing();
                }}
                onOk={() => {
                    setProduct((pre) => {
                      return pre.map((student) => {
                        if (student.id === editingStudent.id) {
                          return editingStudent;
                        } else {
                          return student;
                        }
                      });
                    });
                    resetEditing();
                  }}
                  >
                <div className="form-data">
                    <form>
                        <label>
                            Email:
                            <input type="email" placeholder="email" value={editingStudent?.email} onChange={(e) => {
                                setEditingStudent((pre) => {
                                    return { ...pre, email: e.target.value };
                                });
                            }} />
                        </label>
                        <label>
                            First Name:
                            <input type="text" placeholder="firstname" value={editingStudent?.first_name} onChange={(e) => {
                                setEditingStudent((pre) => {
                                    return { ...pre, first_name: e.target.value };
                                });
                            }} />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" placeholder="lastname" value={editingStudent?.last_name} onChange={(e) => {
                                setEditingStudent((pre) => {
                                    return { ...pre, last_name: e.target.value };
                                });
                            }} />
                        </label>
                        <label>
                            Avatar:
                            <input type="text" placeholder="avatar" value={editingStudent?.avatar} onChange={(e) => {
                                setEditingStudent((pre) => {
                                    return { ...pre, avatar: e.target.value };
                                });
                            }} />
                        </label>
                    </form>
                </div>
            </Modal>
        </>
    );
};
export default TableData;