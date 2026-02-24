import { useState } from "react";
import { useDisclosable } from "use-disclosable";
import { Button } from "./components/ui/button";
import { ShadcnDialog } from "./components/ShadcnDialog";
import { ShadcnDrawer } from "./components/ShadcnDrawer";
import { ShadcnDrawer2 } from "./components/ShadcnDrawer2";
import { Separator } from "./components/ui/separator";
import { ShadcnAlertDialog } from "./components/ShadcnAlertDialog";
import { LoadingDialog } from "./components/LoadingDialog";

function App() {
  const { open } = useDisclosable();
  const [lastResult, setLastResult] = useState<string>("No action yet");

  const handleOpenShadcnDialogButtonClick = () => {
    open(ShadcnDialog, {
      props: {
        title: "Shadcn Dialog",
        description: "This is a Shadcn dialog open with use-disclosable",
      },
    });
  };

  const handleOpenShadcnDrawerButtonClick = () => {
    open(ShadcnDrawer, {
      props: {
        title: "Shadcn Drawer",
        description: "This is a Shadcn drawer open with use-disclosable",
      },
    });
  };

  const handleOpenShadcnDrawerWithDialogButtonClick = () => {
    open(ShadcnDrawer2, {
      props: {
        title: "Shadcn Drawer",
        description: "This is a Shadcn drawer open with use-disclosable",
      },
    });
  };

  const handleShadcnAlertDialogOpen = async () => {
    const closeReason = await open(ShadcnAlertDialog, {
      props: {
        title: "This is an important message",
        description: "This is a Shadcn dialog open with use-disclosable",
      },
    });
    setLastResult(`Alert dialog closed with: ${closeReason}`);
  };

  const handleLoadingDialogOpen = async () => {
    await open(LoadingDialog, {
      props: { message: "Processing your request..." },
    });
    setLastResult("Loading dialog closed");
  };

  const handleAsyncWorkflow = async () => {
    setLastResult("Starting async workflow...");

    // Open loading dialog
    await open(LoadingDialog, { props: { message: "Saving data..." } });

    setLastResult("Async workflow completed!");
  };

  return (
    <div className="size-full">
      <section className="flex flex-col justify-center gap-4 p-4 w-100">
        <h1 className="text-4xl font-bold">Shadcn UI Examples</h1>
        <div className="flex flex-row gap-4 flex-wrap">
          <Button className="w-fit" onClick={handleOpenShadcnDialogButtonClick}>
            Open Dialog
          </Button>
          <Button className="w-fit" onClick={handleOpenShadcnDrawerButtonClick}>
            Open Drawer
          </Button>
          <Button
            className="w-fit"
            onClick={handleOpenShadcnDrawerWithDialogButtonClick}
          >
            Open Drawer with Dialog
          </Button>
        </div>
        <Separator />
        <h1 className="text-4xl font-bold">Promise-Based Dialogs</h1>
        <div className="flex flex-row gap-4 flex-wrap">
          <Button className="w-fit" onClick={handleShadcnAlertDialogOpen}>
            Alert Dialog
          </Button>
          <Button className="w-fit" onClick={handleLoadingDialogOpen}>
            Loading Dialog
          </Button>
          <Button className="w-fit" onClick={handleAsyncWorkflow}>
            Async Workflow
          </Button>
        </div>
        <Separator />
        <div className="p-4 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Last Action Result:</h2>
          <p className="text-muted-foreground">{lastResult}</p>
        </div>
      </section>
    </div>
  );
}

export default App;
