import { useState } from "react";
import { Button } from "./components/ui/button";
import { Login } from "./pages";
function App() {
  const [count, setCount] = useState(0);

  return (
    // <div className="w-screen h-screen flex flex-col items-center justify-center border-2 flex-wrap ">
    //   <Button>Hey</Button>
    //   <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    //     Taxing Laughter: The Joke Tax Chronicles
    //   </h1>
    //   <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
    //     The People of the Kingdom
    //   </h2>{" "}
    //   <p className="leading-7 [&:not(:first-child)]:mt-6">
    //     The king, seeing how much happier his subjects were, realized the error
    //     of his ways and repealed the joke tax.
    //   </p>
    //   <p className="text-sm text-muted-foreground">Enter your email address.</p>
    // </div>
    <div>
      <Login />
    </div>
  );
}

export default App;
