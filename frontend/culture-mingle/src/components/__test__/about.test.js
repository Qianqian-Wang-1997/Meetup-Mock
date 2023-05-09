import React from 'react';
import { render } from '@testing-library/react';
import GroupIntroduction from '../About/index';

describe('About', () => {
  it('renders the component with correct member information', () => {
    const { getByText, getByAltText } = render(<GroupIntroduction />);
    
    // Check if the title is rendered
    expect(getByText('Our Awesome Development Team')).toBeInTheDocument();
    
    // Check if each member's name, role, and avatar are rendered
    const members = [
      { name: 'Amber Wang', role: 'Frontend Developer', avatar: 'amber.jpg' },
      { name: 'Yutong Song', role: 'Full Stack Developer', avatar: 'yutong.jpg' },
      { name: 'Anqi Wang', role: 'Frontend Designer', avatar: 'waq.jpg' },
      { name: 'Aosen Xiong', role: 'Backend Developer', avatar: 'aosen.jpg' },
      { name: 'Yuren Qin', role: 'Backend Developer, 中央數據庫改革領導小組組長', avatar: 'ryan.jpg' }
    ];
    members.forEach(member => {
      expect(getByText(member.name)).toBeInTheDocument();
      expect(getByText(member.role)).toBeInTheDocument();
      expect(getByAltText(member.name)).toBeInTheDocument();
      expect(getByAltText(member.name)).toHaveAttribute('src', expect.stringContaining(member.avatar));
    });

    // Check if the description is rendered
    expect(getByText('We are a 5-person development group dedicated to building cutting-edge web applications using the latest technologies. With expertise in frontend and backend development, UI/UX design, and project management, we work collaboratively to deliver high-quality software solutions that meet our clients\' needs.')).toBeInTheDocument();

    // Check if the project information is rendered
    expect(getByText('Introducing CultureMingle')).toBeInTheDocument();
    expect(getByText('Recent data from Immigration, Refugees, and Citizenship Canada (IRCC) shows that the number of international students studying in Canada has seen a significant increase in recent years. However, many of these students often struggle to adapt to their new surroundings and integrate into the local community, particularly those who do not speak English as their first language. The challenges of being away from friends and family, coupled with feelings of loneliness and homesickness, are major issues for this group. Additionally, students from different countries tend to form their own groups, making it difficult for them to interact and connect with one another.')).toBeInTheDocument();
    expect(getByText('Currently, there is a lack of products available to help bridge these gaps and connect international students from diverse backgrounds. Our goal is to develop CultureMingle, a web-based, user-friendly, and real-time activity planning application specifically tailored to international students. Through the platform, students can create and join various activities such as group games, cultural experiences, and outdoor adventures. Importantly, CultureMingle is committed to ensuring the safety and security of its users')).toBeInTheDocument();
  });
});
