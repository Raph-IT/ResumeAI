import { useDrag, useDrop } from 'react-dnd';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

export const DraggableList = ({ items, children, onReorder }) => {
  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={onReorder}
      className="space-y-4"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <Reorder.Item
            key={item.id}
            value={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative bg-gray-900/30 rounded-xl p-6"
          >
            {children(item, index, {
              className: "cursor-move absolute top-4 left-4 text-gray-400 hover:text-gray-300",
              children: "⋮⋮"
            })}
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}; 