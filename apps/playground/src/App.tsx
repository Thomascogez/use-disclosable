import { useDisclosable } from 'use-disclosable'
import { Button } from './components/ui/button';
import { ShadcnDialog } from './components/ShadcnDialog';
import { ShadcnDrawer } from './components/ShadcnDrawer';
import { ShadcnDrawer2 } from './components/ShadcnDrawer2';
import { Separator } from './components/ui/separator';
import { ShadcnAlertDialog } from './components/ShadcnAlertDialog';

function App() {
  const { open } = useDisclosable();
  const handleOpenShadcnDialogButtonClick = () => {
    open(ShadcnDialog, { props: { title: "Shadcn Dialog", description: "This is a Shadcn dialog open with use-disclosable" } });
  }

  const handleOpenShadcnDrawerButtonClick = () => {
    open(ShadcnDrawer, { props: { title: "Shadcn Drawer", description: "This is a Shadcn drawer open with use-disclosable" } });
  }

  const handleOpenShadcnDrawerWithDialogButtonClick = () => {
    open(ShadcnDrawer2, { props: { title: "Shadcn Drawer", description: "This is a Shadcn drawer open with use-disclosable" } });
  }

  const handleShadcnAlertDialogOpen = async () => {
    const closeReason = await open(ShadcnAlertDialog, {props: {title: "This is an important message", description: "This is a Shadcn dialog open with use-disclosable"}});
    alert(`Close reason: ${closeReason}`);
  }

  return (
    <div className='size-full'>
      <section className='flex flex-col justify-center gap-4 p-4 w-100'>
        <h1 className='text-4xl font-bold'>Shadcn</h1>
        <div className='flex flex-row gap-4'>
          <Button className='w-fit' onClick={handleOpenShadcnDialogButtonClick}>Open Shadcn Dialog</Button>
          <Button className='w-fit' onClick={handleOpenShadcnDrawerButtonClick}>Open Shadcn Drawer</Button>
          <Button className='w-fit' onClick={handleOpenShadcnDrawerWithDialogButtonClick}>Open Shadcn Drawer with Dialog</Button>
          <Button className='w-fit' onClick={handleShadcnAlertDialogOpen}>Open and await close</Button>
        </div>
        <Separator />
      </section>
    </div>
  )
}

export default App
