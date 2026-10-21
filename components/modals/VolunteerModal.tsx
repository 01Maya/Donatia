'use client';
import { useState, type FormEvent } from 'react';
import Modal from './Modal';
import { useSite } from './SiteProvider';
import { ArrowIcon } from '../ui/Button';

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export default function VolunteerModal({ open }: { open: boolean }) {
  const { close, toast } = useSite();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !EMAIL_PATTERN.test(email)) {
      return toast('Add your name and a valid email');
    }

    const firstName = name.trim().split(' ')[0];
    close();
    toast(`Thanks ${firstName}! We'll be in touch soon.`);
    setName('');
    setEmail('');
  };

  return (
    <Modal open={open} label="Volunteer sign-up">
      <form onSubmit={handleSubmit} noValidate>
        <h3>Join as a volunteer</h3>
        <p className="mut" style={{ fontSize: 14, marginBottom: 16 }}>
          Tell us how to reach you and we&apos;ll be in touch within 48 hours.
        </p>

        <input
          className="c"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Full name"
          aria-label="Full name"
          autoComplete="name"
        />
        <input
          className="c"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
        />

        <button className="btn" type="submit">
          Sign me up
          <i aria-hidden>
            <ArrowIcon />
          </i>
        </button>
      </form>
    </Modal>
  );
}
