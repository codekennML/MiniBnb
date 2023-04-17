"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
    mx-auto
    max-w-[1300px] 
    px-4
    sm:px-2
    md:px-8
    "
    >
      {children}
    </div>
  );
};

export default Container;
