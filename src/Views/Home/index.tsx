import { useEthers } from '@usedapp/core';
import React, { FC, ReactElement, useState } from 'react';
import WalletConnector from '../../Components/WalletConnector';
import './style.scss';

type mProps = {
};

const Home: FC<mProps> = (): ReactElement => {
  const { activateBrowserWallet, account } = useEthers();
  return (
    <div className="Home">
      <div className="Background" />
      <WalletConnector onButtonClick={activateBrowserWallet} />

    </div>
  );
};

export default Home;
