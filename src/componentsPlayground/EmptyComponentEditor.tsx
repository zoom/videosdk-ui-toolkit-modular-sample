import { SlidersHorizontal } from 'lucide-react';
import { content, description, emptyEditor, icon } from '@/componentsPlayground/EmptyComponentEditor.css';

export function EmptyComponentEditor() {
  return (
    <div className={emptyEditor}>
      <div className={content}>
        <span className={icon}>
          <SlidersHorizontal size={22} />
        </span>
        <p className={description}>Select a row control to edit the component.</p>
      </div>
    </div>
  );
}
