import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import commentsActions from '../../store-redux/comments/actions';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import AllComments from '../../components/all-comments';
import { useState } from 'react';
import listToTree from '../../utils/list-to-tree';
import TreeComments from '../../components/tree-comments';
import CommentForm from '../../components/comment-form';
/*************  ✨ Codeium Command 🌟  *************/
function Comments() {
  return <CommentForm title="Добавить комментарий" placeholder="Введите ваш комментарий" />;
}

export default memo(Comments);
