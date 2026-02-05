import Button from "~/Components/Button";
import { Form } from "@remix-run/react";

export interface DeleteProps {
  action: string;
  disabled?: boolean;
}

const Delete = (props: DeleteProps) => {
  const { action, disabled = false } = props;

  return (
    <Form
      className="inline"
      action={action}
      method="post"
      onSubmit={(event) => {
        const response = confirm(
          "Please confirm you want to delete this record.",
        );
        if (!response) {
          event.preventDefault();
        }
      }}
    >
      <Button variant={'danger'} disabled={disabled}>Delete</Button>
    </Form>
  );
};
export default Delete;