import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import EventList from "../EventList/index"
import Groups from "../GroupList/index"
import axios from 'axios';
import { Layout } from 'antd';
const { Content } = Layout;

const Home = () => {
  const [groups, setGroups] = useState([]);
  const getGroups = async () => {
    const response = await axios.get("/groups");
    setGroups(response.data);
  };
  useEffect(() => {
    getGroups();
  }, []);

  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    const response = await axios.get("/events");
    setEvents(response.data);
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Content className={styles.contentBackground}>
      <div className={styles.content}>
        <p className={styles.contentTitle}>Upcoming Events</p>
        <EventList events={events}/>
        <p className={styles.contentTitle}>Popular groups</p>
        <Groups groups={groups}/>
        {/* <p className={styles.contentTitle}>Get Started</p> */}
      </div>
    </Content>
  );
};

export default Home;