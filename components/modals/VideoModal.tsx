import Image from 'next/image';
import Modal from './Modal';
import { IMAGES } from '@/lib/data';

/** Lightbox for the "Play our story" button. Swap the <Image> for a <video>/<iframe> when you have one. */
export default function VideoModal({ open }: { open: boolean }) {
  return (
    <Modal open={open} label="Our story" wide>
      <Image
        src={IMAGES.video}
        alt="Volunteers planting a tree together"
        width={1400}
        height={933}
        quality={72}
        sizes="(max-width: 820px) 100vw, 820px"
      />
    </Modal>
  );
}
