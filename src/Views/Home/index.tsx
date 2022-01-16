import { useEthers } from '@usedapp/core';
import { motion, AnimatePresence } from 'framer-motion';
import React, { FC, ReactElement } from 'react';
import WalletConnector from '../../Components/WalletConnector';
import WalletDisconnector from '../../Components/WalletDisconnector';
import './style.scss';

type mProps = {
};

const Home: FC<mProps> = (): ReactElement => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
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
      </AnimatePresence>

      {/* WalletConnector */}
      <AnimatePresence>
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
    </div>
  );
};

export default Home;
