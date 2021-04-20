import React, { useState, memo } from 'react';
import Draggable from './Draggable';
import classnames from 'classnames';
import css from './Shape.module.css';

/**
  We pass the shapeIndex to the component in order to be able to memo the handler
  functions so the interactive sketch renders faster
**/
const Shape = (props) => {
  const {
    draggableClassName,
    shape,
    shapeIndex,
    min,
    max,
    onChangeShape,
    tabIndex
  } = props;

  const handleChange = (idx, val) => {
    const newPos = shape.pos.slice();
    newPos[idx] = val;
    onChangeShape(shapeIndex, 'pos', newPos);
  };

  const handleDraggingStart = (idx) => {
    onChangeShape(shapeIndex, 'dragging', idx);
  };

  const handleDraggingEnd = () => {
    onChangeShape(shapeIndex, 'dragging', null);
  };

  const handleMouseEnter = () => {
    onChangeShape(shapeIndex, 'showHandlers', true);
  };

  const handleMouseLeave = () => {
    onChangeShape(shapeIndex, 'showHandlers', false);
  };

  const handleToggleShape = () => {
    onChangeShape(shapeIndex, 'line', !shape.line);
  };

  const draggable = [];

  for (let i = 0; i < shape.pos.length; i++) {
    if (!shape.line || i < 2 || i > 5) {
      draggable.push(
        <Draggable
          key={`shape-pos-${i}`}
          value={shape.pos[i]}
          index={i}
          className={draggableClassName}
          onChange={handleChange}
          onDraggingStart={shape.line ? null : handleDraggingStart}
          onDraggingEnd={shape.line ? null : handleDraggingEnd}
          min={min}
          max={max}
          tabIndex={tabIndex}
        />
      );
      draggable.push(i === shape.pos.length - 1 ? ' * u' : ' * u, ');
    }
  }

  return (
    <span
      role={'button'}
      tabIndex={tabIndex}
      className={css.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {'  '}
      <span className={css.breakWhitespace}>
        <button
          className={classnames(draggableClassName, 'hljs-built_in')}
          onClick={handleToggleShape}
          tabIndex={tabIndex}>
          {shape.line ? 'line' : 'bezier'}
        </button>
        ({draggable})
      </span>
    </span>
  );
};

export default memo(Shape);
