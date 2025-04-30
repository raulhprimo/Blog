import Image from 'next/image';

interface AvatarProps {
  size?: number;
  borderWidth?: number;
  borderColor?: string;
}

export function Avatar({ 
  size = 40, 
  borderWidth = 2,
  borderColor = 'var(--primary)'
}: AvatarProps) {
  return (
    <div 
      className="relative inline-block overflow-hidden"
      style={{ 
        width: size, 
        height: size,
        borderRadius: '50%',
        border: `${borderWidth}px solid ${borderColor}`,
      }}
    >
      <Image
        src="/images/profile.jpg"
        alt="Foto de perfil"
        width={size * 1.2}
        height={size * 1.2}
        className="object-cover"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: 'scale(1.05)', // Garante que não haja espaço em branco nas bordas
        }}
        priority
      />
    </div>
  );
} 