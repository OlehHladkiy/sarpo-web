// @flow
import { Modal, Input } from 'antd';
import {
  RichUtils,
  EditorState,
  Modifier,
  SelectionState,
  getVisibleSelectionRect,
} from 'draft-js';
import * as R from 'ramda';
import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import styled from 'styled-components';

import { getEditorEntities } from './helpers/editor-helpers';

interface InsertLinkModalProps {
  visible: boolean;
  setVisible: Function;
  editorWrapperRef: Record<string, any>;
  editorState: any;
  setEditorState: Function;
  currentEntityKey: string | null;
  currentInsertLinkData: Record<string, any>;
  urlTextRef: Record<string, any>;
  isEditable: boolean;
}

const InsertLinkModal: React.FunctionComponent<InsertLinkModalProps> = ({
  visible,
  setVisible,
  editorWrapperRef,
  editorState,
  setEditorState,
  currentEntityKey,
  currentInsertLinkData,
  urlTextRef,
  isEditable,
}: InsertLinkModalProps) => {
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [isSelected, setIsSelected]: any = useState('');

  const urlInputRef: any = useRef();

  const currentSelection = editorState.getSelection();
  const selectedRange: any = {
    start: currentSelection.getStartOffset(),
    end: currentSelection.getEndOffset(),
  };

  const getCurrentSelectionPlainText = useCallback(() => {
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);
    return selectedText;
  }, [editorState]);

  const getCurrentSelectionState = useCallback(() => {
    const currentEntity = R.find(
      R.propEq('entityKey', currentEntityKey),
      getEditorEntities(editorState, 'LINK'),
    );

    if (currentEntity) {
      return new SelectionState({
        anchorKey: currentEntity.blockKey,
        anchorOffset: currentEntity.start,
        focusKey: currentEntity.blockKey,
        focusOffset: currentEntity.end,
      });
    }
    return null;
  }, [currentEntityKey, editorState]);

  const getCurrentSelectionText = useCallback(() => {
    const selection = getCurrentSelectionState();
    if (selection) {
      const anchorKey = selection.getAnchorKey();
      const currentContent = editorState.getCurrentContent();
      const currentBlock = currentContent.getBlockForKey(anchorKey);

      const start = selection.getStartOffset();
      const end = selection.getEndOffset();
      return currentBlock.getText().slice(start, end);
    }
    return '';
  }, [editorState, getCurrentSelectionState]);

  const getEntityFromSelectedRange = useCallback(
    selectionState => {
      const currentEntity = R.find(
        entity =>
          (entity.start <= selectionState.start &&
            entity.end >= selectionState.end) ||
          (entity.end <= selectionState.end &&
            entity.start >= selectionState.start),
        getEditorEntities(editorState, 'LINK'),
      );

      return currentEntity ? currentEntity : null;
    },
    [editorState],
  );

  useEffect(() => {
    const plainText = getCurrentSelectionPlainText();
    const currentEntity = getEntityFromSelectedRange(selectedRange);

    setIsSelected(selectedRange.start !== selectedRange.end);

    if (currentEntity && plainText) {
      const { url } = currentEntity.entity.getData();
      setLinkUrl(url);
    }
    if (visible && !R.isEmpty(currentInsertLinkData)) {
      setLinkText(getCurrentSelectionText());
      setLinkUrl(currentInsertLinkData.url);
    }
    if (!visible) {
      setLinkText('');
      setLinkUrl('');
    }
    if (plainText) {
      setLinkText(plainText);
      urlInputRef && urlInputRef.current && urlInputRef.current.focus();
    }
  }, [
    currentInsertLinkData,
    editorState,
    getCurrentSelectionState,
    getCurrentSelectionText,
    visible,
    getCurrentSelectionPlainText,
    currentEntityKey,
    getEntityFromSelectedRange,
    selectedRange,
  ]);

  const top = useMemo(() => {
    const currentPosition = getVisibleSelectionRect(window);

    const clientRect =
      editorWrapperRef &&
      editorWrapperRef.current &&
      editorWrapperRef.current.getBoundingClientRect();

    if (visible) {
      return currentPosition ? currentPosition.top - 60 : clientRect.y - 50;
    }
  }, [editorWrapperRef, visible]);

  const left = useMemo(() => {
    const currentPosition = getVisibleSelectionRect(window);

    const clientRect =
      editorWrapperRef &&
      editorWrapperRef.current &&
      editorWrapperRef.current.getBoundingClientRect();

    const textRect =
      urlTextRef &&
      urlTextRef.current &&
      urlTextRef.current.getBoundingClientRect();

    if (currentPosition && isEditable) {
      currentPosition.left = textRect && textRect.right;
    }

    if (visible) {
      if (isSelected) {
        return currentPosition && currentPosition.right + 10;
      }
      return currentPosition ? currentPosition.left + 10 : clientRect.x + 10;
    }
  }, [editorWrapperRef, visible, urlTextRef, isEditable, isSelected]);

  const onAddLink = (e: any): string => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    if (e.key === 'Escape') {
      setVisible(false);
      setLinkUrl('');
      return 'handled';
    }

    if (!linkUrl) {
      setEditorState(RichUtils.toggleLink(editorState, selectionState, null));
      setVisible(false);
      return 'handled';
    }

    const data = {
      url: linkUrl,
    };

    const newContentState = currentEntityKey
      ? contentState.mergeEntityData(currentEntityKey, data)
      : contentState.createEntity('LINK', 'MUTABLE', data);

    const entityKey =
      currentEntityKey || contentState.getLastCreatedEntityKey();

    const contentWithEntity = currentEntityKey
      ? Modifier.applyEntity(newContentState, selectionState, entityKey)
      : Modifier.replaceText(
          newContentState,
          selectionState,
          linkText,
          null,
          entityKey,
        );

    const contentToUpdate = currentEntityKey
      ? Modifier.replaceText(
          newContentState,
          getCurrentSelectionState(),
          linkText,
          null,
          entityKey,
        )
      : contentWithEntity;

    setEditorState(
      EditorState.push(editorState, contentToUpdate, 'apply-entity'),
    );

    setVisible(false);

    return 'handled';
  };

  const linkUrlHandler = (event): void => {
    setLinkUrl(event.target.value);
  };
  const linkTextHandler = (event): void => {
    setLinkText(event.target.value);
  };

  return (
    visible && (
      <Wrapper
        visible={visible}
        onCancel={onAddLink}
        maskStyle={{ backgroundColor: 'transparent' }}
        closable={false}
        style={{ top, left }}
      >
        <Input
          placeholder="Add text"
          onChange={linkTextHandler}
          onPressEnter={(): void =>
            urlInputRef.current && urlInputRef.current.focus()
          }
          defaultValue={linkText}
        />
        <Input
          placeholder="Add URL"
          onChange={linkUrlHandler}
          defaultValue={linkUrl}
          onPressEnter={onAddLink}
          ref={urlInputRef}
        />
      </Wrapper>
    )
  );
};

const Wrapper = styled(Modal)`
  width: 350px !important;
  margin: 0;

  .ant-modal-header {
    display: none;
  }

  .ant-modal-footer {
    display: none;
  }

  .ant-modal-body {
    height: 85px;
    padding: 7px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export default InsertLinkModal;
