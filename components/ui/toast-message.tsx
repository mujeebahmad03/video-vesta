type ToastMessageProps = {
  title: string;
  description: string;
};

export const ToastMessage = ({ title, description }: ToastMessageProps) => {
  return (
    <div>
      <h1 className="font-bold text-lg">{title}</h1>
      <p>{description}</p>
    </div>
  );
};
