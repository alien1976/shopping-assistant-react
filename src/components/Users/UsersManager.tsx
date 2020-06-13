import * as React from 'react';
import MaterialTable, { Column } from 'material-table';
import { USER_ROLES } from '../../globals/constants';
import { userService } from '../../services/users.service';
import { useDispatch } from 'react-redux';
import { openSnackBar } from '../../redux/snackBarReducer';
import { IUser } from '../../globals/interfaces';

interface TableState {
    columns: Array<Column<IUser>>;
    data: IUser[];
}

const UsersManager = () => {
    const dispatch = useDispatch()
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'User name', field: 'userName' },
            { title: 'First name', field: 'firstName' },
            { title: 'Last name', field: 'lastName' },
            { title: 'Email', field: 'email' },
            { title: 'Role', field: 'role', lookup: USER_ROLES },
        ],
        data: []
    });

    const setUsers = async () => {
        try {
            const users = await userService.getAllUsers();
            setState((prevState) => {
                const data = [...users];
                return { ...prevState, data };
            });
        } catch (error) {
            dispatch(openSnackBar({ message: `Unable to fetch users: ${error.message}`, status: 'error' }))
        }
    }

    React.useEffect(() => {
        setUsers();
    }, [])

    const generatePassword = () => {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    const onAddUser = async (user: IUser) => {
        try {
            user.password = generatePassword();
            console.log(user.password)
            await userService.registerUser(user);
            dispatch(openSnackBar({ message: `Successfully added ${user.userName}`, status: 'success' }))
        } catch (error) {
            dispatch(openSnackBar({ message: `Error: ${error.message}`, status: 'error' }))
        }

        setUsers();
    }

    const onDeleteUser = async (user: IUser) => {
        try {
            if (user.role === 'Admin') {
                dispatch(openSnackBar({ message: `You can't delete user with role "Admin"`, status: 'error' }))
                return;
            }
            await userService.deleteUser(user.id);
            dispatch(openSnackBar({ message: `Successfully removed ${user.userName}`, status: 'success' }))
        } catch (error) {
            dispatch(openSnackBar({ message: `Error: ${error.message}`, status: 'error' }))
        }

        setUsers();
    }

    const onUpdateUser = async (user: IUser) => {
        try {
            await userService.updateUser(user);
            dispatch(openSnackBar({ message: `Successfully updated ${user.userName}`, status: 'success' }))
        } catch (error) {
            dispatch(openSnackBar({ message: `Error: ${error.message}`, status: 'error' }))
        }

        setUsers();
    }

    return (
        <MaterialTable
            title="Users manager"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: onAddUser,
                onRowUpdate: onUpdateUser,
                onRowDelete: onDeleteUser,
            }}
        />
    );
}

export default UsersManager;