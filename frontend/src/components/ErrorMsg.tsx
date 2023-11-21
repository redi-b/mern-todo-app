const ErrorMsg = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`px-4 p-2.5 bg-red-200 border-2 border-red-500 rounded-[4px] text-sm font-light ${className}`}
    >
      {children}
    </div>
  );
};

export default ErrorMsg;
