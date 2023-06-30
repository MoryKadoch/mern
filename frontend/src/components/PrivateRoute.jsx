import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ rolesRequired = [] }) {
    const token = localStorage.getItem('jwt');
    const role = localStorage.getItem('role');

    return (token && rolesRequired.includes(role)) ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace={true} />
    );
}

export default PrivateRoute;