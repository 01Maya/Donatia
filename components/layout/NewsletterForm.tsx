'use client';
import { useState, type FormEvent } from 'react';
import { useSite } from '../modals/SiteProvider';

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export default function NewsletterForm() {
  const { toast } = useSite();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email.trim())) {
      return setError('Enter a valid email address, like name@example.com');
    }

    setError('');
    setEmail('');
    toast("You're subscribed. Welcome to the community!");
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
          aria-invalid={!!error}
          autoComplete="email"
        />
        <button type="submit">Subscribe</button>
      </form>

      <div className="er" role="alert">
        {error}
      </div>
    </>
  );
}
