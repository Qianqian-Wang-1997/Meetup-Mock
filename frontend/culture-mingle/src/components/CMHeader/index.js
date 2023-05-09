import React, { useState } from 'react';
import styles from './index.module.css';
import { NavLink } from 'react-router-dom';
import { Layout, Col, Button, Row, Dropdown } from 'antd';
import CreateGroup from '../CreateGroup';
const { Header } = Layout;
const items = [
  {
    key: '1',
    label: (<NavLink to="/members/my-events"> My Events</NavLink>),
  },
  {
    key: '2',
    label: (<NavLink to="/members/my-groups"> My Groups</NavLink>),
  }
];


const CMHeader = () => {
  let userId = localStorage.getItem("userId");
  const handleLogout = (e) => {
    localStorage.clear();
    console.log("click logout");
    window.location.reload();
  }

  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
    <Header theme='light' className={styles.header}>
      <Row>
        {userId == null ?
          <>
            <Col span={21} order={1} className={styles.headerLogo}>
              <NavLink to='/' style={{ color: 'black', marginLeft: '10%' }}>
                Culture Mingle
              </NavLink>
            </Col>
            <Col span={2} order={2}>
              <NavLink to='/login'>
                <Button className={styles.headerButton} type="primary">login</Button>
              </NavLink>
            </Col>
            <Col span={1} order={3}>
              <NavLink to='/signup'>
                <Button className={styles.headerButton}>sign up</Button>
              </NavLink>
            </Col></> :
          <>
            <Col span={17} order={1} className={styles.headerLogo}>
              <NavLink to='/' style={{ color: 'black', marginLeft: '35%' }}>
                Culture Mingle
              </NavLink>
            </Col>
            <Col span={4} order={2}>
              <Button type="link" className={styles.group} onClick={() => { setOpen(true); }}>
                Start a New Group
              </Button>
              <CreateGroup open={open} onCreate={onCreate} onCancel={() => { setOpen(false); }} />
            </Col>
            <Col span={2} order={3}>
              <NavLink to={`/members/${userId}`}>
                <Button className={styles.headerButton} type="primary">my profile</Button>
              </NavLink>
            </Col>
            <Col span={1} order={4}>
              <NavLink onClick={event => handleLogout(event)} to={`/`} >
                <Button className={styles.headerButton}>Log out</Button>
              </NavLink>
            </Col>

          </>}

      </Row>
    </Header>
  );
};

export default CMHeader;