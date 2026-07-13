function Loading() {
  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col items-center justify-center py-6">

        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />

        <h2 className="mt-5 text-lg font-semibold text-slate-800">
          Analyzing Account
        </h2>

        <p className="mt-2 text-center text-slate-500">
          Scraping tweets and running the deep learning model.
          <br />
          This may take several seconds.
        </p>

      </div>

    </section>
  );
}

export default Loading;