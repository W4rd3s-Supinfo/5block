import React, { FC, ReactElement } from 'react';
import MetamaskIcon from '../../Assets/metamask.svg';
import './style.scss';

type mProps = {
  onButtonClick: () => void
};

const WalletConnector: FC<mProps> = ({ onButtonClick }: mProps): ReactElement => (
  <div className="GlassMorphisme WalletConnector">
    <img src={MetamaskIcon} alt="Metamask icon" />
    <input
      type="button"
      className="Button"
      value="Connect wallet"
      onClick={() => { onButtonClick(); }}
    />
  </div>
);

export default WalletConnector;
