import Quotes from "./inspire/quotes";
import NavButton from "./navigation-buttons";
import WriteComponent from "./write-component";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Quotes />
      <WriteComponent />
      <div className='flex flex-col text-center'>
        <h2>click any of the links below to navigate to a feature</h2>
        <p>
          If you have no access, then enable the feature flag above and see what
          happens
        </p>
        <div className='mt-2'>
          <NavButton label='feature 1' href='/feature1' />
          <NavButton label='feature 2' href='/feature2' />
          <NavButton label='feature 3' href='/feature3' />
        </div>
      </div>
    </main>
  );
}
