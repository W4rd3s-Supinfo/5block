import React, { FC, ReactElement } from 'react';
import './style.scss';

type mProps = {
  onButtonClick: () => void
};

const WalletDisconnector: FC<mProps> = ({ onButtonClick }: mProps): ReactElement => (
  <div className="WalletDisconector">
    <input
      type="button"
      className="Button"
      value="Disconnect"
      onClick={() => { onButtonClick(); }}
    />
  </div>
);

export default WalletDisconnector;
