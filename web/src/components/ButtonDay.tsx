import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface Props {
  array: string[];
  value: string;
  text: string;
  title: string;
}
function ButtonDay({ array, value, text, title }: Props) {
  return (
    <ToggleGroup.Item
      className={ `w-8 h-8 rounded ${array.includes(value) ? 'bg-violet-500' : 'bg-zinc-900'}` }
      value={ value }
      title={ title }
    >
      { text }
    </ToggleGroup.Item>
  )
}

export default ButtonDay
