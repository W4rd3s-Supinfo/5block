import { ethers } from 'ethers';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import React, {
  FC, ReactElement, useState, useEffect,
} from 'react';
import { Wheel, WheelDataType } from 'react-custom-roulette';
import BetButtons from '../../Components/BetButtons';
import WalletConnector from '../../Components/WalletConnector';
import WalletDisconnector from '../../Components/WalletDisconnector';
import './style.scss';

import wheelAbi from '../../artifacts/contracts/Wheel.sol/Wheel.json';

type mProps = {
};

const contractAddress = '0x12B08904d6A972aFfbfb7DB1bFBc7F734dD2bc9b';

const InterfaceAnimation: Variants = {
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: 0.25,
      duration: 0.5,
    },
  },
};
declare global {
  interface Window {
    ethereum: any;
    mResult1: any;
  }
}

const Home: FC<mProps> = (): ReactElement => {
  const [mProvider, setmProvider] = useState<ethers.providers.Web3Provider>();
  const [wheelData, setWheelData] = useState<Array<WheelDataType>>([]);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [isWin, setIsWin] = useState<boolean>();
  const [mustSpin, setMustSpin] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);

  useEffect(() => {
    const tmpArray: Array<WheelDataType> = [];
    for (let i = 0; i < 37; i += 1) {
      if (i === 0) {
        tmpArray.push({
          option: i.toString(),
          style: { backgroundColor: '#689F38' },
        });
      } else if (i <= 10 || (i >= 19 && i <= 28)) {
        if (i % 2 === 0) {
          tmpArray.push({
            option: i.toString(),
            style: { backgroundColor: '#212121' },
          });
        } else {
          tmpArray.push({
            option: i.toString(),
            style: { backgroundColor: '#D50000' },
          });
        }
      } else if (i % 2 === 1) {
        tmpArray.push({
          option: i.toString(),
          style: { backgroundColor: '#212121' },
        });
      } else {
        tmpArray.push({
          option: i.toString(),
          style: { backgroundColor: '#D50000' },
        });
      }
    }
    setWheelData(tmpArray);
  }, []);

  const disconectWallet = () => {
    setmProvider(undefined);
  };

  const getWalletProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'rinkeby');
    provider.send('eth_requestAccounts', [])
      .then(() => {
        setmProvider(provider);
      })
      .catch((err) => {
        console.error(`Wallet error: ${err}`);
      });
  };

  const callContract = async (betType: number, betnumber: number, betAmount: string) => {
    if (mProvider) {
      const signer = await mProvider.getSigner();
      const wheelSpin = new ethers.Contract(contractAddress, wheelAbi.abi, signer);
      try {
        const spinResult = await wheelSpin.bet(
          betType,
          betnumber,
          { value: ethers.utils.parseEther(betAmount) },
        );
        const spinResultConfirmed = await spinResult.wait(1);
        const { isWin: _isWin, winNumber } = spinResultConfirmed.events[0].args;
        setPrizeNumber(winNumber.toNumber());
        setIsWin(_isWin);
        setMustSpin(true);
      } catch (err: any) {
        alert(err.reason);
      }
    }
  };

  const displayResultWindow = () => {
    setMustSpin(false);
    setDisplayResult(true);
  };

  const onCloseResultClick = () => {
    setDisplayResult(false);
  };

  return (
    <div className="Home">
      {/* WalletDisconnector */}

      <AnimatePresence>
        {!!mProvider && (
          <motion.div
            layout="position"
            key="WalletConnector"
            className="WalletDisconector__Animation"
            variants={InterfaceAnimation}
            initial={{ opacity: 0, x: 100 }}
            animate="enter"
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <WalletDisconnector onButtonClick={disconectWallet} />
          </motion.div>
        )}

        {/* WalletConnector */}

        {!mProvider && (
          <motion.div
            key="WalletConnector"
            variants={InterfaceAnimation}
            initial={{ opacity: 0, y: 150 }}
            animate="enter"
            exit={{ opacity: 0, y: 150 }}
            transition={{ duration: 0.5 }}
          >
            <WalletConnector onButtonClick={getWalletProvider} />
          </motion.div>
        )}

        {/* BetButtons */}
        {
          !!mProvider && (
            <motion.div
              key="BetButtons"
              className="BetButtons__Animation"
            >
              <BetButtons startSpin={callContract} />
            </motion.div>
          )
        }

        {/* Wheel */}
        {
          !!mProvider && (
            <motion.div
              key="Wheel"
              className="Wheel__Animation"
            >
              <div className="Wheel">
                <Wheel
                  mustStartSpinning={mustSpin}
                  data={wheelData}
                  prizeNumber={prizeNumber}
                  textDistance={85}
                  perpendicularText
                  radiusLineColor="#D4AF37"
                  innerBorderWidth={15}
                  innerRadius={40}
                  innerBorderColor="#070707"
                  outerBorderWidth={15}
                  outerBorderColor="#070707"
                  textColors={['white']}
                  onStopSpinning={displayResultWindow}
                />
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>

      {!!displayResult && (
        <div className="GlassMorphisme ResultPopup__Filigrame">
          <div className="GlassMorphisme ResultPopup">
            <p>
              You have
              {' '}
              {isWin ? 'Win' : 'Lost'}
              {' '}
              !
            </p>
            <input
              type="button"
              className="Button"
              value="Close"
              onClick={() => { onCloseResultClick(); }}
            />
          </div>
        </div>

      )}

    </div>
  );
};

export default Home;
