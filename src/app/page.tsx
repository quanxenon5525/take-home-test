import { Footer, MainBody, TopNav } from "./components";

export default function Home() {
  return (
    <div className="grid items-center content-between	justify-items-center min-h-screen gap-16">
      <TopNav />
      <MainBody>meo meo</MainBody>
      <Footer />
    </div>
  );
}
