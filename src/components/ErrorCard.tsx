interface ErrorCardProps {
  message: string;
}

function ErrorCard({ message }: ErrorCardProps) {
  return (
    <section className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">

      <h2 className="text-lg font-semibold text-red-700">
        Unable to Analyze Account
      </h2>

      <p className="mt-2 text-red-600">
        {message}
      </p>

    </section>
  );
}

export default ErrorCard;