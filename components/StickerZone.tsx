'use client';
import { useRef, type ReactNode } from 'react';
import styles from './Stickers.module.css';
import Sticker from './Sticker';
import { ZoneContext } from './useDrag';

export default function StickerZone({ children }: { children: ReactNode }) {
  const zoneRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={zoneRef} className={styles.zone} data-testid="sticker-zone">
      <ZoneContext.Provider value={zoneRef}>
        <Sticker className="hello" label="Draggable sticker: Hello there. Arrow keys move it." rot={-10} right="4%" top="-2%">
          HELLO<br />THERE!
        </Sticker>
        <Sticker className="star" label="Draggable sticker: open to work" rot={8} right="30%" top="-4%">
          OPEN TO<br />WORK
        </Sticker>
        <Sticker className="code" label="Draggable sticker: design plus code" rot={-4} right="2%" top="78%">
          &lt;design + code /&gt;
        </Sticker>
        <Sticker className="cnx" label="Draggable sticker: Chiang Mai to Bangkok" rot={12} right="36%" top="74%">
          CNX<br />→ BKK ✦
        </Sticker>
        {children}
      </ZoneContext.Provider>
    </div>
  );
}
