import React, { FC, ReactElement, useState } from 'react';
import './style.scss';

type mProps = {
  startSpin: (betType: number, betnumber: number, betAmount: string) => any
};

const ChoiceTypes = [
  { name: 'Even', mValue: 0 },
  { name: 'Red', mValue: 2 },
  { name: 'Green', mValue: 4 },
  { name: 'Black', mValue: 3 },
  { name: 'Odd', mValue: 1 },
];

const BetButtons: FC<mProps> = ({ startSpin }): ReactElement => {
  const [pickedNumber, setPickedNumber] = useState<number>();
  const [picked, setPicked] = useState<number>();

  const [bet, setbet] = useState<number>();

  const radioChangeHandle = (item: React.ChangeEvent<HTMLInputElement>) => {
    setPicked(parseInt(item.target.value, 10));
  };

  const numberChangeHandle = (item: React.ChangeEvent<HTMLInputElement>) => {
    setPickedNumber(item.target.valueAsNumber);
    setPicked(5);
  };

  const numberClickHandle = () => {
    setPicked(5);
  };

  const betChangeHandle = (item: React.ChangeEvent<HTMLInputElement>) => {
    setbet(item.target.valueAsNumber);
  };

  const spinClickHandle = () => {
    if (!picked) { alert('Choose bet type !'); return; }
    if (picked === 5 && !pickedNumber) { alert('Choose a number or other type !'); return; }
    if (!bet) { alert('Choose bet amount !'); return; }

    startSpin(picked, pickedNumber || 0, bet.toString());
  };

  return (
    <div className="GlassMorphisme BetButtons">
      <div className="BetButtons__Group">
        {ChoiceTypes.map(({ name, mValue }) => (
          <div className="BetButtons__Input" key={`BetButtons-${mValue}`}>
            <label className={`
              Button
              BetButtons__Label
              ${picked === mValue ? 'BetButtons__Label--selected' : ''}`}
            >
              <input
                className="BetButtons__Radio"
                name="BetButton"
                type="radio"
                onChange={(e) => { radioChangeHandle(e); }}
                value={mValue}
              />
              {name}
            </label>
          </div>
        ))}
      </div>
      <div className="BetButtons__NumberInput">
        <label className={`
              Button
              BetButtons__Label
              BetButtons__Label__Number
              ${picked === 5 ? 'BetButtons__Label--selected' : ''}`}
        >
          <input
            className="BetButtons__Number"
            name="BetButton"
            type="number"
            min={0}
            max={36}
            placeholder="Number"
            onChange={(e) => { numberChangeHandle(e); }}
            onClick={() => { numberClickHandle(); }}
          />
        </label>
      </div>

      <div className="BetButtons__Footer">
        <div className="BetButton__Amount">
          <label className={`
              Button
              BetButtons__Label
              BetButtons__Label__Number`}
          >
            <input
              className="BetButtons__Number"
              name="BetButton"
              type="number"
              min={0}
              max={36}
              placeholder="Amount"
              onChange={(e) => { betChangeHandle(e); }}
            />
          </label>
        </div>
        <div className="BetButtons__Start">
          <input
            className="Button BetButtons__Start__Button"
            type="button"
            value="Spin"
            onClick={() => { spinClickHandle(); }}
          />
        </div>
      </div>
    </div>
  );
};

export default BetButtons;
