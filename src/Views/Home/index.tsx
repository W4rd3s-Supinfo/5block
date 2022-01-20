import { useEthers } from '@usedapp/core';
import { motion, AnimatePresence } from 'framer-motion';
import React, {
  FC, ReactElement, useEffect, useState,
} from 'react';
import LineWheel from 'Components/LineWheel';
import WalletConnector from '../../Components/WalletConnector';
import WalletDisconnector from '../../Components/WalletDisconnector';
import './style.scss';

type mProps = {
};

const Home: FC<mProps> = (): ReactElement => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const [center, setCenter] = useState(0);
  // const [data, setData] = useState();

  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  function turn() {
    let newCenter = center;
    newCenter = (newCenter + 1 > data.length - 1) ? 0 : newCenter + 1;
    setCenter(newCenter);
  }

  return (
    <div className="Home">
      {/* WalletDisconnector */}
      <AnimatePresence>
        {!!account && (
          <motion.div
            layout="position"
            key="WalletConnector"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <WalletDisconnector onButtonClick={deactivate} />
          </motion.div>
        )}
        {/* WalletConnector */}
        {!account && (
          <motion.div
            key="WalletConnector"
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 150 }}
          >
            <WalletConnector onButtonClick={activateBrowserWallet} />
          </motion.div>
        )}

      </AnimatePresence>
      {!!account
        && (
          <>
            <LineWheel center={center} max={data.length - 1} />
            <button type="button" onClick={() => turn()}>skip</button>
          </>
        )}
    </div>
  );
};

export default Home;
