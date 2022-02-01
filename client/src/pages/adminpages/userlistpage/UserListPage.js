import React from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { userListAction, userDeleteAction } from "../../../actions/userActions";
import Loader from "../../../components/Loader/Loader";
import Message from "../../../components/Message/Message";

const UserListPage = () => {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);

    React.useEffect(() => {
        dispatch(userListAction());
    }, [dispatch]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure to delete this user?")) {
            dispatch(userDeleteAction(id));
            document.location.reload();
        }
    };

    return (
        <>
            <h1>Users</h1>
            {userList.error && (
                <Message variant="danger">{userList.error}</Message>
            )}
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>ADMIN</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.users &&
                        userList.users.map((user) => (
                            <tr key={user._id}>
                                <th>{user._id}</th>
                                <th>{user.name}</th>
                                <th>
                                    {" "}
                                    <a href={`mailto:${user.email}`}>
                                        {" "}
                                        {user.email}{" "}
                                    </a>
                                </th>
                                <th>
                                    {user.isAdmin ? (
                                        <i className="fas fa-check"></i>
                                    ) : (
                                        <i className="fas fa-times"> </i>
                                    )}
                                </th>
                                <th className="d-flex justify-content-center">
                                    <LinkContainer
                                        to={`/admin/user/${user._id}`}
                                    >
                                        <Button variant="light">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        onClick={(e) => deleteHandler(user._id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </th>
                            </tr>
                        ))}
                </tbody>
            </Table>
            {userList.loading && <Loader />}
        </>
    );
};

export default UserListPage;
