## Installation

```bash
npx shadcn-ui@latest add dialog
```

## Usage

```javascript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>;
```

## API Reference

| Property            | Type      | Description                                     |
| ------------------- | --------- | ----------------------------------------------- |
| `Dialog`            | Component | The main container for the dialog.              |
| `DialogContent`     | Component | Contains the content of the dialog.             |
| `DialogHeader`      | Component | The header section of the dialog.               |
| `DialogTitle`       | Component | Provides a title for the dialog.                |
| `DialogDescription` | Component | Gives a detailed description within the dialog. |
| `DialogTrigger`     | Component | Triggers the opening of the dialog.             |

## Examples

#### Code

```jsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Proceed with caution.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="primary">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Style Variations

#### Default

```jsx
<Dialog>{/* Dialog components */}</Dialog>
```

#### Share

```jsx
<Dialog>{/* Dialog components with share options */}</Dialog>
```

### Notes

- To activate the Dialog component from within a Context Menu or Dropdown Menu, encase the Context Menu or Dropdown Menu component in the Dialog component.
- For more information, refer to the linked issue [here](#).
