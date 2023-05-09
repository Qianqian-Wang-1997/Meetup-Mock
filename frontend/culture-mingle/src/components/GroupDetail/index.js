import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import axios from 'axios';
// import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Col, Row, Menu, Button } from 'antd';
import {
    AimOutlined,
    UserOutlined,
} from '@ant-design/icons';

import EventComponent from '../EventList/EventComponent';
import MemberList from '../MemberList';
import Join from '../Join';

const items = [
    {
        label: 'About',
        key: 'about',
    },
    {
        label: 'Events',
        key: 'events',
    },
    {
        label: 'Members',
        key: 'members',
    }
];

const GroupDetail = (props) => {
    const { groupId } = useParams();
    const [host, setHost] = useState('');
    const [events, setEvents] = useState([]);
    const [current, setCurrent] = useState('about');
    // Change header status
    const onClick = e => {
        setCurrent(e.key);
    }

    // Get group data by groupId
    const [currentGroup, setData] = useState([]);
    const getData = async () => {
        try {
            const response = await axios.get(`/groups/${groupId}`);
            // Get event ids
            setEvents(response.data.events)
            setData(response.data);
            console.log("test data: ", response.data)
        } catch (error) {
            console.error('Error fetching group data:', error);
        }

    };
    useEffect(() => {
        getData();
    }, []);


    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const eventRequests = events.map(async (item) => {
                    const response = await axios.get(`/events/${item}`);
                    return response.data;
                });
                const eventData = await Promise.all(eventRequests);
                // Do something with eventData, which is an array of responses from all the axios requests
                console.log("events", eventData);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };
        fetchEventData();
    }, [events]);


    return (
        <div className={styles.group}>
            <div className={styles.groupHomeHeader}>
                <Row width="100%">
                    <Col span={10} order={1}>
                        {currentGroup.logoUrl && <img className={styles.groupImage} src={currentGroup.logoUrl} alt=" " loading="lazy" />}
                    </Col>
                    <Col span={12} order={2} className={styles.groupContent}>
                        <h1 className={styles.groupTitle}>
                            {currentGroup.groupName}
                        </h1>
                        <p className={styles.groupDesc}>
                            <AimOutlined className={styles.icon} />
                            {currentGroup.location}
                        </p>
                        <p className={styles.groupDesc}>
                            {currentGroup.organizer ?
                                <div><UserOutlined className={styles.icon} />Host by {host}</div> :
                                <p>no host right now
                                </p>}
                        </p>
                    </Col>
                </Row>
            </div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <div className={styles.content}>
            {current == "about" ? <div className={styles.about}> {currentGroup.description} </div> : <></>}
            {current == "events" ?
                <div className={styles.events}>
                    {events && events.map(item => (
                        <EventComponent key={item.id} event={item} />
                    ))}
                    {events && events.length == 0 && <div className={styles.noContent}>No Event Right Now</div>}
                </div> : <></>}
            {current == "members" ?
                <div>
                    {currentGroup.members.length === 0 ?
                        <div className={styles.noContent}>No Memeber Right Now</div> :
                        <MemberList hostId={currentGroup.organizer} attendeesId={currentGroup.members} />}
                </div> : <></>}
            </div>

            <Join joinId={groupId} type="groups"></Join>

        </div>
    )
};

export default GroupDetail;