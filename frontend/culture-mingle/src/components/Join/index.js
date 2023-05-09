import { Layout, Space, Card, Button, Modal, FloatButton } from 'antd';
import styles from './index.module.css';
import { ShareAltOutlined, UsergroupAddOutlined, TwitterOutlined, FacebookOutlined, InstagramOutlined, SlackOutlined, FrownOutlined } from '@ant-design/icons';
import { useEffect, useState, React } from 'react';
import axios from 'axios';
const { Footer } = Layout;

const Join = ({joinId, type}) => {
    let userId = localStorage.getItem("userId");

    // Join Button
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [joined, setJoined] = useState(false);
    const showJoinModal = () => {
        setOpen(true);
    };
    const handleJoinOk = () => { // Post Request!
        setLoading(true);
        try {
            axios.put(
                `http://localhost:8080/${type}/join/${userId}&${joinId}`,
            ).then(
                res => {
                    console.log(res);
                    console.log(res.data);
                }
            )
        } catch (err) {
            console.log(err);
        }
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 1000);
        setJoined(true);
    };
    const handleJoinCancel = () => {
        setOpen(false);
    };

    // Share Button
    const [isShareModalOpen, setIsModalOpen] = useState(false);
    const showShareModal = () => {
        setIsModalOpen(true);
    };
    const handleShareOk = () => {
        setIsModalOpen(false);
    };
    const handleShareCancel = () => {
        setIsModalOpen(false);
    };

    // Cancel Button
    const handleCancel = () => { // Post Request!
        setJoined(false);
    }

    return (
        <Footer className={styles.footerStyle}>
            <div className={styles.buttons}>
                <Button className={styles.sharebutton} icon={<ShareAltOutlined />} size={'large'} onClick={showShareModal} ghost>
                    Share
                </Button>
                <Modal title="Share with your friends!" style={{ textAlign: 'center', fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }} open={isShareModalOpen} onOk={handleShareOk} onCancel={handleShareCancel}>
                    <div className={styles.shares}>
                        <h3><TwitterOutlined />{" "}<a href="https://twitter.com/">Twitter</a></h3>
                        <h3><FacebookOutlined />{" "}<a href="https://facebook.com/">Facebook</a></h3>
                        <h3><InstagramOutlined />{" "}<a href="https://instagram.com/">Instagram</a></h3>
                        <h3><SlackOutlined />{" "}<a href="https://slack.com/">Slack</a></h3>
                    </div>
                </Modal>

                {joined ?
                    <Button className={styles.joinbutton} size={'large'} onClick={handleCancel} icon={<FrownOutlined />} ghost>
                        I'm not going
                    </Button> :
                    <Button className={styles.joinbutton} icon={<UsergroupAddOutlined />} size={'large'} onClick={showJoinModal} ghost>
                        Join
                    </Button>
                }

                <Modal open={open} title="Hooray!" style={{ textAlign: 'center', fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }} onOk={handleJoinOk} onCancel={handleJoinCancel} footer={[
                    <Button key="Cancel" onClick={handleJoinCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleJoinOk}>Yes</Button>]}
                >
                    <p>Are you sure to join in this event?</p>
                </Modal>
            </div>
        </Footer>
    )
}
export default Join