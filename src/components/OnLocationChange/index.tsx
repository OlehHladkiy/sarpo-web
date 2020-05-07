// @flow
import { useEffect } from 'react';
import { withRouter, useLocation } from 'react-router-dom';

const OnLocationChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Temporary workaround for an Ant Design bug that prevents pages
    // from scrolling if modals are displayed while a drawer is open.
    // https://app.asana.com/0/1110633256291482/1163824665250593
    window.document.body.style.removeProperty('overflow');
  }, [pathname]);

  return null;
};

export default withRouter(OnLocationChange);
