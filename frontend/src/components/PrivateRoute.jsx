import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ roleRequired }) {
    const token = localStorage.getItem('jwt');
    const role = localStorage.getItem('role');

    return (token && role === roleRequired) ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace={true} />
    );
}

export default PrivateRoute;
