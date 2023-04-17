'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  bright? : boolean
}

const Heading: React.FC<HeadingProps> = ({ 
  title, 
  subtitle,
  center,
  bright = false
}) => {
  return ( 
    <div className={center ? 'text-center' : 'text-start'}>
      <div className={` ${bright ? " text-bright" : ""} first-line:text-2xl font-bold`}>
        {title}
      </div>
      <div className={` ${ bright ? "text-gray-200" : "text-neutral-500 " } font-light mt-2 `}>
        {subtitle}
      </div>
    </div>
   );
}
 
export default Heading;