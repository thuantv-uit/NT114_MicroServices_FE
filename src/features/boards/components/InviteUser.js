import React from 'react';
import { useParams } from 'react-router-dom';
import InviteToBoard from '../../invitations/components/InviteToBoard';

/**
 * Component to invite a user to a board
 * @param {Object} props
 * @param {string} props.token - Authentication token
 * @returns {JSX.Element}
 */
const InviteUser = ({ token }) => {
  const { id } = useParams();

  return (
    <InviteToBoard boardId={id} open={true} onClose={() => {}} />
  );
};

export default InviteUser;