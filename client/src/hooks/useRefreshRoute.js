import { useNavigate, useLocation } from 'react-router-dom';

function useRefreshRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  const refresh = () => {
    navigate(location.pathname, { state: { refresh: true } });
  };

  return refresh;
}

export default useRefreshRoute;