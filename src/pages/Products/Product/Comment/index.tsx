/* eslint-disable import/no-duplicates */
import React from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { FiTrash } from 'react-icons/fi';
import { IComment, useProducts } from '../../../../hooks/product';

import { Container, ButtonDelete } from './styles';
import { useAuth } from '../../../../hooks/auth';

interface CommentProps {
  comment: IComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { user } = useAuth();
  const { handleDelete } = useProducts();

  return (
    <Container>
      {user && user.id === comment.client_id && (
        <ButtonDelete type="button" onClick={() => handleDelete(comment.id)}>
          <FiTrash />
        </ButtonDelete>
      )}

      <p>{comment.comment}</p>
      <div>
        <div>
          <img
            src={
              comment.image_url
                ? comment.image_url
                : `https://ui-avatars.com/api/?name=${comment.name}&background=ffd984&color=1b1b1b&bold=true&format=svg&size=110`
            }
            alt={comment.name}
          />
          <strong>{comment.name}</strong>
        </div>
        <span>
          {format(new Date(comment.created_at), "dd 'de' MMMM 'de' yyyy", {
            locale: pt,
          })}
        </span>
      </div>
    </Container>
  );
};

export default Comment;
