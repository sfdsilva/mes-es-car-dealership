import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/status">My current purchase</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
