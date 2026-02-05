import Button from "~/Components/Button";
import { Form } from "@remix-run/react";

export interface DownloadCsv {
  action: string;
}

const DownloadCsv = (props: DownloadCsv) => {
  const { action } = props;

  return (
    <Form
      className="inline"
      action={action}
      method="post"
      reloadDocument
    >
      <Button>Download CSV</Button>
    </Form>
  );
};
export default DownloadCsv;