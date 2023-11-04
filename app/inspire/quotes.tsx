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
    <section>
      <h2>{selectedQuote.q}</h2>
      <p>{selectedQuote.a}</p>
      <Button />
    </section>
  );
};

export default Quotes;
