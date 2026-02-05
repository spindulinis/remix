import Button from "~/Components/Button";
import { Form } from "@remix-run/react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

export interface OrderChangeProps {
  action: string;
  direction: 'up' | 'down';
  disabled?: boolean;
}

const OrderChange = (props: OrderChangeProps) => {
  const { action, direction, disabled } = props;

  return (
    <Form
      className="inline"
      action={action}
      method="post"
    >
      <Button disabled={disabled}>
        {direction === 'up' && <ArrowUpIcon className="h-6 w-6 shrink-0"/>}
        {direction === 'down' && <ArrowDownIcon className="h-6 w-6 shrink-0"/>}
      </Button>
    </Form>
  );
};
export default OrderChange;