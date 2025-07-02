// components/Logo.js
import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/Copilot_20250701_004312.png"
        alt="SABNET Logo"
        width={40}
        height={40}
        className="rounded-md"
      />
      <span className="text-xl font-bold tracking-wide">SABARNET</span>
    </div>
  );
}
