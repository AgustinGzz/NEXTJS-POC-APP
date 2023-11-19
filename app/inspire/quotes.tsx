import Button from "./button";
type Quote = {
  q: string;
  a: string;
  h: string;
};
type Quotes = Quote[];

const Quotes: React.FC = async () => {
  //by default Next.js caches the same request (body and headers also count to check if it is the same request)
  const response = await fetch("https://zenquotes.io/api/random/", {
    //with the next config we tell next to re-fetch on the next page load after 'revalidate' amount of time
    //or if we ever revalidate on demand by using the revalidateTag function provided by nextjs
    //IMPORTANT NOTE: tag revalidation can only be done on the server side
    next: { revalidate: 3600, tags: ["displayedQuote"] }
  });
  const quote = (await response.json()) as Quotes;
  const selectedQuote = quote[0];
  return (
    <section className='mt-4'>
      <div className='block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <h2 className='mb-2 text-center'>{selectedQuote.q}</h2>
        <p className='text-right'>
          <em>{selectedQuote.a}</em>
        </p>
        <Button />
      </div>
    </section>
  );
};

export default Quotes;
