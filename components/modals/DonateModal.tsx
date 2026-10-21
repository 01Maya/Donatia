'use client';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import { ArrowIcon } from '../ui/Button';

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];
const DEFAULT_AMOUNT = 25;

export default function DonateModal({ open }: { open: boolean }) {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [customAmount, setCustomAmount] = useState('');
  const [monthly, setMonthly] = useState(true);
  const [done, setDone] = useState(false);

  // Reset the thank-you screen each time the modal re-opens.
  useEffect(() => {
    if (open) setDone(false);
  }, [open]);

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    if (Number(value) > 0) setAmount(Number(value));
  };

  const selectPreset = (preset: number) => {
    setAmount(preset);
    setCustomAmount('');
  };

  const frequencyLabel = monthly ? 'monthly' : 'today';

  return (
    <Modal open={open} label="Donate">
      {done ? (
        <div className="ok">
          <div className="ck">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
              <path d="M5 12l5 5 9-10" />
            </svg>
          </div>
          <h3>Thank you!</h3>
          <p className="mut" style={{ fontSize: 14 }}>
            Your {monthly ? 'monthly' : 'one-time'} gift of ${amount} will help us keep growing hope.
          </p>
        </div>
      ) : (
        <>
          <h3>Make a gift</h3>
          <p className="mut" style={{ fontSize: 14 }}>
            Every contribution plants hope.
          </p>

          <div className="seg" role="group" aria-label="Donation frequency">
            <button className={monthly ? 'on' : ''} onClick={() => setMonthly(true)}>
              Monthly
            </button>
            <button className={!monthly ? 'on' : ''} onClick={() => setMonthly(false)}>
              One-time
            </button>
          </div>

          <div className="amts">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                className={amount === preset && !customAmount ? 'on' : ''}
                onClick={() => selectPreset(preset)}
              >
                ${preset}
              </button>
            ))}
          </div>

          <input
            className="c"
            type="number"
            min={1}
            value={customAmount}
            onChange={(event) => handleCustomAmount(event.target.value)}
            placeholder="Custom amount ($)"
            aria-label="Custom amount in dollars"
          />

          <button className="btn" onClick={() => amount > 0 && setDone(true)}>
            <span>
              Donate ${amount} {frequencyLabel}
            </span>
            <i aria-hidden>
              <ArrowIcon />
            </i>
          </button>
        </>
      )}
    </Modal>
  );
}
