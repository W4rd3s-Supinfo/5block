/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import './style.scss';

type Props = {
  center: number,
  max: number
}

const LineWheel: React.FC<Props> = (props) => {
  const { center, max } = props;
  const [indexes, setIndexes] = useState<Array<number>>([]);

  const variants = {
    animate: (i: number) => ({
      opacity: 1,
      x: `${100 * i}%`,
    }),
    exit: (i: number) => ({ opacity: 0, x: `${100 * (i - 1)}%` }),
  };

  function updateIndexes() {
    const newIndexes = [];
    for (let i = center - 2; i <= center + 2; i++) {
      let pushedIndex = i; // 12
      if (i < 0) {
        pushedIndex = max + i + 1;
      } else if (i > max) {
        pushedIndex = i - max - 1;
      }
      newIndexes.push(pushedIndex);
    }
    setIndexes(newIndexes);
  }

  useEffect(() => {
    updateIndexes();
  }, [center, max]);

  return (
    <div className="LineWheel">
      <AnimatePresence>
        {
          indexes.map((index, i) => (
            <motion.div
              custom={i - 2}
              variants={variants}
              initial={{ opacity: 0, x: '300%' }}
              animate="animate"
              exit="exit"
              className="cell"
              key={index}
            >
              {index}
            </motion.div>
          ))
        }
      </AnimatePresence>
    </div>
  );
};
export default LineWheel;
